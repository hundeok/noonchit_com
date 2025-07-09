'use client';
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/sections/HeroSection';
import ProblemsSection from '@/components/sections/ProblemsSection';
import SolutionSection from '@/components/sections/SolutionSection';
import FeaturesSection from '@/components/sections/FeaturesSection';
import TargetSection from '@/components/sections/TargetSection';
import CTASection from '@/components/sections/CTASection';

export default function NoonchitLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // 스크롤 기반 변환들
  const heroScale = useTransform(scrollYProgress, [0, 0.15], [1, 0.9]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0.3]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  
  // 문제점들이 모이는 효과
  const problemScale = useTransform(scrollYProgress, [0.15, 0.25], [1, 0]);
  const problemOpacity = useTransform(scrollYProgress, [0.15, 0.25], [1, 0]);
  const solutionScale = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const solutionOpacity = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  
  // 대시보드 등장
  const dashboardY = useTransform(scrollYProgress, [0.5, 0.65], ['100%', '0%']);
  const dashboardScale = useTransform(scrollYProgress, [0.5, 0.65], [0.8, 1]);
  
  // 배경 색상 전환
  const bgColor = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ["#0f172a", "#1e1b4b", "#312e81", "#0f172a"]
  );

  return (
    <div ref={containerRef} className="relative">
      {/* 전역 스타일 */}
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
        
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg);
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-30px) rotate(180deg);
            opacity: 0.5;
          }
        }
        
        .floating-bg {
          animation: float 8s ease-in-out infinite;
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

      {/* 패럴랙스 배경 */}
      <motion.div 
        className="fixed inset-0 pointer-events-none overflow-hidden -z-5"
        style={{ y: backgroundY }}
      >
        <div className="floating-bg absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full filter blur-3xl"></div>
        <div className="floating-bg absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-3xl" style={{ animationDelay: '2s' }}></div>
        <div className="floating-bg absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2" style={{ animationDelay: '4s' }}></div>
      </motion.div>

      {/* 헤더 */}
      <Header />

      {/* 섹션들 */}
      <HeroSection 
        heroScale={heroScale} 
        heroOpacity={heroOpacity} 
      />
      
      <ProblemsSection 
        problemScale={problemScale} 
        problemOpacity={problemOpacity} 
      />
      
      <SolutionSection 
        solutionScale={solutionScale} 
        solutionOpacity={solutionOpacity} 
      />
      
      <FeaturesSection 
        dashboardY={dashboardY} 
        dashboardScale={dashboardScale} 
      />
      
      <TargetSection />
      
      <CTASection />

      {/* 푸터 */}
      <Footer />
    </div>
  );
}