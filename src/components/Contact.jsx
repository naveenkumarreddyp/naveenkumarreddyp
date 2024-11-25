import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { Element } from "react-scroll";
import { useForm, ValidationError } from "@formspree/react";

import Footer from "./Footer";
import { personalData } from "../personalData";

const textcolor = personalData?.TextColor?? "indigo";
const bgcolor = personalData?.BackgroundColor?? "indigo";

let apiKey = import.meta.env.VITE_FORMSPREE_KEY;

const Contact = () => {
  const [state, handleSubmit] = useForm(apiKey);
  const [formState, setFormState] = useState({ success: false, error: false });
  // Handle submission via Formspree
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Handle submission via Formspree
    await handleSubmit(event);
    console.log("----", JSON.stringify(state));
    if (state && !state.errors) {
      event.target.reset(); // Clear form fields
      setFormState({ success: true, error: false });
      setTimeout(() => setFormState({ success: false, error: false }), 5000); // Remove success message after 5 seconds
    } else {
      setFormState({ success: false, error: true });
      setTimeout(() => setFormState({ success: false, error: false }), 2000);
    }
  };

  // if (state.succeeded) {
  // console.log("---thanks----");
  //return <p>Thanks for joining!</p>;
  // }
  return (
    <Element
      id="contact"
      name="contact"
      className="min-h-screen flex items-center justify-center flex-col"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.95)), url('https://res.cloudinary.com/navcloudin/image/upload/v1732435362/BG-2.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="container mx-auto px-4 pt-5">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`text-3xl md:text-4xl font-bold mb-16 mt-10 text-center text-indigo-400`}
        >
          Contact
        </motion.h2>
        <div className="flex flex-col md:flex-row max-w-4xl mx-auto md:gap-40">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="md:w-1/2 mb-8 md:mb-0 md:self-center">
            <h3 className="text-2xl font-semibold mb-4 underline underline-offset-2">Get in Touch</h3>
            <p className="mb-4">Feel free to reach out to me for any inquiries or opportunities.</p>
            <div className="mb-4">
              <p className="font-semibold">Email:</p>
              <p>{personalData?.Email}</p>
            </div>
            <div className="mb-10">
              <p className="font-semibold">Phone:</p>
              <p>{personalData?.PhoneNumber}</p>
            </div>
            <div className="flex space-x-4">
              <a href={personalData?.LinkedInUrl} target="_blank" className={`text-indigo-400 hover:text-indigo-300`}>
                <FaLinkedin className="text-2xl" />
              </a>
              <a href={personalData?.GithubUrl} target="_blank" className={`text-indigo-400 hover:text-indigo-300`}>
                <FaGithub className="text-2xl" />
              </a>
              <a href={personalData?.TwitterUrl} target="_blank" className={`text-indigo-400 hover:text-indigo-300`}>
                <FaTwitter className="text-2xl" />
              </a>
              <a href={personalData?.WhatsAppUrl} target="_blank" className={`text-indigo-400 hover:text-indigo-300`}>
                <FaWhatsapp className="text-2xl" />
              </a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }} className="md:w-1/2">
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="name" className="block mb-2">
                  Name
                </label>
                <input type="text" id="name" name="name" className={`w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400`} required />
                <ValidationError prefix="Name" field="name" errors={state.errors} />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2">
                  Email
                </label>
                <input type="email" id="email" name="email" className={`w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400`} required />
                <ValidationError prefix="Email" field="email" errors={state.errors} />
              </div>
              <div>
                <label htmlFor="message" className="block mb-2">
                  Message
                </label>
                <textarea id="message" name="message" rows={4} className={`w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400`} required></textarea>
                <ValidationError prefix="Message" field="message" errors={state.errors} />
              </div>
              <button type="submit" className={`bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded-full transition-colors`} disabled={state.submitting}>
                {state.submitting ? "Submitting..." : "Submit"}
              </button>
            </form>
            {/* Success Message */}
            {formState.success && <p className="mt-4 text-green-600 font-semibold">✅ Submitted Successfully!</p>}

            {/* Error Message */}
            {formState.error && <p className="mt-4 text-red-600 font-semibold">❌ Something went wrong, please try again later.</p>}
          </motion.div>
        </div>
      </div>
      <Footer />
    </Element>
  );
};

export default Contact;
