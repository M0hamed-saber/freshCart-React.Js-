import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loading from '../../Loading/Loading';

export default function Products() {
  const [allProducts, setAllProducts] = useState(null)
  async function getAllProducts(){
  const {data} =  await axios.get('https://ecommerce.routemisr.com/api/v1/products')
  setAllProducts(data.data);
  }

  useEffect(()=>{
    getAllProducts()
  },[])



  return <>
  {allProducts ?   <div className='grid md:grid-cols-3 lg:grid-cols-6 gap-5 '>
    {allProducts.map((product)=> <div key={product._id} className='product p-2'>
      <img src={product.imageCover} className='w-full' alt={product.title} />
      <h5 className='font-semibold'>{product.category.name}</h5>
      <h2 className='text-sm text-main text-green-400'>{product.title}</h2>
      <div className='flex justify-between items-center'>
        <p>{product.price} EGP</p>
        <p><i className='fa-solid fa-star gold'></i>{product.ratingsAverage}</p>
      </div>
    </div> )}
  </div> : <div className='text-center py-64 justify-center flex'>
            <Loading/>
    </div>}
  </>
}
