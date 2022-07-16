import {
    doc,
    collection,
    getDocs,
    orderBy,
    query,
    setDoc,
} from "firebase/firestore";
import { firestore } from "../firebase.config";

export const saveItems = async (data) => {
    await setDoc(doc(firestore, "clotheItems", `${Date.now()}`), data, {
        merge: true,
    });
};

export const getAllClotheItems = async () => {
    const items = await getDocs(
        query(collection(firestore, "clotheItems"), orderBy("id", "desc"))
    );

    return items.docs.map((doc) => doc.data());
};
