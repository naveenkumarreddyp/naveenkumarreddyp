import { personalData } from "../personalData";

const Footer = () => {
  return (
    <div>
      <footer className="text-center py-4 md:mt-24  mt-4 min-w-full bg-transparent ">
        <p className="flex gap-2">
          Crafted with <p className="animate-bounce">❤️</p> by{" "}
          <p className="text-[#00ffff]">{personalData?.Name}</p>
        </p>
      </footer>
    </div>
  );
};

export default Footer;
