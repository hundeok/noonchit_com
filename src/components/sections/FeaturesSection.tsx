'use client';
import { motion, MotionValue } from 'framer-motion';
import { DASHBOARD_FEATURES, MAIN_FEATURES } from '@/lib/constants';

interface FeaturesSectionProps {
  dashboardY: MotionValue<string>;
  dashboardScale: MotionValue<number>;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1
    }
  }
};

export default function FeaturesSection({ dashboardY, dashboardScale }: FeaturesSectionProps) {
  return (
    <section id="features" className="min-h-screen flex items-center justify-center relative py-20">
      <motion.div 
        className="w-full max-w-7xl mx-auto px-6"
        style={{
          y: dashboardY,
          scale: dashboardScale
        }}
      >
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            주요 기능
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            시장의 &apos;눈치&apos;를 보는 것을 넘어, 시장을 이끌어 가세요
          </p>
        </motion.div>

        <motion.div 
          className="glass-effect rounded-3xl p-8 shadow-2xl mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
        >
          <div className="grid lg:grid-cols-3 gap-8 mb-8">
            {DASHBOARD_FEATURES.map((item, index) => (
              <motion.div
                key={index}
                className="glass-effect rounded-xl p-6 relative overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                viewport={{ once: false }}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mb-4 text-2xl`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <div className="flex items-center space-x-3">
                  <span className="text-2xl font-bold text-white">{item.value}</span>
                  <span className="text-green-400 font-semibold">{item.change}</span>
                </div>
                
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50">
                  <motion.div
                    className="w-full h-full bg-gradient-to-r from-blue-400 to-purple-400"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "linear",
                      delay: index * 0.3
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="glass-effect rounded-xl p-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: false }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">실시간 시장 동향</h3>
            <div className="h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="text-slate-400 text-lg">Live Chart Simulation</div>
              
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full"
                  style={{
                    left: `${20 + i * 15}%`,
                    bottom: '20%'
                  }}
                  animate={{
                    height: [`${30 + Math.random() * 40}%`, `${20 + Math.random() * 50}%`]
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* 상세 기능 설명 */}
        <motion.div 
          className="grid lg:grid-cols-2 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {MAIN_FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              className="glass-effect rounded-2xl p-8 transition-all duration-500"
              variants={fadeInUp}
              whileHover={{
                y: -12,
                scale: 1.02,
                boxShadow: "0 30px 60px rgba(59, 130, 246, 0.3)"
              }}
              transition={{ duration: 0.3 }}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                <span className="text-white text-3xl">{feature.icon}</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-slate-300 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}