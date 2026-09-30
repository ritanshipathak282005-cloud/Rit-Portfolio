import React from 'react';

interface VerticalBrandWordmarkProps {
  onNavigateHome: () => void;
}

export const VerticalBrandWordmark: React.FC<VerticalBrandWordmarkProps> = ({
  onNavigateHome,
}) => {
  return (
    <aside
      id="vertical-brand-wordmark"
      onClick={onNavigateHome}
      className="fixed left-0 top-0 bottom-0 z-[60] w-10 sm:w-12 md:w-14 pointer-events-auto cursor-pointer select-none group flex items-center justify-center overflow-hidden"
      aria-label="RITANSHI — Return to home"
      title="RITANSHI"
    >
      {/* Subtle editorial edge divider */}
      <div className="absolute top-0 bottom-0 right-0 w-[1px] bg-[#821713]/15 transition-colors duration-300 group-hover:bg-[#992511]/40" />

      {/* Single Oversized Vertical Rotated Wordmark */}
      <div className="relative flex items-center justify-center h-full">
        <span
          className="font-serif text-[7vh] sm:text-[8.5vh] md:text-[10.5vh] lg:text-[12vh] font-normal tracking-[0.28em] text-[#262626]/85 group-hover:text-[#821713] transition-colors duration-500 whitespace-nowrap select-none leading-none -rotate-90 origin-center -translate-x-[15%] sm:-translate-x-[12%]"
          style={{
            fontFeatureSettings: '"kern" 1, "liga" 1',
          }}
        >
          RITANSHI
        </span>
      </div>
    </aside>
  );
};
