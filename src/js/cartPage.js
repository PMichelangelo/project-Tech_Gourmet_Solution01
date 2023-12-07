import { getCardProducts } from "./cartProducts";
import { initCartStorage } from "./cartStorage";

initCartStorage()

const cartProductsList = JSON.parse(localStorage.getItem("cartData"))
getCardProducts(cartProductsList)