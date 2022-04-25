import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Profile from './pages/Profile/Profile'
import Register from './pages/Register/Register'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { autoLogin, fetchUserDetails } from './redux/User/UserAction'
import { loginAuto } from './redux/User/UserSlice'

function App() {
  const dispatch = useDispatch()
  const { user, isLoggedIn } = useSelector((state) => state.user)
  useEffect(() => {
    !user && dispatch(fetchUserDetails())
    !isLoggedIn && dispatch(autoLogin())
  }, [user, isLoggedIn, dispatch])
  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/profile/:username" element={<Profile />}></Route>

        <Route path="/register" element={<Register />}></Route>
        <Route
          path="/"
          exact
          element={isLoggedIn ? <Home /> : <Login />}
        ></Route>
      </Routes>
    </Router>
  )
}

export default App
