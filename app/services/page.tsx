import React from "react";
import ScamAlert from "@/components/ScamAlert";
import { LeftTextSection } from "@/components/TextSection/LeftSection";
// import {
//   FaMobileAlt,
//   FaCode,
//   FaGlobe,
//   FaBullhorn,
//   FaBuilding,
// } from "react-icons/fa";
import ServiceCard from "@/components/ServiceCard";
import AboutSection from "@/components/Home/AboutSection";

function Services() {
  return (
    <div className=" bg-background">
      <div className="container mx-auto">
        <AboutSection
          subHeader={"What We Are"}
          title={
            <>
              {" "}
              <span className="text-primary">Innovative</span>
              Services for Ambitious Brands.
            </>
          }
          description={`We offer a strategic approach to software development and digital marketing.`}
        />
        <div className="grid grid-cols-1 md:grid-cols-3  gap-8 text-center">
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
      <LeftTextSection
        title={<h2 className="text-3xl font-bold mt-4 ">Work With Us</h2>}
        description={
          <>
            Our team is a pool of energetic and passionate talents dedicated to
            making positive changes. We are a collaborative team of experts that
            thrive on challenging the status quo through unconventional
            thinking. We channel our curiosity into creating simple solutions
            for complex issues. We believe our efforts support purposeful,
            sustainable work that helps shape our communities and the future.
            SalTec is more than a family; we share and are committed to
            continuous growth.Does this sound like where you want to be? If yes,
            apply to one of our postings; send your resume to
            support@saltechapps.comgoal of providing ACCESS. Our teams are
            dynamic and lean on ind
          </>
        }
        subHeader={"Proud and Passionate"}
      />
      <ScamAlert />
    </div>
  );
}

export default Services;
