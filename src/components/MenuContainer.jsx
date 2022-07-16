import React, { useEffect, useState } from 'react';
import { GiClothes } from 'react-icons/gi';

import { categoRies } from '../utils/data';
import { motion } from 'framer-motion';
import "../index.css";
import { useStateValue } from '../context/StateProvider';
import RowContainer from './RowContainer';

function MenuContainer() {

    const [filter, setFilter] = useState('bag');

    const [{ clotheItems }, dispatch] = useStateValue();

    console.log("Clothe Items", clotheItems);

    console.log("filter", filter);

    useEffect(() => {

    }, [filter]);

    return (
        <section id="menu" className="my-12 w-full">
            <div className="w-full h-auto flex flex-col items-center justify-center">
                <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute
                    before:rounded-lg before:content before:w-44 before:h-1 before:-bottom-2
                     before:left-8 before:text-center before:bg-gradient-to-tr from-cyan-400 to-cyan-600 transition-all ease-in-out duration-100">
                    Our Clothes For You
                </p>

                <div className="px-1 w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
                    {categoRies && categoRies.map((item) => (
                        console.log("item", item.urlParamName),
                        <motion.div whileTap={{ scale: 0.95 }} key={item.id} className={`group ${filter == item.urlParamName ? "bg-cyan-600" : "bg-gray-50"} w-24 min-w-[94px] h-28 cursor-pointer rounded-lg filter-card flex flex-col gap-3 items-center justify-center hover:bg-cyan-500 duration-150 transition-all ease-in-out`}
                            onClick={() => setFilter(item.urlParamName)}
                        >
                            <div className={`w-10 h-10 rounded-full ${filter == item.urlParamName ? "bg-card" : "bg-cyan-600"}  group-hover:bg-card flex items-center justify-center`}>
                                <GiClothes className={` group-hover:text-textColor ${filter == item.urlParamName ? "text-textColor" : "text-card"} w-7 h-7`} />
                            </div>

                            <p className={`text-sm ${filter == item.urlParamName ? "text-card" : "text-textColor"} group-hover:text-white`}>
                                {item.name}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="w-full">
                    <RowContainer flag={false} data={clotheItems?.filter(item => item.category == filter)} />
                </div>
            </div>
        </section>
    )
}

export default MenuContainer;