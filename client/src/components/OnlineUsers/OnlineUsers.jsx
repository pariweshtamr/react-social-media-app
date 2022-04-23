import './onlineUsers.css'

const OnlineUsers = ({ u }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  console.log(u)

  return (
    <li className="rightbarFriend">
      <div className="rightbarProfileImgContainer">
        <img
          className="rightbarProfileImg"
          src={PF + u.profilePicture}
          alt=""
        />
        <span className="rightbarOnline"></span>
      </div>
      <span className="rightbarUsername">{u.username}</span>
    </li>
  )
}

export default OnlineUsers
