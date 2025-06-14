import React from "react";

export const RightTextSection = ({
  title,
  subHeader,
  description,
  subContent,
  extraBtn,
  image,
}: {
  title: React.ReactNode;
  extraBtn?: React.ReactNode;
  description?: React.ReactNode;
  subHeader?: string;
  subContent?: string;
  image: { src: string; alt: string };
}) => {
  return (
    <section className=" mx-auto w-full 2xl:container flex flex-wrap items-center justify-between max-h-[50rem] overflow-hidden bg-background bg-[url('/layout/net.png')] dark:bg-[url('/layout/net-dark.png')] bg-cover bg-bottom">
      {/* Text */}
      <div className="w-full md:w-1/2 mt-8 md:mt-0 px-8 md:px-12 2xl:px-14  pb-12">
        {subHeader && (
          <span className="bg-primary/30 rounded-full text-black dark:text-white font-bold px-4 py-2 ">
            {subHeader}
          </span>
        )}
        {title}
        {subContent && (
          <div className="border-l-3 border-primary pl-4 my-4">
            {subContent}
          </div>
        )}
        {description && <div className="my-4">{description}</div>}
        {extraBtn}
      </div>

      {/* Image */}
      <div className="w-full h-full md:w-1/2 overflow-hidden">
        <img src={image.src} alt={image.alt} className="w-full h-full" />
      </div>
    </section>
  );
};
