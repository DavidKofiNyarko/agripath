"use client";
import React, { useState } from "react";
import { ChevronUp, ChevronDown, Pin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Gochi_Hand } from "next/font/google";

const gochiHand = Gochi_Hand({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});
const HowItWorksAndFAQ = () => {
  const [openQuestion, setOpenQuestion] = useState<number | string | null>(
    null
  );

  const toggleQuestion = (questionId: number | string | null) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  const steps = [
    {
      id: 1,
      title: "Choose a Crop",
      description: "Select a crop or crops and units you want to invest in.",
    },
    {
      id: 2,
      title: "Sign Up & Invest Securely",
      description:
        "Register, invest through a trusted payment gateway, and receive a private login.",
    },
    {
      id: 3,
      title: "We Handle the Farming",
      description:
        "We manage everything from planting to harvest. Track your investment.",
    },
    {
      id: 4,
      title: "Receive Your Returns",
      description: "Enjoy scheduled payouts or reinvest in new opportunities.",
    },
  ];

  const faqs = [
    {
      id: "question1",
      question: "What is AgriPath, and how does it work?",
      answer:
        "AgriPath is an agricultural investment platform that allows investors to fund various crop production projects and earn returns based on harvest sales.",
    },
    {
      id: "question2",
      question: "Who can invest in AgriPath projects?",
      answer:
        "Anyone can invest in AgriPath projects. We welcome individual and institutional investors looking for sustainable agricultural opportunities.",
    },
    {
      id: "question3",
      question: "How do I sign up as an investor?",
      answer:
        "You can sign up through our secure online portal. Follow the registration process, verify your identity, and you can start investing in available projects.",
    },
    {
      id: "question4",
      question: "How often do you release updates?",
      answer:
        "We provide regular updates on project progress, including planting, growth stages, and harvest forecasts. Investors receive monthly reports and notifications.",
    },
  ];

  return (
    <div className="w-full ">
      {/* How It Works Section */}
      <div className=" py-8 sm:py-12 md:py-16 px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <h2 className={`text-2xl sm:text-3xl md:text-5xl font-bold text-primary text-center mb-2 ${gochiHand.className}`}>
            How It Works
          </h2>
          <p className="text-sm sm:text-base text-center text-gray-800 mb-8 sm:mb-12">
            A Simple Process to Grow Your Wealth
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center p-4 bg-white/50 rounded-lg "
              >
                <div className="relative mb-3 sm:mb-4 flex items-center gap-1">
                  <Pin className="text-red-500 mt-2 rotate-45" size={20}  />
                  <h3 className={`text-lg sm:text-2xl font-bold text-primary mt-2 ${gochiHand.className}`}>
                    Step {step.id}
                  </h3>
                </div>
                <h4 className="font-bold text-gray-800 mb-2 text-base sm:text-lg">{step.title}</h4>
                <p className="text-xs sm:text-sm text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* FAQ Section */}
      <div className="relative py-8 sm:py-12 md:py-16 px-4 faq-section min-h-[400px] sm:min-h-[470px]">
        {/* Background Image with a Cleaner Overlay */}

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-1 ">
              <h2 className="font-sans text-5xl font-bold tracking-normal leading-[3rem] text-primary mb-6 lg:mb-0">
                Frequently Asked
              </h2>
                <span className={`text-yellow-600 font-bold text-6xl  ${gochiHand.className}`}>
                Questions  <span className="text-4xl"> (FAQs)</span>
                </span>
            </div>

            <div className="lg:col-span-2">
              {faqs.map((faq) => (
                <motion.div 
                  key={faq.id} 
                  className="border-b border-gray-200"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                >
                  <button
                    className="w-full py-3 sm:py-4 flex justify-between items-center text-black text-left text-sm sm:text-base"
                    onClick={() => toggleQuestion(faq.id)}
                  >
                    <span className="pr-4">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: openQuestion === faq.id ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {openQuestion === faq.id ? (
                        <ChevronUp className="flex-shrink-0" size={18} />
                      ) : (
                        <ChevronDown className="flex-shrink-0" size={18} />
                      )}
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openQuestion === faq.id && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="pb-3 sm:pb-4 text-black opacity-90"
                      >
                        <p className="text-sm sm:text-base">{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorksAndFAQ;
