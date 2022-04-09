import Post from '../Post/Post'
import Share from '../Share/Share'
import './feed.css'
import { Posts } from '../../data'

const Feed = () => {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {Posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}

export default Feed
