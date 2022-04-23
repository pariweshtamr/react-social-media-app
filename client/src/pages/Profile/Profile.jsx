import './profile.css'
import Feed from '../../components/Feed/Feed'
import Rightbar from '../../components/Rightbar/Rightbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Topbar from '../../components/Topbar/Topbar'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserByUsername } from '../../redux/User/UserAction'
import { useParams } from 'react-router-dom'

const Profile = () => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const dispatch = useDispatch()
  const { username } = useParams()

  const { user, isLoading, error } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(fetchUserByUsername(username))
  }, [dispatch, username])

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
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
