import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InteriorAnimation = () => {
  const [currentScene, setCurrentScene] = useState(0);

  // Animation scenes showing interior design transformation
  // Animation phases
  const totalScenes = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % totalScenes);
    }, 3500); // Change scene every 3.5 seconds - better timing

    return () => clearInterval(interval);
  }, [totalScenes]);



  return (
    <div className="relative w-full h-full overflow-hidden p-8">
      {/* Room Container - Full right section with breathing space */}
      <div className="w-full h-full relative">
        {/* Room Background */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: currentScene >= 3 
              ? 'linear-gradient(to bottom, rgba(254, 243, 199, 0.3), rgba(253, 230, 138, 0.3))' 
              : 'linear-gradient(to bottom, rgba(249, 250, 251, 0.2), rgba(243, 244, 246, 0.2))'
          }}
          transition={{ duration: 1 }}
        >
          {/* Floor */}
          <motion.div
            className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-amber-100/30 to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: currentScene >= 0 ? 1 : 0 }}
            transition={{ duration: 0.8 }}
          />
            {/* Floor pattern */}
            <div className="absolute inset-0 opacity-30">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute bottom-0 w-full h-0.5 bg-amber-200"
                  style={{ bottom: `${i * 12}px` }}
                />
              ))}
            </div>



          {/* Windows */}
          <AnimatePresence>
            {currentScene >= 1 && (
              <>
                {/* Left Window */}
                <motion.div
                  className="absolute top-12 right-16 w-20 h-28 bg-gradient-to-b from-blue-100 to-blue-200 border-2 border-gray-400 rounded shadow-inner"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  {/* Window frame cross */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-gray-400"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-0.5 bg-gray-400"></div>
                  </div>
                  {/* Window glare effect */}
                  <motion.div
                    className="absolute top-2 left-2 w-4 h-6 bg-white/60 rounded"
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>

                {/* Right Window */}
                <motion.div
                  className="absolute top-16 right-40 w-16 h-24 bg-gradient-to-b from-blue-100 to-blue-200 border-2 border-gray-400 rounded shadow-inner"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.7 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-gray-400"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-full w-0.5 bg-gray-400"></div>
                  </div>
                  <motion.div
                    className="absolute top-1 left-1 w-3 h-4 bg-white/60 rounded"
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Planning/Design Phase - Large Grid */}
          <AnimatePresence>
            {currentScene === 0 && (
              <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                {/* Large Planning Grid covering full area */}
                <div className="absolute inset-4 border-2 border-blue-400 bg-blue-50/20 rounded-lg">
                  {/* Horizontal grid lines */}
                  {[...Array(12)].map((_, i) => (
                    <motion.div 
                      key={`h-${i}`} 
                      className="absolute border-b border-blue-300" 
                      style={{
                        top: `${(i + 1) * 8}%`,
                        left: 0,
                        right: 0,
                        height: '1px'
                      }}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                    />
                  ))}
                  {/* Vertical grid lines */}
                  {[...Array(15)].map((_, i) => (
                    <motion.div 
                      key={`v-${i}`} 
                      className="absolute border-r border-blue-300" 
                      style={{
                        left: `${(i + 1) * 6.5}%`,
                        top: 0,
                        bottom: 0,
                        width: '1px'
                      }}
                      initial={{ scaleY: 0 }}
                      animate={{ scaleY: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.08 }}
                    />
                  ))}
                  
                  {/* Planning measurements */}
                  <motion.div
                    className="absolute top-4 left-4 text-blue-600 font-bold text-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                  >
                    16' × 12'
                  </motion.div>
                  
                  <motion.div
                    className="absolute bottom-4 right-4 text-blue-600 font-semibold"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.8 }}
                  >
                    Living Room Plan
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Furniture Elements - Spread Far Apart */}
          <AnimatePresence>
            {currentScene === 1 && (
              <>
                {/* Orange Chair - Right next to left window */}
                <motion.div
                  className="absolute top-48 right-8 w-18 h-20 bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 rounded-lg shadow-xl"
                  initial={{ x: -50, opacity: 0, rotate: -10 }}
                  animate={{ x: 0, opacity: 1, rotate: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {/* Chair back */}
                  <div className="w-full h-6 bg-gradient-to-b from-orange-600 to-orange-700 rounded-t-lg"></div>
                  {/* Chair arms */}
                  <div className="absolute top-6 left-1 w-3 h-8 bg-orange-300 rounded opacity-80"></div>
                  <div className="absolute top-6 right-1 w-3 h-8 bg-orange-300 rounded opacity-80"></div>
                  {/* Chair legs */}
                  <div className="absolute -bottom-1 left-2 w-1 h-3 bg-gray-800 rounded"></div>
                  <div className="absolute -bottom-1 right-2 w-1 h-3 bg-gray-800 rounded"></div>
                  <div className="absolute -bottom-1 left-12 w-1 h-3 bg-gray-800 rounded"></div>
                  <div className="absolute -bottom-1 right-12 w-1 h-3 bg-gray-800 rounded"></div>
                </motion.div>

                {/* Modern Blue Sofa - Below windows */}
                <motion.div
                  className="absolute top-72 right-12 w-44 h-22"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {/* Sofa base */}
                  <div className="w-32 h-16 bg-gradient-to-br from-indigo-400 via-indigo-500 to-indigo-600 rounded-lg shadow-xl">
                    {/* Sofa back */}
                    <div className="w-full h-6 bg-gradient-to-b from-indigo-600 to-indigo-700 rounded-t-lg"></div>
                    {/* Cushions */}
                    <div className="absolute top-6 left-2 w-6 h-6 bg-indigo-300 rounded opacity-80"></div>
                    <div className="absolute top-6 left-10 w-6 h-6 bg-indigo-300 rounded opacity-80"></div>
                    <div className="absolute top-6 left-18 w-6 h-6 bg-indigo-300 rounded opacity-80"></div>
                  </div>
                  {/* Sofa legs */}
                  <div className="absolute -bottom-1 left-2 w-1 h-3 bg-gray-800 rounded"></div>
                  <div className="absolute -bottom-1 left-28 w-1 h-3 bg-gray-800 rounded"></div>
                  <div className="absolute -bottom-1 right-2 w-1 h-3 bg-gray-800 rounded"></div>
                </motion.div>

                {/* Coffee Table - In front of sofa */}
                <motion.div
                  className="absolute top-96 right-20 w-24 h-12"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {/* Table top */}
                  <div className="w-full h-2 bg-gradient-to-br from-amber-600 via-amber-700 to-amber-800 rounded shadow-lg"></div>
                  {/* Table legs */}
                  <div className="absolute top-2 left-2 w-1 h-6 bg-gray-700 rounded"></div>
                  <div className="absolute top-2 right-2 w-1 h-6 bg-gray-700 rounded"></div>
                  <div className="absolute top-2 left-16 w-1 h-6 bg-gray-700 rounded"></div>
                  <div className="absolute top-2 right-16 w-1 h-6 bg-gray-700 rounded"></div>
                  {/* Table decoration */}
                  <motion.div
                    className="absolute -top-1 left-1/2 w-4 h-2 bg-green-400 rounded-full transform -translate-x-1/2"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                {/* Floor Lamp - Corner near windows */}
                <motion.div
                  className="absolute top-44 right-64 w-4 h-28 bg-gradient-to-t from-gray-700 to-gray-600 rounded-full shadow-lg"
                  initial={{ scaleY: 0, opacity: 0, originY: 1 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  {/* Lamp shade */}
                  <div className="absolute -top-2 -left-4 w-10 h-8 bg-gradient-to-b from-yellow-200 to-yellow-300 rounded-full shadow-lg"></div>
                  {/* Light effect */}
                  <motion.div
                    className="absolute -top-6 -left-8 w-16 h-16 bg-yellow-200 rounded-full opacity-20"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Decorative Elements - Plants, Flowers, and Pets - Spread Far Apart */}
          <AnimatePresence>
            {currentScene >= 2 && (
              <>
                {/* Large Floor Plant - Next to sofa */}
                <motion.div
                  className="absolute top-80 right-64"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {/* Plant pot */}
                  <div className="w-10 h-14 bg-gradient-to-b from-amber-600 to-amber-800 rounded-b-full"></div>
                  {/* Plant leaves */}
                  <motion.div
                    className="absolute -top-6 left-1/2 transform -translate-x-1/2"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <div className="w-14 h-18 bg-gradient-to-t from-green-500 to-green-400 rounded-full transform -rotate-12"></div>
                    <div className="absolute top-3 left-3 w-10 h-14 bg-gradient-to-t from-green-600 to-green-500 rounded-full transform rotate-12"></div>
                    <div className="absolute top-1 left-5 w-8 h-12 bg-gradient-to-t from-green-500 to-green-400 rounded-full transform -rotate-6"></div>
                  </motion.div>
                </motion.div>

                {/* Flower Vase - Near windows */}
                <motion.div
                  className="absolute top-1/2 right-1/5"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {/* Vase */}
                  <div className="w-8 h-10 bg-gradient-to-b from-pink-200 to-pink-300 rounded-full"></div>
                  {/* Flowers */}
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
                    <motion.div
                      className="w-4 h-4 bg-red-400 rounded-full"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                    />
                    <motion.div
                      className="w-4 h-4 bg-pink-400 rounded-full"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    />
                    <motion.div
                      className="w-4 h-4 bg-yellow-400 rounded-full"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                    />
                  </div>
                </motion.div>

                {/* Pet Cat - Near furniture */}
                <motion.div
                  className="absolute top-100 right-32 w-12 h-10"
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {/* Cat body */}
                  <div className="w-10 h-5 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full"></div>
                  {/* Cat head */}
                  <div className="absolute -top-3 left-2 w-5 h-5 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full"></div>
                  {/* Cat ears */}
                  <div className="absolute -top-4 left-3 w-1 h-2 bg-gray-600 rounded-t-full transform rotate-12"></div>
                  <div className="absolute -top-4 left-5 w-1 h-2 bg-gray-600 rounded-t-full transform -rotate-12"></div>
                  {/* Cat tail */}
                  <motion.div
                    className="absolute top-2 -right-4 w-5 h-1 bg-gray-500 rounded-full origin-left"
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>

                {/* Small Dog - Near chair */}
                <motion.div
                  className="absolute top-76 right-4 w-14 h-10"
                  initial={{ x: -30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  {/* Dog body */}
                  <div className="w-10 h-5 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full"></div>
                  {/* Dog head */}
                  <div className="absolute -top-2 left-7 w-5 h-5 bg-gradient-to-br from-amber-600 to-amber-800 rounded-full"></div>
                  {/* Dog ears */}
                  <div className="absolute -top-3 left-8 w-2 h-4 bg-amber-800 rounded-full transform rotate-45"></div>
                  <div className="absolute -top-3 left-9 w-2 h-4 bg-amber-800 rounded-full transform -rotate-45"></div>
                  {/* Dog tail */}
                  <motion.div
                    className="absolute top-1 -left-3 w-4 h-1 bg-amber-700 rounded-full origin-right"
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>


              </>
            )}
          </AnimatePresence>

          {/* Ambient Lighting Effect */}
          <AnimatePresence>
            {currentScene >= 4 && (
              <motion.div
                className="absolute inset-0 bg-gradient-radial from-yellow-200/30 via-transparent to-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2, delay: 1 }}
              />
            )}
          </AnimatePresence>


        </motion.div>   {/* ← main motion.div closes here */}
      </div>
    </div>
  );
};

export default InteriorAnimation;