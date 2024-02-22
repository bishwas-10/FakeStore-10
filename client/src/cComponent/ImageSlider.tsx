import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import 'swiper/css/pagination';
// import required modules
import {Autoplay, Navigation,Pagination } from "swiper/modules";

type ImageSliderProps = {
  images: {
    url: string;
    alt: string;
  }[];
};

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  return (
    <>
      <Swiper
         slidesPerView={1}
         spaceBetween={30}
         loop={true}
         pagination={{
           clickable: true,
         }}
         autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
         navigation={true}
         modules={[Pagination,Autoplay, Navigation]}
        className="mySwiper"
      >
        {images.map((image, index) => {
          return (
            <SwiperSlide key={index}>
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-80 lg:h-screen  object-cover  md:object-fit"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
};

export default ImageSlider;
