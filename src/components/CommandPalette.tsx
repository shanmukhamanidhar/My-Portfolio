import React, { useState, useEffect, useRef } from 'react';
import type { Project } from '../types';
import { PROJECTS, PERSONAL_INFO } from '../data/portfolioData';
import { soundFx } from '../utils/sound';
import { GithubIcon, LinkedinIcon } from './Icons';
import { 
  Search, 
  FolderGit2, 
  User, 
  Cpu, 
  GitCommit, 
  Code2, 
  Mail, 
  Sun, 
  Moon, 
  Volume2, 
  Copy, 
  ArrowRight
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject: (proj: Project) => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectProject,
  darkMode,
  setDarkMode,
  soundEnabled,
  setSoundEnabled
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        } else {
          soundFx.playClick(750, 0.03);
          // Trigger handled in parent
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const scrollToSection = (id: string) => {
    onClose();
    soundFx.playClick(600, 0.03);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const commandItems = [
    // Navigation items
    {
      id: 'nav-work',
      category: 'NAVIGATION',
      title: 'Jump to Selected Work (Projects)',
      icon: <FolderGit2 size={14} className="text-accent" />,
      action: () => scrollToSection('work')
    },
    {
      id: 'nav-about',
      category: 'NAVIGATION',
      title: 'Jump to About & Engineering Mindset',
      icon: <User size={14} className="text-accent" />,
      action: () => scrollToSection('about')
    },
    {
      id: 'nav-stack',
      category: 'NAVIGATION',
      title: 'Jump to Engineering Stack',
      icon: <Cpu size={14} className="text-accent" />,
      action: () => scrollToSection('stack')
    },
    {
      id: 'nav-journey',
      category: 'NAVIGATION',
      title: 'Jump to Journey & Engineering Log',
      icon: <GitCommit size={14} className="text-accent" />,
      action: () => scrollToSection('journey')
    },
    {
      id: 'nav-code',
      category: 'NAVIGATION',
      title: 'Jump to Code Craftsmanship & Repos',
      icon: <Code2 size={14} className="text-accent" />,
      action: () => scrollToSection('code')
    },
    {
      id: 'nav-contact',
      category: 'NAVIGATION',
      title: 'Jump to Contact & Inquiries',
      icon: <Mail size={14} className="text-accent" />,
      action: () => scrollToSection('contact')
    },

    // Project Case Studies
    ...PROJECTS.map(p => ({
      id: `proj-${p.id}`,
      category: 'CASE STUDIES',
      title: `Open Case Study: ${p.title}`,
      icon: <FolderGit2 size={14} className="text-[#FF6A00]" />,
      action: () => {
        onClose();
        soundFx.playClick(700, 0.03);
        onSelectProject(p);
      }
    })),

    // System Utilities
    {
      id: 'util-theme',
      category: 'UTILITIES',
      title: darkMode ? 'Switch to Light Theme' : 'Switch to Dark Theme',
      icon: darkMode ? <Sun size={14} className="text-[#FF6A00]" /> : <Moon size={14} className="text-neutral-400" />,
      action: () => {
        soundFx.playToggle();
        setDarkMode(!darkMode);
        onClose();
      }
    },
    {
      id: 'util-sound',
      category: 'UTILITIES',
      title: soundEnabled ? 'Disable Tactile Sound Feedback' : 'Enable Tactile Sound Feedback',
      icon: <Volume2 size={14} className="text-accent" />,
      action: () => {
        const next = !soundEnabled;
        soundFx.enabled = next;
        setSoundEnabled(next);
        if (next) soundFx.playClick(750, 0.05);
        onClose();
      }
    },
    {
      id: 'util-copy-email',
      category: 'UTILITIES',
      title: `Copy Email (${PERSONAL_INFO.email})`,
      icon: <Copy size={14} className="text-[#FF6A00]" />,
      action: () => {
        navigator.clipboard.writeText(PERSONAL_INFO.email);
        soundFx.playClick(850, 0.03);
        onClose();
      }
    },
    {
      id: 'util-github',
      category: 'EXTERNAL',
      title: 'Visit GitHub Profile (@shanmukhamanidhar)',
      icon: <GithubIcon size={14} className="text-white light:text-black" />,
      action: () => {
        window.open(PERSONAL_INFO.githubUrl, '_blank');
        onClose();
      }
    },
    {
      id: 'util-linkedin',
      category: 'EXTERNAL',
      title: 'Visit LinkedIn Profile (Shanmukha Manidhar)',
      icon: <LinkedinIcon size={14} className="text-[#FF6A00]" />,
      action: () => {
        window.open(PERSONAL_INFO.linkedinUrl, '_blank');
        onClose();
      }
    }
  ];

  const filteredCommands = commandItems.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % (filteredCommands.length || 1));
      soundFx.playClick(400, 0.02);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
      soundFx.playClick(400, 0.02);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[selectedIndex]) {
        filteredCommands[selectedIndex].action();
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex justify-center items-start pt-16 sm:pt-24 px-4 font-mono animate-fade-in"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-[#0C0C0C] border border-white/10 rounded-2xl shadow-2xl overflow-hidden shadow-[0_0_50px_rgba(255,90,0,0.12)]"
        onClick={e => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-[#121212] text-xs">
          <Search size={15} className="text-accent" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search sections, case studies, utilities..."
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full bg-transparent text-dark-text light:text-light-text placeholder-dark-dim light:placeholder-light-dim focus:outline-none text-xs"
          />
          <kbd className="px-1.5 py-0.5 rounded bg-dark-elevated light:bg-light-card border border-dark-border light:border-light-border text-[10px] text-dark-dim light:text-light-dim">
            ESC
          </kbd>
        </div>

        {/* Command List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1 text-xs">
          {filteredCommands.length === 0 ? (
            <div className="p-6 text-center text-dark-dim light:text-light-dim text-xs">
              No matching commands or case studies found.
            </div>
          ) : (
            filteredCommands.map((item, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <div
                  key={item.id}
                  onClick={() => item.action()}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`px-3 py-2.5 flex items-center justify-between cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-accent/10 border border-accent/40 text-dark-text light:text-light-text'
                      : 'border border-transparent text-dark-muted light:text-light-muted hover:text-dark-text'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {item.icon}
                    <span className="font-semibold">{item.title}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[10px]">
                    <span className="px-1.5 py-0.5 bg-dark-surface light:bg-light-elevated border border-dark-border light:border-light-border text-dark-dim light:text-light-dim">
                      {item.category}
                    </span>
                    {isSelected && <ArrowRight size={12} className="text-accent" />}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-dark-border light:border-light-border bg-dark-surface light:bg-light-elevated text-[10px] text-dark-dim light:text-light-dim">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
          <div>
            <span className="text-accent">COMMAND_PALETTE // v1.2</span>
          </div>
        </div>
      </div>
    </div>
  );
};
