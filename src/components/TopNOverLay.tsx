import { motion, type MotionProps, type Variants } from 'framer-motion';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import Logo from '../assets/logo.svg?react';
import DropDownBg from './DropDownBg';
import Menu from './Menu';

const TopNOverLay = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isOpen2, setIsOpen2] = useState(false);

  const animationState = isOpen ? 'opened' : 'closed';
  const motionProps: Pick<MotionProps, 'animate' | 'transition' | 'style'> = {
    animate: animationState,
    transition: { duration: 0.5, ease: 'easeInOut' },
    style: { transformStyle: 'preserve-3d' as const },
  };

  const lineVariants: Variants = {
    closed: {
      backgroundColor: 'rgb(13, 6, 40)',
      y: 0,
      rotateZ: 0,
    },
    opened: (custom: { translateY: string; rotateAngle: number }) => ({
      backgroundColor: 'rgb(233, 198, 221)',
      y: custom.translateY,
      rotateZ: custom.rotateAngle,
    }),
  };
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isOpen]);

  return (
    <>
      <DropDownBg
        isOpen={isOpen}
        motionProps={motionProps}
        setIsOpen2={setIsOpen2}
      />
      <section className="container max-md:py-[5.5] relative z-20 flex justify-between items-center">
        <motion.div
          {...motionProps}
          variants={{
            closed: { color: 'rgb(13, 6, 40)' },
            opened: { color: 'rgb(233, 198, 221)' },
          }}
        >
          <Logo className="w-[5.52em] max-md:text-[10px]" />
        </motion.div>
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="hvr-nav flex flex-col justify-center items-center cursor-pointer"
        >
          <motion.div
            className="absolute w-[14.58em] h-[14.58em] border-[0.2em] max-md:w-35
                       max-md:h-35 border-[#0d0628] rounded-full"
            {...motionProps}
            variants={{
              closed: { scale: 1, borderColor: 'rgb(13, 6, 40)' },
              opened: { scale: 0.8, borderColor: 'rgb(233, 198, 221)' },
            }}
          ></motion.div>
          <motion.div
            className="trigger_line "
            {...motionProps}
            variants={lineVariants}
            custom={{ translateY: '0.4em', rotateAngle: 45 }}
          ></motion.div>
          <motion.div
            className="trigger_line"
            {...motionProps}
            variants={lineVariants}
            custom={{ translateY: '-0.4em', rotateAngle: -45 }}
          ></motion.div>
        </button>
      </section>
      <Menu
        isOpen={isOpen}
        motionProps={motionProps}
        isOpen2={isOpen2}
        setIsOpen2={setIsOpen2}
      />
    </>
  );
};

export default TopNOverLay;
