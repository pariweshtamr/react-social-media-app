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
import { fetchUser } from './redux/User/UserAction'

function App() {
  const { isLoggedIn } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   user && dispatch(fetchUser())
  // }, [user, dispatch])
  return (
    <Router>
      <Routes>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/profile/:username" element={<Profile />}></Route>
        <Route
          path="/login"
          element={isLoggedIn ? <Navigate to="/" /> : <Login />}
        ></Route>
        <Route
          path="/register"
          element={isLoggedIn ? <Navigate to="/" /> : <Register />}
        ></Route>
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
