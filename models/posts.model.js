import mongoose from "mongoose";
import {Schema} from 'mongoose';


var postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    context: {
        type: String,
        required: true
    }
});
const Post = mongoose.models?.Post ||  mongoose.model('Post',postSchema);
export default Post;