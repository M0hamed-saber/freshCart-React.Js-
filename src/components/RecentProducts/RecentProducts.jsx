import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../../context/CartContext';

export default function RecentProducts({ product }) {
    //Cart Componant
    let {addToCart} = useContext(CartContext);
    async function addCart(productId){
        let response = await addToCart(productId)
        console.log(response);
        
    }




    return (
<div className='products flex flex-col md:flex-row w-full md:w-1/2 lg:w-1/4 xl:w-1/6 p-2'>
    <div className='container'>
        <Link to={`productdetails/${product.id}`}>
            <img src={product.imageCover} className='w-full rounded-lg' alt={product.title} />
            
            {product.category && (
                <h2 className='text-sm font-semibold text-green-400'>{product.category.name}</h2>
            )}
            <h2 className='text-base font-medium'>
                {product.title.split(' ').slice(0, 2).join(' ')}
            </h2>
            <div className='flex justify-between my-2 text-gray-700'>
                <h3 className='text-md font-medium'>{product.price} EGP</h3>
                <h3 className='flex items-center'>
                    <i className='fas fa-star text-yellow-500 mr-1'></i> {product.ratingsAverage}
                </h3>
            </div>
        </Link>
        <button 
            onClick={() => addCart(product.id)} 
            className='btn bg-green-500 w-full  text-white rounded-lg py-2 mt-2 hover:bg-green-600 transition-colors duration-200'>
            Add To Cart
        </button>
    </div>
</div>
    );
}
