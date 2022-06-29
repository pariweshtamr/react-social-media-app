import './post.css'
import { MoreVert } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getUserById } from '../../api/userAPI'

const Post = ({ post }) => {
  const [user, setUser] = useState({})
  const [like, setLike] = useState(post.likes.length)
  const [isLiked, setIsLiked] = useState(false)
  const { user: currentUser } = useSelector((state) => state.user)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  // check if the post has already been liked by the user
  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id))
  }, [currentUser._id, post.likes])

  // fetch user
  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserById(post.userId)
      setUser(data)
    }
    fetchUser()
  }, [post.userId])

  const likeHandler = () => {
    try {
      axios.put(`/posts/${post._id}/like`, { userId: currentUser._id })
    } catch (error) {}

    setLike(isLiked ? like - 1 : like + 1)
    setIsLiked(!isLiked)
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + 'person/noAvatar.png'
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.description}</span>
          <img className="postImg" src={PF + post.image} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              onClick={likeHandler}
              alt=""
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              onClick={likeHandler}
              alt=""
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">
              {post.comment} {post.comment > 1 ? 'comments' : 'comment'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Post
