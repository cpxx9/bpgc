"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { DbImage } from "@/types";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const ImageCarousel = ({ data }: { data: DbImage[] }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const handleApiChange = (newApi: CarouselApi) => {
    setApi(newApi);

    if (newApi) {
      setCurrent(newApi.selectedScrollSnap());

      newApi.on("select", () => {
        setCurrent(newApi.selectedScrollSnap());
      });
    }
  };

  return (
    <div>
      <Carousel
        className="w-[95vw] max-w-[calc((100vh-20rem)*16/9)] mx-auto"
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
          }),
        ]}
        setApi={handleApiChange}
      >
        <CarouselContent>
          {data.map((DbImage: DbImage) => (
            <CarouselItem key={DbImage.id}>
              <Link href={DbImage.url} target="_blank">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex p-0 overflow-hidden round-md">
                      <AspectRatio ratio={16 / 9} className="w-full bg-muted">
                        <Image
                          src={DbImage.url!}
                          alt={`Image from cdn: ${DbImage.key}`}
                          fill
                          sizes="(max-w-xl) 100%"
                          className="object-cover"
                        />
                      </AspectRatio>
                    </CardContent>
                  </Card>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
      <div className="flex gap-2">
        {/* <Carousel opts={{ align: "start" }}>
          <CarouselContent></CarouselContent>
        </Carousel> */}
        {data.map((DbImage: DbImage, index) => (
          <Card
            key={DbImage.id}
            className={`w-[67px] h-[50px] ${current === index ? "border-2 border-blue-500" : ""}`}
            onClick={() => api?.scrollTo(index)}
          >
            <CardContent className="flex p-0 overflow-hidden round-md">
              <AspectRatio ratio={4 / 3} className="w-full bg-muted">
                <Image
                  src={DbImage.url!}
                  alt={`Image from cdn: ${DbImage.key}`}
                  sizes="(max-w-xl) 100%"
                  fill
                  className="object-cover"
                />
              </AspectRatio>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
