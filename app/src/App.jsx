import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from "react-router";
import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import Applications from "./applications/Applications.jsx";
import Devices from "./devices/Devices.jsx";
import Loading from "./Loading.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getGroups} from "./store/groupSlice.js";
import {getDevices} from "./store/deviceSlice.js";
import {DeviceDetail} from "./devices/DeviceDetail.jsx";
import {getApplications} from "./store/applicationSlice.js";
import {ApplicationDetails} from "./applications/ApplicationDetails.jsx";
import dayjs from "dayjs";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import isBetween from "dayjs/plugin/isBetween";
import {Enroll} from "./enrollment/Enroll.jsx";
import {EnrollComplete} from "./enrollment/EnrollComplete.jsx";
import {Monitor} from "./monitor/Monitor.jsx";

dayjs.extend(LocalizedFormat);
dayjs.extend(isBetween);

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const groupsLoaded = useSelector(state => state.groups.loaded);
  const devicesLoaded = useSelector(state => state.devices.loaded);
  const applicationsLoaded = useSelector(state => state.applications.loaded);
  const devices = useSelector(state => state.devices.devices);

/*
  useEffect(() => {
    console.debug('Getting groups');
    dispatch(getGroups());
  },[]);

 */
  useEffect(() => {
    console.debug('Getting devices');
    dispatch(getDevices());
  }, []);
  useEffect(()  => {
    if (devicesLoaded) {
      console.debug('Getting applications');
      const a = devices.map((device) => device.id);
      dispatch(getApplications(a));
    }
  }, [devicesLoaded, devices, dispatch])

  useEffect(() => {
    if (devicesLoaded && applicationsLoaded) {
      setLoading(false);
    }
  },[groupsLoaded, devicesLoaded, applicationsLoaded]);

  return (
    <>
        {loading ? (<Loading/>) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home/>}/>
                <Route path="/devices">
                  <Route index element={<Devices/>}/>
                  <Route path=":deviceId" element={<DeviceDetail/>}/>
                </Route>
                <Route path="/applications">
                  <Route index element={<Applications/>}/>
                  <Route path=":appId" element={<ApplicationDetails/>}/>
                </Route>
                <Route path="/monitor" element={<Monitor/>}/>
              </Route>
              <Route path="/enroll" element={<Layout nonav />}>
                <Route index element={<Enroll/>}/>
                <Route path="complete/:installationId" element={<EnrollComplete/>}/>
              </Route>
            </Routes>
          </BrowserRouter>
        )}
    </>
  )
}

export default App
