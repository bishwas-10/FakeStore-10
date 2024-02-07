import { Request, Response } from "express";
import User from "../models/users";
import jwt, { JwtPayload } from "jsonwebtoken";
require("dotenv").config();

export const handleRefreshToken = async (req:Request, res:Response) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).send({success:false,message:"no token available"});
    const refreshToken = cookies.jwt;
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });

    const foundUser = await User.findOne({ refreshToken }).exec();

    // Detected refresh token reuse!
    if (!foundUser) {
        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_KEY as string,
            { complete: true },
            async (error: jwt.VerifyErrors | null, decoded: JwtPayload | undefined) => {
                if (error) return res.sendStatus(403); //Forbidden
                console.log('attempted refresh token reuse!')
                const hackedUser = await User.findOne({ username: decoded?.payload.UserInfo.username }).exec();
               
               if(hackedUser){
                 hackedUser.refreshToken = [];
                const result = await hackedUser.save();
                console.log(result);   return res.sendStatus(403);
               }
            }
        )
     
    }else{
        const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);
     jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_KEY as string,
        { complete: true },
        async (error: jwt.VerifyErrors | null, decoded: JwtPayload | undefined) => {
            if (error) {
                console.log('expired refresh token')
                foundUser.refreshToken = [...newRefreshTokenArray];
                const result = await foundUser.save();
                console.log(result);
            }
            if (error || foundUser.username !== decoded?.payload.UserInfo.username) return res.sendStatus(403);

            // Refresh token was still valid
            const roles = Object.values(foundUser.roles);
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": decoded?.payload.UserInfo.username,
                        "roles": roles
                    }
                },
                process.env.TOKEN_KEY as string,
                { expiresIn: '1m' }
            );

            const newRefreshToken = jwt.sign(
                { "username": foundUser.username },
                process.env.REFRESH_TOKEN_KEY as string,
                { expiresIn: '1d' }
            );
            // Saving refreshToken with current user
            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            const result = await foundUser.save();

            // Creates Secure Cookie with refresh token
            res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });

            res.json({ roles, accessToken })
        }
    );}



 

   

    // evaluate jwt 
   
}

