import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Dashboard from "./pages/Dashboard";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Menu from "./components/Menu";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route element={<AdminRoute />}>
          <Route path="/dashboard" element={<Dashboard/>} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
