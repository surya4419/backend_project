import mongoose ,{Schema} from 'mongoose';

const playListSchema = new Schema(
    {
        name:{
            type:String,
            required:true
        },
        description: {
            trpe: String,
            required: true
        },
        videos:[   //array
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
    },
    {timestamps:true})

    export const Playlist = mongoose.model("Playlist", playListSchema)