import React, { useEffect, useState } from "react";
import HomeContainer from "./HomeContainer";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { motion } from "framer-motion"
import RowContainer from "./RowContainer";

import "../index.css";
import { useStateValue } from "../context/StateProvider";
import MenuContainer from "./MenuContainer";
import CartContainer from "./CartContainer";


function MainContainer() {
    const [{ clotheItems, cartShow }, dispatch] = useStateValue();

    const [scrollValue, setScrollValue] = useState(0);

    useEffect(() => {
    }, [scrollValue, cartShow]);

    return (
        <div className="w-full h-auto flex flex-col items-center justify-center">
            <HomeContainer />

            <section className=" w-full my-6">
                <div className="w-full flex items-center justify-between">
                    <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute
                    before:rounded-lg before:content before:w-20 before:h-1 before:-bottom-2
                     before:left-0  before:bg-gradient-to-tr from-cyan-400 to-cyan-600 transition-all ease-in-out duration-100">
                        Our Shoes
                    </p>

                    <div className="hidden md:flex items-center gap-3">
                        <motion.div whileHover={{ scale: 0.9 }}
                            onClick={() => setScrollValue((scrollValue) => scrollValue - 300)}
                            className="w-8 h-8 rounded-lg bg-cyan-500 hover:bg-cyan-600 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center">
                            <MdKeyboardArrowLeft className="text-white text-xl " />
                        </motion.div>
                        <motion.div whileHover={{ scale: 0.9 }}
                            onClick={() => setScrollValue((scrollValue) => scrollValue + 300)}
                            className="w-8 h-8 rounded-lg bg-cyan-500 hover:bg-cyan-600 cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg flex items-center justify-center">
                            <MdKeyboardArrowRight className="text-white text-xl " />
                        </motion.div>
                    </div>
                </div>

                <div>
                    <RowContainer scrollValue={scrollValue} flag={true} data={clotheItems?.filter(n => n.category == "shoes")} />
                </div>
            </section>


            <MenuContainer />

            {cartShow && <CartContainer />}

        </div>
    );
}

export default MainContainer;
