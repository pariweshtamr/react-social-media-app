import { useEffect } from 'react'
import Post from '../Post/Post'
import Share from '../Share/Share'
import { useDispatch, useSelector } from 'react-redux'
import './feed.css'
import {
  fetchAllUserPosts,
  fetchTimelinePosts,
} from '../../redux/Posts/PostAction'

const Feed = ({ username }) => {
  const dispatch = useDispatch()
  const { isLoading, posts, error } = useSelector((state) => state.posts || [])
  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    if (username) {
      dispatch(fetchAllUserPosts(username))
    } else {
      dispatch(fetchTimelinePosts(user._id))
    }
  }, [dispatch, username, user._id])

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Feed
