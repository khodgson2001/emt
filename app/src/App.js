//import components which require routes or are displayed using app.js 
import TopBar from './components/TopBar';
import SideNav from './components/SideNav';
import Dashboard from './components/Dashboard';
import AllStudies from './components/AllStudies';
import Study from './components/Study';
import NewStudy from './components/NewStudy';
import InformationPackCheclist from './components/InfoPackCL';
import IRASReview from './components/IRASReview';
import UploadFile from './components/UploadFile';
import Researchers from './components/Researchers';
import NewResearcher from './components/NewResearcher';
import Login from './components/Login';


import { Container } from 'react-bootstrap';
import { Routes, Route, useNavigate  } from "react-router-dom";
import { useState } from 'react';


import './App.css';


function App() {
  const [authenticated, setAuthenticated] = useState(false); // boolean to check if the user is authenticated - updated by the login component
  const navigate = useNavigate(); // used to navigate between pages
  
  return (
    <div className="App">
      <TopBar authenticated={authenticated} handleAuthenticated={setAuthenticated}  navigate={navigate}/>
      <div style={{ display: 'flex' }}>
        <SideNav />
        <Container id='PageContent'>
          <br/>
          <Routes>
            <Route path="/Dashboard" element={<Dashboard authenticated={authenticated}  navigate={navigate}/>} />
            <Route path="/" element={<Dashboard authenticated={authenticated} navigate={navigate}/>} />
            <Route path="/studies" element={<AllStudies authenticated={authenticated} navigate={navigate}/>} />
            <Route path="/study" element={<Study authenticated={authenticated} navigate={navigate}/>} />
            <Route path="/newstudy" element={<NewStudy authenticated={authenticated} navigate={navigate}/>} />
            <Route path="/infoPackCL" element={<InformationPackCheclist authenticated={authenticated} navigate={navigate}/>} />
            <Route path="/irasReview" element={<IRASReview authenticated={authenticated} navigate={navigate}/>} />
            <Route path="/upload" element={<UploadFile authenticated={authenticated} navigate={navigate}/>} />
            <Route path='/researcher' element={<Researchers authenticated={authenticated} navigate={navigate}/>} />
            <Route path='/researcher/new' element={<NewResearcher authenticated={authenticated} navigate={navigate}/>} />
            <Route path='/login' element={<Login authenticated={authenticated} handleAuthenticated={setAuthenticated} navigate={navigate}/>} />

          </Routes>
        </Container>
      </div>
    </div>
  );
}

export default App;
