import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaMinus, FaPlus } from 'react-icons/fa';
import { MdRefresh } from "react-icons/md";
import { motion } from "framer-motion";
import EMPTY from "../assets/empty.png";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";

import "../index.css";
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';
import CartItem from './CartItem';

import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";


function CartContainer() {
    const amount = "2";
    const currency = "USD";
    const style = { "layout": "vertical" };
    const [{ cartShow, cartItems, user }, dispatch] = useStateValue();

    const [flag, setFlag] = useState(1);
    const [tot, setTot] = useState(0);

    const [checkout, setCheckout] = useState(true);

    console.log("checkout", checkout)

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const handleShowCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow,
        });
    }

    useEffect(() => {
        let totalPrice = cartItems.reduce(function (accumulator, item) {
            return accumulator + item.quantity * item.price;
        }, 0);
        console.log("totalprice", totalPrice);
        setTot(totalPrice);
        console.log("tot", tot);
    }, [tot, flag]);

    const clearCart = () => {
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: [],
        });

        localStorage.setItem("cartItems", JSON.stringify([]));
    };

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

    console.log("cartItems", cartItems);

    // Custom component to wrap the PayPalButtons and handle currency changes
    const ButtonWrapper = ({ currency, showSpinner }) => {
        // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
        // This is the main reason to wrap the PayPalButtons in a new component
        const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

        useEffect(() => {
            dispatch({
                type: "resetOptions",
                value: {
                    ...options,
                    currency: currency,
                },
            });
        }, [currency, showSpinner]);


        return (<>
            {(showSpinner && isPending) && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[amount, currency, style]}
                fundingSource={undefined}
                createOrder={(data, actions) => {
                    return actions.order
                        .create({
                            purchase_units: [
                                {
                                    amount: {
                                        currency_code: currency,
                                        value: amount,
                                    },
                                },
                            ],
                        })
                        .then((orderId) => {
                            // Your code here after create the order
                            return orderId;
                        });
                }}
                onApprove={function (data, actions) {
                    return actions.order.capture().then(function () {
                        // Your code here after capture the order
                    });
                }}
            />
        </>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md flex flex-col z-[101]">
            <div className="w-full flex items-center justify-between p-4">
                <motion.div whileTap={{ scale: 0.75 }} onClick={handleShowCart}>
                    <FaArrowLeft className="text-textColor text-2xl" />
                </motion.div>
                <p className="text-textColor text-xl font-semibold">Cart</p>

                <motion.p
                    onClick={clearCart}
                    whileTap={{ scale: 0.86 }} className="text-cyan-900 font-semibold hover:text-cyan-700 group flex items-center gap-2 p-1 px-2 my-2 bg-gray-200 rounded-md hover:shadow-md cursor-pointer text-base">
                    Clear
                    <MdRefresh className="group-hover:text-cyan-700 " />
                </motion.p>
            </div>

            {/* bottom section */}
            {cartItems && cartItems.length > 0 ? (
                <div className="w-full h-full bg-cartBg rounded-t-[1.2rem] flex flex-col">
                    {/* Cart items section */}
                    <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
                        {/* cart item */}
                        {cartItems && cartItems.map((item, index) => (
                            <CartItem key={index} item={item} setFlag={setFlag}
                                flag={flag} />
                        ))}
                    </div>

                    {/* cart total */}
                    <div className="w-full flex-1 bg-cartTotal rounded-t-[1.2rem] flex flex-col items-center justify-evenly px-8 py-2">
                        <div className="w-full flex items-center justify-between">
                            <p className="text-gray-400 text-lg">Sub Total</p>
                            <p className="text-gray-400 text-lg">${tot}</p>
                        </div>

                        <div className="w-full flex items-center justify-between">
                            <p className="text-gray-400 text-lg">Delivery</p>
                            <p className="text-gray-400 text-lg">$2.5</p>
                        </div>

                        <div className="w-full border-b border-gray-600 my-2"></div>

                        <div className="w-full flex items-center justify-between">
                            <p className="text-gray-200 text-xl font-semibold">Total</p>
                            <p className="text-gray-200 text-xl font-semibold">${tot + 2.5}</p>
                        </div>

                        {user ? (
                            <div>
                                {!checkout ?
                                    <div>
                                        <PayPalScriptProvider
                                            options={{
                                                "client-id": "test",
                                                components: "buttons",
                                                currency: "USD",
                                            }}
                                        >
                                            <ButtonWrapper
                                                currency={currency}
                                                showSpinner={false}
                                            />
                                        </PayPalScriptProvider>
                                    </div>
                                    : (<motion.button
                                        onClick={() => setCheckout(false)}
                                        whileTap={{ scale: 0.8 }} className="bg-gradient-to-br p-2 from-cyan-400 to-sky-600 w-full rounded-full text-gray-50 text-lg my-2 box-shadow hover:white hover:font-semibold ease-in-out">
                                        Check out
                                    </motion.button>)
                                }
                            </div>
                        ) : (
                            <motion.button onClick={handleLogin} whileTap={{ scale: 0.8 }} className=" bg-gradient-to-br p-2 from-cyan-400 to-sky-600 w-full rounded-full text-gray-50 text-lg my-2 box-shadow hover:white hover:font-semibold duration-150 ease-in-out">
                                Login to check out
                            </motion.button>
                        )}
                    </div>

                </div>
            ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-6">
                    <img src={EMPTY} className="w-[600px]" atl="" />
                </div>
            )
            }
        </motion.div>
    )
}

export default CartContainer;