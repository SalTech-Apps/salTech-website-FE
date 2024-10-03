import React from "react";
import { Metadata } from "next";
import { LeftTextSection } from "@/components/TextSection/LeftSection";
import { RightTextSection } from "@/components/TextSection/RightSection";
import PageName from "@/components/PageName";

export const metadata: Metadata = {
  title: "Who We Are",
  description: "About US",
};

function About() {
  return (
    <div className=" bg-background">
      {" "}
      <PageName>
        <h1 className="text-5xl md:text-6xl lg:text-9xl font-extrabold text-center m-auto h-fit">
          <span className=" text-primary">Who</span> We Are
        </h1>
      </PageName>
      <section className="text-center p-8 w-full md:w-5/6 mx-auto">
        <h1 className="text-4xl font-bold w-full md:w-2/3 mx-auto">
          <span className=" text-primary">Re-thinking</span> data-driven
          mobility through community commerce
        </h1>
        <p className=" mt-4 max-w-4xl mx-auto">
          Established on the foundation of fostering black enterprise and social
          mobility, SalTec is a technology and information services
          organization. Our diverse teams provide support on trailblazing
          technology transformations with the goal of providing equitable access
          to people from all walks of life.
        </p>
        <p className=" mt-4 max-w-4xl mx-auto">
          Our diverse workforce comprises cohesive teams of industry experts and
          talented technophiles with a focus on developing and delivering model
          frameworks to simplify market access and ease the burden of entry.
          Access, Innovation, Responsibility, and Safety are the central values
          that guide ourbusiness. With business transformation in mind, our
          leadership team takes pride in our ability to re-imagine and socialize
          robust and adaptable short,mid, and long term strategies.
        </p>
      </section>
      {/* Domestic Investor Base Section */}
      <LeftTextSection
        title={
          <h2 className="text-3xl font-bold mt-4 ">Domestic Investor Base!</h2>
        }
        subContent={`All profits from our domestic businesses are reinvested within the
        community or through other affiliated domestic businesses,
        supporting an equitable wealth distribution guided by social
        responsibility. To meet our local profit re-injection targets, our
        investor base is largely domestic. Foreign investment is capped,
        with a timeline for transition to absolute domestic content. At
        SalTech, communication is enabled by the fast growing trend of
        virtual workspaces. Our operations are global with offices spread
        across Africa, Europe and North America. We collaborate with
        stakeholders in diverse industries and from different communities,
        with the unified goal of providing ACCESS. Our teams are dynamic and
        lean on industry best practices to deliver top notch platforms for
        our users.`}
        subHeader={"Proud and Passionate"}
        image={{
          src: "/about/professional.png",
          alt: "Proud and Passionate",
        }}
      />
      {/* Global Vision Section */}
      <RightTextSection
        title={
          <h2 className="text-3xl font-bold mt-4 ">With a Global Vision!</h2>
        }
        image={{
          src: "/about/globe.png",
          alt: "With a Global Vision",
        }}
        subContent={`Our talent pool draws from the domestic labour market with a goal of
        90% retention. Senior personnel are required to take on interns and
        contribute to community development through quaterly bootcamps for
        prospective talent. New employees are paired with tenured colleagues
        to provide an in-depth knowledge transfusion with encouragement to
        inspire bright new ideas.`}
        subHeader={"Local Talent"}
      />
    </div>
  );
}

export default About;
