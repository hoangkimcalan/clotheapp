import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiShoppingBag } from "react-icons/hi";
import { MdAdd, MdLogout } from "react-icons/md";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";

import LOGO from "../assets/logo.png";
import AVATAR from "../assets/ava.png";
import { Link, Navigate } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

import "../index.css";

function Header() {
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [{ user, cartShow, cartItems }, dispatch] = useStateValue();

    const [isMenu, setIsMenu] = useState(false);

    const handleLogin = async () => {
        if (!user) {
            const {
                user: { refreshToken, providerData },
            } = await signInWithPopup(firebaseAuth, provider);
            dispatch({
                type: actionType.SET_USER,
                user: providerData[0],
            });
            localStorage.setItem("user", JSON.stringify(providerData[0]));
        } else {
            setIsMenu(!isMenu);
        }
    };

    const handleShowCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        });
    }

    const handleLogout = () => {
        setIsMenu(false);
        localStorage.clear();
        +dispatch({
            type: actionType.SET_USER,
            user: null,
        });
    };

    return (
        <header className="fixed z-50 w-screen p-3 px-4 md:p-6 md:px-16 bg-slate-100">
            {/* desktop & tablet */}
            <div className="hidden md:flex w-full h-full items-center justify-between ">
                <Link to={"/"} className="flex items-center gap-2">
                    <img className="w-8 object-cover" src={LOGO} alt="logo" />
                    <p className="text-headingColor text-xl font-medium">
                        NevrG
                    </p>
                </Link>
                <div className="flex items-center gap-8">
                    <motion.ul
                        initial={{ opacity: 0, x: 200 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 200 }}
                        className="flex items-center gap-6"
                    >
                        <li className="text-base text-textColor hover:text-gray-800 duration-100 transition-all ese-in-out cursor-pointer">
                            Home
                        </li>
                        <li className="text-base text-textColor hover:text-gray-800 duration-100 transition-all ese-in-out cursor-pointer">
                            Menu
                        </li>
                        <li className="text-base text-textColor hover:text-gray-800 duration-100 transition-all ese-in-out cursor-pointer">
                            About
                        </li>
                        <li className="text-base text-textColor hover:text-gray-800 duration-100 transition-all ese-in-out cursor-pointer">
                            Service
                        </li>
                        <li className="text-base text-textColor hover:text-gray-800 duration-100 transition-all ese-in-out cursor-pointer">
                            Contact
                        </li>
                    </motion.ul>

                    <div className="relative flex items-center justify-center" onClick={handleShowCart}>
                        <HiShoppingBag className="text-textColor text-2xl mt-[-6px] cursor-pointer z-10" />
                        {cartItems && cartItems.length > 0 && (
                            <div className="absolute -top-2.5 -right-2 w-4 h-4 rounded-xl bg-cartNumBg flex items-center justify-center">
                                <p className="text-xs text-white font-semibold ">
                                    {cartItems.length}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="relative">
                        <motion.img
                            whileTap={{ scale: 0.7 }}
                            src={user ? user.photoURL : AVATAR}
                            className="w-6 min-w-[40px] h-6 min-h-[40px] rounded-2xl bg-slate-300 cursor-pointer drop-shadow-xl "
                            alt="userprofile"
                            onClick={handleLogin}
                        />

                        {isMenu && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                className="w-40 bg-gray-50 absolute shadow-xl rounded-lg flex flex-col top-12 right-0 overflow-hidden"
                            >
                                {user &&
                                    user.email ===
                                    "hoangkimca123@gmail.com" && (
                                        <Link to={"/createItem"}>
                                            <p className="add-item flex px-4 py-2 items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor hover:text-gray-800 text-base"
                                                onClick={() => setIsMenu(false)}
                                            >
                                                New Item
                                                <MdAdd className="add-item-icon" />
                                            </p>
                                        </Link>
                                    )}
                                <p
                                    className="logout-item flex px-4 py-2 items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor hover:text-gray-800 text-base  "
                                    onClick={handleLogout}
                                >
                                    Logout
                                    <MdLogout className="logout-item-icon" />
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* mobile */}
            <div className=" flex md:hidden w-full h-full items-center justify-between ">
                <div className="relative flex items-center justify-center">
                    <HiShoppingBag className="text-textColor text-2xl mt-[-6px] cursor-pointer z-10" />
                    {cartItems && cartItems.length > 0 && (
                        <div className="absolute -top-2.5 -right-2 w-4 h-4 rounded-xl bg-cartNumBg flex items-center justify-center">
                            <p className="text-xs text-white font-semibold ">
                                {cartItems.length}
                            </p>
                        </div>
                    )}
                </div>

                <Link to={"/"} className="flex items-center gap-2">
                    <img className="w-10 object-cover" src={LOGO} alt="logo" />
                    <p className="text-headingColor text-xl font-medium">
                        NevrG
                    </p>
                </Link>

                <div className="relative">
                    <motion.img
                        whileTap={{ scale: 0.7 }}
                        src={user ? user.photoURL : AVATAR}
                        className="w-6 min-w-[40px] h-6 min-h-[40px] rounded-2xl bg-slate-300 cursor-pointer drop-shadow-xl "
                        alt="userprofile"
                        onClick={handleLogin}
                    />

                    {isMenu && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.6 }}
                            className="w-40 bg-gray-50 absolute shadow-xl rounded-lg flex flex-col top-12 right-0 overflow-hidden"
                        >
                            {user && user.email === "hoangkimca123@gmail.com" && (
                                <Link to={"/createItem"}>
                                    <p
                                        className="add-item flex px-4 py-2 items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor hover:text-gray-800 text-base"
                                        onClick={() => setIsMenu(false)}
                                    >
                                        New Item
                                        <MdAdd className="add-item-icon" />
                                    </p>
                                </Link>
                            )}
                            <ul className="flex flex-col">
                                <li
                                    className="text-base text-textColor px-4 py-2 hover:text-gray-800 hover:bg-slate-100 duration-100 transition-all ese-in-out cursor-pointer"
                                    onClick={() => setIsMenu(false)}
                                >
                                    Home
                                </li>
                                <li
                                    className="text-base text-textColor px-4 py-2 hover:text-gray-800 hover:bg-slate-100 duration-100 transition-all ese-in-out cursor-pointer"
                                    onClick={() => setIsMenu(false)}
                                >
                                    Menu
                                </li>
                                <li
                                    className="text-base text-textColor px-4 py-2 hover:text-gray-800 hover:bg-slate-100 duration-100 transition-all ese-in-out cursor-pointer"
                                    onClick={() => setIsMenu(false)}
                                >
                                    About
                                </li>
                                <li
                                    className="text-base text-textColor px-4 py-2 hover:text-gray-800 hover:bg-slate-100 duration-100 transition-all ese-in-out cursor-pointer"
                                    onClick={() => setIsMenu(false)}
                                >
                                    Service
                                </li>
                                <li
                                    className="text-base text-textColor px-4 py-2 hover:text-gray-800 hover:bg-slate-100 duration-100 transition-all ese-in-out cursor-pointer"
                                    onClick={() => setIsMenu(false)}
                                >
                                    Contact
                                </li>
                            </ul>

                            <p
                                className="logout-item flex m-2 p-2 rounded-md shadow-md items-center gap-3 cursor-pointer justify-center bg-gray-200 hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor hover:text-gray-800 text-base"
                                onClick={handleLogout}
                            >
                                Logout <MdLogout className="logout-item-icon" />
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
