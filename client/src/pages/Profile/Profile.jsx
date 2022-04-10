import './profile.css'
import Feed from '../../components/Feed/Feed'
import Rightbar from '../../components/Rightbar/Rightbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Topbar from '../../components/Topbar/Topbar'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'

const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const [user, setUser] = useState({})
  const { username } = useParams()
  console.log(username)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/users?username=${username}`)
        setUser(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  }, [username])

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.coverPicture || PF + 'person/noAvatar.png'}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture || PF + 'person/noAvatar.png'}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.description}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
