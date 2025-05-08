import { Outlet } from "react-router-dom";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import ChatIcon from "../Common/ChatIcon";
import ChatWidget from "../Common/ChatWidget";

const UserLayout = () => {
  return (
    <>
      {/* Header */}
      <Header />
      {/* Main */}
      <main>
        <Outlet />
      </main>
      {/* Footer */}
      <Footer />
      {/* Chat Icon */}
      {/*<ChatIcon />*/}
      {<ChatWidget />}
    </>
  );
};

export default UserLayout;