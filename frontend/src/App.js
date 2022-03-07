import {BrowserRouter as Router,Route,Routes,} from "react-router-dom";
import Home from "./comps/Home";
import Navbar from "./comps/Navbar";
import Login from "./comps/Login";
import Favs from "./comps/Favs";
import Register from "./comps/Register";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
          <Navbar />
          
          <h1  style={{ marginLeft: "35%", fontSize: '25px' ,fontWeight: "bold"}} >Welcome To pokis Website .. use the navbar to make actions</h1>
          
          <Routes>

            <Route path="Home" element={<Home />} />
            <Route path="Favs" element={<Favs />} />
            <Route path="Login" element={<Login />} />
            <Route path="Register" element={<Register />} />

          </Routes>
        </Router>
  );
}

export default App;
