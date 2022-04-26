import './onlineUsers.css'

const OnlineUsers = ({ user }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  console.log(user)

  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img
          className="rightbarProfileImg"
          src={PF + user?.profilePicture}
          alt=""
        />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{user.username}</span>
    </li>
  )
}

export default OnlineUsers
