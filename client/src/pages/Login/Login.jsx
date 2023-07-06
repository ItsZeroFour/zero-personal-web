import React, { useEffect, useState } from "react";
import style from "./Login.module.scss";
import { NavLink, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

const Login = () => {
  const [clicked, setClicked] = useState(true);

  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const { status } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    mode: "onSubmit",
  });

  useEffect(() => {
    if (errors) {
      toast(errors.email?.message);
      toast(errors.password?.message);
    }
  }, [errors, clicked]);

  useEffect(() => {
    if (status === undefined) toast("Uncorrect email or password");
  }, [status]);

  /*
    If user is not exists, return notifications with status else
    user is exists, set to local storage user token
  */
  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return toast("Failed to login");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <main className={style.login}>
      <form className={style.login__form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>

        <div>
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            name="email"
            {...register("email", { required: "Укажите почту" })}
            type="email"
          />
        </div>

        <div>
          <label htmlFor="login-password">Password</label>
          <input
            id="login-password"
            name="password"
            {...register("password", { required: "Введите корректный пароль" })}
            type="password"
          />
        </div>

        <p className={style.login__donthave__account}>
          Don't have an account ? <NavLink to="/register">Register</NavLink>
        </p>
        <button onClick={() => setClicked(!clicked)} type="submit">
          Login
        </button>
      </form>
    </main>
  );
};

export default Login;
