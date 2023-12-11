import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import Login from "./Components/Login/Login";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { loadUser } from "./Actions/User";
import Home from "./Components/Home/Home";
import Account from "./Components/Account/Account";
import NewPost from "./Components/NewPost/NewPost";
import Register from "./Components/Register/Register";
import UpdateProfile from "./Components/UpdateProfile/UpdateProfile";
import UpdatePassword from "./Components/UpdatePassword/UpdatePassword";
import ForgotPassword from "./Components/ForgotPassword/ForgotPassword";
import ResetPassword from "./Components/ResetPassword/ResetPassword";
import UserProfile from "./Components/UserProfile/UserProfile";
import Search from "./Components/Search/Search";
import NotFound from "./Components/NotFound/NotFound";

import RegisterTrader from "./Components/TraderRegister/TraderRegister";
import Marketplace from "./Components/Marketplace/Marketplace";
import NewItem from "./Components/NewItem/NewItem";

import Inbox from "./Components/Inbox/Inbox";
import News from "./Components/News/News";

import AdminRegister from "./Components/AdminRegister/AdminRegister";
import { loadAdmin } from "./Actions/Admin";
import AdminHeader from "./Components/AdminHeader/AdminHeader";
import { AdminHome } from "./Components/AdminHome/AdminHome";
import { AdminAccounts } from "./Components/AdminAccounts/AdminAccounts";
import { AdminPosts } from "./Components/AdminPosts/AdminPosts";

import AdminRegister from "./Components/AdminRegister/AdminRegister";
import { loadAdmin } from "./Actions/Admin";
import AdminHeader from "./Components/AdminHeader/AdminHeader";
import { AdminHome } from "./Components/AdminHome/AdminHome";
import { AdminAccounts } from "./Components/AdminAccounts/AdminAccounts";
import { AdminPosts } from "./Components/AdminPosts/AdminPosts";

import { loadTrader } from "./Actions/Trader";
function App() {
  const dispatch = useDispatch();
  const state = useState();

  // useEffect(() => {
  //   dispatch(loadUser());
  // }, [dispatch]);

  const { isAdmin, isAuthenticated: adminAuth } = useSelector(
    (state) => state.admin
  );
  const { isTrader, isAuthenticated: traderAuth } = useSelector(
    (state) => state.trader
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    console.log("Search results is ", state.searchResults);
    localStorage.setItem("searchResults", JSON.stringify(state.searchResults));
  }, [state.searchResults]);

  useEffect(() => {
    console.log("isAuthenticated = " + isAuthenticated);
    console.log("isAdmin = " + isAdmin);
    console.log("adminAuth = " + adminAuth);

    if (adminAuth && isAdmin) {
      dispatch(loadAdmin());
    } else if (traderAuth && isTrader) {
      dispatch(loadTrader());
    } else if (isAuthenticated) {
      dispatch(loadUser());
    }
  }, [dispatch, isAuthenticated, isAdmin, adminAuth]);

  //const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <Router>
      {/* {isAuthenticated && <Header />} */}
      {adminAuth && isAdmin && <AdminHeader />}
      {isAuthenticated && !isAdmin && <Header />}

      <Routes>
        {isAdmin && (
          <>
            <Route path="/" element={adminAuth ? <AdminHome /> : <Login />} />
            <Route
              path="/allAccounts"
              element={adminAuth ? <AdminAccounts /> : <Login />}
            />
            <Route
              path="/allPosts"
              element={adminAuth ? <AdminPosts /> : <Login />}
            />
          </>
        )}
        {isTrader && (
          <>
            <Route
              path="/registerTrader"
              element={isAuthenticated ? <Marketplace /> : <Register />}
            />
          </>
        )}
        {!isAdmin && (
          <>
            <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
            <Route
              path="/account"
              element={isAuthenticated ? <Account /> : <Login />}
            />

            <Route path="/news" element={<News />} />

            <Route
              path="/register"
              element={isAuthenticated ? <Account /> : <Register />}
            />

            <Route
              path="/registerAdmin"
              element={isAuthenticated ? <Account /> : <AdminRegister />}
            />
            <Route
              path="/marketplace"
              element={isAuthenticated ? <Marketplace /> : <Login />}
            />

            <Route path="/newitem" element={<NewItem />} />

            <Route
              path="/newpost"
              element={isAuthenticated ? <NewPost /> : <Login />}
            />

            <Route
              path="/update/profile"
              element={isAuthenticated ? <UpdateProfile /> : <Login />}
            />
            <Route
              path="/update/password"
              element={isAuthenticated ? <UpdatePassword /> : <Login />}
            />

            <Route
              path="/forgot/password"
              element={
                isAuthenticated ? <UpdatePassword /> : <ForgotPassword />
              }
            />

            <Route
              path="/password/reset/:token"
              element={isAuthenticated ? <UpdatePassword /> : <ResetPassword />}
            />

            <Route
              path="/user/:id"
              element={isAuthenticated ? <UserProfile /> : <Login />}
            />

            <Route
              path="/inbox"
              element={isAuthenticated ? <Inbox /> : <Login />}
            />

            <Route
              path="/inbox/:id"
              element={isAuthenticated ? <Inbox /> : <Login />}
            />

            <Route path="search" element={<Search />} />
          </>
        )}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
