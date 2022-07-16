import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { FaMinus, FaPlus } from 'react-icons/fa';
import { useStateValue } from '../context/StateProvider';
import { actionType } from '../context/reducer';

let items = [];

function CartItem({ item, setFlag, flag }) {

    const [quantity, setQuantity] = useState(1);

    const [{ cartItems }, dispatch] = useStateValue();


    const cartDispatcher = () => {
        localStorage.setItem("cartItems", JSON.stringify(items));
        dispatch({
            type: actionType.SET_CART_ITEMS,
            cartItems: items
        })
    }

    const updateQuantity = (action, id) => {
        if (action == "add") {
            setQuantity(quantity + 1);
            cartItems.map(item => {
                if (item.id == id) {
                    item.quantity += 1;
                    setFlag(flag + 1);
                }
            })
            cartDispatcher();
        } else {
            if (quantity == 1) {
                items = cartItems.filter((item) => item.id != id);
                setFlag(flag + 1);
                cartDispatcher();
            } else {
                setQuantity(quantity - 1);
                cartItems.map(item => {
                    if (item.id == id) {
                        item.quantity -= 1;
                        setFlag(flag + 1);
                    }
                })
                cartDispatcher();
            }
        }
    }

    useEffect(() => {
        items = cartItems;
    }, [quantity, items])

    return (
        <div className="w-full p-1 px-2 rounded-lg bg-cartCart flex items-center gap-2">
            <img className="w-24 h-20 max-w-[120px] rounded-full object-contain" src={item?.image} />

            {/* name section */}
            <div className="flex flex-col gap-1">
                <p className="text-base text-gray-50">{item?.title}</p>
                <p className="text-sm block text-gray-300 font-semibold">${parseFloat(item?.price) * quantity}</p>
            </div>

            {/* button section*/}
            <div className="group flex items-center gap-2 ml-auto cursor-pointer ">
                <motion.div whileTap={{ scale: 0.75 }} onClick={() => updateQuantity("remove", item?.id)}>
                    <FaMinus className="text-gray-50 text-sm" />
                </motion.div>
                <p className="w-5 h-5 rounded-sm bg-textColor text-gray-50 flex items-center justify-center">
                    {quantity}
                </p>
                <motion.div whileTap={{ scale: 0.75 }} onClick={() => updateQuantity("add", item?.id)}>
                    <FaPlus className="text-gray-50 text-sm" />
                </motion.div>
            </div>
        </div>
    )
}

export default CartItem;