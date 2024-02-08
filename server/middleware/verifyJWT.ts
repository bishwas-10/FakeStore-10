import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader =
    req.headers.authorization || (req.headers.Authorization as string);

  if (!authHeader?.startsWith("Bearer ")) return res.status(403).send({success:false,message:"no auth header"});

  const token = authHeader.split(" ")[1];
  jwt.verify(
    token,
    process.env.TOKEN_KEY as string,
    { complete: true },
    async (error: VerifyErrors | null, decoded: JwtPayload | undefined) => {
      if (error) return res.status(403).send({success:false,message:error.message});
      if (decoded) {
        req.body.username = decoded.payload.UserInfo.username;
        req.body.roles = decoded.payload.UserInfo.roles;
        console.log("done")
        next();
      } //invalid token
    }
  );
};
