import { useEffect, useState } from 'react'
import Post from '../Post/Post'
import Share from '../Share/Share'
import { useSelector } from 'react-redux'
import './feed.css'
import { getAllUserPosts, getTimelinePosts } from '../../api/postAPI'

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([])
  const { user } = useSelector((state) => state.user)

  useEffect(() => {
    const fetchPosts = async () => {
      const data = username
        ? await getAllUserPosts(username)
        : await getTimelinePosts(user._id)

      setPosts(
        data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt)
        }),
      )
    }
    fetchPosts()
  }, [username, user._id])

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
