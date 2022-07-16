import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Header, MainContainer, CreateContainer } from "./components";
import { getAllClotheItems } from "./utils/firebaseFuctions";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";
function App() {
    const [{clotheItems}, dispatch] = useStateValue();

    const fetchData = async () => {
        await getAllClotheItems().then(data => {
            dispatch({
                type: actionType.SET_CLOTHE_ITEMS,
                clotheItems: data
            });
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <AnimatePresence exitBeforeEnter>
            <div className="w-screen h-auto flex flex-col bg-white">
                <Header />

                <main className="md:mt-16 px-4 md:px-16 py-4 w-full">
                    <Routes>
                        <Route path="/" element={<MainContainer />} />
                        <Route
                            path="/createItem"
                            element={<CreateContainer />}
                        />
                    </Routes>
                </main>
            </div>
        </AnimatePresence>
    );
}

export default App;
