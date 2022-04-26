import './rightbar.css'
import OnlineUsers from '../OnlineUsers/OnlineUsers'
import { useSelector } from 'react-redux'

const HomeRightbar = () => {
  const { user } = useSelector((state) => state.user)

  return (
    <>
      <div className="rightbar">
        <div className="rightbarWrapper">
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
              <OnlineUsers key={u._id} user={u} />
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}

export default HomeRightbar
