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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center py-8 md:py-12 bg-background bg-[url('/layout/net.png')]">
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
        image={{
          src: "",
          alt: "",
          map: (
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3032.2191421732014!2d-80.00796434127807!3d40.536747384243434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88348ca7c6f419a1%3A0x2410b8c130451f23!2s3202%20McKnight%20E%20Dr%2C%20Pittsburgh%2C%20PA%2015237%2C%20USA!5e0!3m2!1sen!2sng!4v1727984212927!5m2!1sen!2sng"
              width="600"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          ),
        }}
      />
      <ScamAlert />
    </div>
  );
}

export default Services;
