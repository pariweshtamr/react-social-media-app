import './share.css'
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useRef, useState } from 'react'
import { createPostAction } from '../../redux/Posts/PostAction'

const Share = () => {
  const { user } = useSelector((state) => state.user)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const description = useRef()
  const dispatch = useDispatch()
  const [images, setImages] = useState(null)

  const handleOnImageSelect = (e) => {
    const data = e.target.files
    setImages(data)
  }
  console.log(images)

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    const newPost = {
      userId: user._id,
      description: description.current.value,
    }

    if (images) {
      const userId = user._id
      const desc = description.current.value

      const data = new FormData()

      data.append('userId', userId)
      data.append('description', desc)
      images.length && [...images].map((img) => data.append('images', img))

      try {
        dispatch(createPostAction(data))
      } catch (error) {
        console.log(error)
      }
    } else {
      try {
        dispatch(createPostAction(newPost))
      } catch (error) {
        console.log(error)
      }
    }

    window.location.reload()
  }

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + 'person/noAvatar.png'
            }
            alt=""
          />
          <input
            placeholder={"What's in your mind " + user.username + '?'}
            className="shareInput"
            ref={description}
          />
        </div>
        <hr className="shareHr" />
        {images && (
          <div className="shareImgContainer">
            b
            {/* URL.createObjectURL allows us to create some pseudo url to see our file before uploading*/}
            <img src={''} className="shareImg" alt="" />
            <Cancel
              className="shareCancelImg"
              onClick={() => setImages(null)}
            />
          </div>
        )}
        <form className="shareBottom" onSubmit={handleOnSubmit}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: 'none' }}
                type="file"
                id="file"
                multiple
                accept="image/*"
                onChange={handleOnImageSelect}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>

          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  )
}

export default Share
