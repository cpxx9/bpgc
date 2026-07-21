"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { DbImage } from "@/types";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const ImageCarousel = ({ data }: { data: DbImage[] }) => {
  return (
    <Carousel
      className="w-full mb-12"
      opts={{
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 10000,
          stopOnInteraction: true,
          stopOnMouseEnter: true,
        }),
      ]}
    >
      <CarouselContent>
        {data.map((DbImage: DbImage) => (
          <CarouselItem key={DbImage.id}>
            <div className="relative mx-auto">
              <Image
                src={DbImage.url!}
                alt={`Image from cdn: ${DbImage.key}`}
                height="0"
                width="0"
                sizes="100vw"
                className="w-full h-auto"
              />
              <div className="absolute inset-0 flex items-end justify-center">
                <h2 className="bg-gray-900 bg-opacity-50 text-2xl font-bold px-2 text-white">
                  Let's see what this is
                </h2>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default ImageCarousel;
