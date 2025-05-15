"use client";

import { IMG_URL } from "@/app/constant";
import Image from "next/image";
import SwiperCore from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Banner() {
  SwiperCore.use([Navigation, Scrollbar, Autoplay]);
  const banner_image_urls = [
    `${IMG_URL}/banner_1_ent2gh.png`,
    `${IMG_URL}/banner_2_wmu2ay.png`,
    `${IMG_URL}/banner_3_tikrse.png`,
  ];
  return (
    <Swiper
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: true,
      }}
    >
      {banner_image_urls.map((url) => (
        <SwiperSlide key={url}>
          <Image
            src={url}
            alt="banner"
            width={1200}
            height={390}
            className="w-full h-auto"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
