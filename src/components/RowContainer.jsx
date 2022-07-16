import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import { MdShoppingBag } from "react-icons/md";
import { GridSpinner } from 'react-spinners-kit';
import NOTFOUND from "../assets/notfound.png";
import { actionType } from '../context/reducer';
import { useStateValue } from '../context/StateProvider';

import "../index.css";

function RowContainer({ flag, data, scrollValue }) {
    console.log("data", data);
    const rowContainer = useRef();


    const [{ cartItems }, dispatch] = useStateValue();

    const [items, setItems] = useState([...cartItems]);

    const handleAddToCart = () => {
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: items,
        });
        localStorage.setItem("cartItems", JSON.stringify(items));
    }

    useEffect(() => {
        rowContainer.current.scrollLeft += scrollValue;
    }, [scrollValue])

    useEffect(() => {
        handleAddToCart();
    }, [items])

    return (

        <div ref={rowContainer} className={`justify-center bg-white rounded-sm scroll-smooth p-2 w-full my-12 flex overflow-hidden gap-2 gap-y-8 ${flag ? "overflow-x-scroll scrollbar-none" : "overflow-x-hidden flex-wrap"}`}>
            {data?.length > 0 ?
                (data.map((item, index) => (
                    <div key={index} className="mr-8 item-cart w-300 min-w-[300px] md:min-w-[350px] md:w-350 h-auto bg-gray-100 backdrop-blur-lg rounded-xl p-3 overflow-hidden">
                        <div className="w-full flex items-center justify-between">
                            {
                                item.image == null ?
                                    <GridSpinner color="rgb(8 145 178)" />
                                    : <motion.img whileHover={{ scale: 1.08 }} src={item.image} alt="..."
                                        className="flex w-28 h-24 items-center object-cover"
                                    />
                            }
                            <motion.div
                                onClick={() => setItems([...cartItems, item])}
                                whileTap={{ scale: 0.75 }} className="hover:scale-90 transition duration-150 flex w-8 h-8 cursor-pointer rounded-full bg-cyan-600 items-center justify-center hover:shadow-lg">
                                <MdShoppingBag className="text-white transition duration-100" />
                            </motion.div>
                        </div>

                        <div className="w-full flex flex-col items-end">
                            <p className="text-textColor font-semibold text-base md:text-lg">
                                {item.title}
                            </p>
                            <p className="text-gray-500 mt-1 text-sm">
                                {item.calories} Calories
                            </p>
                            <div className="flex items-center gap-8">
                                <p className="text-lg text-headingColor font-semibold ">
                                    <span className="text-sm text-cyan-600">
                                        $
                                    </span>
                                    {item.price}
                                </p>
                            </div>
                        </div>
                    </div>
                )))
                : (
                    <div className="w-full flex flex-col items-center justify-center">
                        {data ?
                            <div>
                                <img src={NOTFOUND} className="h-[250px]" />
                                <p className="text-xl text-headingColor font-semibold text-center">
                                    Items not available 😢
                                </p>
                            </div>
                            :
                            <GridSpinner
                                color="rgb(8 145 178)"
                            />
                        }
                    </div>
                )
            }
        </div >
    )
}

export default RowContainer;