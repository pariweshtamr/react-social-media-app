import mongoose from 'mongoose'
const Schema = mongoose.Schema

const PostSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      max: 500,
    },
    img: {
      type: Array,
    },
    likes: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  },
)

const Post = mongoose.model('Post', PostSchema)

export default Post
