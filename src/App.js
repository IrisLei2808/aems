import { useEffect } from "react";

import './App.css';
import './asset/css/portal-react.css';
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import PortalRoute, {getRoutes} from './routes/portal-route';
//Layouts
import SignIn, {RequireAuth} from './layouts/sign-in';
import DeviceDetail from './layouts/portal/device-portal/device-detail';
import SideBar from './components/sidebar/sideBar';
import { useDispatch } from "react-redux";
import {loadUser} from './slices/authSlice'
import Loading from './components/loading/loading';

function App() {
  let location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser(null));
  }, [dispatch])

  return (
    <>
        {location.pathname === "/sign-in" ? '' : <SideBar /> }
        <div className="main-content">
          <Routes>
          <Route path='/' element={<SignIn/>}/>
            <Route element={<RequireAuth />}>
              {getRoutes(PortalRoute)}
              <Route path='/device/:id' element={<DeviceDetail/>}/>
            </Route>
            <Route path='/sign-in' element={<SignIn/>}/>
            <Route path="*" element={<Navigate to="/portal" />} />
          </Routes>
          <Loading/>
        </div>
    </>
  );
}

export default App;
