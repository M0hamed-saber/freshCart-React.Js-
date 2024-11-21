    import React from 'react'
    import slide1 from '../../assets/images/slider-image-3.jpeg'
    import slide2 from '../../assets/images/slider-image-2.jpeg'
    import slide3 from '../../assets/images/slider-image-1.jpeg'
    import Slider from 'react-slick';

    export default function MainSlider() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            arrows:false,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay:true , 
            autoplaySpeed :3000
        };

    return<>
    <div className='flex flex-col md:flex-row container mx-auto space-y-4 md:space-y-0 md:space-x-4'>
    {/* قسم الـ Slider */}
    <div className='w-full md:w-3/4'>
        <Slider {...settings}>
            <img src={slide1} className='w-full h-auto md:h-[400px]' alt="Slide 1" />
            <img src={slide2} className='w-full h-auto md:h-[400px]' alt="Slide 2" />
            <img src={slide3} className='w-full h-auto md:h-[400px]' alt="Slide 3" />
        </Slider>
    </div>
    
    {/* قسم الصور الثابتة */}
    <div className='w-full md:w-1/4 flex flex-col space-y-1'>
        <img src={slide1} className='w-full h-auto md:h-[200px]' alt="Small Slide 1" />
        <img src={slide2} className='w-full h-auto md:h-[200px]' alt="Small Slide 2" />
    </div>
</div>

    </>












}