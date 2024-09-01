import { Button } from "@nextui-org/button";
import React from "react";

const AboutSection = () => {
  return (
    <section className=" py-12">
      <div className="container mx-auto text-center">
        <Button className="bg-primary/30 py-2 px-6 rounded-full text-lg font-semibold">
          What We Are
        </Button>
        <p className="mt-6  text-lg max-w-4xl mx-auto">
          Founded on the principles of fostering black enterprise and driving
          social mobility, SalTec is a technology and information services
          organization. We are dedicated to revolutionizing the digital
          landscape in Africa by developing innovative solutions that empower
          individuals, businesses, and communities.
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
