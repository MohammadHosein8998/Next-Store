import React from "react";

import hero1 from "@/public/images/hero1.jpg";
import hero2 from "@/public/images/hero2.jpg";
import hero3 from "@/public/images/hero3.jpg";
import hero4 from "@/public/images/hero4.jpg";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";

const carouselImages = [hero1, hero2, hero3, hero4];

function HeroCarousel() {
return (
  <div className="hidden lg:block lg:opacity-100  opacity-0 pointer-events-none lg:pointer-events-auto">
      <Carousel>
        <CarouselContent>
          {carouselImages.map((image,index) => {
            return (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="p-4">
                    <Image
                      src={image.src}
                      height={image.height}
                      width={image.width}
                      alt='hero'
                      priority={index === 0}
                      sizes="(min-width: 1024px) 100vw, 0px"
                      className="w-full h-96 rounded-md object-cover "
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselNext/>
        <CarouselPrevious/>
      </Carousel>
    </div>
  );
}

export default HeroCarousel;
