import { fetchCart, fetchUser } from "../utils/fetchLocalStorageData";

const userInfo = fetchUser();
const cartInfo = fetchCart();

export const initialState = {
    user: userInfo,
    clotheItems: null,
    cartShow: false,
    cartItems: cartInfo,
};
