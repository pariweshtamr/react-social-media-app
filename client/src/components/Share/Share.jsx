import './share.css'
import { PermMedia, Label, Room, EmojiEmotions } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useRef, useState } from 'react'
import {
  createPostAction,
  createPostWithImgAction,
} from '../../redux/Posts/PostAction'

const Share = () => {
  const { user } = useSelector((state) => state.user)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const description = useRef()
  const dispatch = useDispatch()
  const [images, setImages] = useState([])

  const handleOnImageSelect = (e) => {
    const { files } = e.target

    setImages(files)
  }

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

      // data.append('images', file)

      try {
        dispatch(createPostWithImgAction(data))
      } catch (error) {
        console.log(error)
      }
    }
    // } else {
    //   try {
    //     dispatch(createPostAction(newPost))
    //     // window.location.reload()
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
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
