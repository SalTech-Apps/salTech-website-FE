import React from "react";
import AboutSection from "@/components/Home/AboutSection";
import { LeftTextSection } from "@/components/TextSection/LeftSection";

function Services() {
  return (
    <div className=" bg-background">
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
            support@saltechapps.com
          </>
        }
        subHeader={"Proud and Passionate"}
      />

      <AboutSection
        subHeader={"What We Are"}
        title={
          <>
            {" "}
            <span className="text-primary">Innovative</span> Services for
            Ambitious Brands.
          </>
        }
        description={`We offer a strategic approach to software development and digital marketing.`}
        subConent={""}
      />
    </div>
  );
}

export default Services;
