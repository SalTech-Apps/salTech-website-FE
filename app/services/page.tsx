import React from "react";
import { Metadata } from "next";
import ScamAlert from "@/components/ScamAlert";
import ServiceCard from "@/components/ServiceCard";
import AboutSection from "@/components/Home/AboutSection";
import PageName from "@/components/PageName";

export const metadata: Metadata = {
  title: "Services ",
  description: "Innovative Services for Ambitious Brands.",
};

function Services() {
  return (
    <div className=" bg-background">
      <PageName>
        <h1 className="text-5xl md:text-6xl lg:text-9xl font-extrabold text-center m-auto h-fit">
          Services
        </h1>
      </PageName>
      <div className="container mx-auto">
        <AboutSection
          subHeader={"What We Are"}
          title={
            <>
              {" "}
              <span className="text-primary">Innovative </span>
              Services for Ambitious Brands.
            </>
          }
          description={`We offer a strategic approach to software development and digital marketing.`}
        />
        <div className="container mx-auto px-4 md:px-40 grid grid-cols-1 md:grid-cols-3 gap-8 text-center py-8 md:py-12 bg-background bg-cover bg-[url('/layout/net.png')] dark:bg-[url('/layout/net-dark.png')]">
          {/* Service Card 1 */}

          <ServiceCard
            description={`As a team that embraces employee satisfaction, we look for people
              who will positively impact productivity of the company.`}
            title={"Rapid Prototyping"}
          />
          <ServiceCard
            description={` We seek problem-solvers who are passionate about breaking down
              barriers and developing their experience.`}
            title={"Mobile App Development"}
          />
          <ServiceCard
            description={`We don’t just attract local talent in diverse markets, but also
              locate business goals with local intent.`}
            title={"Web App Development"}
          />
          <ServiceCard
            description={`As a team that embraces employee satisfaction, we look for people
              who will positively impact productivity of the company.`}
            title={"Social Media Marketing"}
          />
          <ServiceCard
            description={`We seek problem-solvers who are passionate about breaking down
              barriers and developing their experience.`}
            title={"Corporate Websites"}
          />
        </div>
      </div>

      <ScamAlert />
    </div>
  );
}

export default Services;
