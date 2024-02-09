import { Request, Response } from "express";
import User from "../models/users";
import jwt, {  JwtPayload } from "jsonwebtoken";

export const refreshDummmy = async(req:Request,res:Response)=>{
    const cookies = req.cookies;
    const refreshToken = cookies?.jwt;
    console.log(refreshToken);
   // res.clearCookie('jwt');
    res
    .clearCookie("jwt")
    .status(200)
    .send({ success: true, message: "signout succesfull",refreshToken });
   }
    // if(refreshToken){
    //     const foundUser =  await User.findOne({refreshToken}).exec();
    //     if(!foundUser){
    //         jwt.verify(
    //             refreshToken,
    //             process.env.REFRESH_TOKEN_KEY as string,
    //             { complete: true },
    //             async (
    //               error: jwt.VerifyErrors | null,
    //               decoded: JwtPayload | undefined
    //             ) => {
    //               if (error)
    //                 return res
    //                   .status(403)
    //                   .send({ success: false, message: "refresh token invalid" }); //Forbidden
    //               console.log("attempted refresh token reuse!");
    //               const hackedUser = await User.findOne({
    //                 username: decoded?.payload.username,
    //               }).exec();
          
    //               if (hackedUser) {
    //                 hackedUser.refreshToken = [];
    //                 const result = await hackedUser.save();
    //                 console.log(result);
    //                 return res.sendStatus(403);
    //               }
    //             }
    //           );
    //     }else{
    //         const newRefreshTokenArray = foundUser.refreshToken.filter(
    //             (rt) => rt !== refreshToken
    //           );
    //           jwt.verify(
    //             refreshToken,
    //             process.env.REFRESH_TOKEN_KEY as string,
    //             { complete: true },
    //             async (
    //               error: jwt.VerifyErrors | null,
    //               decoded: JwtPayload | undefined
    //             ) => {
    //                 if(error){
                    
    //                     foundUser.refreshToken = [...newRefreshTokenArray];
    //                     const result = await foundUser.save();
                       
    //                 }else{
    //                     const roles = Object.values(foundUser.roles);
    //                     const accessToken = jwt.sign(
    //                       {
    //                         UserInfo: {
    //                           username: decoded?.payload.username,
    //                           roles: roles,
    //                         },
    //                       },
    //                       process.env.TOKEN_KEY as string,
    //                       { expiresIn: "1m" }
    //                     );
    //                     const newRefreshToken = jwt.sign(
    //                         { username: foundUser.username },
    //                         process.env.REFRESH_TOKEN_KEY as string,
    //                         { expiresIn: "1d" }
    //                       );
    //                       foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    //                       const result = await foundUser.save();
    //                       console.log("yo ho",result)
    //                       res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });

    //                     //   res.cookie("jwt", newRefreshToken, {
    //                     //     httpOnly: true,
    //                     //     secure: true,
    //                     //     sameSite: "none",
    //                     //     maxAge: 24 * 60 * 60 * 1000,
    //                     //   })
    //                   //  res.status(203).send({message:"success",result})
    //                     }
    //                 if (error || foundUser?.username !== decoded?.payload.username)
    //                 return res.sendStatus(403);
    //         }
    //           )
    //     }
    // }else{
    //     res.status(401).send({success:false,message:"refresh token not available"});
    // }
//}