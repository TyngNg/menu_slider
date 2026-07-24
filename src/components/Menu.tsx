import { cn } from '../utils/cn';
import {
  AnimatePresence,
  motion,
  useAnimate,
  useAnimationControls,
  type MotionProps,
  type Variants,
} from 'framer-motion';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import { stagger } from 'framer-motion';
import wizardryGif from '../assets/new-wizardry.gif';
import patreonGif from '../assets/new-patreon.gif';
import youtubeGif from '../assets/new-youtube.gif';
import MenuIcon from '../assets/menu-Icon.svg?react';

const MenuItem = ({ text }: { text: string }) => {
  const controls = useAnimationControls();
  const underline: Variants = {
    initial: {
      scaleX: 0,
      x: '0%',
      originX: 0,
    },

    hover: {
      scaleX: 1,
      x: '0%',
      originX: 0,
      transition: {
        duration: 0.35,
        ease: 'easeInOut',
      },
    },

    exit: {
      scaleX: 1,
      x: '120%',
      transition: {
        duration: 0.35,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="overflow-hidden">
      <p
        className="right-item text-[1.77em] max-[448px]:text-[5.77em] cursor-pointer relative my-2.5 pb-px leading-[1.2] tracking-[-0.04em] text-center w-max overflow-hidden
      "
        onMouseEnter={() => {
          controls.start('hover');
        }}
        onMouseLeave={async () => {
          await controls.start('exit');

          controls.set('initial');
        }}
      >
        {text}

        <motion.span
          variants={underline}
          initial="initial"
          animate={controls}
          className="
          absolute
          left-0
          bottom-0
          h-1
          w-full
          bg-[#e9c6dd]
        "
        />
      </p>
    </div>
  );
};

const Menu = ({
  isOpen,
  motionProps,
  isOpen2,
  setIsOpen2,
}: {
  isOpen: boolean;
  motionProps: Pick<MotionProps, 'animate' | 'transition' | 'style'>;
  isOpen2: boolean;
  setIsOpen2: Dispatch<SetStateAction<boolean>>;
}) => {
  const text = ['wizardry', 'patreon', 'youtube'];
  const gifs = [wizardryGif, patreonGif, youtubeGif];
  const text2 = ['consulting', 'custom code', 'cloneables'];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const [scope, animate] = useAnimate();

  useEffect(() => {
    const runAnimation = async () => {
      if (!isOpen2) {
        await Promise.all([
          animate(
            '.left-item',
            {
              opacity: 0,
            },
            {
              duration: 0.4,
            },
          ),

          animate(
            '.right-item',
            {
              opacity: 0,
            },
            {
              duration: 0.4,
            },
          ),
        ]);

        animate('.left-item', { y: '100%' }, { duration: 0 });
        animate('.right-item', { y: '100%' }, { duration: 0 });

        return;
      }

      await animate(
        '.left-item',
        {
          y: ['100%', '0%'],
          opacity: [0, 1],
        },
        {
          duration: 0.5,
          delay: stagger(0.3),
        },
      );
      await animate(
        '.right-item',
        {
          y: ['100%', '0%'],
          opacity: [0, 1],
        },
        {
          duration: 0.5,
          delay: stagger(0.3),
        },
      );
    };

    runAnimation();
  }, [isOpen2, animate]);

  useEffect(() => {
    if (!isOpen) {
      setIsOpen2(false);
    }
  }, [isOpen, setIsOpen2]);

  return (
    <div
      ref={scope}
      className="container inset-0 z-10 flex absolute justify-between px-[4.06em] items-center text-[#e9c6dd] pointer-events-none"
    >
      <div
        className={cn(
          'flex max-[448px]:flex-col w-full justify-center gap-[20em] capitalize relative transition-opacity duration-500',
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none',
        )}
      >
        <div className="flex flex-col min-[449px]:pl-[4.06em] max-[448px]:px-[2em] min-[449px]:min-w-[50em] gap-2 ">
          {text.map((txt, i) => {
            return (
              <div className="flex items-center w-full" key={`${txt}-${i}`}>
                <motion.span
                  initial={{
                    width: 0,
                    opacity: 0,
                  }}
                  animate={{
                    width: hoveredIndex === i ? '6em' : 0,
                    opacity: hoveredIndex === i ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="block h-1 bg-[#e9c6dd]  shrink-0"
                />
                <div
                  className={cn(
                    'flex items-center w-full overflow-hidden',
                    i % 2 === 0 ? 'justify-center' : 'justify-start',
                  )}
                >
                  <motion.p
                    className={cn(
                      'left-item',
                      'text-[7.03em] max-[448px]:text-[15em] cursor-pointer leading-[1.2] font-semibold tracking-tighter relative',
                    )}
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    animate={{
                      fontStyle: hoveredIndex === i ? 'italic' : 'normal',
                    }}
                    transition={{
                      duration: 5,
                    }}
                  >
                    <span>{txt}</span>
                    <span className="text-[0.18em] ml-[0.4em] leading-none tracking-[-0.04em] absolute">
                      0{i}
                    </span>
                  </motion.p>
                </div>
                <AnimatePresence>
                  {hoveredIndex === i && (
                    <motion.img
                      src={gifs[i]}
                      alt={txt}
                      initial={{
                        opacity: 0,
                        scale: 0.6,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.6,
                      }}
                      transition={{
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={cn(
                        'absolute -z-10 -translate-1/2 top-[50%] left-[65%] w-[40em] object-cover pointer-events-none hidden md:block',
                        i === 1 && 'w-100',
                      )}
                    />
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        <div className="min-[449px]:pr-[10.99em] max-[448px]:items-center flex flex-col justify-between ">
          <motion.div
            {...motionProps}
            transition={{ duration: 0.7 }}
            variants={{
              closed: {
                scale: 0.1,
                opacity: 0.1,
                borderColor: 'rgb(13, 6, 40)',
              },
              opened: {
                scale: 1,
                opacity: 1,
                borderColor: 'rgb(233, 198, 221)',
              },
            }}
          >
            <MenuIcon className="w-[3.02em] max-[448px]:w-[10.02em]" />
          </motion.div>
          <div className="flex flex-col justify-center items-centers overflow-hidden">
            {text2.map((txt2) => {
              return <MenuItem key={txt2} text={txt2} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
