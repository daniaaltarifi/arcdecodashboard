
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";
import AddProduct from 'views/AddProduct.js'
import UsersCRUD from "views/UsersCRUD";
import Orders from "views/Orders";
import Login from 'views/Login'
import Home from "views/Home";
import TopSelling from "views/TopSelling";
import JoinTeam from 'views/JoinTeam'
import TradeIn from "views/TradeIn"
import Subscribe from "views/Subscribe";
import Test from "views/Test";
import About from "views/About";
import Footer from "views/Footer";
import Case from "views/Case";
import Partner from "views/Partner";
import Services from "views/Services";
import TypeOfServices from "views/TypeOfServices";
import Banners from "views/Home";
import Slider from "views/HomeSlider";
import NewPage from "views/NewPage";
import Logo from "views/Logo";
import FooterHome from "views/FooterHome";
import Favicon from "views/Favicon";
var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/favicon",
    name: "Favicon",
    icon: "nc-icon nc-diamond",
    component: <Favicon />,
    layout: "/admin",
  },
  {
    path: "/logo",
    name: "Logo",
    icon: "nc-icon nc-diamond",
    component: <Logo />,
    layout: "/admin",
  },
  
  {
    path: "/home",
    name: "Main Section",
    icon: "nc-icon nc-diamond",
    component: <Home />,
    layout: "/admin",
  },
  {
    path: "/footerhome",
    name: "Footer In Main Section",
    icon: "nc-icon nc-diamond",
    component: <FooterHome />,
    layout: "/admin",
  },
  {
    path: "/about",
    name: "About",
    icon: "nc-icon nc-diamond",
    component: <About/>,
    layout: "/admin",
  },
  {
    path: "/case",
    name: "Case",
    icon: "nc-icon nc-diamond",
    component: <Case/>,
    layout: "/admin",
  },
  {
    path: "/services",
    name: "Services",
    icon: "nc-icon nc-diamond",
    component: <Services/>,
    layout: "/admin",
  },
  
     {
      path: "/homeslider",
      name: "Home Slider",
      icon: "nc-icon nc-diamond",
      component: <Slider />,
      layout: "/admin",
    },
   {
    path: "/typeofservices",
    name: "Type of Services",
    icon: "nc-icon nc-diamond",
    component: <TypeOfServices />,
    layout: "/admin",
  },
  
  
  {
    path: "/partner",
    name: "Partner",
    icon: "nc-icon nc-diamond",
    component: <Partner />,
    layout: "/admin",
  },
 
  {
    path: "/footer",
    name: "Footer",
    icon: "nc-icon nc-diamond",
    component: <Footer/>,
    layout: "/admin",
  },

  {
    path: "/newpage",
    name: "New Page in Menu",
    icon: "nc-icon nc-diamond",
    component: <NewPage />,
    layout: "/admin",
  },
  
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-diamond",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: <Test />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: <Notifications />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/usercrud",
  //   name: "Users",
  //   icon: "nc-icon nc-single-02",
  //   component: <UsersCRUD />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "nc-icon nc-single-02",
  //   component: <Login/>,
  //   layout: "/admin",
  // },


 
 
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   icon: "nc-icon nc-tile-56",
  //   component: <TableList />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: <Typography />,
  //   layout: "/admin",
  // },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-spaceship",
  //   component: <UpgradeToPro />,
  //   layout: "/admin",
  // },
];
export default routes;
