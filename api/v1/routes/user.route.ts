import express, { Router } from "express";
import * as controller from "../controller/user.controller";

const route: Router = express.Router();

route.post("/register", controller.register);

export const userRoute: Router = route;