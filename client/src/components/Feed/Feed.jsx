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

  useEffect(() => {
    if (username) {
      dispatch(fetchAllUserPosts(username))
    } else {
      dispatch(fetchTimelinePosts())
    }
  }, [dispatch, username])
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Feed
