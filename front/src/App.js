import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import ForgotPassword from "./pages/forgot/ForgotPassword";
import AboutUs from "./pages/About/AboutUs";
import ContactUs from "./pages/contact/ContactUs";
import Register from "./pages/register/Register";
import PaymentPage from "./pages/payment/PaymentPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword/>}/>
        <Route path="about" element={<AboutUs />}/>
        <Route path="contact" element={<ContactUs />} />
        <Route path="/payment" element={<PaymentPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
