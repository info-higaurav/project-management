import { BrowserRouter as Router , Routes , Route} from "react-router"
import Home from "./pages/home"
import Login from "./pages/login"
import Signup from "./pages/signup"
import Dashboard from "./pages/dashboard"
export default function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
  )
}