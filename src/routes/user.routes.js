import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
const router = Router()

router.route("/register").post(  //upload.fields acts as middleware , it executes before registerUser
    upload.fields([             //can take multiple fields 
        {
            name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser
)

//http://localhost:8000/api/v1/users/register

export default router