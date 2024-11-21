import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Slider from "react-slick";


export default function CategoriesSlider() {
    var settings = {
        dots: false,
        infinite: true,
        speed: 600,
        arrows:false,
        slidesToShow: 7,
        slidesToScroll: 1,
        autoplay:true , 
        autoplaySpeed :1000
    };
    const [categories, setCategories] = useState([]);

    async function getRecentcategories() {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
            setCategories(data.data); 
            console.log(data.data);
        } catch (error) {
            console.error("Error fetching categories", error);
        }
    }

    useEffect(() => {
        getRecentcategories();
    }, []);


    return <>
    <Slider {...settings}>
    {categories?.map((category, index) => (
        <div key={index} className="text-center">
            <img
                src={category.image}
                className="w-full h-[200px] md:h-[500px] lg:h-[200px] object-cover py-3"
                alt={category.name}
            />
            <h4 className="text-base md:text-lg lg:text-sm ps-3 font-semibold mt-2">{category.name}</h4>
        </div>
    ))}
    </Slider>
    </>
}
