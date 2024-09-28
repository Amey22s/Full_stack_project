import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersForAdmin } from "../../Actions/Admin";
import User from "../User/User";
//import UserForAdmin from "../UserForAdmin/UserForAdmin";
import Loader from "../Loader/Loader";

const AdminUsers = () => {
  const dispatch = useDispatch();

  // Extract users and loading state from the store outside the useEffect
  const { users, loading, error } = useSelector((state) => state.allUsersForAdmin);

  useEffect(() => {
    console.log("users list for deletion in admin = ", users);
    dispatch(getAllUsersForAdmin());
  }, [dispatch]);

  return loading ? (
    <Loader />
  ) : error ? (
    <p>{error}</p>
  ) : (
    <div className="user-list">
      {users &&
        users.map((user) => (
        <User key={user._id} userId={user._id} name={user.name} avatar={user.avatar.url} user={user} source={"adminUsers"} />
        ))}
    </div>
  );
};

export default AdminUsers;
