import express, { Router } from "express";
import * as controller from "../controller/user.controller";
import * as authMiddlerware from "../middlerware/auth.middlerware";

const route: Router = express.Router();

route.post("/register", controller.register);

route.post("/login", controller.login);

route.get("/detail", authMiddlerware.auth, controller.detail);

export const userRoute: Router = route;