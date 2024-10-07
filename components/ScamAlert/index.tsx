import AboutSection from "../Home/AboutSection";

function ScamAlert() {
  return (
    <AboutSection
      title={
        <>
          {" "}
          <span className="text-primary">Important</span> Notice: Employment
          Scams
        </>
      }
      description={`SalTech is aware of fraudulent postings and scam emails targeting potential and prospective employees. These scams mimic official SalTech communications and falsely offer employment opportunities in exchange for payment.
      Please note that SalTech never requests payment from candidates. If you receive any communication requesting a fee for a job application, please be advised that it is not legitimate and should be disregarded.`}
      subConent={""}
    />
  );
}

export default ScamAlert;
