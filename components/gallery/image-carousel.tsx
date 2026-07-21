"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent } from "@/components/ui/card";
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
import Link from "next/link";

const ImageCarousel = ({ data }: { data: DbImage[] }) => {
  return (
    <Carousel
      className="w-[95vw] max-w-[calc((100vh-20rem)*16/9)] mx-auto"
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
  );
};

export default ImageCarousel;
