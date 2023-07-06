import React from "react";
import style from "./Account.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/auth";
import { NavLink } from "react-router-dom";
import logo from "../../images/logo.png";

const Account = ({ isAuth }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.auth);

  if (!isAuth) {
    return (
      <h2 className={style.account__notreg}>
        You are not registered, please{" "}
        <NavLink to="/register">Register</NavLink>
      </h2>
    );
  }

  const onClickLogout = () => {
    if (window.confirm("Are you sure you want to log")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <main>
      {isAuth && data && (
        <div className={style.account}>
          <h2>Account</h2>

          <div className={style.account__details}>
            <img
              src={
                data.avatarUrl !== ""
                  ? `${process.env.REACT_APP_API_URL}${data.avatarUrl}`
                  : logo
              }
              alt="avatar"
            />

            <div className={style.account__details__blocks}>
              <div className={style.account__details__block}>
                <p>Email</p>
                <h4>{data.email}</h4>
              </div>

              <div className={style.account__details__block}>
                <p>First name</p>
                <h4>{data.firstName}</h4>
              </div>

              <div className={style.account__details__block}>
                <p>Last name</p>
                <h4>{data.lastName}</h4>
              </div>
            </div>
          </div>

          <button
            className={style.details__button}
            onClick={onClickLogout}
            type="submit"
          >
            Выйти
          </button>
        </div>
      )}
    </main>
  );
};

export default Account;
