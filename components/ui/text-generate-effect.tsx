'use client';
import { useEffect, useState } from 'react';
import { motion, stagger, useAnimate } from 'framer-motion';
import { cn } from '@/lib/utils';

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  delay = 0
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  delay?: number;
}) => {
  const [scope, animate] = useAnimate();
  const [showTextEffect, setShowTextEffect] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTextEffect(true);
    }, delay);

    return () => clearTimeout(timer);
  }, []);

  // eslint-disable-next-line prefer-const
  let wordsArray = words.split(' ');
  useEffect(() => {
    if (!showTextEffect) return;
    animate(
      'span',
      {
        opacity: 1,
        filter: filter ? 'blur(0px)' : 'none'
      },
      {
        duration: duration ? duration : 1,
        delay: stagger(0.2)
      }
    );
  }, [scope.current, showTextEffect]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              // className={`${idx > 0 ? 'text-purple' : 'dark:text-white text-black'} opacity-0`}
              style={{
                filter: filter ? 'blur(10px)' : 'none',
                opacity: showTextEffect ? 1 : 0
              }}
            >
              {word}{' '}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn(className)}>
      <div className="my-4">
        <div className=" dark:text-white text-black leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
