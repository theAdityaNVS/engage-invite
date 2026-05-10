import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import AnimatedPhoto from './AnimatedPhoto';

const HEIGHTS = [220, 260, 240, 250, 230, 270, 245, 255];

export default function PhotoCarousel() {
  return (
    <div style={{ position: 'relative' }}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay, A11y]}
        spaceBetween={20}
        slidesPerView={1.2}
        centeredSlides={true}
        loop={true}
        autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640:  { slidesPerView: 2.2 },
          1024: { slidesPerView: 3.2 },
        }}
        style={{ paddingBottom: '2.5rem' }}
      >
        {Array.from({ length: 8 }, (_, i) => (
          <SwiperSlide key={i}>
            <div style={{
              borderRadius: '12px',
              overflow: 'hidden',
              padding: '4px',
              background: 'linear-gradient(135deg, rgba(212,168,67,0.4), rgba(139,26,43,0.2))',
            }}>
              <AnimatedPhoto
                height={`${HEIGHTS[i]}px`}
                alt={`Memory ${i + 1}`}
                index={i}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .swiper-button-next,
        .swiper-button-prev {
          color: #8B1A2B !important;
          background: rgba(255,248,240,0.9);
          width: 36px !important;
          height: 36px !important;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        }
        .swiper-button-next::after,
        .swiper-button-prev::after {
          font-size: 14px !important;
          font-weight: bold;
        }
        .swiper-pagination-bullet-active {
          background: #8B1A2B !important;
        }
        .swiper-pagination-bullet {
          background: rgba(139,26,43,0.3) !important;
        }
      `}</style>
    </div>
  );
}
