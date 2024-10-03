import { FaCode } from "react-icons/fa";

function ServiceCard({
  description,
  title,
}: {
  description: string;
  title: string;
}) {
  return (
    <div className="p-6 bg-foreground rounded-lg ">
      <FaCode className="text-yellow-500 text-4xl mx-auto mb-4" />
      <h3 className="text-xl   dark:text-gray-800 font-semibold mb-2">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-800">{description}</p>
    </div>
  );
}

export default ServiceCard;
