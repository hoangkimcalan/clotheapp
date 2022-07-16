import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { GiClothes } from "react-icons/gi";
import { BiCategory, BiDollarCircle } from "react-icons/bi";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import Loader from "./Loader";
import { categoRies } from "../utils/data";
import { heroData } from "../utils/data";

import "../index.css";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase.config";
import { getAllClotheItems, saveItems } from "../utils/firebaseFuctions";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";

function CreateContainer() {
    const [title, setTitle] = useState("");
    const [calories, setCalories] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState(null);
    const [imageAsset, setImageAsset] = useState(null);
    const [fields, setFileds] = useState(false);
    const [alertStatus, setAlertStatus] = useState("danger");
    const [msg, setMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [{ clotheItems }, dispatch] = useStateValue();



    const uploadImage = (e) => {
        setIsLoading(true);
        const imageFile = e.target.files[0];
        console.log(imageFile);
        const storageRef = ref(storage, `images/${Date.now()}-${imageFile.name}`)
        console.log("storageRef", storageRef);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);

        uploadTask.on("state_changed", (snapshot) => {
            const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        }, (error) => {
            console.log(error);
            setFileds(true);
            setMsg("Error while uploading: Try again 👌");
            setAlertStatus('danger');
            setTimeout(() => {
                setFileds(false);
                setIsLoading(false);
            }, 3000)
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then(dowloadUrl => {
                setImageAsset(dowloadUrl);
                setIsLoading(false);
                setFileds(true);
                setMsg("Image uploaded Successfully 😍");
                setAlertStatus("sucess");
                setTimeout(() => {
                    setFileds(false);
                }, 3000)
            })
        })
    };

    const deleteImage = () => {
        console.log("Deleted");
        setIsLoading(true);
        const deleteRef = ref(storage, imageAsset);
        deleteObject(deleteRef).then(() => {
            setImageAsset(null);
            setIsLoading(false);
            setFileds(true);
            setMsg("Image deleted Successfully 👍");
            setAlertStatus("success");
            setTimeout(() => {
                setFileds(false);
            }, 3000)
        })
    }

    const saveDetails = () => {
        console.log("Saved");
        setIsLoading(true);
        try {
            if (!title || !calories || !imageAsset || !price || !category) {
                setFileds(true);
                setMsg("Requied fields cant be empty");
                setAlertStatus("danger");
                setTimeout(() => {
                    setFileds(false);
                    setIsLoading(false);
                }, 3000)
            } else {
                const data = {
                    id: `${Date.now()}`,
                    title: title,
                    category: category,
                    image: imageAsset,
                    calories: calories,
                    price: price,
                    quantity: 1,
                }

                saveItems(data);
                clearData();
                setIsLoading(false);
                setFileds(true);
                setMsg("Data uploaded successfully 👍");
                setAlertStatus("success");
                setTimeout(() => {
                    setFileds(false);
                }, 3000)
            }
        } catch {
            console.log(error);
            setFileds(true);
            setMsg("Error while uploading: Try again 👌");
            setAlertStatus('danger');
            setTimeout(() => {
                setFileds(false);
                setIsLoading(false);
            }, 3000)
        }

        fetchData();
    }

    const clearData = () => {
        setTitle(null);
        setImageAsset(null);
        setCalories("");
        setPrice("");
        setCategory("Select category");
    }

    const fetchData = async () => {
        await getAllClotheItems().then(data => {
            dispatch({
                type: actionType.SET_CLOTHE_ITEMS,
                clotheItems: data
            });
        });
    };

    return (
        <div className="w-full min-h-screen flex items-center justify-center gap-4">
            <div className="w-[90%] md:w-[65%] h-auto border border-gray-500 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
                {fields && (
                    <motion.p
                        className={`w-full p-2 rounded-lg text-center text-lg font-semibold  ${alertStatus === "danger"
                            ? "bg-red-400 text-red-800"
                            : "bg-emerald-400 text-emerald-800"
                            } `}
                    >
                        {msg}
                    </motion.p>
                )}

                <div className="w-full py-2 border-b border-slate-600 flex items-center gap-2">
                    <GiClothes className="text-xl text-gray-700" />
                    <input
                        type="text"
                        placeholder="Give me a title..."
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                    />
                </div>

                <div className="w-full ">
                    <select
                        onChange={(e) => setCategory(e.target.value)}
                        className="decorated bg-sky-200 w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer "
                    >
                        <option value="other" className="bg-white">
                            Select category
                        </option>
                        {categoRies &&
                            categoRies.map((item) => (
                                <option
                                    key={item.id}
                                    className="optionEdit text-base border-0 outline-none capitalize bg-white text-headingColor hover:text-red-300 hover:bg-red-300"
                                    value={item.urlParamName}
                                >
                                    {item.name}
                                </option>
                            ))}
                    </select>
                </div>

                <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-[255px] md:h-[420px] cursor-pointer rounded-md ">
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <>
                            {!imageAsset ? (
                                <>
                                    <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                                        <div className="w-full h-full flex flex-col items-center justify-center gap-1">
                                            <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                                            <p className="text-gray-500 hover:text-gray-700">
                                                Click here to upload
                                            </p>
                                        </div>
                                        <input
                                            type="file"
                                            className="w-0 h-0"
                                            name="uploadimage"
                                            accept="image/*"
                                            onChange={uploadImage}
                                        />
                                    </label>
                                </>
                            ) : (
                                <>
                                    <div className="relative h-full ">
                                        <img
                                            src={imageAsset}
                                            alt="uploaded image"
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            type="button"
                                            className="absolute bottom-1 ml-5 right-0 p-3 rounded-xl bg-red-600 text-xl outlime-none hover:shadow-lg duration-500 hover:scale-105 transition-all ease-in-out"
                                            onClick={deleteImage}
                                        >
                                            <MdDelete className="text-white" />
                                        </button>
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>

                <div className="w-full flex flex-col md:flex-row items-center gap-3">
                    <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                        <BiCategory className="text-gray-700 text-2xl " />
                        <input type="text"
                            required
                            value={calories}
                            onChange={(e) => setCalories(e.target.value)}
                            placeholder="Calories"
                            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                        />
                    </div>

                    <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
                        <BiDollarCircle className="text-gray-700 text-2xl " />
                        <input type="text"
                            required
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price"
                            className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
                        />
                    </div>
                </div>

                <div className="flex items-center w-full">
                    <button type="button"
                        className="ml-0 md:ml-auto w-full md:w-auto  border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
                        onClick={saveDetails}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CreateContainer;
