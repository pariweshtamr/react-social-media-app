import Feed from '../../components/Feed/Feed'
import HomeRightbar from '../../components/Rightbar/HomeRightbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Topbar from '../../components/Topbar/Topbar'
import { autoLogin, fetchUserDetails } from '../../redux/User/UserAction'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'

import './home.css'

const Home = () => {
  const dispatch = useDispatch()

  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <HomeRightbar />
      </div>
    </>
  )
}

export default Home
