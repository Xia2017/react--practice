import {Schema,model,models} from 'mongoose';


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

const Post = models.Post || model('Post',postSchema);
export default Post;