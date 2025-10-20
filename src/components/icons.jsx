import React from "react";

const Icon = ({ name, className }) => {
  const icons = {
    menu: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
    ),
    leaf: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M11 20A7 7 0 0 1 4 13H2a10 10 0 0 0 10 10z" /><path d="M12 21a10 10 0 0 0 10-10h-2a7 7 0 0 1-7 7z" /><path d="M12 12v9" /><path d="M15.24 9.24 4.19 20.29" /><path d="m14 18-3-3" /><path d="m11.5 6.5 4 4" /><path d="M13 2a9 9 0 0 0-9 9H2a11 11 0 0 1 11-11z" /></svg>
    ),
    globe: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>
    ),
    award: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>
    ),
    recycle: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-2.923L4.5 13.5" /><path d="m14 13.5 1.255-2.51a1.83 1.83 0 0 1 2.915-.004l1.255 2.512A1.83 1.83 0 0 1 17.854 16H15" /><path d="M8.546 13.5 6.42 9.237a1.83 1.83 0 0 1 1.57-2.924H11" /><path d="M15 16h2.185a1.83 1.83 0 0 0 1.57-2.923L17.5 10.5" /><path d="m10 10.5-1.255 2.51a1.83 1.83 0 0 0-2.915-.004L4.575 13.5" /><path d="M15.454 10.5 17.58 6.237a1.83 1.83 0 0 0-1.57-2.924H13" /><path d="m13 2-3 4 4 3-2 3" /><path d="M5 13h1.5" /><path d="M17.5 13H19" /><path d="m10 17 3-4-4-3 2-3" /></svg>
    )
  };
  return icons[name] || null;
};

export default Icon;