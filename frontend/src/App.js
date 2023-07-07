import './App.css';
import { Home } from './MyComponents/Home/Home';
import { Header } from './MyComponents/Header/Header';
import { LoggedInHeader } from './MyComponents/Header/LoggedInHeader';
import { About } from './MyComponents/About';
import { Footer } from './MyComponents/Footer';
import { SignIn } from './MyComponents/SignIn/SignIn';
import { SignUp } from './MyComponents/SignUp/SignUp';
import { Welcome } from './MyComponents/user/Welcome';

import { UserTestProfile } from './MyComponents/UserTestProfile';
import { UserProfile } from './MyComponents/user/UserProfile';

import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { TokenProvider, TokenContext } from './context/context';


function App() {

  const { isLoggedIn } = useContext(TokenContext);

  const  [first, setfirst] = useState(second)


  return (
    
    <Router>
      {isLoggedIn ? <LoggedInHeader /> : <Header />}
      {/* <Header/> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* <Route path="/profile" element={<UserTestProfile />} /> */}
        <Route path="/user/sign-in" element={<SignIn />}  />
        <Route path="/user/sign-up" element={<SignUp />} />
        <Route path="/user/home" element={<Welcome />} />
        <Route path="/user/profile" element={<UserProfile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

function AppWrapper() {
  return (
    <TokenProvider>
      <App />
    </TokenProvider>
  );
}

export default AppWrapper;
