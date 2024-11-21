import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RecentProducts from '../RecentProducts/RecentProducts';
import Loading from '../Loading/Loading';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import { useQuery } from '@tanstack/react-query';
import MainSlider from '../MainSlider/MainSlider';

export default function Home() {
    // const [products, setProducts] = useState([]);

    // async function getRecentProducts() {
    //     try {
    //         let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    //         setProducts(data.data); 
    //         console.log(data.data);
    //     } catch (error) {
    //         console.error("Error fetching products", error);
    //     }
    // }

    // useEffect(() => {
    //     getRecentProducts();
    // }, []);
    
    //reactQuery////
    function getProducts(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }

    let {data , isLoading , isError , isFetching} =useQuery({
        queryKey : ['recentProducts'],
        queryFn : getProducts
    })
        console.log(data?.data.data)




    return (
        <>
        <MainSlider/>
        <div className='container pt-6'>
            <h2 className=' textcategory text-slate-950 text-'>Shop Popular Categories</h2>
            <CategoriesSlider/>
        </div>
            {!isLoading?
                <div className='flex flex-wrap m-2 pt-14 '>
                {data?.data.data.map((product, index) => (
                    <RecentProducts key={index} product={product} />
                ))}
            </div>:<div className='text-center py-64 justify-center flex'>
            <Loading/>
    </div>}
        </>
    );
}
