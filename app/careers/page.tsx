import React from "react";
import { Metadata } from "next";
import { LeftTextSection } from "@/components/TextSection/LeftSection";
import ScamAlert from "@/components/ScamAlert";
import PageName from "@/components/PageName";

export const metadata: Metadata = {
  title: "Careers ",
  description: "Work With Us",
};

function Services() {
  return (
    <div className=" bg-background">
      <PageName>
        <h1 className="text-5xl md:text-6xl lg:text-9xl font-extrabold text-center m-auto h-fit">
          Careers
        </h1>
      </PageName>
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
            SalTech is more than a family; we share and are committed to
            continuous growth.Does this sound like where you want to be? If yes,
            apply to one of our postings; send your resume to
            support@saltechapps.com
          </>
        }
        subHeader={"Proud and Passionate"}
        image={{
          src: "/career/handshake.png",
          alt: "Proud and Passionate",
        }}
      />

      <ScamAlert />
    </div>
  );
}

export default Services;
