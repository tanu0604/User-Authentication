import React from "react";
import RegistrationForm from "./components/RegistrationForm";
import Navigation from "./components/Navigation";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import UpdateForm from "./components/UpdateForm";
import ForgotPassword from "./components/ForgotPassword";
import PrivateRoute from "./Route/PrivateRoute";
function App() {
  return (
    <Router>
      <Navigation></Navigation>
      <Routes>
        <Route path="/login" element={<LoginForm />}></Route>
        <Route path="/signup" element={<RegistrationForm />}></Route>

        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/update" element={<UpdateForm />}></Route>
          <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;
