import React, { useContext } from 'react';
import logo from '../../../assets/images/freshcart-logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../context/UserContext';
import { CartContext } from '../../../context/CartContext';

export default function Navbar() {

    let {userData , setUserData} = useContext(UserContext)
    const {cartItems} = useContext(CartContext)
    let navigate = useNavigate();

    function logOut(){
        localStorage.removeItem('userToken');
        setUserData(null);
        navigate('/login')
    }



    
    return (
    <>
    <nav className='bg-gray-200 py-2 capitalize md:fixed top-0 inset-x-0 text-slate-600 z-30'>
    <div className='container mx-auto flex flex-col md:flex-row justify-between items-center px-4'>
        {/* القسم الأيسر: الشعار والقوائم */}
        <div className='flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-10'>
            <img src={logo} width={120} alt="FreshCart Logo" />
            {userData && (
                <ul className='flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 text-base'>
                    <li><NavLink to="home">Home</NavLink></li>
                    <li><NavLink to="products">Products</NavLink></li>
                    <li><NavLink to="categories">Categories</NavLink></li>
                    <li><NavLink to="brands">Brands</NavLink></li>
                </ul>
            )}
        </div>
        {/* القسم الأيمن: الروابط الاجتماعية وإجراءات المستخدم */}
        <div>
            <ul className='flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3 items-center'>
                <li className='flex space-x-2 text-black text-base'>
                    <i className="fa-brands fa-facebook text-sky-800" aria-label="Facebook"></i>
                    <i className="fa-brands fa-twitter text-sky-500" aria-label="Twitter"></i>
                    <i className="fa-brands fa-linkedin text-sky-800" aria-label="LinkedIn"></i>
                    <i className="fa-brands fa-instagram text-red-600" aria-label="Instagram"></i>
                    <i className="fa-brands fa-youtube text-red-500" aria-label="YouTube"></i>
                </li>
                {userData ? (
                    <>
                        <li onClick={() => logOut()} className="mx-2 cursor-pointer text-base text-gray-500">
                            LogOut
                        </li>
                        <li>
                            <NavLink to="/cart">
                                <i className="fa-solid fa-cart-shopping"></i>{" "}
                                {cartItems?.numOfCartItems > 0 ? cartItems.numOfCartItems : "Cart is empty"}
                            </NavLink>
                        </li>
                    </>
                ) : (
                    <>
                        <li><NavLink to="/login">Login</NavLink></li>
                        <li><NavLink to="/register">Register</NavLink></li>
                    </>
                )}
            </ul>
        </div>
    </div>
</nav>

    </>
);
}
