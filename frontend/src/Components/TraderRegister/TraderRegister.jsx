import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useAlert } from "react-alert";
import { registerTrader } from "../../Actions/Trader"; // Import the action
import "./TraderRegister.css"; // Create a corresponding CSS file for styling


const RegisterTrader = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error } = useSelector((state) => state.trader);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("sending dispatch to registerTrader")
    dispatch(registerTrader(name, email, password, avatar));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" }); // Make sure you have this action in your trader actions
    }
  }, [dispatch, error, alert]);

  return (
    <div className="register">
      <form className="registerForm" onSubmit={submitHandler}>
        <Typography variant="h3" style={{ padding: "2vmax" }}>
          Trader Registration
        </Typography>

        <Avatar src={avatar} alt="Trader" sx={{ height: "10vmax", width: "10vmax" }} />
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <input type="text" className="registerInputs" value={name} placeholder="Name" required onChange={(e) => setName(e.target.value)} />
        <input type="email" className="registerInputs" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="registerInputs" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />

        <Link to="/">
          <Typography>Already a Trader? Login Now</Typography>
        </Link>

        <Button disabled={loading} type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default RegisterTrader;
