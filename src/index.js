import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import AdminLayout from "layouts/Admin.js";
import Login from "views/Login";
import { Helmet } from "react-helmet";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [add, setAdd] = useState([])
  const [icon, setIcon] = useState('');

    const updateFavicon = () => {
      axios.get('http://localhost:8080/favicon')
        .then(response => {
          const newFaviconUrl = response.data[0]?.icon; // Get the first favicon's URL
          setIcon(newFaviconUrl);
          document.title = `${response.data[0]?.name || 'Arcdeco'} cms`;
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };

    const fetchData = async () => {
      try {
          const response = await axios.get("http://localhost:8080/favicon");
          const data = response.data;
          setAdd(data[0].icon);
          console.log("icon",add)
          // updateFavicon(url);

      } catch (error) {
          console.log(`Error getting Blog from frontend: ${error}`);
      }
  };
  useEffect(() => {
      fetchData();
      updateFavicon();

  }, []);
 
  return (
    <div>
   <Helmet>
        <meta charSet="utf-8" />
        <link rel="icon" href={`http://localhost:8080/` + icon} /> {/* Set the favicon dynamically */}
      </Helmet>

    <BrowserRouter>
      <Routes>
        {/* Protect /admin/* route */}
        {isLoggedIn ? (
          <Route path="/admin/*" element={<AdminLayout />} />
        ) : (
          <Route path="/admin/*" element={<Navigate to="/login" />} />
        )}

        {/* Login route */}
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />

        {/* Default route - Redirect to login if not logged in */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </BrowserRouter>
    </div>

  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
