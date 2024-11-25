import { Element } from "react-scroll";

import { personalData } from "../personalData";

const textcolor = personalData?.TextColor?? "indigo";
const bgcolor = personalData?.BackgroundColor?? "indigo";

const Experience = () => {
  const experiences = personalData?.ExperienceDetails;

  return (
    <Element
      name="experience"
      className="w-full text-white py-20 px-4 md:px-8 relative bg-blend-hard-light"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.95)), url('https://res.cloudinary.com/navcloudin/image/upload/v1732435362/BG-2.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="relative z-10 ">
        <h2 className={`text-5xl font-bold text-center mb-16 text-indigo-400`}>Experience</h2>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-white/20" />

          {experiences.map((exp, index) => (
            <div key={index} className={`relative flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""} mb-16`}>
              {/* Timeline Node */}
              <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center z-10">
                <img src={exp.logo} alt={exp.company} className="w-10 h-10 rounded-full aspect-auto object-contain" />
              </div>

              {/* Content Card */}
              <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${index % 2 === 0 ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"}`}>
                <div className="bg-[#251f3c] bg-opacity-80 backdrop-blur-sm rounded-lg p-6 shadow-xl">
                  <h3 className="text-2xl font-bold mb-2">{exp.title}</h3>
                  <p className="text-lg text-gray-400 mb-2">{exp.company}</p>
                  <p className="text-sm text-gray-500 mb-4">{exp.period}</p>

                  <ul className="list-disc list-inside space-y-2 text-gray-300">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Element>
  );
};

export default Experience;
