import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./pages/Main/Main";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Account from "./pages/Account/Account";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import BurgerMenu from "./components/BurgerMenu/BurgerMenu";
import Blog from "./pages/Blog/Blog";
import CreatePost from "./pages/CreatePost/CreatePost";
import Portfolio from "./pages/Portfolio/Portfolio";
import FullPost from "./pages/FullPost/FullPost";
import EditPost from "./pages/EditPost/EditPost";
import CreateProject from "./pages/CreateProject/CreateProject";
import Contacts from "./pages/Contacts/Contacts";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  return (
    <React.Fragment>
      <BurgerMenu />
      <div className="container">
        <div className="page">
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account" element={<Account isAuth={isAuth} />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/create-post" element={<CreatePost />} />
            <Route path="/posts/:id" element={<FullPost />} />
            <Route path="/posts/:id/edit" element={<EditPost />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/projects/create" element={<CreateProject />} />
            <Route path="/projects/create/:id" element={<CreateProject />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
      </div>

      <ToastContainer theme="dark" position="bottom-right" />
    </React.Fragment>
  );
}

export default App;
