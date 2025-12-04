import "./App.css";
import "@ant-design/v5-patch-for-react-19";

import { Route, Routes } from "react-router-dom";
import { Appointments } from "./dashboardPages/appointments/appointments";
import { Help } from "./dashboardPages/help/help";
import { Medications } from "./dashboardPages/medications/medications";
import { Messages } from "./dashboardPages/messages/messages";
import { Overview } from "./dashboardPages/overview/overview";
import PatientPage from "./dashboardPages/patientPage/patientPage";
import { Patients } from "./dashboardPages/patients/patients";
import { ProtectedRoute } from "./components/protected/protectedRoute";
import { Reports } from "./dashboardPages/reports/reports";
import { Schedule } from "./dashboardPages/schedule/schedule";
import { Settings } from "./dashboardPages/settings/settings";
import { Dashboard } from "./pages/Dashboard";
import { Homepage } from "./pages/Homepage";
import { SignIn } from "./pages/Signin";
import { SignUp } from "./pages/Signup";

function App() {
  return (
    <Routes>
      <Route path="/sign-up" Component={SignUp} />
      <Route path="/sign-in" Component={SignIn} />
      <Route path="/" Component={Homepage} />
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      >
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
  );
}

export default App;
