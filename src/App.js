import './App.css';
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Home } from './Home';
import { Reset } from './Reset';
import { Signup } from './Signup';
import { useEffect, useState } from 'react';
import { Update } from '@mui/icons-material';
import { UpdatePassword } from './UpdatePassword';
import ContextTest from './Context';

function App() {
  return (
    <div className="App">
      {/* <Routes>
        <Route path="/" element={<Home />} />
      </Routes> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/updatepassword" element={<UpdatePassword />} />
          <Route path="/content" element={<Product>
            <Content />
          </Product>} />

          <Route path="/context" element={<ContextTest />} />



        </Routes>
      </BrowserRouter>
    </div >
  );
}
function Content() {
  let [data, setdata] = useState([]);
  let navigate = useNavigate()
  let getdata = async () => {
    let data = await fetch("http://localhost:4020/mobiles", {
      headers: {
        "auth-token": localStorage.getItem("token")
      }
    })

    if (data.status === 401) {
      navigate("/")

    }

  }
  useEffect(() => getdata, [])
  return (
    <div className="cont">
      This is login page
    </div>
  )
}
function Product({ children }) {
  let token = localStorage.getItem("token")
  console.log();
  return (
    <div>
      {token ? children : null}

    </div>
  )
}

export default App;
