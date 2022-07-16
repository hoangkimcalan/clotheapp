import React from "react";
import Flash from "../assets/flash1.png";
import HeroBg from "../assets/hero1.png";
import Shoes3 from "../assets/shoes3.png";
import { heroData } from "../utils/data";

import "../index.css";

function HomeContainer() {
    return (
        <section
            className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full"
            id="home"
        >
            <div className="py-2 flex-1 flex flex-col item-start justify-center gap-10">
                <div className="flex items-center gap-2 justify-center bg-gray-400 px-4 py-1 rounded-full w-48 h-10 mt--2">
                    <p className="text-base text-textColor font-semibold ">
                        Flash Delivery
                    </p>
                    <div className="w-6 h-6  rounded-full overflow-hidden drop-shadow-xl">
                        <img
                            src={Flash}
                            alt="flash devivery"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <p className="text-[2.7rem] font-bold tracking-wide text-cyan-600 lg:text-[3rem] ">
                    A style for every story<br />
                    <span className="text-cyan-900 text-[3rem] lg:block lg:text-[4rem]">
                        BE YOU!
                    </span>
                </p>

                <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
                    Iconic British brand Topshop is back with soft, silky
                    styles, crisp cottons and immaculate suiting for the summer
                    months. Bold and colourful dresses with a dash of 90s
                    nostalgia are perfect for a season of events. Discover what
                    the latest drop has to offer now.
                </p>

                <button
                    type="button"
                    className="md:w-32 bg-gradient-to-br from-cyan-400 to-sky-600 animate-bounce w-full px-4 py-2 rounded-xl hover:shadow-lg transition-all ease-in-out duration-100"
                >
                    Order now
                </button>
            </div>

            <div className="py-2 flex-1 justify-center flex items-center relative">
                <img
                    src={HeroBg}
                    className="md:h-[650px] md:w-[400px] h-[420px] w-full ml-auto opacity-80 "
                    alt="heroBG"
                />

                <div className="w-full md:w-[400px] md:right-[30px] h-full absolute md:gap-4 grid grid-cols-2 gap-1 p-2 items-center justify-center py-4 md:ml-3 flex-wrap">
                    {heroData &&
                        heroData.map((item, key) => (
                            <div
                                key={key}
                                className="hero-card min-w-[146px] lg:w-[180px] h-[120px] lg:h-[160px] flex flex-col items-center justify-center p-4 bg-cardOverlay backdrop-blur-md rounded-xl drop-shadow-2xl"
                            >
                                <img
                                    src={item.imageSrc}
                                    alt="shoes"
                                    className="transition w-20 lg:w-36 -mt-10 lg:-mt-24 hover:scale-110"
                                />
                                <p className="text-sm lg:text-base font-bold md:text-textColor text-gray-900">
                                    {item.name}
                                </p>
                                <p className="text-xs font-medium md:text-textColor text-gray-800 my-1 lg:my-2">
                                    {item.description}
                                </p>
                                <p className="text-xs font-light md:text-textColor text-gray-800">
                                    <span className="font-medium text-sky-700">
                                        ${" "}
                                    </span>
                                    {item.price}
                                </p>
                            </div>
                        ))}
                </div>
            </div>
        </section>
    );
}

export default HomeContainer;
