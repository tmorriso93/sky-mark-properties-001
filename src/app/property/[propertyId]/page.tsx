// import { Button } from "@/components/ui/button";
// import { getPropertyById } from "../../../../data/properties";
// import ReactMarkdown from 'react-markdown';
// import { ArrowLeftIcon, BathIcon, BedIcon } from "lucide-react";
// import PropertyStatusBadge from "@/components/property-status-badge";
// import numeral from "numeral";
// import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
// import Image from "next/image";
// import BackButton from "./back-button";

// export const dynamic = "force-static";


// export default async function Property({ params }: {
//     params: Promise<any>
// }) {
//     const paramsValue = await params;
//     const property = await getPropertyById(paramsValue.propertyId);

//     console.log({ property });

    
//   const addressLines = [
//     property.address1,
//     property.address2,
//     property.city,
//     property.postcode,
//   ].filter((addressLine) => !!addressLine);

//     return ( 
//         <div className="grid grid-cols-[1fr_500px]">
//             <div>
//                 {/* display images of the property in a carousel */}
//                 {/* if there are no images, display a placeholder image */}
//             {!!property.images && 
//             <Carousel className="w-full">
//                 <CarouselContent>
//                     {property.images.map((image, index) => (
//                         <CarouselItem key={image}>
//                             <div className="relative h-[80vh] min-h-80">
//                                 {/* render image of property and fill the space */}
//                                      <Image                        
//                                         src={`https://firebasestorage.googleapis.com/v0/b/sky-mark-properties.firebasestorage.app/o/${encodeURIComponent(
//                                             image
//                                             )}?alt=media`}
//                                         alt={`Image ${index + 1}`}
//                                         fill
//                                         className="object-cover"
//                                         />
//                             </div>
//                         </CarouselItem>
//                     ))}
//                 </CarouselContent>
//                 {/* Buttons to navigate the carousel */}
//                 {property.images.length > 1 && (
//                 <>
//                     <CarouselPrevious className="translate-x-24 size-12" />
//                     <CarouselNext className="-translate-x-24 size-12" />
//                 </>
//                 )}
//             </Carousel>
//             }

//         <div className="property-description max-w-screen-md mx-auto py-10 px-4" >
//             {/* back to the property list */}
//              <BackButton />
//              <ReactMarkdown >
//               {property.description}
//             </ReactMarkdown>
//         </div>
//         </div>

//         {/* display house info on the right side of the page */}
//         {/* title, badge, price, bedrooms and bathrooms */}
//         <div className="bg-sky-200 h-screen sticky top-0 grid place-items-center p-10">
//             <div className="flex flex-col gap-10 w-full">
//                 <PropertyStatusBadge status={property.status} className="mr-auto text-base" />
//                 <h1 className="text-4xl font-semibold">
//                     {addressLines.map((addressLine, index) => (
//                         <div key={index}>
//                             {addressLine}
//                             {index < addressLines.length - 1 && ","}
//                         </div>
//                     ))}
//                 </h1>
//                 <h2 className="text-3xl font-light">
//                     ${numeral(property.price).format("0,0")}
//                 </h2>

//                 <div className="flex gap-10">
//                 <div className="flex gap-2">
//                 <BedIcon /> {property.bedrooms} Bedrooms
//                 </div>
//                 <div className="flex gap-2">
//                 <BathIcon /> {property.bathrooms} Bathrooms
//                 </div>
//                 </div>

                

//             </div>
//             </div>
//         </div>
//     );
// }

//----------------------------------------------------------------

import { Button } from "@/components/ui/button";
import { getPropertyById } from "../../../../data/properties";
import ReactMarkdown from "react-markdown";
import { BathIcon, BedIcon } from "lucide-react";
import PropertyStatusBadge from "@/components/property-status-badge";
import numeral from "numeral";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import BackButton from "./back-button";

export const dynamic = "force-static";

export default async function Property({
  params,
}: {
  params: Promise<any>;
}) {
  const paramsValue = await params;
  const property = await getPropertyById(paramsValue.propertyId);

  const addressLines = [
    property.address1,
    property.address2,
    property.city,
    property.postcode,
  ].filter((addressLine) => !!addressLine);

  return (
    <div
      className="
        grid grid-cols-1
        lg:grid-cols-[1fr_420px]
        xl:grid-cols-[1fr_500px]
        gap-0 lg:gap-6
      "
    >
      {/* LEFT: media + description */}
      <div>
        {/* Images carousel (fills width, tall hero on large screens, reasonable height on small) */}
        {!!property.images && (
          <Carousel className="w-full">
            <CarouselContent>
              {property.images.map((image: string, index: number) => (
                <CarouselItem key={image}>
                  <div className="relative h-[40vh] min-h-60 sm:h-[55vh] lg:h-[80vh]">
                    <Image
                      src={`https://firebasestorage.googleapis.com/v0/b/sky-mark-properties.firebasestorage.app/o/${encodeURIComponent(
                        image
                      )}?alt=media`}
                      alt={`Image ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Carousel nav: slightly smaller on mobile, larger on desktop */}
            {property.images.length > 1 && (
              <>
                <CarouselPrevious className="size-10 sm:size-12 sm:translate-x-10 lg:translate-x-24" />
                <CarouselNext className="size-10 sm:size-12 sm:-translate-x-10 lg:-translate-x-24" />
              </>
            )}
          </Carousel>
        )}

      {/* RIGHT: sticky info panel (sticky only on lg+, full-width block on mobile) */}
      <aside
        className="
          bg-sky-200
          p-6 sm:p-8
          h-auto
          lg:h-screen
          lg:sticky lg:top-0
          flex
          items-center
        "
      >
        {/* Property info */}
        {/* Title, badge, price, bedrooms, bathrooms */}
        <div className="flex w-full flex-col gap-6 sm:gap-8">
          <PropertyStatusBadge status={property.status} className="mr-auto text-sm sm:text-base" />

        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
        {addressLines.map((addressLine, index) => (
            <div key={index}>
            {addressLine}
            {index < addressLines.length - 1 && ","}
            </div>
        ))}
        </h1>

          <h2 className="text-2xl sm:text-3xl font-light">
            ${numeral(property.price).format("0,0")}
          </h2>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <BedIcon className="shrink-0" />
              <span>{property.bedrooms} Bedrooms</span>
            </div>
            <div className="flex items-center gap-2 text-sm sm:text-base">
              <BathIcon className="shrink-0" />
              <span>{property.bathrooms} Bathrooms</span>
            </div>
          </div>
        </div>


        
      </aside>

    


    </div>

        {/* Description */}
        <div className="property-description mx-auto w-full max-w-3xl px-4 py-8 sm:py-10">
          <BackButton />
         <div className="prose max-w-none">
        <ReactMarkdown>
            {property.description}
        </ReactMarkdown>
        </div>
        </div>
      </div>
  );
}

//----------------------------------------------------------------

