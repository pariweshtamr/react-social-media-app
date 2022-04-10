import { useEffect, useState } from 'react'
import Post from '../Post/Post'
import Share from '../Share/Share'
import axios from 'axios'
import './feed.css'

const Feed = ({ username }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = username
          ? await axios.get('/posts/profile/' + username)
          : await axios.get('/posts/timeline/62522131c954215d69533606')
        setPosts(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPosts()
  }, [username])
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
