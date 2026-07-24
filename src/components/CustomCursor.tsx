// CustomCursor.tsx
import { useEffect, useRef, useState } from 'react';
import { cn } from '../utils/cn';

const CustomCursor = ({ isOpen }: { isOpen: boolean }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [hoverType, setHoverType] = useState<null | 'btn' | 'img' | 'nav'>(
    null,
  );

  const requestRef = useRef<number>(null);

  const getOffset = () => {
    if (hoverType === 'btn') return 45;
    if (hoverType === 'img' || hoverType === 'nav') return 70;
    return 35;
  };
  const offset = getOffset();
  const hoverImgAndNav = hoverType === 'img' || hoverType === 'nav';

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      console.log(target);
      if (target.closest('.hvr-Btn')) {
        setHoverType('btn');
      } else if (target.closest('.hvr-img')) {
        setHoverType('img');
      } else if (target.closest('.hvr-nav')) {
        setHoverType('nav');
      } else {
        setHoverType(null);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      setCursorPos((prev) => {
        const dx = mousePos.x - prev.x;
        const dy = mousePos.y - prev.y;
        return { x: prev.x + dx * 0.15, y: prev.y + dy * 0.15 };
      });
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [mousePos]);

  if (isOpen) return;
  return (
    <>
      <div
        className={cn(
          'pointer-events-none fixed left-0 top-0 z-9999 rounded-full border border-black transition-all duration-300 ease-out',
          hoverType === 'btn' ? 'h-24 w-24  border-white' : 'h-14 w-14',
          hoverImgAndNav && 'bg-[#EED9E7] w-34 h-34 border-none',
        )}
        style={{
          transform: `translate3d(${cursorPos.x - offset}px, ${cursorPos.y - offset}px, 0)`,
        }}
      />

      <div
        className={cn(
          'pointer-events-none fixed left-0 top-0 z-9999 rounded-full transition-all duration-300 ease-out flex items-center justify-center h-1.5 w-1.5 bg-black',
          hoverImgAndNav && 'w-34 h-34 bg-[#0d0628] border-transparent',
          hoverType === 'btn' && 'opacity-0',
        )}
        style={{
          transform: `translate3d(${mousePos.x - (hoverImgAndNav ? 70 : 9)}px, ${mousePos.y - (hoverImgAndNav ? 70 : 9)}px, 0)`,
        }}
      >
        {hoverType && (
          <p className="text-[#e9c6dd] uppercase">
            {hoverType === 'img' && <span>drag</span>}
            {hoverType === 'nav' && <span>open</span>}
          </p>
        )}
      </div>
    </>
  );
};
export default CustomCursor;
