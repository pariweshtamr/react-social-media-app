import './rightbar.css'
import OnlineUsers from '../OnlineUsers/OnlineUsers'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFriends } from '../../redux/User/UserAction'

const Rightbar = () => {
  const dispatch = useDispatch()
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  const { user } = useSelector((state) => state.user)
  console.log(user)

  useEffect(() => {
    try {
      dispatch(fetchFriends(user._id))
    } catch (error) {
      console.log(error)
    }
  }, [dispatch, user._id])

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img className="birthdayImg" src="assets/gift.png" alt="" />
          <span className="birthdayText">
            <b>Divyesh Shrestha</b> and <b>2 other friends</b> have birthday
            today
          </span>
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {user.following.map((u) => (
            <OnlineUsers key={u._id} u={u} />
          ))}
        </ul>
      </>
    )
  }

  const ProfileRightbar = () => {
    return (
      <>
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
          <div className="rightbarFollowing">
            <img
              className="rightbarFollowingImg"
              src={`${PF}person/1.jpeg`}
              alt=""
            />
            <span className="rightbarFollowingName">Safak</span>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}

export default Rightbar
