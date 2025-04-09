"use client";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Image from "next/image";

const ImageCarousel = () => {
  return (
    <div className="relative">
      <div className="absolute w-full h-10 bg-gradient-to-t from-gray-200 to-transparent bottom-0 z-20" />

      <Carousel
        showArrows={false}
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        interval={5000}
        showIndicators={false}
      >
        <div>
          <Image
            loading="lazy"
            src="https://links.papareact.com/gi1"
            alt="Slide 1"
            width={800}
            height={500}
          />
        </div>
        <div>
          <Image
            loading="lazy"
            src="https://links.papareact.com/6ff"
            alt="Slide 2"
            width={800}
            height={500}
          />
        </div>
        <div>
          <Image
            loading="lazy"
            src="https://links.papareact.com/7ma"
            alt="Slide 3"
            width={800}
            height={500}
          />
        </div>
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
