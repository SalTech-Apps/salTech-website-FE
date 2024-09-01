import coreValues from "./coreValues";

const Values = () => {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {coreValues.map((value) => (
          <div key={value.id} className="text-center ">
            <div className="text-5xl  xl:text-8xl font-bold ">
              {value.id}
              <span className=" text-white dark:text-primary">.</span>
            </div>
            <div className="mt-2 text-2xl  font-semibold">{value.title}</div>
            <div className="rounded border  mt-4 ">
              <div className="bg-primary dark:text-black text-white px-2 py-4">
                <p className="">
                  Equalization, not Disruption: Systems Approach Hinged on
                  Technology
                </p>
              </div>
              <div className="my-2 text-sm p-2">
                <p>{value.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Values;
