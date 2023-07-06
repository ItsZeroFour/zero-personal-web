import React, { useState } from "react";
import style from "./Register.module.scss";
import avatar from "../../images/register/base-avatar.svg";
import { NavLink, Navigate } from "react-router-dom";
import { fetchRegister, selectIsAuth } from "../../redux/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "../../utils/axios";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();

  /*
    Get file from input and upload this image to uploads folder then
    set this image path to the avtarUrl state.
    If error - notificate user about it
  */
  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append("image", file);

      const { data } = await axios.post("/upload", formData);
      setAvatarUrl(data.url);
    } catch (err) {
      toast("Failed to upload file");
      console.log(err);
    }
  };

  const createUser = async (event) => {
    event.preventDefault();

    const data = await dispatch(
      fetchRegister({
        firstName,
        lastName,
        email,
        password,
        avatarUrl,
      })
    );

    if (!data.payload) {
      return toast("Failed to register! Try changing your login");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <main className={style.register}>
      <form className={style.register__form}>
        <h2>Register</h2>

        {/* For mobile */}
        <div className={style.register__avatar__mobile}>
          <input
            id="reg-avatar"
            onChange={handleChangeFile}
            accept="image/png, image/jpeg, image/jpg"
            hidden
            type="file"
          />
          <label htmlFor="reg-avatar">
            <img
              src={
                avatarUrl !== "" ? `http://localhost:4444${avatarUrl}` : avatar
              }
              alt="Your avatar"
            />
          </label>
        </div>

        <div className={style.register__form__content}>
          <div>
            <label htmlFor="reg-firstname">First name</label>
            <input
              id="reg-firstname"
              onChange={(event) => setFirstName(event.target.value)}
              type="text"
            />
          </div>

          <div>
            <label htmlFor="reg-lastname">Last name</label>
            <input
              id="reg-lastname"
              onChange={(event) => setLastName(event.target.value)}
              type="text"
            />
          </div>

          <div>
            <label htmlFor="reg-email">Email</label>
            <input
              id="reg-email"
              onChange={(event) => setEmail(event.target.value)}
              type="email"
            />
          </div>

          <div>
            <label htmlFor="reg-password">Password</label>
            <input
              id="reg-password"
              onChange={(event) => setPassword(event.target.value)}
              type="password"
            />
          </div>
        </div>

        <p className={style.register__have__account}>
          Already have an account ? <NavLink to="/login">Login</NavLink>
        </p>

        <button type="submit" onClick={createUser}>
          Register
        </button>
      </form>

      <div className={style.register__avatar}>
        <input
          id="reg-avatar"
          onChange={handleChangeFile}
          accept="image/png, image/jpeg, image/jpg"
          hidden
          type="file"
        />
        <label htmlFor="reg-avatar">
          <img
            src={
              avatarUrl !== "" ? `http://localhost:4444${avatarUrl}` : avatar
            }
            alt="Your avatar"
          />
        </label>
      </div>
    </main>
  );
};

export default Register;
