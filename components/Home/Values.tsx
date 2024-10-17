import coreValues from "./coreValues";

const Values = () => {
  return (
    <section className="container mx-auto px-4 py-8 lg:py-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {coreValues.map((value) => (
          <div key={value.id} className="text-center">
            <div className="text-5xl  xl:text-8xl font-bold ">
              {value.id}
              <span className=" text-primary">.</span>
            </div>
            <div className="mt-2 text-xl 2xl:text-2xl  font-semibold">
              {value.title}
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg  mt-4 ">
              <div className="bg-primary dark:text-black text-white font-semibold px-2 py-4 min-h-20">
                <p className="">{value.subText}</p>
              </div>
              <div className="my-2 p-2 text-center md:min-h-56">
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
