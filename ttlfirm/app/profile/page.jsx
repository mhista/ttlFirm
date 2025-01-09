import ImageSection from "@components/pages/profile/imageSection";

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
    "BA, Rutgers University, New Jersey, 2001",
    "Master of Law, Seton Hall University School of Law, New Jersey, 2007",
    "Admitted to the New Jersey Bar, 2013",
    "Member of the New Jersey State Bar Association",
    "Member of the New Jersey Women Lawyers Association",
    "Speaker at New Jersey Legal Professionals Development Seminars",
  ];
  const awardAndRecognitions = [
    {
      recognition: "Leading Lawyer in New Jersey for Dispute Resolution",
      award: "Recognized by The Legal500 (2015–2018)",
    },
    {
      recognition: "Leading Lawyer in New Jersey for Family Law",
      award: "Honored at the New Jersey Legal Awards, 2016",
    },
    {
      recognition: "Best Legal Team in New Jersey for International Trade",
      award: "Awarded at the New Jersey Legal Awards, 2018",
    },
    {
      recognition: "Leading Lawyer in New Jersey for Private Clients Practice",
      award: "Recognized by The Legal500, 2018",
    },
  ];

  return (
    <div className="relative w-full flex flex-col md:flex-row justify-center md:items-start md:justify-around items-center mt-6 md:my-8 md:gap-7 md:px-7">
      <ImageSection />
      <div className="md:w-full">
        {/* biography */}
        <div className=" sm:p-16 md:p-0 w-full">
          <div className="flex flex-col gap-4 p-8  sm:pt-0 ">
            <h1 className="font-lora text-2xl font-medium">Biography</h1>
            <p className="text-pretty text-gray-500">
              Onwuzuruoha Turuchi is the founding attorney of Turichi Law Firm, a
              legal practice dedicated to championing justice for individuals in
              cases involving accidents, medical malpractice, and victim
              advocacy. With a steadfast commitment to her clients, Onwuzuruoha has
              built a reputation as a compassionate advocate and a formidable
              legal strategist. A graduate of [Insert University Name] with a
              specialization in personal injury and healthcare law, Onwuzuruoha
              brings a wealth of experience and an unwavering dedication to each
              case she handles. Her journey in the legal profession began with a
              deep desire to make a difference in the lives of those who have
              suffered from injustice, and she has since become a trusted ally
              for countless clients seeking fair compensation and resolution.
              Onwuzuruoha's approach is marked by her ability to combine empathy with
              tenacity. She takes the time to understand each client’s unique
              story, ensuring they feel heard and supported throughout the legal
              process. Her attention to detail and commitment to achieving
              favorable outcomes have earned her recognition within the legal
              community and heartfelt gratitude from her clients. Outside the
              courtroom, Onwuzuruoha is passionate about giving back to the
              community. She actively participates in initiatives that raise
              awareness about legal rights and provides pro bono services to
              underserved populations. As the driving force behind Turichi Law
              Firm, Onwuzuruoha Turuchi continues to redefine what it means to
              advocate for justice, one client at a time.
            </p>
          </div>
          {/* practice area */}
          <div className="flex flex-col p-8 gap-4 ">
            <h1 className="font-lora text-2xl font-medium">Practice Areas</h1>
            <Area title={"Business Law"} />
            <Area title={"Personal Injury"} />
            <Area title={"Estate Litigation"} />
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
                  <div className="flex flex-row gap-2 items-center" key={index}>
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
            <h1 className="font-lora text-2xl font-medium">Honors & Awards</h1>
            {awardAndRecognitions.map((items, index) => (
              <span className="flex flex-col gap-4" key={index}>
                <hr className="bg-amber-600 h-[2px] w-14" />

                <p className="text-pretty text-gray-500">{items.recognition}</p>
                <h1 className="text-lg opacity-80 font-bold">{items.award}</h1>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
