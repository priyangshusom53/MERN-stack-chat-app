import express, {Router, type Request, type Response} from "express"
import type { SignupWebController } from "../features/auth/signup.js"
import type { LoginWebController } from "../features/auth/login.js"
import type { AuthUserWebController } from "../features/auth/authUser.js"
import type { AuthMiddleware } from "../middlewares/authMiddleware.js"

export function addSignupRoute(router:express.Router, subroute:string, controller: SignupWebController){
   router.post(
      subroute,
      controller.signup.bind(controller)
   )
}

export function addLoginRoute(router:express.Router, subroute:string, controller: LoginWebController){
   router.post(
      subroute,
      controller.login.bind(controller)
   )
}

export function addAuthUserRoute(
   router:express.Router, 
   subroute:string, 
   controller: AuthUserWebController,
   authMiddleware: AuthMiddleware
){
   router.get(
      subroute,
      authMiddleware.handle.bind(authMiddleware),
      controller.getUser.bind(controller)
   )
}