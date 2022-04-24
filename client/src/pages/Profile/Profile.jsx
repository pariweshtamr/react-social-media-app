import './profile.css'
import Feed from '../../components/Feed/Feed'
import ProfileRightbar from '../../components/Rightbar/ProfileRightbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Topbar from '../../components/Topbar/Topbar'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchUserByUsername } from '../../redux/User/UserAction'
import { useDispatch, useSelector } from 'react-redux'
import { getUserByUsername } from '../../api/userAPI'

const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const dispatch = useDispatch()
  const [user, setUser] = useState({})
  const { username } = useParams()

  useEffect(() => {
    const fetchUser = async () => {
      const data = await getUserByUsername(username)
      setUser(data)
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
                src={
                  user.coverPicture
                    ? PF + user.coverPicture
                    : PF + 'person/noAvatar.png'
                }
                alt=""
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + 'person/noAvatar.png'
                }
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
            <ProfileRightbar user={user} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
