import { AnimatePresence, motion, type MotionProps } from 'framer-motion';
import { type Dispatch, type SetStateAction } from 'react';

const AnimateCurveBg = ({
  isOpen,
  className,
}: {
  isOpen: boolean;
  className?: string;
}) => {
  const pathClosed =
    'M 406.5 -82.497 C 406.5 -82.497 406.25 88.167 406.25 88.167 C 406.25 88.167 239 0 -1 0 C -232 0 -406.75 88.167 -406.75 88.167 C -406.75 88.167 -406.5 -82.497 -406.5 -82.497 C -406.5 -82.497 406.5 -82.497 406.5 -82.497 z';
  const pathOpened =
    'M406.5,-82.49700164794922 C406.5,-82.49700164794922 406.25,88.16699981689453 406.25,88.16699981689453 C406.25,88.16699981689453 199.23599243164062,86.49700164794922 0.009999999776482582,86.49700164794922 C-199.2259979248047,86.49700164794922 -406.75,88.16699981689453 -406.75,88.16699981689453 C-406.75,88.16699981689453 -406.5,-82.49700164794922 -406.5,-82.49700164794922 C-406.5,-82.49700164794922 406.5,-82.49700164794922 406.5,-82.49700164794922z';

  return (
    <svg
      viewBox="-400 -80 800 165"
      className={className}
      preserveAspectRatio="none"
      style={{ display: 'block', width: '100%', height: '101%' }}
    >
      <motion.path
        fill="rgb(13,6,40)"
        animate={{ d: isOpen ? pathOpened : pathClosed }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      />
    </svg>
  );
};

const DropDownBg = ({
  isOpen,
  motionProps,
  setIsOpen2,
}: {
  isOpen: boolean;
  motionProps: Pick<MotionProps, 'animate' | 'transition' | 'style'>;
  setIsOpen2: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="absolute left-0 top-0 right-0 bottom-auto z-10">
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 z-10 flex h-screen w-full flex-col"
          {...motionProps}
          variants={{
            closed: { y: '-100%' },
            opened: { y: '0%' },
          }}
          initial={false}
          onAnimationComplete={(def) => {
            if (def === 'opened') {
              setIsOpen2(true);
            }
          }}
        >
          <div className="w-full flex-4 bg-[#0d0628]"></div>
          <div className="w-full flex-1 relative">
            <AnimateCurveBg
              isOpen={isOpen}
              className="absolute inset-0 -mt-px inside"
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DropDownBg;
