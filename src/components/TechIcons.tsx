import React from 'react';
import { GithubIcon } from './Icons';

export const TechIcon: React.FC<{ name: string; size?: number; className?: string }> = ({ 
  name, 
  size = 20, 
  className = "" 
}) => {
  switch (name.toLowerCase()) {
    case 'python':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 9H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2v-2a2 2 0 0 1 2-2h5a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2" />
          <path d="M12 15h7a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-2v2a2 2 0 0 1-2 2H10a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-2" />
          <circle cx="7" cy="7" r="1" fill="currentColor" />
          <circle cx="17" cy="17" r="1" fill="currentColor" />
        </svg>
      );

    case 'c':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="9" />
          <path d="M15 9.5a5 5 0 1 0 0 5" />
        </svg>
      );

    case 'javascript':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <rect width="18" height="18" x="3" y="3" rx="3" />
          <path d="M16 8v5a3 3 0 0 1-3 3h-1" />
          <path d="M9 16a2 2 0 0 1-2-2v-1" />
        </svg>
      );

    case 'html5':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="m4 3 2 17 6 2 6-2 2-17H4z" />
          <path d="M8 8h8l-.5 5H9.5l.2 2.5 2.3.5 2.3-.5.2-1.5" />
        </svg>
      );

    case 'css3':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="m4 3 2 17 6 2 6-2 2-17H4z" />
          <path d="M7.5 7.5h9L16 11.5H8.5l.5 5 3 1 3-1 .2-2.5" />
        </svg>
      );

    case 'react':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(0 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(120 12 12)" />
          <circle cx="12" cy="12" r="1.5" fill="currentColor" />
        </svg>
      );

    case 'node.js':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 2 3 7v10l9 5 9-5V7l-9-5z" />
          <path d="m12 12 9-5" />
          <path d="M12 12v10" />
          <path d="m12 12-9-5" />
        </svg>
      );

    case 'mongodb':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M12 2C8 7 6 11 6 15a6 6 0 0 0 12 0c0-4-2-8-6-13Z" />
          <path d="M12 2v20" />
        </svg>
      );

    case 'sqlite':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      );

    case 'git':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="18" cy="18" r="3" />
          <circle cx="6" cy="6" r="3" />
          <circle cx="6" cy="18" r="3" />
          <path d="M6 9v6" />
          <path d="M9 9l9 9" />
        </svg>
      );

    case 'github':
      return <GithubIcon size={size} className={className} />;

    case 'tailwind css':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <path d="M6 12c.5-2.5 2-4 4.5-4 3 0 3.5 2 5 2.5 1.5.5 3 0 4-1.5-1 2.5-2.5 4-4.5 4-3 0-3.5-2-5-2.5C8.5 10 7 10.5 6 12Z" />
          <path d="M2 17c.5-2.5 2-4 4.5-4 3 0 3.5 2 5 2.5 1.5.5 3 0 4-1.5-1 2.5-2.5 4-4.5 4-3 0-3.5-2-5-2.5C4.5 15 3 15.5 2 17Z" />
        </svg>
      );

    case 'fastapi':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <circle cx="12" cy="12" r="9" />
          <path d="m13 6-4 7h6l-4 5" />
        </svg>
      );

    default:
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
  }
};
