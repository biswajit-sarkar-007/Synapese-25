import React from 'react';
import { motion } from 'framer-motion';
import { Wand2 } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="pt-24 pb-16 bg-gray-900"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="p-3 rounded-full bg-indigo-600/10 mb-6"
          >
            <Wand2 className="h-8 w-8 text-indigo-500" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Multimodal UI Generator
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-400 max-w-2xl mb-8"
          >
            Transform your brand guidelines and product images into beautiful, animated landing pages with AI-powered design generation.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="px-8 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
              Get Started
            </button>
            <button className="px-8 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-semibold">
              View Demo
            </button>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;