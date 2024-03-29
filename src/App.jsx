import { BrowserRouter, Route, Routes } from "react-router-dom"
import MenuBar from "./components/Menubar"
import NavBar from "./components/NavBar"
import "./index.css"
import Home from "./pages/Home"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import UploadVideo from "./pages/UploadVideo"
import Search from "./pages/Search"
import Profile from "./pages/Profile"
import ChangeProfile from "./components/ChangeProfile"
import Libary from "./pages/Libary"
import Video2 from "./pages/Video2"

export default function App() {
  
  return (
    <>
      <BrowserRouter>
        <div className="flex">
          <MenuBar />
          <div className="flex-7 bg-[#202020ec]"  >
            <NavBar />
            <Routes >
              <Route path="/">
                <Route index element={<Home type="random" />} />
                <Route path="trends" element={<Home type="trend" />} />
                <Route path="subscriptions" element={<Home type="sub" />} />
                <Route path="search" element={<Search />} />
                <Route path="video">
                  <Route path=":id" element={<Video2 />} />
                </Route>
                <Route path="register" element={<Signup />} />
                <Route path="login" element={<Login />} />
                <Route path="addVideo" element={<UploadVideo />} />
                <Route path="profile" element={<Profile />} />
                <Route path="change-profile" element={<ChangeProfile />} />
                <Route path="libary" element={<Libary />} />
              </Route>
            </Routes>
          </div>
        </div>

      </BrowserRouter>
    </>
  )
}
