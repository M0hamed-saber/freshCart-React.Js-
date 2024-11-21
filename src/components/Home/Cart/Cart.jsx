import { useContext, useEffect, useState } from "react"
import { CartContext } from "../../../context/CartContext"
import Loading from "../../Loading/Loading";
import { Link } from "react-router-dom";
    export default function Cart() {
    const {getCartItem , UpdateProductCount , deleteProductCart} = useContext(CartContext);
    const [cart, setCart] = useState(null)

    async function getCart(){
    let response = await getCartItem();
    console.log(response);
    setCart(response.data)
    }
    async function UpdateCart(productId , count){
    if (count >= 1) {
        let response = await UpdateProductCount(productId , count);
        console.log(response);
        setCart(response.data)
    }else {
        deleteCart(productId)
    }

    }
    async function deleteCart(productId){
    let response = await deleteProductCart(productId);
    console.log(response);
    setCart(response.data)
    }
    useEffect(()=>{
    getCart()
    } , [])




    return <>
    {cart ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg container mx-auto pb-10 mb-5">
            <table className="w-full text-xs md:text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Image</span>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Product
                        </th>
                        <th scope="col" className="px-6 py-3 hidden md:table-cell">
                            Qty
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Price
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {cart?.products.map((product) => (
                        <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                            <td className="p-4">
                                <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full object-cover" alt="Product" />
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                {product.product.title}
                            </td>
                            <td className="px-6 py-4 hidden md:table-cell">
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => UpdateCart(product.product.id, product.count - 1)}
                                        className="p-1 h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600"
                                    >
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 18 2">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
                                        </svg>
                                    </button>
                                    <span>{product.count}</span>
                                    <button
                                        onClick={() => UpdateCart(product.product.id, product.count + 1)}
                                        className="p-1 h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600"
                                    >
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 18 18">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                {product.price} EGP
                            </td>
                            <td className="px-6 py-4">
                                <button onClick={() => deleteCart(product.product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex flex-col md:flex-row justify-between items-center p-4 space-y-3 md:space-y-0">
                <span className="font-bold">Total Cart Price</span>
                <span>{cart.totalCartPrice} EGP</span>
            </div>
            <button className="btn bg-green-500 p-2 text-white rounded w-full md:w-auto">
                <Link to={'/checkout'}>Check Out</Link>
            </button>
        </div>
    ) : (
        <div className="text-center py-64 flex justify-center items-center">
            <Loading />
        </div>
    )}
</>
}