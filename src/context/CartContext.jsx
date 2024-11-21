import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [cartId, setCartId] = useState(null);

    async function CheckOutSession(shippingAddress) {
        try {
            let { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,
                { shippingAddress },
                {
                    headers: {
                        token: localStorage.getItem("userToken"),
                    },
                }
            );
            console.log(data);
            return data;
        } catch (error) {
            console.error("Checkout session initiation error:", error);
            toast.error("Failed to initiate checkout session. Please try again.");
        }
    }

    async function addToCart(productId) {
        try {
            let { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/cart`,
                { productId },
                {
                    headers: {
                        token: localStorage.getItem("userToken"),
                    },
                }
            );
            toast.success(data.message, { duration: 1000, position: "top-center" });
            return data;
        } catch (error) {
            console.error("Add to cart error:", error);
            toast.error("Failed to add item to cart. Please try again.");
        }
    }

    async function deleteProductCart(productId) {
        try {
            let { data } = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                {
                    headers: {
                        token: localStorage.getItem("userToken"),
                    },
                }
            );
            toast.success("Item deleted from cart successfully.");
            return data;
        } catch (error) {
            console.error("Delete item from cart error:", error);
            toast.error("Failed to delete item from cart. Please try again.");
        }
    }

    async function UpdateProductCount(productId, count) {
        try {
            let { data } = await axios.put(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                { count },
                {
                    headers: {
                        token: localStorage.getItem("userToken"),
                    },
                }
            );
            toast.success("Product count updated successfully.");
            return data;
        } catch (error) {
            console.error("Update product count error:", error);
            toast.error("Failed to update product count. Please try again.");
        }
    }

    async function getCartItem() {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
                headers: {
                    token: localStorage.getItem("userToken"),
                },
            });
            console.log(data);
            setCartId(data.data._id);
            setCartItems(data.data.items || []); // Adjust based on actual API structure
            return data;
        } catch (error) {
            console.error("Fetch cart items error:", error);
            toast.error("Failed to fetch cart items. Please try again.");
        }
    }

    useEffect(() => {
        getCartItem();
    }, []);

    return (
        <CartContext.Provider
            value={{
                addToCart,
                cartId,
                cartItems,
                CheckOutSession,
                setCartItems,
                getCartItem,
                UpdateProductCount,
                deleteProductCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}
