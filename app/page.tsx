import { Metadata } from "next";
import NextLink from "next/link";
import { Button } from "@nextui-org/button";
import Values from "@/components/Home/Values";
import AboutSection from "@/components/Home/AboutSection";
import { RightTextSection } from "@/components/TextSection/RightSection";
import { LeftTextSection } from "@/components/TextSection/LeftSection";

export const metadata: Metadata = {
  title: "SalTech",
};

export default function Home() {
  return (
    <div>
      <RightTextSection
        image={{ src: "/home/user-experience-interface-1.png", alt: "Vison" }}
        extraBtn={
          <Button
            as={NextLink}
            href="/contact"
            radius="full"
            className="border border-primary font-semibold bg-background text-foreground"
          >
            Get in Touch
          </Button>
        }
        title={
          <h2 className="text-5xl md:text-8xl font-extrabold mt-4 ">
            <span className="text-primary">Sal</span>Tech
          </h2>
        }
        description={
          <>
            SalTech is an innovative lab with a diverse team of individuals
            dedicated to using digital tools to drive and solve unique
            human-related issues. As a self-founded company, we are committed to
            leveraging our products and partnerships to positively impact our
            youth population. We develop products and launch projects quickly
            across healthcare, fintech, lifestyle, human resources, and
            business2business applications, all with the intention of changing
            the world as we know it.
          </>
        }
      />

      <Values />
      <LeftTextSection
        extraBtn={
          <Button
            radius="full"
            className="border border-primary font-semibold bg-background text-foreground"
          >
            Find Out More
          </Button>
        }
        image={{
          src: "/home/user-experience-interface-2.png",
          alt: "Empowered through Innovation",
        }}
        title={
          <h2 className="text-3xl font-bold mt-4 ">
            <span className="text-primary">Empowered</span> through <br />{" "}
            Innovation
          </h2>
        }
        subContent={`The fundamental value guiding our mission at SalTech is Empowerment
        Through Innovation. We believe that by harnessing the power of
        innovative mobile technologies, we can empower individuals,
        businesses, and communities to overcome local challenges and drive
        positive change across world.`}
        description={
          <>
            As technology becomes an integral part of daily life, we reimagine
            its role in fostering community growth and development. We are
            dedicated to creating opportunities for people and businesses to
            thrive by providing access to cutting-edge mobile solutions tailored
            to the unique needs of all our users. By bridging the digital
            divide, we strive to build a brighter future for everyone, where
            everyone has the tools and resources to succeed.
          </>
        }
        subHeader={"Data-driven Mobility"}
      />
      <AboutSection
        subHeader={"What We Are"}
        title={undefined}
        description={
          "Founded on the principles of fostering black enterprise and driving social mobility, SalTech is a technology and information services organization. We are dedicated to revolutionizing the digital landscape in Africa by developing innovative solutions that empower individuals, businesses, and communities."
        }
        subConent={""}
      />
    </div>
  );
}
