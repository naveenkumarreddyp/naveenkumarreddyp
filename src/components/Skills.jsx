import { motion } from "framer-motion";
import { Element } from "react-scroll";
import { personalData } from "../personalData";

const textcolor = personalData?.TextColor?? "indigo";
const bgcolor = personalData?.BackgroundColor?? "indigo";

const Skills = () => {
  const skills = personalData?.SkillsData;
  return (
    <Element
      name="skills"
      className="min-h-screen flex items-center justify-center bg-gray-900 py-20 px-4"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.95)), url('https://res.cloudinary.com/navcloudin/image/upload/v1732435362/BG-2.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="max-w-6xl w-full">
        <motion.h2 initial={{ opacity: 0, y: -50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className={`text-4xl font-bold mb-12 text-center text-indigo-400`}>
          Skills
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg"
            >
              <div className="p-4 bg-gray-700 flex items-center justify-between">
                <div className="flex items-center">
                  <skill.icon className="w-6 h-6 mr-2" style={{ color: skill.color }} />
                  <h3 className="text-xl font-semibold text-white">{skill.name}</h3>
                </div>
                <span className="text-sm font-medium text-gray-300">{skill.progress}%</span>
              </div>
              <div className="p-4">
                <div className="w-full bg-gray-600 rounded-full h-2.5 mb-4">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.progress}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-2.5 rounded-full"
                    style={{ backgroundColor: skill.color }}
                  ></motion.div>
                </div>
                <motion.div initial={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden"></motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Element>
  );
};

export default Skills;
