import Feed from '../../components/Feed/Feed'
import HomeRightbar from '../../components/Rightbar/HomeRightbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import Topbar from '../../components/Topbar/Topbar'

import './home.css'

const Home = () => {
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
