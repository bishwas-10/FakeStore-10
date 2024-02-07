import express from "express";
import {logIn, signOut, signUp } from "../controller/auth";
import { handleRefreshToken } from "../controller/refreshToken";



const router = express.Router();

router.post('/login',logIn);
router.post('/signup',signUp);

router.get('/signout',signOut);
// router.get("/", authUser, getUser);
router.get('/refresh',handleRefreshToken);

export default router;