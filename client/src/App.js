import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Header from "./components/Header";
import Login from "./pages/Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}>
            Home Page
          </Route>
          <Route path="/register" element={<Register />}>
            Register Page
          </Route>
          <Route path="/login" element={<Login />}>
            Login Page
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
