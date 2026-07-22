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
  const [thumbApi, setThumbApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const selected = api.selectedScrollSnap();
      setCurrent(selected);

      thumbApi?.scrollTo(selected);
    };

    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, thumbApi]);

  return (
    <div className="flex flex-col items-center gap-2">
      <Carousel
        className="w-[95vw] max-w-[calc((100vh-20rem)*16/9)] mx-auto"
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 8000,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
          }),
        ]}
        setApi={setApi}
      >
        <CarouselContent>
          {data.map((DbImage: DbImage) => (
            <CarouselItem key={DbImage.id}>
              <Link href={DbImage.url} target="_blank">
                <div className="">
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
      <Carousel
        className="w-fit max-w-[95vw] md:max-w-[min(95vw,calc((100vh-20rem)*16/9))] mx-auto"
        opts={{ align: "start" }}
        setApi={setThumbApi}
      >
        <CarouselContent className="-ml-4">
          {data.map((DbImage: DbImage, index) => (
            <CarouselItem
              key={DbImage.id}
              className="pl-4 shrink-0 grow-0 basis-auto w-28 md:w-36"
            >
              <div className="">
                <Card
                  onClick={() => api?.scrollTo(index)}
                  className={`rounded-sm ${current === index ? "border-2 border-blue-500" : ""}`}
                >
                  <CardContent className="flex aspect-square items-center justify-center p-0">
                    <AspectRatio ratio={1 / 1} className="w-full bg-muted">
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
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default ImageCarousel;
