import { Button } from "@nextui-org/button";
import React from "react";

const AboutSection = ({
  subHeader,
  title,
  description,
  subConent,
}: {
  subHeader?: string;
  title?: React.ReactNode;
  description: string;
  subConent?: string;
}) => {
  return (
    <section className=" py-12">
      <div className="container mx-auto text-center">
        {subHeader && (
          <Button className="bg-primary/30 py-2 px-6 rounded-full text-lg ">
            {subHeader}
          </Button>
        )}
        {title && (
          <div className=" text-2xl md:text-3xl font-semibold">{title}</div>
        )}
        <p className="mt-6 max-w-4xl mx-auto">{description}</p>
        {subConent && (
          <div className="bg-primary py-2 px-6 rounded-full text-lg font-semibold">
            {subConent}
          </div>
        )}
      </div>
    </section>
  );
};

export default AboutSection;
