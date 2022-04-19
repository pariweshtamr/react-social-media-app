import './share.css'
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  ImagesearchRollerTwoTone,
} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useRef, useState } from 'react'
import axios from 'axios'

const Share = () => {
  const { user } = useSelector((state) => state.user)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const description = useRef()
  const [file, setFile] = useState(null)

  // const handleOnImageSelect = (e) => {
  //   const { files } = e.target

  //   setImages(files)
  // }

  const handleOnSubmit = async (e) => {
    e.preventDefault()

    const newPost = {
      userId: user._id,
      description: description.current.value,
    }

    if (file) {
      const data = new FormData()
      const fileName = Date.now() + file.name
      data.append('file', file)
      data.append('name', fileName)
      newPost.img = fileName

      console.log(data, file, newPost)

      try {
        await axios.post('/posts/upload', data)
      } catch (error) {
        console.log(error)
      }
    }

    try {
      await axios.post('/posts', newPost)
      // window.location.reload()
    } catch (error) {
      console.log(error)
    }
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
                onChange={(e) => setFile(e.target.files[0])}
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
