import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import List from "./pages/list/List";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, reservationColumns, roomColumns, userColumns } from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";
import Register from "./pages/register/Register";
import ForgotPassword from "./pages/forgot/ForgotPassword";
import Earnings from "./pages/Earnings/Earnings";
import UserView from "./pages/view/UserView";
import HotelView from "./pages/view/HotelView";
import RoomView from "./pages/view/RoomView";
import ReservationView from "./pages/view/ReservationView";

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({children}) => {
    const { user } = useContext(AuthContext)

    if(!user) {
      return <Navigate to="/login" />
    }

    return children
  }

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
              <Route path="login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot" element={<ForgotPassword/>}/>
            <Route index element={
              <ProtectedRoute>
              <Home />
              </ProtectedRoute>
              } />
            <Route path="users">
              <Route index element={<ProtectedRoute>
                <List columns={userColumns}/>
                </ProtectedRoute>} />
              <Route path=":userId" element={<ProtectedRoute><UserView /></ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute><New inputs={userInputs} title="Add New User" /></ProtectedRoute>}
              />
            </Route>
            <Route path="hotels">
              <Route index element={<ProtectedRoute><List columns={hotelColumns}/></ProtectedRoute>} />
              <Route path=":hotelId" element={<ProtectedRoute><HotelView /></ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute><NewHotel /></ProtectedRoute>}
              />
            </Route>

            <Route path="rooms">
              <Route index element={<ProtectedRoute><List columns={roomColumns}/></ProtectedRoute>} />
              <Route path=":roomId" element={<ProtectedRoute><RoomView /></ProtectedRoute>} />
              <Route
                path="new"
                element={<ProtectedRoute><NewRoom /></ProtectedRoute>}
              />
            </Route>

            <Route path="reservations">
            <Route index element={<ProtectedRoute><List columns={reservationColumns}/></ProtectedRoute>} />
            <Route path=":reservationId" element={<ProtectedRoute><ReservationView /></ProtectedRoute>} />
              
            </Route>
            <Route path="earnings" element={
            <ProtectedRoute>
              <Earnings />
            </ProtectedRoute>
          } />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
