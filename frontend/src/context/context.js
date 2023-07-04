// // context.js
// import React, { createContext, useState } from 'react';

// export const TokenContext = createContext();

// export const TokenProvider = ({ children }) => {
//   const [token, setToken] = useState('');
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userEmail, setUserEmail] = useState('');

//   const updateToken = (newToken) => {
//     setToken(newToken);
//   };

//   const updateLoggedIn = (newLoggedIn) => {
//     setIsLoggedIn(newLoggedIn);
//   };

//   const updateEmail = (newEmail) => {
//     setUserEmail(newEmail);
//   };

//   const contextValue = {
//     token,
//     isLoggedIn,
//     userEmail,
//     updateToken,
//     updateLoggedIn,
//     updateEmail,
//   };

//   return (
//     <TokenContext.Provider value={contextValue}>
//       {children}
//     </TokenContext.Provider>
//   );
// };

// context.js
import React, { createContext, useState, useEffect } from 'react';

export const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
  const storedToken = localStorage.getItem('token');
  const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
  const storedUserEmail = localStorage.getItem('userEmail');

  const [token, setToken] = useState(storedToken || '');
  const [isLoggedIn, setIsLoggedIn] = useState(storedIsLoggedIn === 'true');
  const [userEmail, setUserEmail] = useState(storedUserEmail || '');

  const updateToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  const updateLoggedIn = (newLoggedIn) => {
    setIsLoggedIn(newLoggedIn);
    localStorage.setItem('isLoggedIn', newLoggedIn);
  };

  const updateEmail = (newEmail) => {
    setUserEmail(newEmail);
    localStorage.setItem('userEmail', newEmail);
  };

  useEffect(() => {
    if (!storedToken) {
      localStorage.removeItem('token');
    }
    if (storedIsLoggedIn !== 'true') {
      localStorage.removeItem('isLoggedIn');
    }
    if (!storedUserEmail) {
      localStorage.removeItem('userEmail');
    }
  }, []);

  const contextValue = {
    token,
    isLoggedIn,
    userEmail,
    updateToken,
    updateLoggedIn,
    updateEmail,
  };

  return (
    <TokenContext.Provider value={contextValue}>
      {children}
    </TokenContext.Provider>
  );
};
