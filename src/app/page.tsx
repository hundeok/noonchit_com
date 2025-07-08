'use client';
import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import icon from '@/assets/icon.png';

export default function NoonchitScrollStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 스크롤 기반 변환
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  // 크립토 로고들 위치
  const crypto1X = useTransform(scrollYProgress, [0.1, 0.3], ['-50%', '20%']);
  const crypto1Y = useTransform(scrollYProgress, [0.1, 0.3], ['-50%', '10%']);
  const crypto2X = useTransform(scrollYProgress, [0.1, 0.3], ['150%', '80%']);
  const crypto2Y = useTransform(scrollYProgress, [0.1, 0.3], ['-50%', '15%']);
  
  // 문제점들이 빨려들어가는 효과
  const problemScale = useTransform(scrollYProgress, [0.4, 0.6], [1, 0]);
  const problemOpacity = useTransform(scrollYProgress, [0.4, 0.6], [1, 0]);
  const solutionScale = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const solutionOpacity = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  
  // 배경 색상 전환
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ["#0f172a", "#1e1b4b", "#312e81", "#0f172a"]
  );
  
  // 대시보드 등장
  const dashboardY = useTransform(scrollYProgress, [0.7, 0.9], ['100%', '0%']);
  const dashboardScale = useTransform(scrollYProgress, [0.7, 0.9], [0.8, 1]);

  // 스프링 애니메이션
  const springConfig = { stiffness: 300, damping: 30 };
  const smoothScale = useSpring(heroScale, springConfig);

  const cryptoCoins = [
    { name: 'Bitcoin', symbol: '₿', color: 'from-orange-500 to-yellow-500' },
    { name: 'Ethereum', symbol: 'Ξ', color: 'from-blue-500 to-purple-500' },
    { name: 'Cardano', symbol: '₳', color: 'from-blue-400 to-cyan-400' },
    { name: 'Solana', symbol: '◎', color: 'from-purple-500 to-pink-500' },
    { name: 'BNB', symbol: 'B', color: 'from-yellow-500 to-orange-500' },
    { name: 'XRP', symbol: 'X', color: 'from-gray-500 to-slate-500' },
  ];

  const problems = [
    "놓치는 급등락 기회들",
    "복잡한 차트 분석",
    "고래 움직임 파악 불가",
    "산발적인 정보들",
    "느린 반응 속도",
    "감정적인 투자 결정"
  ];

  return (
    <div ref={containerRef} className="relative">
      <style jsx global>{`
        .gradient-text {
          background: linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .glass-effect {
          background: rgba(30, 41, 59, 0.4);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(148, 163, 184, 0.2);
        }
        
        @keyframes pulse-crypto {
          0%, 100% { transform: scale(1); opacity: 0.7; }
          50% { transform: scale(1.1); opacity: 1; }
        }
        
        .crypto-float {
          animation: pulse-crypto 3s ease-in-out infinite;
        }
        
        .magnetic-pull {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>

      {/* 동적 배경 */}
      <motion.div 
        className="fixed inset-0 -z-10"
        style={{ backgroundColor: bgColor }}
      />

      {/* Section 1: Hero */}
      <motion.section 
        className="min-h-screen flex items-center justify-center relative overflow-hidden"
        style={{ 
          scale: smoothScale,
          opacity: heroOpacity 
        }}
      >
        <div className="text-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="flex items-center justify-center mb-8">
              <motion.div 
                className="w-16 h-16 relative"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Image 
                  src={icon} 
                  alt="눈칫 로고" 
                  width={64} 
                  height={64}
                  className="rounded-2xl shadow-2xl"
                  onError={(e) => {
                    const target = e.currentTarget;
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) {
                      target.style.display = 'none';
                      fallback.style.display = 'flex';
                    }
                  }}
                />
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl" style={{display: 'none'}}>
                  <span className="text-white font-bold text-3xl">👁</span>
                </div>
              </motion.div>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6">
              눈칫
            </h1>
            <p className="text-2xl md:text-3xl gradient-text font-semibold mb-12">
              시장은 잠들지 않습니다
            </p>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              혼란스러운 암호화폐 시장에서<br />
              가장 중요한 순간을 놓치고 계신가요?
            </p>
          </motion.div>
        </div>

        {/* 떠다니는 크립토 로고들 */}
        {cryptoCoins.map((crypto, index) => (
          <motion.div
            key={crypto.name}
            className="absolute crypto-float"
            style={{
              left: `${15 + (index * 12)}%`,
              top: `${20 + (index % 3) * 20}%`,
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4 + index,
              repeat: Infinity,
              delay: index * 0.5
            }}
          >
            <div className={`w-20 h-20 bg-gradient-to-r ${crypto.color} rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-xl opacity-30`}>
              {crypto.symbol}
            </div>
          </motion.div>
        ))}
      </motion.section>

      {/* Section 2: 문제점들이 중앙으로 모이는 효과 */}
      <section className="min-h-screen flex items-center justify-center relative">
        <div className="text-center">
          <motion.h2 
            className="text-5xl md:text-6xl font-bold text-white mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false }}
          >
            기존 투자의 한계
          </motion.h2>

          {/* 문제점들이 흩어져 있다가 중앙으로 모이는 효과 */}
          <div className="relative w-full h-96">
            {problems.map((problem, index) => (
              <motion.div
                key={problem}
                className="absolute magnetic-pull"
                initial={{
                  x: `${(index % 3 - 1) * 300}px`,
                  y: `${Math.floor(index / 3 - 1) * 150}px`,
                  opacity: 0.8,
                  scale: 1
                }}
                whileInView={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                  scale: 0.8
                }}
                style={{
                  scale: problemScale,
                  opacity: problemOpacity
                }}
                transition={{
                  duration: 1.2,
                  delay: index * 0.1,
                  ease: [0.4, 0, 0.2, 1]
                }}
                viewport={{ once: false }}
              >
                <div className="bg-red-500/20 border border-red-500/30 rounded-xl px-6 py-4 text-red-200 whitespace-nowrap">
                  ❌ {problem}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: 솔루션 등장 */}
      <section className="min-h-screen flex items-center justify-center relative">
        <motion.div 
          className="text-center"
          style={{
            scale: solutionScale,
            opacity: solutionOpacity
          }}
        >
          <motion.div
            className="w-96 h-96 mx-auto mb-12 relative"
            animate={{
              background: [
                "linear-gradient(45deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))",
                "linear-gradient(135deg, rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.3))",
                "linear-gradient(225deg, rgba(236, 72, 153, 0.3), rgba(59, 130, 246, 0.3))"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              borderRadius: "50%",
              filter: "blur(40px)"
            }}
          />
          
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            <div className="w-32 h-32 relative">
              <Image 
                src={icon} 
                alt="눈칫 로고" 
                width={128} 
                height={128}
                className="rounded-3xl shadow-2xl"
                onError={(e) => {
                  const target = e.currentTarget;
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) {
                    target.style.display = 'none';
                    fallback.style.display = 'flex';
                  }
                }}
              />
              <div className="w-32 h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl" style={{display: 'none'}}>
                <span className="text-white font-bold text-6xl">👁</span>
              </div>
            </div>
          </motion.div>
          
          <motion.h2 
            className="text-6xl md:text-7xl font-bold text-white mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: false }}
          >
            모든 것을 <span className="gradient-text">한눈에</span>
          </motion.h2>
          
          <motion.p 
            className="text-2xl text-slate-300 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: false }}
          >
            24시간 깨어있는 AI가 시장을 감시합니다
          </motion.p>
        </motion.div>
      </section>

      {/* Section 4: 실시간 대시보드 등장 */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <motion.div 
          className="w-full max-w-6xl mx-auto px-6"
          style={{
            y: dashboardY,
            scale: dashboardScale
          }}
        >
          <motion.div 
            className="glass-effect rounded-3xl p-8 shadow-2xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: false }}
          >
            <div className="grid lg:grid-cols-3 gap-8 mb-8">
              {[
                {
                  title: "고래 감지",
                  value: "1,247 BTC",
                  change: "+15.7%",
                  icon: "🐋",
                  color: "from-blue-500 to-cyan-500"
                },
                {
                  title: "급등 알림",
                  value: "SOL",
                  change: "+127.3%",
                  icon: "⚡",
                  color: "from-purple-500 to-pink-500"
                },
                {
                  title: "거래량 폭증",
                  value: "MATIC",
                  change: "+890%",
                  icon: "📈",
                  color: "from-emerald-500 to-teal-500"
                }
              ].map((item, index) => (
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
                  
                  {/* 실시간 데이터 플로우 */}
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

            {/* 실시간 차트 영역 */}
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
                
                {/* 시뮬레이션 차트 라인들 */}
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
        </motion.div>
      </section>

      {/* Final CTA Section */}
      <section className="min-h-screen flex items-center justify-center relative">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
        >
          <motion.h2 
            className="text-6xl md:text-7xl font-bold text-white mb-8"
            animate={{
              background: [
                "linear-gradient(45deg, #60a5fa, #a78bfa, #f472b6)",
                "linear-gradient(135deg, #f472b6, #60a5fa, #a78bfa)",
                "linear-gradient(225deg, #a78bfa, #f472b6, #60a5fa)"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            지금 시작하세요
          </motion.h2>
          
          <motion.p 
            className="text-2xl text-slate-300 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: false }}
          >
            가장 강력한 암호화폐 분석 파트너
          </motion.p>
          
          <motion.button
            className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-16 py-6 rounded-2xl text-2xl font-bold shadow-2xl relative overflow-hidden"
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 30px 60px rgba(59, 130, 246, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: false }}
          >
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            무료로 시작하기
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}