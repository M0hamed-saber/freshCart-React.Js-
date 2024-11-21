import { useFormik } from 'formik';
import { CartContext } from '../../context/CartContext';
import { useContext, useState } from 'react';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function CheckOut() {
    const { cartId } = useContext(CartContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOnline, setisOnline] = useState(false);

    function detectAndCall(values) {
        if (isOnline) {
            OnlinePayment(values);
        } else {
            CheckOutSession(values);
        }
    }

    async function CheckOutSession(shippingAddress) {
        if (!cartId) {
            toast.error("Cart ID is missing. Please refresh and try again.");
            return;
        }
    
        try {
            setIsSubmitting(true);
            let { data } = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173 `,
                { shippingAddress },
                {
                    headers: {
                        token: localStorage.getItem("userToken"),
                    },
                }
            );
            console.log(data);
            setIsSubmitting(false);
            return data;
        } catch (error) {
            console.error("Checkout session initiation error:", error);
            toast.error("Failed to initiate checkout session. Please try again.");
            setIsSubmitting(false);
        }
    }
    
    async function OnlinePayment(shippingAddress) {
        if (!cartId) {
            toast.error("Cart ID is missing. Please refresh and try again.");
            return;
        }
    
        try {
            setIsSubmitting(true);
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
            setIsSubmitting(false);
    
            // Redirect to the payment URL if available
            if (data && data.session && data.session.url) {
                window.location.href = data.session.url;
            } else {
                toast.error("Payment URL not found. Please try again.");
            }
        } catch (error) {
            console.error("Checkout session initiation error:", error);
            toast.error("Failed to initiate checkout session. Please try again.");
            setIsSubmitting(false);
        }
    }
    

    const formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: '',
        },
        validationSchema: Yup.object({
            details: Yup.string().required('Details are required'),
            phone: Yup.string()
                .required('Phone number is required')
                .matches(/^\d+$/, 'Phone number should only contain numbers'),
            city: Yup.string().required('City is required'),
        }),
        onSubmit: detectAndCall,
    });

    return (
        <div className="mx-auto w-1/2 py-6">
            <h1 className="font-bold text-2xl mb-5 text-green-900">Check Out</h1>

            <form onSubmit={formik.handleSubmit}>
                {/* Details Input */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="details"
                        value={formik.values.details}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="details"
                        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
                            formik.touched.details && formik.errors.details ? 'border-red-500' : 'border-gray-300'
                        } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                        placeholder=" "
                    />
                    <label htmlFor="details" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:scale-75 peer-focus:-translate-y-6">
                        Enter Your Details
                    </label>
                    {formik.touched.details && formik.errors.details ? (
                        <div className="text-red-500 text-xs mt-1">{formik.errors.details}</div>
                    ) : null}
                </div>

                {/* City Input */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="city"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="city"
                        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
                            formik.touched.city && formik.errors.city ? 'border-red-500' : 'border-gray-300'
                        } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                        placeholder=" "
                    />
                    <label htmlFor="city" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:scale-75 peer-focus:-translate-y-6">
                        Enter Your City
                    </label>
                    {formik.touched.city && formik.errors.city ? (
                        <div className="text-red-500 text-xs mt-1">{formik.errors.city}</div>
                    ) : null}
                </div>

                {/* Phone Input */}
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="tel"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        id="phone"
                        className={`block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 ${
                            formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-gray-300'
                        } appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                        placeholder=" "
                    />
                    <label htmlFor="phone" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-2 -z-10 origin-[0] peer-focus:scale-75 peer-focus:-translate-y-6">
                        Enter Your Phone
                    </label>
                    {formik.touched.phone && formik.errors.phone ? (
                        <div className="text-red-500 text-xs mt-1">{formik.errors.phone}</div>
                    ) : null}
                </div>

                {/* Submit Button */}
                <button
                    onClick={() => setisOnline(false)}
                    type="submit"
                    disabled={isSubmitting}
                    className={`text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ${
                        isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
                <button
                    onClick={() => setisOnline(true)}
                    type="submit"
                    className="mx-2 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                    Online Order
                </button>
            </form>
        </div>
    );
}
