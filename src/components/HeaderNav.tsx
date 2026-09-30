import React, { useState } from 'react';
import { ActiveTab, PortfolioData } from '../types';
import { Menu, X } from 'lucide-react';

interface HeaderNavProps {
  data: PortfolioData;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  data,
  activeTab,
  setActiveTab,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: ActiveTab; label: string }[] = [
    { id: 'index', label: 'RITANSHI' },
    { id: 'work', label: 'WORK' },
    { id: 'process', label: 'PROCESS' },
    { id: 'about', label: 'ABOUT' },
    { id: 'contact', label: 'CONTACT' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-6 md:px-12 md:py-8 transition-all duration-300 pointer-events-none">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        
        {/* Desktop Editorial Navigation: RITANSHI          WORK     PROCESS ... */}
        <div className="pointer-events-auto hidden md:flex items-center space-x-8 lg:space-x-12">
          <nav className="flex items-center space-x-7 lg:space-x-9">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const isBrand = item.id === 'index';

              if (isBrand) {
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab('index')}
                    className={`relative py-1 transition-colors duration-200 group mr-3 lg:mr-5 ${
                      isActive ? 'text-[#F3C5CD]' : 'text-[#F3C5CD]/80 hover:text-white'
                    }`}
                    aria-label="RITANSHI Home"
                  >
                    <span
                      className="font-condensed font-black italic text-[23px] lg:text-[26px] tracking-[-0.02em] uppercase leading-none inline-block origin-left scale-y-110 select-none"
                      style={{
                        fontStretch: 'condensed',
                        WebkitFontSmoothing: 'antialiased',
                        textRendering: 'optimizeLegibility',
                      }}
                    >
                      RITANSHI
                    </span>
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[#F3C5CD]" />
                    )}
                  </button>
                );
              }

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative py-1 text-[11.5px] lg:text-[12.5px] font-medium tracking-[0.22em] uppercase transition-colors duration-200 ${
                    isActive
                      ? 'text-[#F3C5CD] font-semibold'
                      : 'text-[#F3C5CD]/75 hover:text-white'
                  }`}
                >
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#F3C5CD]" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right: Soft Pastel Pink Edition Accent Tag */}
        <div className="pointer-events-auto hidden md:inline-flex items-center space-x-2 bg-black/25 px-3 py-1 text-[9.5px] font-medium tracking-[0.22em] text-[#F3C5CD] border border-[#F3C5CD]/25 shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F3C5CD] ring-1 ring-[#F3C5CD]/40" />
          <span>COLLECTION 2026</span>
        </div>

        {/* Mobile Header: RITANSHI Brand on Left + Hamburger Menu on Right */}
        <div className="pointer-events-auto flex items-center justify-between w-full md:hidden">
          <button
            onClick={() => setActiveTab('index')}
            className="font-condensed font-black italic text-[22px] tracking-[-0.02em] uppercase leading-none text-[#F3C5CD] scale-y-110 select-none"
            aria-label="RITANSHI Home"
          >
            RITANSHI
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[11px] font-medium tracking-[0.22em] uppercase text-[#F3C5CD] py-1 transition-colors hover:text-white flex items-center space-x-1.5"
            aria-label="Toggle navigation menu"
          >
            <span>{mobileMenuOpen ? 'CLOSE' : 'MENU'}</span>
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Editorial Overlay */}
      {mobileMenuOpen && (
        <div className="pointer-events-auto fixed inset-0 top-[76px] z-50 bg-[#C81D25] px-8 py-12 backdrop-blur-md md:hidden animate-in fade-in duration-300">
          <div className="relative z-10 flex flex-col space-y-6">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              const isBrand = item.id === 'index';
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left transition-colors ${
                    isBrand
                      ? `font-condensed font-black italic text-4xl tracking-[-0.02em] scale-y-110 origin-left uppercase ${
                          isActive ? 'text-[#F3C5CD] underline decoration-[#F3C5CD] underline-offset-8' : 'text-[#F3C5CD]/85 hover:text-white'
                        }`
                      : `font-serif text-3xl font-normal tracking-wide ${
                          isActive ? 'text-[#F3C5CD] underline decoration-[#F3C5CD] underline-offset-8' : 'text-[#F3C5CD]/75 hover:text-white'
                        }`
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            <div className="pt-12 border-t border-[#F3C5CD]/20 space-y-2">
              <span className="text-[10px] font-medium tracking-[0.25em] text-[#F3C5CD]/80 uppercase block">
                ATELIER
              </span>
              <p className="text-xs text-[#F3C5CD] tracking-wider uppercase">NEW DELHI, INDIA</p>
              <p className="text-xs text-[#F3C5CD]/90 italic font-serif pt-2">Between control and chaos.</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
