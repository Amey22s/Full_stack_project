import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { loadUser } from './Actions/User';
import Home from './Components/Home/Home';
import Account from './Components/Account/Account';
import NewPost from './Components/NewPost/NewPost';
import Register from './Components/Register/Register';
import UpdateProfile from './Components/UpdateProfile/UpdateProfile';
import UpdatePassword from './Components/UpdatePassword/UpdatePassword';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import UserProfile from './Components/UserProfile/UserProfile';
import Search from './Components/Search/Search';
import NotFound from './Components/NotFound/NotFound';

import RegisterTrader from './Components/TraderRegister/TraderRegister';
import Marketplace from './Components/Marketplace/Marketplace';
import NewItem from './Components/NewItem/NewItem';

import Inbox from './Components/Inbox/Inbox';
import News from './Components/News/News';

import AdminRegister from './Components/AdminRegister/AdminRegister';
import {loadAdmin} from './Actions/Admin';
import AdminHeader from './Components/AdminHeader/AdminHeader';
import {AdminHome} from './Components/AdminHome/AdminHome';
import AdminAccount from './Components/AdminAccounts/AdminAccount';
import {AdminPosts} from './Components/AdminPosts/AdminPosts';
import AdminUsers from './Components/AdminUsers/AdminUsers';
import UserAccountForAdmin from './Components/UserAccountsForAdmin/UserAccountsForAdmin';
import UserProfileForAdmin from './Components/UserProfileForAdmin/UserProfileForAdmin';


function App() {
  const dispatch = useDispatch();
  const state = useState();

  const { isAdmin, isAuthenticated: adminAuth } = useSelector((state) => state.admin);

  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    console.log("Search results is ",state.searchResults);
    localStorage.setItem('searchResults', JSON.stringify(state.searchResults));
  }, [state.searchResults]);

  useEffect(() => {

    // console.log("isAuthenticated = " + isAuthenticated);
    // console.log("isAdmin = " + isAdmin);
    // console.log("adminAuth = " + adminAuth);

    console.log("State is ",state);


        


    if (adminAuth && isAdmin) {
      dispatch(loadAdmin());
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
          <Route path="/account" element={adminAuth ? <AdminAccount /> : <Login />} />
          <Route path="/allUsers" element={adminAuth ? <AdminUsers /> : <Login  />} />
          <Route path="/allPosts" element={adminAuth ? <AdminPosts /> : <Login  />} />
          <Route path="/adminUsers/:id" element={adminAuth ? <UserProfileForAdmin /> : <Login />}/>
          </>
        )}

        {!isAdmin && (
          <>
          <Route path="/" element={isAuthenticated ? <Home /> : <Login />} />
          <Route
            path="/account"
            element={isAuthenticated ? <Account /> : <Login />}
          />

          <Route
            path="/news"
            element={<News />}
          />

          {/* <Route path="/article/:id" element={ <Article/>} /> */}
  
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

       

        <Route
          path="/registerTrader"
          element={isAuthenticated ? <Account /> : <RegisterTrader />}
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
            element={isAuthenticated ? <UpdatePassword /> : <ForgotPassword />}
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
          path = "/inbox"
          element={isAuthenticated ? <Inbox/> : <Login/> }
          />

        <Route
        path = "/inbox/:id"
        element={isAuthenticated ? <Inbox/> : <Login/> }
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
