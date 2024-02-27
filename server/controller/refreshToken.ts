import { Request, Response } from "express";
import User from "../models/users";
import jwt, { JwtPayload } from "jsonwebtoken";
require("dotenv").config();

export const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res
      .status(401)
      .send({ success: false, message: "no token available" });
  }

  const refreshToken = cookies.jwt as string;
  // res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });

  const foundUser = await User.findOne({ refreshToken: refreshToken });

  // Detected refresh token reuse!
  if (!foundUser) {
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_KEY as string,
      { complete: true },
      async (
        error: jwt.VerifyErrors | null,
        decoded: JwtPayload | undefined
      ) => {
        if (error)
          return res
            .status(403)
            .send({ success: false, message: "refresh token invalid" }); //Forbidden
        console.log("attempted refresh token reuse!");
        const hackedUser = await User.findOne({
          username: decoded?.payload.username,
        }).exec();

        if (hackedUser) {
          console.log(hackedUser);
          hackedUser.refreshToken = [];
          const result = await hackedUser.save();
          
          return res.sendStatus(403);
        }
      }
    );
  } else {
    const newRefreshTokenArray = foundUser.refreshToken.filter(
      (rt) => rt !== refreshToken
    );
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_KEY as string,
      { complete: true },
      async (
        error: jwt.VerifyErrors | null,
        decoded: JwtPayload | undefined
      ) => {
        if (error) {
          console.log("expired refresh token");
          foundUser.refreshToken = [...newRefreshTokenArray];
          const result = await foundUser.save();
        }

        if (error || foundUser?.username !== decoded?.payload.username) {
          return res.sendStatus(403);
        }

        // Refresh token was still valid
        const roles = Object.values(foundUser.roles);
 
        const accessToken = jwt.sign(
          {
            UserInfo: {
              username: decoded?.payload.username,
              roles: foundUser.roles,
              userId: decoded?.payload.userId,
            },
          },
          process.env.TOKEN_KEY as string,
          { expiresIn: "10m" }
        );

      
        res.status(201).send({ success: true, accessToken });

      }
    );
  }

};
