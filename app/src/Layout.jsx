import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import {Outlet} from "react-router";

function Layout({nonav = false}) {
  return (
    <>
      <Header nonav={nonav}/>
      <div className="app-content">
        <main className="container">
          <Outlet/>
        </main>
      </div>
      <Footer/>
    </>
  );
}
export default Layout;