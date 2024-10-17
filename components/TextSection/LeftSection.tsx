import React from "react";

export const LeftTextSection = ({
  title,
  subHeader,
  description,
  subContent,
  image,
  extraBtn,
}: {
  title: React.ReactNode;
  extraBtn?: React.ReactNode;

  description?: React.ReactNode;
  subHeader: string;
  subContent?: string;
  image: { src: string; alt: string; map?: React.ReactNode };
}) => {
  return (
    <section className="flex flex-wrap items-center justify-between  max-h-[50rem] overflow-hidden bg-background bg-[url('/layout/net.png')] dark:bg-[url('/layout/net-dark.png')] bg-cover bg-bottom">
      {/* Image */}
      <div className="w-full md:w-1/2 h-full overflow-hidden">
        {!image.map ? (
          <img src={image.src} alt={image.alt} className="w-full h-full" />
        ) : (
          image.map
        )}
      </div>
      {/* Text */}
      <div className="w-full md:w-1/2 mt-8 md:mt-0 px-8 md:px-12 2xl:px-14 pb-12 ">
        <span className="bg-primary/30 rounded-full text-black dark:text-white  px-4 py-2 ">
          {subHeader}
        </span>
        {title}
        {subContent && (
          <div className="border-l-3 border-primary pl-4 my-4">
            {subContent}
          </div>
        )}
        {description && <div className="my-4">{description}</div>}
        {extraBtn}
      </div>
    </section>
  );
};
