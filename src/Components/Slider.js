import { Navigation, Pagination, Scrollbar, A11y , Autoplay} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


const Slider = ({Images}) => {
    
  return (
    <div className="xl:w-[100%] max-w-[100vw] m-[5rem auto] h-[60px] xl:mb-[20rem] lg:mb-[10rem]  lg:max-w-[100vw] mb-0  sm:mb-[0rem] select-none">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={true}
        navigation
        pagination={{ clickable: true }}

      >
        {Images.map((img, imgIndex) => {
          return (
              <SwiperSlide className="md:mb-[-3rem]"  key={imgIndex}>
                <img
                  src={img}
                  className = "w-[100%] mr-[-10px] ml-[0px] z-[-1] md:mb-[-140px] mb-[10px]"
                  alt=""
                />
              </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Slider