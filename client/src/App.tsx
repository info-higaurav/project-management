import { BrowserRouter as Router , Routes , Route, BrowserRouter } from "react-router"
import Home from "./pages/home"
import Login from "./pages/login"
import Signup from "./pages/signup"
export default function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
      </Routes>
    </BrowserRouter>
  )
}