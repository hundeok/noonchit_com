'use client';
import { motion, MotionValue } from 'framer-motion';
import { PROBLEMS } from '@/lib/constants';

interface ProblemsSectionProps {
  problemScale: MotionValue<number>;
  problemOpacity: MotionValue<number>;
}

export default function ProblemsSection({ problemScale, problemOpacity }: ProblemsSectionProps) {
  return (
    <section id="problems" className="min-h-screen flex items-center justify-center relative py-20">
      <div className="text-center max-w-6xl mx-auto px-6">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-white mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          기존 투자의 한계
        </motion.h2>

        <div className="relative w-full h-96">
          {PROBLEMS.map((problem, index) => {
            // 더 다이나믹한 시작 위치
            const startPositions = [
              { x: -350, y: -180 },
              { x: 400, y: -200 },
              { x: -380, y: 50 },
              { x: 420, y: 80 },
              { x: -320, y: 220 },
              { x: 350, y: 180 }
            ];

            // 튕기면서 퍼지는 최종 위치
            const bouncePositions = [
              { x: -280, y: -120 },
              { x: 300, y: -140 },
              { x: -320, y: 30 },
              { x: 340, y: 60 },
              { x: -250, y: 150 },
              { x: 280, y: 120 }
            ];

            return (
              <motion.div
                key={problem}
                className="absolute"
                initial={{
                  x: startPositions[index].x,
                  y: startPositions[index].y,
                  opacity: 0.8,
                  scale: 1.1
                }}
                whileInView={{
                  x: [
                    startPositions[index].x,  // 시작점
                    0,                        // 중앙으로 모임
                    bouncePositions[index].x  // 튕기면서 퍼짐
                  ],
                  y: [
                    startPositions[index].y,  // 시작점
                    0,                        // 중앙으로 모임
                    bouncePositions[index].y  // 튕기면서 퍼짐
                  ],
                  scale: [1.1, 0.6, 1],      // 작아졌다가 다시 커짐
                  opacity: [0.8, 1, 0.9]     // 투명도 변화
                }}
                style={{
                  left: '50%',
                  top: '50%',
                  scale: problemScale,
                  opacity: problemOpacity
                }}
                transition={{
                  duration: 2,
                  delay: index * 0.1,
                  ease: [0.4, 0, 0.2, 1],
                  times: [0, 0.6, 1]  // 60%까지 모이고, 40%에서 퍼짐
                }}
                viewport={{ once: false }}
              >
                <div className="bg-red-500/20 border border-red-500/30 rounded-xl px-6 py-4 text-red-200 whitespace-nowrap shadow-lg">
                  ❌ {problem}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}