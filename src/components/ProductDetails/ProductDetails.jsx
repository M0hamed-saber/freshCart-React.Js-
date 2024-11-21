    import axios from 'axios';
    import React, { useEffect, useState } from 'react';
    import { useParams } from 'react-router-dom';
    import Slider from "react-slick";
    import Loading from '../Loading/Loading';


    export default function ProductDetails() {
    let { id } = useParams();
    const [productDetails, setProductDetails] = useState({});
    const [loading, setLoading] = useState(true);
    //react-slick
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        arrows:false,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true , 
        autoplaySpeed :1000
    };
    async function getProductdetails() {
        setLoading(true);
        try {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
        setProductDetails(data.data);
        } catch (error) {
        console.error("Error fetching product details:", error);
        } finally {
        setLoading(false);
        }
    }

    useEffect(() => {
        getProductdetails();
    }, []);

    return (
        <>
        {loading  ? (
            <div className='text-center py-64 justify-center flex'> <Loading/> </div>
        ) : (
            <div className='flex items-center container'>
            <div className="w-1/4 mx-10">
            {productDetails.images > 1 ? <Slider {...settings}>
                {productDetails.images.map((image , index)=> <img key={index} src={image} className='w-full' alt=''/>)}
            </Slider> : <img  src={productDetails.imageCover} className='w-full' alt=''/> }
            </div>
            <div className="w-3/4">
                <div>
                <h2>{productDetails.title || 'Loading...'}</h2>
                <p className='my-6  text-gray-500'>
                    {productDetails.description || 'Loading description...'}
                </p>
                <h3>{productDetails.category?.name || 'Loading category...'}</h3>
                <div className='flex justify-between my-2'>
                    <h3>{productDetails.price ? `${productDetails.price} EGP` : 'Loading price...'}</h3>
                    <h3>
                    <i className='fas fa-star gold'></i> {productDetails.ratingsAverage || '0'}
                    </h3>
                </div>
                <button className='btn bg-green-500 w-full text-white rounded my-5'>
                    Add To Cart
                </button>
                </div>
            </div>
            </div>
        )}
        </>
    );
    }
