import { ReactNode } from "react";

const PageName = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-[url('/layout/net.png')] dark:bg-[url('/layout/net-dark.png')] bg-cover bg-bottom h-40 md:h-96 flex items-center justify-center">
      {children}
    </div>
  );
};

export default PageName;
