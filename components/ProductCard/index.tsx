import { Card, CardFooter } from "@nextui-org/card";
import Image from "next/image";

export default function ProductCard({
  imageSrc,
  appName,
  description,
}: {
  imageSrc: string;
  appName: string;
  description?: string;
}) {
  return (
    <Card isFooterBlurred className="border-none overflow-hidden">
      <Image
        alt={appName}
        className="object-cover w-full"
        height={200}
        src={imageSrc}
        width={200}
        sizes="w-full"
      />
      <CardFooter className=" block bg-primary justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute rounded-b-3xl  bottom-0 py-4 shadow-small z-10">
        <p className=" text-xl">{appName}</p>
        {description && (
          <p className="text-tiny text-white/80">{description}</p>
        )}{" "}
      </CardFooter>
    </Card>
  );
}
