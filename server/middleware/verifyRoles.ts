import { NextFunction, Request, Response } from "express";

export const verifyRoles = (...allowedRoles:number[]) => {
    return (req:Request, res:Response, next:NextFunction) => {
      console.log(req.body.roles)
        if (!req.body.roles) return res.status(401).send({success:false,message:"no roles available"});
        const rolesArray = [...allowedRoles];
        console.log(rolesArray)
        const result = req.body.roles.map((role:number) => rolesArray.includes(role)).find((val:Boolean) => val === true);
       console.log(result)
        if (!result) return res.status(401).send({success:false,message:"you are not authorized"});
        next();
    }
}

