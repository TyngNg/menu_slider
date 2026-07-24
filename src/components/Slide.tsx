import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/free-mode';
import pic1 from '../assets/1.jpeg';
import pic2 from '../assets/2.jpeg';
import pic3 from '../assets/3.jpeg';
import pic4 from '../assets/4.jpeg';
import pic5 from '../assets/5.jpeg';
import pic6 from '../assets/6.jpeg';
import pic7 from '../assets/7.jpeg';
import Curve from '../assets/curve.svg?react';
import Arr from '../assets/arr.svg?react';
import { useState } from 'react';

const Slide = () => {
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const images = [pic1, pic2, pic3, pic4, pic5, pic6, pic7];

  return (
    <div className="relative w-full mt-[3em] isolate">
      <Curve className="absolute top-0 left-0 w-[101%] z-10" />
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        onSwiper={setSwiperRef}
        slidesPerView={3.2}
        centeredSlides={true}
        longSwipesRatio={22222}
        loop={true}
        speed={200}
        grabCursor={true}
        cssMode={false}
        className="w-full py-4 relative z-20"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <div className="h-[40vw] rounded-xl overflow-hidden">
              <img
                src={img}
                className="hvr-img w-full h-full object-cover select-none "
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="absolute bottom-0 left-0 w-full z-10">
        <Curve className="rotate-180 w-[101%] -mx-px" />
        <div className="flex w-full items-center top-[50%] -translate-y-1/2 justify-center gap-[1em] absolute">
          <button
            className="hvr-Btn relative group border-2 border-black rounded-full w-[3.33em] h-[3.33em] flex items-center justify-center overflow-hidden transition-colors duration-300 "
            onClick={() => swiperRef?.slidePrev()}
          >
            <div className="absolute inset-0 bg-black translate-x-full -translate-y-full  rounded-full transition-transform duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0" />

            <div className="relative z-10 transition-colors duration-300 group-hover:text-[#e9c6dd]">
              <Arr className="w-[1.5em] h-[1.3em] transition-colors duration-300" />
            </div>
          </button>
          <button
            className="hvr-Btn relative group border-2 border-black rounded-full w-[3.33em] h-[3.33em] flex items-center justify-center rotate-y-180 overflow-hidden transition-colors duration-300 "
            onClick={() => swiperRef?.slideNext()}
          >
            <div className="absolute inset-0 bg-black translate-x-full -translate-y-full  rounded-full transition-transform duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0" />
            <div className=" relative z-10 transition-colors duration-300 group-hover:text-[#e9c6dd]">
              <Arr className="w-[1.5em] h-[1.3em] transition-colors duration-300" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slide;
