import { RightTextSection } from "@/components/TextSection/RightSection";
import { Button } from "@nextui-org/button";
import React from "react";
import products from "./products";
import ProductCard from "@/components/ProductCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Products",
};

function About() {
  return (
    <div className=" bg-background">
      <RightTextSection
        image={{ src: "/home/user-experience-interface-1.png", alt: "Vison" }}
        extraBtn={
          <Button
            href="/contact"
            radius="full"
            className="border border-primary font-semibold bg-background text-foreground"
          >
            Get In Touch{" "}
          </Button>
        }
        title={
          <h2 className="text-5xl md:text-7xl font-extrabold mt-4 ">
            We turn <span className="text-primary">ideas</span> into awesome
            products
          </h2>
        }
        description={
          <>
            Check out some of the amazing projects we’ve executed and be mind
            blown.
          </>
        }
      />

      {/* Header Section */}
      <section className="text-center p-8 w-full md:w-5/6 mx-auto">
        <h1 className="text-4xl font-bold w-full md:w-2/3 mx-auto">
          <span className=" text-yellow-500">Explore</span> Our Works
        </h1>
        <p className=" mt-4 max-w-4xl mx-auto">
          Driven by a passion for creating success stories, we excel in
          everything we do. Whether it's mobile app development, website
          creation, or digital marketing campaigns, our case studies showcase
          the processes we followed and the challenges we overcame to bring each
          project to life.
        </p>
      </section>

      {/* products */}
      <div className="container mx-auto px-4 md:px-40">
        <div className="  grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product, i) => {
            return <ProductCard key={product.appName} {...product} />;
          })}
        </div>
      </div>
      {/* Global Vision Section */}
      <section className="text-center p-8 w-full md:w-5/6 mx-auto py-6 md:py-24">
        <h1 className="text-4xl font-bold w-full md:w-2/3 mx-auto">
          <span className=" text-yellow-500">Work</span> with our team of
          experts
        </h1>
        <p className=" mt-4 max-w-4xl mx-auto">
          Do you have a project that needs pro-expertise? Speak with us about
          it! info@saltechapps.com or +1 (844) 877-1078
        </p>
        <Button
          href="/contact"
          className=" bg-primary font-semibold text-foreground"
        >
          Get in Touch
        </Button>
      </section>
    </div>
  );
}

export default About;
