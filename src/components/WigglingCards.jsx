import React, { useState } from 'react';
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

const iconMap = {
  'anvesha': Compass,
  'electronics-hub': Cpu,
  'pravaha': BookOpen,
  'polink': Linkedin,
  'closetmate': Wand2,
  'sahaj-ai': Landmark,
  'ternaryviz': PieChart,
};

const CARD_WIDTH = 420;
const CARD_HEIGHT = 560;
const OVERLAP = 120;
const EFFECT_RANGE = CARD_WIDTH - OVERLAP;

const DRAG_BUFFER = 50;
const VELOCITY_THRESHOLD = 500;

const WigglingCard = ({ project, i, x, totalItems, onSelect }) => {
  const Icon = iconMap[project.slug] || Target;

  // Base position in the linear stack
  const basePos = i * EFFECT_RANGE;
  const totalWidth = totalItems * EFFECT_RANGE;

  /**
   * INFINITE LOGIC:
   * We calculate the distance from the card's base position to the current scroll 'x'.
   * We then wrap this distance so it always stays within [-totalWidth/2, totalWidth/2].
   * This makes cards reappearing on the other side seamlessly.
   */
  const distance = useTransform(x, (v) => {
    const rawDist = v - basePos;
    // wrap(min, max, value) wraps the value between min and max
    return wrap(-totalWidth / 2, totalWidth / 2, rawDist);
  });

  // Visual transforms based on wrapped distance
  // We use slightly wider ranges for smoother exits/entries
  const rotate = useTransform(distance, [-EFFECT_RANGE, 0, EFFECT_RANGE], [10, 0, -10]);
  const scale = useTransform(distance, [-EFFECT_RANGE, 0, EFFECT_RANGE], [0.88, 1.05, 0.88]);
  const opacity = useTransform(
    distance,
    [-EFFECT_RANGE * 1.5, -EFFECT_RANGE, 0, EFFECT_RANGE, EFFECT_RANGE * 1.5],
    [0, 0.6, 1, 0.6, 0]
  );
  const blur = useTransform(distance, [-EFFECT_RANGE, 0, EFFECT_RANGE], [12, 0, 12]);
  const zIndex = useTransform(distance, [-EFFECT_RANGE, 0, EFFECT_RANGE], [1, 10, 1]);

  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.div
      style={{
        opacity,
        rotate,
        filter,
        scale,
        zIndex,
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        position: 'absolute',
        left: '50%',
        marginLeft: -CARD_WIDTH / 2,
        // Add a slight horizontal offset based on distance to handle the "stacking" look
        x: useTransform(distance, (d) => -d * 0.6),
        padding: '64px',
      }}
      className="flex flex-col justify-between rounded-[60px] border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 shadow-[0_64px_128px_-32px_rgba(0,0,0,0.3)] transition-colors cursor-none wiggling-card overflow-hidden"
      onClick={() => onSelect(project.slug, distance.get())}
    >
      <div className="flex flex-col gap-10">
        <div className="flex h-20 w-20 items-center justify-center rounded-[32px] bg-neutral-100 dark:bg-neutral-800/50">
          <Icon className="h-9 w-9 text-neutral-900 dark:text-neutral-100" strokeWidth={1.5} />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex w-fit items-center rounded-full bg-neutral-200/50 px-4 py-1.5 text-[10px] font-bold text-neutral-500 dark:bg-neutral-800/60 dark:text-neutral-400 tracking-[0.3em] uppercase">
            <FaArrowUpLong className="mr-2 h-2.5 w-2.5" />
            Project {project.num}
          </div>

          <h2 className="text-5xl font-bold font-['Bebas_Neue'] leading-[0.85] tracking-widest text-neutral-900 dark:text-neutral-100 uppercase">
            {project.name}
          </h2>

          <p className="text-[17px] font-medium text-neutral-400 dark:text-neutral-500 line-clamp-4 leading-[1.6] mt-1">
            {project.description}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-8 border-t border-neutral-100 dark:border-neutral-800/50">
        <div className="flex gap-2">
          {project.tags?.slice(0, 2).map((tag) => (
            <span key={tag} className="text-[9px] font-bold uppercase tracking-[0.25em] border border-neutral-200 dark:border-neutral-800 px-4 py-2 rounded-full text-neutral-400">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xl">
          <ArrowUpRight className="h-6 w-6" />
        </div>
      </div>
    </motion.div>
  );
};

export function WigglingCards({ projects }) {
  // We use internalIndex to track the infinite scroll step (can be negative or > length)
  const [internalIndex, setInternalIndex] = useState(0);
  const navigate = useNavigate();

  const x = useMotionValue(0);
  const targetX = internalIndex * EFFECT_RANGE;

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
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
    // Only navigate if the card is roughly in the center
    if (Math.abs(dist) < 20) {
      haptics.flip();
      navigate(`/projects/${slug}`);
    } else {
      // Otherwise, focus the card
      const diff = Math.round(dist / EFFECT_RANGE);
      setInternalIndex(prev => prev - diff);
    }
  };

  // Map the internalIndex back to a valid project index for pagination dots
  const activeDotIndex = ((((internalIndex % projects.length) + projects.length) % projects.length));

  return (
    <div className="w-full flex flex-col items-center py-10 select-none overflow-visible h-[760px]">
      <div className="relative w-full h-full flex items-center justify-center overflow-visible">
        {/* Drag layer */}
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 z-20 cursor-grab active:cursor-grabbing"
        />

        {/* Scroll animation target */}
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
            />
          ))}
        </div>
      </div>

      <div className="flex gap-4 z-30 mt-12">
        {projects.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              // Calculate shortest path for infinite dots
              const current = internalIndex;
              const target = i;
              const modTarget = ((((target - (current % projects.length)) % projects.length) + 1.5 * projects.length) % projects.length) - 0.5 * projects.length;

              // Simplest approach: just find the delta
              const delta = (i - activeDotIndex + 1.5 * projects.length) % projects.length - 0.5 * projects.length;
              setInternalIndex(prev => prev + Math.round(delta));

              haptics.tick(2000, 0.002);
            }}
            className={`h-1.5 transition-all duration-300 rounded-full ${i === activeDotIndex ? 'bg-neutral-900 dark:bg-neutral-100 w-16' : 'bg-neutral-300 dark:bg-neutral-800 w-8'
              }`}
          />
        ))}
      </div>

      {/* <div className="mt-6 font-['Barlow_Condensed'] text-[10px] uppercase tracking-[0.5em] text-neutral-400 opacity-60">
        Infinite Scroll Engaged
      </div> */}
    </div>
  );
}
