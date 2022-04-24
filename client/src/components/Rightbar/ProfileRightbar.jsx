import './rightbar.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Add, Remove } from '@mui/icons-material'
import { followUser, unfollowUser } from '../../redux/User/UserSlice'

const ProfileRightbar = ({ user }) => {
  const [friends, setFriends] = useState([])
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const { user: currentUser } = useSelector((state) => state.user)
  const [followed, setFollowed] = useState(
    currentUser.following.includes(user?._id),
  )
  const dispatch = useDispatch()

  useEffect(() => {
    const getFriends = async () => {
      const friendsList = await axios.get('/users/friends/' + user._id)
      console.log(friendsList.data)
      setFriends(friendsList.data)
    }
    getFriends()
  }, [user])

  const handleOnClick = async () => {
    try {
      if (followed) {
        await axios.put('/users/' + user._id + '/unfollow', {
          userId: currentUser._id,
        })
        dispatch(unfollowUser(user._id))
      } else {
        await axios.put('/users/' + user._id + '/follow', {
          userId: currentUser._id,
        })
        dispatch(followUser(user._id))
      }
    } catch (error) {
      console.log(error)
    }
    setFollowed(!followed)
  }

  return (
    <>
      <div className="rightbar">
        <div className="rightbarWrapper">
          {user.username !== currentUser.username && (
            <button className="rightbarFollowButton" onClick={handleOnClick}>
              {followed ? 'Unfriend' : 'Add Friend'}
              {followed ? <Remove /> : <Add />}
            </button>
          )}
          <h4 className="rightbarTitle">User Information</h4>
          <div className="rightbarInfo">
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">City:</span>
              <span className="rightbarInfoValue">{user.city}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">From:</span>
              <span className="rightbarInfoValue">{user.from}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Relationship:</span>
              <span className="rightbarInfoValue">
                {user.relationship === 1
                  ? 'Single'
                  : user.relationship === 2
                  ? 'Married'
                  : 'In a relationship'}
              </span>
            </div>
          </div>

          <h4 className="rightbarTitle">User Friends</h4>
          <div className="rightbarFollowings">
            {friends.map((friend) => (
              <Link
                to={'/profile/' + friend.username}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="rightbarFollowing">
                  <img
                    className="rightbarFollowingImg"
                    src={
                      friend.profilePicture
                        ? PF + friend.profilePicture
                        : PF + 'person/noAvatar.png'
                    }
                    alt=""
                  />
                  <span className="rightbarFollowingName">
                    {friend.username}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileRightbar
