import { ZodError, z } from "zod";
import User from "../models/users";
import { NextFunction, Request, Response } from "express";
import { hashPassword, verifyPassword } from "../utils/password";
import createSecretToken from "../utils/secretToken";
import createRefreshToken from "../utils/createRefreshToken";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
//sigup

const signUpSchema = z
  .object({
    username: z.string({ required_error: "username is required" }),
    email: z.string({ required_error: "email is required" }).email(),
    password: z
      .string({ required_error: "password is required" })
      .min(8)
      .max(16)
      .refine(
        (value) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/.test(
            value
          ),
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one symbol",
        }
      ),
    confirmPassword: z
      .string({ required_error: "confirmPassword is required" })
      .min(8)
      .max(16),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["password"],
    message: "Password and confirm password must match",
  });
type TSignUpSchema = z.infer<typeof signUpSchema>;

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username,email, password, } = req.body;
  if (!username|| !password || !email) return res.status(400).json({ success:false,message: 'Username ,email and password are required.' });

  // check for duplicate usernames in the db
  const duplicate = await User.findOne({ email: email }).exec();
  if (duplicate) return res.status(409).send({status:false,message:"email already used"}); //Conflict 

  try {
      //encrypt the password
      const hashedPwd = await bcrypt.hash(password, 10);

      //create and store the new user
      const result = await User.create({
          "username": username,
          "email":email,
          "password": hashedPwd
      });

      console.log(result);

      res.status(201).json({ 'success': `New user ${username} created!` });
  } catch (err:any) {
      res.status(500).json({ 'message': err.message });
  }
};

//signin

export const logIn = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  console.log(`cookie available at login: ${JSON.stringify(cookies)}`);
  const { email, password } = req.body;
  if (!password || !email) return res.status(400).send({ success:false,message: 'Username ,email and password are required.' });

  const foundUser = await User.findOne({ email:email }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized 
  // evaluate password 
  const match = await bcrypt.compare(password, foundUser.password as string);
  if (match) {
      const roles = Object.values(foundUser.roles).filter(Boolean);
      // create JWTs
      const accessToken = jwt.sign(
          {
              "UserInfo": {
                  "username": foundUser.username,
                  "roles": roles
              }
          },
          process.env.TOKEN_KEY as string,
          { expiresIn: '10m' }
      );
      const newRefreshToken = jwt.sign(
          { "username": foundUser.username },
          process.env.REFRESH_TOKEN_KEY as string,
          { expiresIn: '1d' }
      );

      // Changed to let keyword
      let newRefreshTokenArray =
          !cookies?.jwt
              ? foundUser.refreshToken
              : foundUser.refreshToken.filter(rt => rt !== cookies.jwt);

      if (cookies?.jwt) {

          /* 
          Scenario added here: 
              1) User logs in but never uses RT and does not logout 
              2) RT is stolen
              3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
          */
          const refreshToken = cookies.jwt;
          const foundToken = await User.findOne({ refreshToken }).exec();

          // Detected refresh token reuse!
          if (!foundToken) {
              console.log('attempted refresh token reuse at login!')
              // clear out ALL previous refresh tokens
              newRefreshTokenArray = [];
          }

          res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
      }

      // Saving refreshToken with current user
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      const result = await foundUser.save();
    

      // Creates Secure Cookie with refresh token
      res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });

      // Send authorization roles and access token to user
      res.status(201).send({ success:true,message:"sign in successful", accessToken });

  } else {
      res.status(401).send({success:false,message:"password doesnt match"});
  }
};



//signout

export const signOut =async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;
    if(!cookies?.jwt){res.status(204).send({success:false,message:"no refresh token available"})};

    const refreshToken = cookies.jwt;
     const foundUser = await User.findOne({refreshToken}).exec();
     if(!foundUser){
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
      return res.status(204).send({success:false,message:"no refresh token available"});
     }else{
      foundUser.refreshToken = foundUser.refreshToken.filter((rt:string)=> rt!== refreshToken);
      const result = await foundUser.save();
      res
      .clearCookie("jwt")
      .status(200)
      .send({ success: true, message: "signout succesfull" });
     }
    
  } catch (error) {
    res.status(500).send({ success: false, message: "internal server error" });
  }
};
