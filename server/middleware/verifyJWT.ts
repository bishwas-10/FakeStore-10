import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

export const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader =
    req.headers.authorization || (req.headers.Authorization as string);
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  console.log(token);
  jwt.verify(
    token,
    process.env.TOKEN_KEY as string,
    { complete: true },
    async (error: VerifyErrors | null, decoded: JwtPayload | undefined) => {
      if (error) return res.sendStatus(403);
      if (decoded) {
        req.body.username = decoded.payload.username;
        req.body.roles = decoded.payload.roles;
        next();
      } //invalid token
    }
  );
};
