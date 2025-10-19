import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { SignUp } from './pages/Signup';
import { SignIn } from './pages/Signin';
import { Homepage } from './pages/Homepage';
import { Dashboard } from './pages/Dashboard';
import { AuthProvider } from './context/authContext';
import { ProtectedRoute } from './components/protected/protectedRoute';
import { Appointments } from './components/appointments/appointments';
import { Overview } from './components/overview/overview';
import { Patients } from './components/patients/patients';
import { Schedule } from './components/schedule/schedule';
import { Reports } from './components/reports/reports';
import { Messages } from './components/messages/messages';
import { Medications } from './components/medications/medications';
import { Help } from './components/help/help';
import { Settings } from './components/settings/settings';
import PatientPage from './components/patientPage/patientPage';

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
 <Route
  path="/dashboard/*"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
>
  {/* <Route index element={<Navigate to="overview" replace />} /> */}
  <Route path="overview" Component={Overview} />
  <Route path="appointments" Component={Appointments} />
  <Route path="patients" Component={Patients} />
  <Route path="patients/:id" Component={PatientPage} />
  <Route path="schedule" Component={Schedule} />
  <Route path="reports" Component={Reports} />
  <Route path="messages" Component={Messages} />
  <Route path="medications" Component={Medications} />
  <Route path="help" Component={Help} />
  <Route path="settings" Component={Settings} />
</Route>
    </Routes>
    </BrowserRouter>
    </AuthProvider>
    
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
