import "./App.css";
import "@ant-design/v5-patch-for-react-19";

import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <Outlet />
    </>
  );
}

export default App;
