import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Contact from './Components/Contact';
import About from './Components/About';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Notestate from './Context/Notes/Notestate';
import Alert from './Components/Alert';
import Signup from './Components/Signup';
import Login from './Components/Login';
import {useState} from 'react'
import Getstarted from './Components/Getstarted';


function App() {
   // Logic to alert the notes & signup/login
   const [alert,setalert] = useState(null)
   let showAlert = (message,type)=>(
     setalert({
     msg : message,
     type : type 
     })
   )
     setTimeout(() => {
       setalert (null);
     },1500);

  return (
    <>
    <Notestate>
    <BrowserRouter>
    <Navbar/>
    <Alert alert={alert}/>
    <Routes>
    <Route exact path= '/' element= {<Getstarted/>}></Route>
    <Route exact path= '/about' element= {<About/>}></Route>
    <Route exact path= '/contact' element= {<Contact/>}></Route>
    <Route exact path= '/notes' element= {<Home showAlert={showAlert}/>}></Route>
    <Route exact path= '/signup' element= {<Signup showAlert={showAlert}/>}></Route>
    <Route exact path= '/login' element= {<Login showAlert={showAlert}/>}></Route>
    </Routes>
    </BrowserRouter>
    </Notestate>
    </>
  );
}

export default App;
