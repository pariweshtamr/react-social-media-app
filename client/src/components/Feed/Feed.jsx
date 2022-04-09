import Post from '../Post/Post'
import Share from '../Share/Share'
import './feed.css'

const Feed = () => {
  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        <Post />
      </div>
    </div>
  )
}

export default Feed
