import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import SwiperCore from "swiper";
import { Autoplay } from "swiper/modules";

SwiperCore.use([Autoplay]);

function HomeSlider() {
  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1600&h=400&fit=crop",
      title: "Latest Mobiles",
      subtitle: "Up to 40% Off",
    },
    {
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1600&h=400&fit=crop",
      title: "Laptops & Electronics",
      subtitle: "Best Deals Today",
    },
    {
      image:
        "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&h=400&fit=crop",
      title: "Fashion Sale",
      subtitle: "Min 50% Off",
    },
  ];

  // return (
  //   <div className="slider-container">
  //     <Swiper
  //       slidesPerView={1}
  //       loop={true}
  //       autoplay={{ delay: 3000, disableOnInteraction: false }}
  //     >
  //       {slides.map((slide, index) => (
  //         <SwiperSlide key={index}>
  //           <div className="slide">
  //             <img src={slide.image} alt="banner" />
  //             <div className="overlay">
  //               <h2>{slide.title}</h2>
  //               <p>{slide.subtitle}</p>
  //               <button>Shop Now</button>
  //             </div>
  //           </div>
  //         </SwiperSlide>
  //       ))}
  //     </Swiper>
  //   </div>
  // );

  return (
    <div className="w-full">
      <Swiper
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        className="rounded-2xl overflow-hidden"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
              {/* Background Image */}
              <img
                src={slide.image}
                alt="banner"
                className="w-full h-full object-cover"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-6">
                <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-bold mb-4">
                  {slide.title}
                </h2>

                <p className="text-white text-lg md:text-xl mb-6">
                  {slide.subtitle}
                </p>

                <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 active:scale-95">
                  Shop Now
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default HomeSlider;
