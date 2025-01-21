import ImageSection from "@components/pages/profile/imageSection";
import Section4 from "@components/common/section4";

import Consultation from "@components/pages/home/consult";
const Area = ({ title }) => {
  return (
    <span className="flex gap-2 items-center opacity-85">
      <div className="h-[13px] w-[13px] rounded-full border-2 border-amber-600 flex justify-center items-center">
        <div className="h-[5px] w-[5px] rounded-full bg-amber-600"></div>
      </div>
      <p className="text-amber-600 ">{title}</p>
    </span>
  );
};

const Profile = () => {
  const educationAndBarAdmission = [
    "University of Arizona, James E. Rogers College of Law J.D. (2019)",
    "Nigerian Law School, B.L. (2016)",
    "University of Nigeria, Enugu Campus LL.B. (2015)",
  ];
  const awardAndRecognitions = [
    {
      recognition: "Bar Admission",
      award:
        "Admitted to the State bar of New Jersey with the ability to waive into multiple states",
    },
  ];

  return (
    <div>
      <div className="relative w-full flex flex-col md:flex-row justify-center md:items-start md:justify-around items-center pt-6 md:py-8 md:gap-7 md:px-7 z-[60] bg-white">
        <ImageSection />
        <div className="md:w-full">
          {/* biography */}
          <div className=" sm:p-16 md:p-0 w-full">
            <div className="flex flex-col gap-4 p-8  sm:pt-0 ">
              <h1 className="font-lora text-2xl font-medium">
                Meet Our Founder
              </h1>
              <p className="text-pretty text-gray-500">
                Turuchi Iheanachor is the founder and managing attorney of our
                law firm. She is a results driven attorney….
                <br />
                <br />
                Turuchi S. Iheanachor is a results-driven attorney fueled by an
                unwavering commitment to justice and advocacy. Specializing in
                personal injury law, Turuchi combines her legal acumen,
                tenacity, and compassion to fight for individuals who have
                suffered injuries or injustices. Her mission is clear: to
                deliver aggressive representation tailored to the unique needs
                of every client, ensuring they receive the compensation and
                justice they deserve. <br />
                <br /> Turuchi's legal career is defined by her unwavering
                dedication to empowering her community through advocacy and
                justice. With a robust and diverse legal background, she takes
                pride in championing the rights of individuals against
                formidable adversaries, including powerful corporations and
                major insurance companies. Her practice extends far beyond
                personal injury law, encompassing immigration law, workers'
                compensation, municipal court matters, and a variety of other
                legal services. From navigating the intricate nuances of
                immigration cases to securing fair compensation for injured
                workers or resolving municipal court disputes, Turuchi is a
                relentless advocate and trusted guide, committed to delivering
                exceptional representation at every stage of the legal process.
                <br />
                <br /> Turuchi has a unique advantage, having previously
                represented large insurance companies, agencies, and
                municipalities as a defense attorney in high-stakes cases
                involving construction accidents, motor vehicle collisions, and
                catastrophic injuries. This invaluable experience allows her to
                anticipate and counter the strategies of opposing counsel,
                giving her clients a distinct edge. Committed to staying ahead
                of legal developments, Turuchi employs a strategic approach that
                ensures every case is handled with precision and care.
              </p>
              <h1 className="font-lora text-xl font-medium">
                A Global Perspective and Proven Expertise
              </h1>
              <p className="text-pretty text-gray-500">
                Turuchi earned her Juris Doctor from the University of Arizona
                James E. Rogers College of Law and is licensed to practice in
                New Jersey, with the ability to waive into other jurisdictions.
                Her academic foundation is complemented by her international
                experience, holding a Bachelor of Laws (LL.B.) from the
                University of Nigeria and a Barrister-at-Law designation from
                the Nigerian Law School.
                <br />
                <br /> During law school, Turuchi distinguished herself as a
                leader and advocate. She served as an Editor for the Journal of
                Environmental Law and Policy, a Supreme Court Teaching Fellow,
                and a student advocate in both the Domestic Violence Clinic and
                Civil Rights Restoration Clinic. Her dedication to public
                service included providing pro bono legal representation to
                survivors of intimate partner violence and assisting individuals
                with criminal convictions as they sought to rebuild their lives.
                She also served as philanthropy chair for the Law Women’s
                Association and secretary for the Black Law Students
                Association.
              </p>
              <h1 className="font-lora text-xl font-medium">
                Compassionate Representation That Delivers Results
              </h1>
              <p className="text-pretty text-gray-500">
                Since completing law school, Attorney Turuchi has earned a
                reputation as a skilled and relentless litigator, passionately
                advocating for her clients across a broad spectrum of legal
                matters. With a proven history of success, she has recovered
                millions of dollars in settlements and verdicts for individuals
                injured by negligence, consistently delivering justice for her
                clients. Turuchi approaches each case with unwavering
                determination, fighting fiercely to ensure those who have
                suffered harm receive the compensation they deserve. <br />
                <br /> She understands the profound physical, emotional, and
                financial challenges that injuries impose on individuals and
                their families. With compassion, integrity, and a personalized
                approach, Turuchi guides her clients through every step of the
                legal process, empowering them with clarity and support during
                even the most difficult times.
                <br />
                <br />
                Whether pursuing compensation for personal injury, navigating
                the complexities of immigration law, or addressing workers’
                compensation and municipal matters, Attoney Turuchi is the
                advocate you need in your corner. Her unmatched dedication,
                strategic expertise, and steadfast commitment to her clients’
                rights make her an indispensable ally in achieving justice and
                securing the best possible outcomes.
                <br />
                <br />
                Let AttorneyTuruchi be your voice for justice. Contact her today
                to secure the representation you deserve.
              </p>
            </div>
            {/* practice area */}
            <div className="flex flex-col p-8 gap-4 ">
              <h1 className="font-lora text-2xl font-medium">Practice Areas</h1>
              <Area title={"Personal Injury"} />
              <Area title={"Immigration Law"} />
              <Area title={"Workers' Compensation"} />
              <Area title={"Municipal Matters"} />
            </div>
            <span className="flex justify-center items-center md:justify-center">
              <hr className=" w-[90%] opacity-85 bg-amber-600 my-5" />
            </span>
            {/* education */}
            <div className="flex flex-col p-8 gap-4 ">
              <h1 className="font-lora text-2xl font-medium">
                Education & Bar Admission
              </h1>
              {educationAndBarAdmission.map((item, index) => {
                if (typeof item === "string") {
                  return (
                    <p className="text-pretty text-gray-500" key={index}>
                      {item}
                    </p>
                  );
                } else {
                  return (
                    <div
                      className="flex flex-row gap-2 items-center"
                      key={index}
                    >
                      <hr className="h-[2px] w-14 bg-amber-600" key={index} />
                      <p
                        className="text-amber-600 uppercase inline font-bold"
                        key={index}
                      >
                        {item[3]}
                      </p>
                    </div>
                  );
                }
              })}
            </div>
            <span className="flex justify-center items-center md:justify-center my-5">
              <hr className=" w-[90%] opacity-85 bg-amber-600" />
            </span>
            {/* honors and awards */}
            <div className="flex flex-col p-8 gap-4 ">
              <h1 className="font-lora text-2xl font-medium">Honors</h1>
              {awardAndRecognitions.map((items, index) => (
                <span className="flex flex-col gap-4" key={index}>
                  <hr className="bg-amber-600 h-[2px] w-14" />

                  <p className="text-pretty text-gray-500">
                    {items.recognition}
                  </p>
                  <h1 className="text-lg opacity-80 font-bold">
                    {items.award}
                  </h1>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Section4>
        <Consultation />
      </Section4>
    </div>
  );
};

export default Profile;
