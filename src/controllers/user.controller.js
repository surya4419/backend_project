import {asyncHandler} from '../utils/asyncHandler.js'
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from '../utils/ApiResponse.js'

const registerUser = asyncHandler(async (req,res)=>{
     //get user details from frontend
     //validation - not empty
     //check if user already exits: username , email
     //check for images, check for avatar
     //upload them to cloudinary, check avatar uploaded or not
     //create user object - create entry in  db
     //remove password and refresh token field from response
     //check for user creation
     //return res


     const {fullName, email, username, password } = req.body
     console.log("email: ",email);

     if (
          [fullName, email, username, password].some((field)=>{
               field?.trim() === ""
          })
     ){
          throw new ApiError(400, "All fields are required")
     }

     //User can directly communicate with db as it is made with mongooseSchema
     const existedUser = User.findOne({
          $or:[{ username }, {email }]

      })

      if (existedUser) {
          throw new ApiError(409, "user with email or username already exists")
      }
     console.log(existedUser)
     console.log(req.body)
     console.log(req.files)
     //multer gives access to req.files
     const avatarLocalPath = req.files?.avatar[0]?.path;
     const coverImageLocalPath = req.files?.coverImage[0]?.path

     if(!avatarLocalPath){
          throw new ApiError(400, "Avatar file is required")
     }

     const avatar = await uploadOnCloudinary(avatarLocalPath)
     const coverImage = await uploadOnCloudinary(coverImageLocalPath)
     
     if(!avatar) {
          throw new ApiError(400, "Avatar file is required")
     }

     const user = User.create({
          fullName,
          coverImage:coverImage?.url || "", //not mandatory
          email,
          password,
          username: username.toLowerCase()

     })

     const createdUser = await User.findById(user._id).select(
          "-password -refreshToken"
     )

     if(!createdUser){
          throw new ApiError(500, "something went error while registering the user")
     }

     return res.status(201).json(
          new ApiResponse(200, createdUser, "user registered Successfully")
     )



})



export {registerUser,}