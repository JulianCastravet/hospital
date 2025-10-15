import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { SignUp } from './pages/Signup';
import { SignIn } from './pages/Signin';
import { Homepage } from './pages/Homepage';
import { Dashboard } from './pages/Dashboard';
import { AuthProvider } from './context/authContext';
import { ProtectedRoute } from './components/protected/protectedRoute';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthProvider>
    <BrowserRouter>
    <Routes>
    <Route path='/sign-up' Component={SignUp} />
    <Route path='/sign-in' Component={SignIn}  />
    <Route path='/'  Component={Homepage}  />
    {<Route path='/dashboard' element={<ProtectedRoute>
      <Dashboard/>
    </ProtectedRoute>}/>}
    </Routes>
    </BrowserRouter>
    </AuthProvider>
    
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
