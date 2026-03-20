import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionTemplate,
  wrap,
} from 'framer-motion';
import {
  ArrowUpRight,
  Compass,
  Cpu,
  BookOpen,
  Linkedin,
  Wand2,
  Landmark,
  PieChart,
  Target,
} from 'lucide-react';
import { FaArrowUpLong } from 'react-icons/fa6';
import { haptics } from '../utils/haptics';

const DRAG_BUFFER = 50;
const VELOCITY_THRESHOLD = 500;
const CARD_OVERLAP = 120;

const iconMap = {
  'anvesha': Compass,
  'electronics-hub': Cpu,
  'pravaha': BookOpen,
  'polink': Linkedin,
  'closetmate': Wand2,
  'sahaj-ai': Landmark,
  'ternaryviz': PieChart,
};

function useCardWidth() {
  const [cardWidth, setCardWidth] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth < 768 ? 300 : 420
  );
  useEffect(() => {
    const onResize = () => setCardWidth(window.innerWidth < 768 ? 300 : 420);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return cardWidth;
}

const WigglingCard = ({ project, i, x, totalItems, onSelect, cardWidth }) => {
  const Icon = iconMap[project.slug] || Target;
  const effectRange = cardWidth - CARD_OVERLAP;

  const basePos = i * effectRange;
  const totalWidth = totalItems * effectRange;

  const distance = useTransform(x, (v) => {
    const rawDist = v - basePos;
    return wrap(-totalWidth / 2, totalWidth / 2, rawDist);
  });

  const rotate  = useTransform(distance, [-effectRange, 0, effectRange], [10, 0, -10]);
  const scale   = useTransform(distance, [-effectRange, 0, effectRange], [0.88, 1.05, 0.88]);
  const opacity = useTransform(
    distance,
    [-effectRange * 1.5, -effectRange, 0, effectRange, effectRange * 1.5],
    [0, 0.6, 1, 0.6, 0]
  );
  const blur    = useTransform(distance, [-effectRange, 0, effectRange], [12, 0, 12]);
  const zIndex  = useTransform(distance, [-effectRange, 0, effectRange], [1, 10, 1]);
  const filter  = useMotionTemplate`blur(${blur}px)`;
  const cardX   = useTransform(distance, (d) => -d * 0.6);

  const cardHeight = cardWidth < 380 ? 440 : 560;
  const padding    = cardWidth < 380 ? '40px' : '64px';

  return (
    <motion.div
      style={{
        opacity,
        rotate,
        filter,
        scale,
        zIndex,
        x: cardX,
        width: cardWidth,
        height: cardHeight,
        position: 'absolute',
        left: '50%',
        marginLeft: -cardWidth / 2,
        padding,
      }}
      className="flex flex-col justify-between rounded-[40px] md:rounded-[60px] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 shadow-[0_64px_128px_-32px_rgba(0,0,0,0.3)] transition-colors cursor-none wiggling-card overflow-hidden"
      onClick={() => onSelect(project.slug, distance.get())}
    >
      <div className="flex flex-col gap-6 md:gap-10">
        <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-[24px] md:rounded-[32px] bg-neutral-100 dark:bg-neutral-800/50">
          <Icon className="h-7 w-7 md:h-9 md:w-9 text-neutral-900 dark:text-neutral-100" strokeWidth={1.5} />
        </div>

        <div className="flex flex-col gap-4 md:gap-6">
          <div className="flex w-fit items-center rounded-full bg-neutral-200/50 px-4 py-1.5 text-[10px] font-bold text-neutral-500 dark:bg-neutral-800/60 dark:text-neutral-400 tracking-[0.3em] uppercase">
            <FaArrowUpLong className="mr-2 h-2.5 w-2.5" />
            Project {project.num}
          </div>

          <h2 className="text-3xl md:text-5xl font-bold font-['Bebas_Neue'] leading-[0.85] tracking-widest text-neutral-900 dark:text-neutral-100 uppercase">
            {project.name}
          </h2>

          <p className="text-[14px] md:text-[17px] font-medium text-neutral-400 dark:text-neutral-500 line-clamp-3 md:line-clamp-4 leading-[1.6]">
            {project.description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-6 md:pt-8 border-t border-neutral-100 dark:border-neutral-800/50">
        <div className="flex gap-2">
          {project.tags?.slice(0, 2).map((tag) => (
            <span key={tag} className="text-[8px] md:text-[9px] font-bold uppercase tracking-[0.25em] border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-neutral-400">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex h-10 w-10 md:h-14 md:w-14 items-center justify-center rounded-full bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xl">
          <ArrowUpRight className="h-5 w-5 md:h-6 md:w-6" />
        </div>
      </div>
    </motion.div>
  );
};

export function WigglingCards({ projects }) {
  const [internalIndex, setInternalIndex] = useState(0);
  const navigate = useNavigate();
  const cardWidth = useCardWidth();
  const effectRange = cardWidth - CARD_OVERLAP;

  const x = useMotionValue(0);
  const targetX = internalIndex * effectRange;

  const handleDragEnd = (_, info) => {
    const offset   = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      setInternalIndex(prev => prev + 1);
      haptics.tick(1500, 0.005);
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      setInternalIndex(prev => prev - 1);
      haptics.tick(1500, 0.005);
    }
  };

  const handleSelect = (slug, dist) => {
    if (Math.abs(dist) < 20) {
      haptics.flip();
      navigate(`/projects/${slug}`);
    } else {
      const diff = Math.round(dist / effectRange);
      setInternalIndex(prev => prev - diff);
    }
  };

  const activeDotIndex = ((internalIndex % projects.length) + projects.length) % projects.length;

  return (
    <div className="w-full flex flex-col items-center py-6 md:py-10 select-none overflow-hidden h-[540px] md:h-[760px]">
      <div className="relative w-full h-full flex items-center justify-center overflow-visible">
        {/* Invisible drag layer on top */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          style={{ touchAction: 'none' }}
          className="absolute inset-0 z-20 cursor-grab active:cursor-grabbing"
        />

        {/* Hidden spring target that drives the x MotionValue */}
        <motion.div
          animate={{ x: targetX }}
          onUpdate={(v) => x.set(v.x)}
          transition={{ type: 'spring', stiffness: 220, damping: 32 }}
          className="hidden"
        />

        <div className="relative w-full h-full perspective-1000 overflow-visible flex items-center justify-center">
          {projects.map((project, i) => (
            <WigglingCard
              key={project.id}
              project={project}
              i={i}
              x={x}
              totalItems={projects.length}
              onSelect={handleSelect}
              cardWidth={cardWidth}
            />
          ))}
        </div>
      </div>

      {/* Pagination dots */}
      <div className="flex gap-3 md:gap-4 z-30 mt-8 md:mt-12">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const delta = (i - activeDotIndex + 1.5 * projects.length) % projects.length - 0.5 * projects.length;
              setInternalIndex(prev => prev + Math.round(delta));
              haptics.tick(2000, 0.002);
            }}
            className={`h-1.5 transition-all duration-300 rounded-full ${
              i === activeDotIndex
                ? 'bg-neutral-900 dark:bg-neutral-100 w-10 md:w-16'
                : 'bg-neutral-300 dark:bg-neutral-800 w-5 md:w-8'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
