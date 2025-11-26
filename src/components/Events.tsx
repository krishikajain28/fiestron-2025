import React, { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useLocation } from 'react-router-dom'

// --- Event Data Interface ---
interface EventData {
  id: number;
  category: 'technical' | 'non-technical' | 'gaming' | 'carnival';
  title: string;
  description: string;
  emoji: string;
  fee: string;
  teamSize: string;
  formLink?: string; 
  image: string; 
  details: {
    rounds?: string[];
    format?: string[];
    rules: string[];
    requirements?: string[];
    judging?: string[];
    categories?: string[]; 
    prizes?: string[]; 
    points?: string[];
  };
}

const Events: React.FC = () => {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null)
  
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const element = document.getElementById(location.state.scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  // --- STYLING THEMES ---
  const getTheme = (category: string) => {
    switch(category) {
      case 'technical':
        return {
          gradient: 'from-indigo-500 via-purple-500 to-pink-500',
          text: 'text-purple-400',
          bg: 'bg-purple-500/10',
          border: 'border-purple-500/20',
          button: 'bg-gradient-to-r from-indigo-600 to-purple-600'
        };
      case 'non-technical':
        return {
          gradient: 'from-pink-500 via-rose-500 to-yellow-500',
          text: 'text-pink-400',
          bg: 'bg-pink-500/10',
          border: 'border-pink-500/20',
          button: 'bg-gradient-to-r from-pink-600 to-rose-600'
        };
      case 'gaming':
        return {
          gradient: 'from-emerald-400 via-green-500 to-teal-500',
          text: 'text-green-400',
          bg: 'bg-green-500/10',
          border: 'border-green-500/20',
          button: 'bg-gradient-to-r from-emerald-600 to-teal-600'
        };
      case 'carnival':
        return {
          gradient: 'from-orange-400 via-amber-500 to-yellow-500',
          text: 'text-orange-400',
          bg: 'bg-orange-500/10',
          border: 'border-orange-500/20',
          button: 'bg-gradient-to-r from-orange-600 to-amber-600'
        };
      default:
        return {
          gradient: 'from-gray-600 to-gray-400',
          text: 'text-white',
          bg: 'bg-white/10',
          border: 'border-white/20',
          button: 'bg-white/10'
        };
    }
  }

  // --- EVENT DATABASE ---
  const events: EventData[] = [
    {
      id: 1,
      category: 'technical',
      title: 'Code Quest',
      emoji: '💻',
      description: 'A multi-round programming challenge testing vintage knowledge and modern problem-solving.',
      fee: '₹100',
      teamSize: 'Team of 2',
      formLink: 'https://forms.gle/CTGfGhXCL4Pnbe616',
      image: '/images/events/code-quest.gif', 
      details: {
        rounds: [
          'Round 1: Retro Computer Trivia + Modern Practices (MCQs - 20 mins)',
          'Round 2: Typing Challenge with vintage snippets (BASIC, C, COBOL)',
          'Round 3: Problem-solving (Classic to Modern optimization)'
        ],
        rules: [
          'All rounds are mandatory.',
          'Internet allowed ONLY in Round 3.',
          'Plagiarism leads to disqualification.',
          'Strict time limits enforced.',
          'Pre-installed software: Text editor, compiler for C/Python/Java.'
        ],
        judging: [
          'Round 1: Accuracy (70%), Speed (30%)',
          'Round 2: WPM (50%), Accuracy (50%)',
          'Round 3: Approach (30%), Optimization (40%), Quality (30%)'
        ]
      }
    },
    {
      id: 2,
      category: 'technical',
      title: 'Hackathon',
      emoji: '🚀',
      description: '2-day challenge to modernize classic software using current tech stacks.',
      fee: '₹100',
      teamSize: 'Team of 2',
      formLink: 'https://forms.gle/NKx9zg1vyEy7mYrd7',
      image: '/images/events/hackathon.png',
      details: {
        rounds: ['Build Phase (Reimagine vintage concept)', 'Final Pitch (10 mins)'],
        rules: [
          'Team formation before event, no changes mid-hackathon.',
          'All code must be written during the 2-day period.',
          'AI tools allowed but must be disclosed.',
          'Project must be deployed and accessible via URL.',
          'No plagiarism - all work must be original.'
        ],
        judging: [
          'Originality (25%)',
          'Technical Implementation (30%)',
          'UX/Design (20%)',
          'Presentation (15%)',
          'Innovation (10%)'
        ]
      }
    },
    {
      id: 3,
      category: 'technical',
      title: 'Syntax Sprint',
      emoji: '⚡',
      description: 'A relay coding challenge: Old-school HTML foundation meets Modern Framework polish.',
      fee: '₹100',
      teamSize: 'Team of 2',
      formLink: 'https://forms.gle/TMytyAesfsZRSbwg8',
      image: '/images/events/syntax-sprint.png',
      details: {
        rounds: [
          'Round 1: The Starter (Vanilla HTML/CSS/JS - 45 mins)',
          'Round 2: The Finisher (React/Tailwind/Modern Tools - 45 mins)'
        ],
        rules: [
          'Both team members must be present; no substitutions.',
          'No communication between rounds.',
          'Starter CANNOT use frameworks.',
          'Finisher MUST retain core structure from Round 1.',
          'Finisher must include ONE modernized retro UI element.'
        ],
        judging: [
          'Round 1: Clean HTML structure (15%), CSS/JS (25%)',
          'Round 2: Framework integration (20%), Responsiveness (15%), Retro element (15%)'
        ]
      }
    },
    {
      id: 4,
      category: 'technical',
      title: 'Geocities AI',
      emoji: '🤖',
      description: 'Design a 90s aesthetic website using ONLY AI prompts to solve a modern problem.',
      fee: '₹50',
      teamSize: 'Individual',
      formLink: 'https://forms.gle/whv4Xy1xWBSJJDaX7',
      image: '/images/events/geocites-ai.png',
      details: {
        rules: [
          'All code/design must be AI-generated (Prompts must be documented).',
          'No manual coding allowed.',
          'Must include: HTML tables, Animated GIFs, Pixel Art, Web-safe colors.',
          'Website must be fully functional and accessible.'
        ],
        judging: [
          'Authentic 90s Aesthetic (20%)',
          'Prompt Engineering (25%)',
          'Modern Functionality (20%)',
          'Accessibility (15%)',
          'Innovation (20%)'
        ]
      }
    },
    {
      id: 5,
      category: 'technical',
      title: 'Design.exe',
      emoji: '🎨',
      description: 'Create a professional modern app interface using ONLY Microsoft Paint.',
      fee: '₹50',
      teamSize: 'Individual',
      formLink: 'https://forms.gle/JUbreJcD7LZcdjGB6',
      image: '/images/events/design-exe.png',
      details: {
        rules: [
          'ONLY Microsoft Paint allowed (Modern version with layers allowed).',
          'No other design tools (Figma/Adobe forbidden).',
          'Screenshots or recorded process may be requested.',
          'Stock images allowed but must be edited in Paint.'
        ],
        judging: [
          'UI Composition (20%)',
          'UX Logic (25%)',
          'Creativity with tools (20%)',
          'Visual Polish (15%)',
          'Modern Concepts (10%)'
        ]
      }
    },
    {
      id: 6,
      category: 'technical',
      title: 'Retro Rendered',
      emoji: '🖼️',
      description: 'AI art challenge: Reimagine vintage aesthetics into modern digital art.',
      fee: '₹50',
      teamSize: 'Individual',
      formLink: 'https://forms.gle/5MoNHYyqkEPLFwNS7',
      image: '/images/events/retro-rendered.png',
      details: {
        rules: [
          'Use AI tools (Midjourney/DALL-E/Firefly).',
          'Submit prompt history/documentation.',
          'Post-AI editing allowed but must be documented.',
          'Final artwork must be significantly transformed (not just upscaled).',
          'Max 3 final artworks per participant.'
        ],
        judging: [
          'Creativity (25%)',
          'Prompt Mastery (25%)',
          'Visual Appeal (20%)',
          'Retro-Modern Fusion (15%)'
        ]
      }
    },
    {
      id: 7,
      category: 'technical',
      title: 'Vintage Ventures',
      emoji: '💼',
      description: 'Pitch a revival strategy for a failed company (e.g., Blockbuster, BlackBerry).',
      fee: '₹100',
      teamSize: 'Team of 2',
      formLink: 'https://forms.gle/HWvd6bbuyDzaifWE6',
      image: '/images/events/vintage-venture.png',
      details: {
        rules: [
          'Must choose a real failed company.',
          'Pitch must include modern tech integration.',
          'All team members must participate in presentation.',
          'Professional attire required.'
        ],
        judging: [
          'Failure Analysis (15%)',
          'Market Viability (25%)',
          'Creativity (25%)',
          'Technical Feasibility (15%)',
          'Business Model (10%)'
        ]
      }
    },
    {
      id: 8,
      category: 'non-technical',
      title: 'Brain Buster',
      emoji: '🧠',
      description: 'A fast-paced, buzzer-based quiz show blending retro pop culture and modern trends.',
      fee: '₹100',
      teamSize: 'Team of 2',
      formLink: 'https://forms.gle/FhY7Lgn4EzQmysNq7',
      image: '/images/events/brain-buster.png',
      details: {
        rounds: [
          'Round 1: Retro Rush (80s-2000s Trivia - Quick fire)',
          'Round 2: Modern Mashup (Current Trends)',
          'Round 3: Rewired Round (Connect the Era)'
        ],
        rules: [
          'No smartphones/internet allowed.',
          'Negative marking in Rounds 1 & 2.',
          'Only the person buzzing can answer.',
          '5 seconds to answer after buzzing.'
        ],
        judging: ['Accuracy (60%)', 'Speed (25%)', 'Team Coordination (10%)', 'Creative Connections (5%)']
      }
    },
    {
      id: 9,
      category: 'non-technical',
      title: 'Escape Protocol',
      emoji: '🔐',
      description: 'Crack codes and solve riddles to escape 3 themed rooms.',
      fee: '₹200',
      teamSize: 'Team of 4',
      formLink: 'https://forms.gle/K9CbwhkwKmAfzTJP8',
      image: '/images/events/escape-protocol.png',
      details: {
        rounds: [
          'Level 1: The Forgotten Server Room (Beginner)',
          'Level 2: The Vintage Office (Intermediate)',
          'Level 3: The Digital Time Vault (Expert)'
        ],
        rules: [
          'All members must enter together.',
          'No physical force on props.',
          '1 hint per room allowed (5 min penalty).',
          'No electronic devices allowed inside.'
        ],
        judging: ['Completion Time (50%)', 'Rooms Escaped (40%)', 'Minimal Hints (10%)']
      }
    },
    {
      id: 10,
      category: 'non-technical',
      title: 'Meme Mania',
      emoji: '😂',
      description: 'Create viral memes or reels about college life and tech culture.',
      fee: '₹100',
      teamSize: 'Team of 2',
      formLink: 'https://forms.gle/e9EbPwub7pQnLBwj7',
      image: '/images/events/meme-mania.jpeg',
      details: {
        rules: [
          'Content must be original (no reposts).',
          'No offensive or discriminatory material.',
          'Submit in digital format (JPEG/PNG/MP4).',
          'Watermark with team name.',
          'Max creation time: 1.5 hours.'
        ],
        judging: ['Originality (30%)', 'Humor (25%)', 'Relatability (20%)', 'Visual Appeal (15%)', 'Viral Potential (10%)']
      }
    },
    {
      id: 11,
      category: 'non-technical',
      title: 'Ad-A-Bit',
      emoji: '📢',
      description: 'Rebrand a quirky or failed product with a humorous video ad.',
      fee: '₹100',
      teamSize: 'Team of 2',
      formLink: 'https://forms.gle/Y9frmA36fcc4r4tNA',
      image: '/images/events/ad-a-bit.png',
      details: {
        rules: [
          'Theme/Product announced in advance.',
          'Ad should be funny, creative, and strategic.',
          'No offensive content.',
          'Video must be MP4 format and watermarked.',
          'All team members must participate in pitch.'
        ],
        judging: ['Humor (25%)', 'Marketing Strategy (25%)', 'Production Quality (20%)', 'Concept Originality (15%)', 'Pitch (10%)']
      }
    },
    {
      id: 12,
      category: 'non-technical',
      title: 'Logo Lore',
      emoji: '🏷️',
      description: 'Identify distorted, partial, and evolved brand logos.',
      fee: '₹100',
      teamSize: 'Team of 2',
      formLink: 'https://forms.gle/PRjaquuraJB5RdFj8',
      image: '/images/events/logo-lore.gif',
      details: {
        rounds: [
          'Round 1: Distorted Brands (Pixelated/Partial)',
          'Round 2: Evolution Chain (Chronological Order)',
          'Round 3: The Brand Tag (Identify Slogans)'
        ],
        rules: [
          'No electronic devices allowed.',
          'Spelling must be accurate.',
          'No communication with other teams.',
          'Time limits enforced per round.'
        ],
        judging: ['Accuracy (50%)', 'Chronology (20%)', 'Tagline Accuracy (20%)', 'Creative New Taglines (10%)']
      }
    },
    {
      id: 13,
      category: 'non-technical',
      title: 'One Mic Stand',
      emoji: '🎤',
      description: 'Open mic performance incorporating a random "Rewired" theme.',
      fee: '₹50',
      teamSize: 'Individual',
      formLink: 'https://forms.gle/GxRmu4xewdEmBYWN9',
      image: '/images/events/one-mic-stand.jpeg',
      details: {
        rules: [
          'Draw a "Rewired" theme card on stage (e.g., "Nostalgia").',
          '2-3 mins prep time.',
          '3-5 min performance incorporating theme.',
          'No offensive content.',
          'Bring own props/instruments if needed.'
        ],
        judging: ['Creativity (25%)', 'Theme Incorporation (20%)', 'Stage Presence (20%)', 'Technical Skill (20%)', 'Entertainment Value (15%)']
      }
    },
    {
      id: 14,
      category: 'gaming',
      title: 'BGMI',
      emoji: '🔫',
      description: 'Battle Royale squad tournament.',
      fee: '₹200',
      teamSize: 'Team of 4 (1 Sub)',
      formLink: 'https://forms.gle/PfwM6sorLYNdfYjM6',
      image: '/images/events/bgmi.jpeg',
      details: {
        rules: [
          'Mobile only (Android/iOS).',
          'No hacks, mods, or GFX tools.',
          'Server: Asia.',
          'Screenshot of results must be submitted.'
        ],
        points: ['#1: 15 pts', '#2: 12 pts', '#3: 10 pts', '#4-5: 8 pts', 'Each Kill: 1 pt']
      }
    },
    {
      id: 15,
      category: 'gaming',
      title: 'FIFA Tournament',
      emoji: '⚽',
      description: '1v1 Virtual Football competition.',
      fee: '₹50',
      teamSize: 'Individual',
      formLink: 'https://forms.gle/CL2fSX59r49cMAxy8',
      image: '/images/events/fifa-tournament.jpeg',
      details: {
        rules: [
          'Latest FIFA version.',
          'No pausing unless technical issue.',
          'Handball/Offsides: Auto.',
          'No rage quitting (Auto-loss).'
        ],
        judging: ['Match results (goals scored)', 'Knockout progression']
      }
    },
    {
      id: 16,
      category: 'gaming',
      title: 'Chess',
      emoji: '♟️',
      description: 'Rapid format chess tournament testing strategy and patience.',
      fee: '₹50',
      teamSize: 'Individual',
      formLink: 'https://forms.gle/qcxpdiqcDKoXpc62A',
      image: '/images/events/chess.png',
      details: {
        rules: [
          'FIDE rules apply.',
          'Touch-move rule enforced.',
          'Clocks provided.',
          'No electronic devices.'
        ],
        judging: ['Win/Loss record', 'Tie-breaks (Buchholz system)']
      }
    },
    {
      id: 17,
      category: 'gaming',
      title: 'Table Tennis',
      emoji: '🏓',
      description: 'Fast-paced singles competition testing reflexes and precision.',
      fee: '₹50',
      teamSize: 'Individual',
      formLink: 'https://forms.gle/T4Zh4xJF7Hua68HJA',
      image: '/images/events/table-tennis.png',
      details: {
        rules: [
          'ITTF rules apply.',
          'Service must be diagonal.',
          'Win by 2 points at 10-10.',
          'No time-wasting.'
        ]
      }
    },
    {
      id: 18,
      category: 'gaming',
      title: 'Carrom',
      emoji: '🎯',
      description: 'Doubles carrom tournament testing precision and strategy.',
      fee: '₹100',
      teamSize: 'Team of 2',
      formLink: 'https://forms.gle/SD8A6vguXjFbPB2H9',
      image: '/images/events/carrom.png',
      details: {
        rules: [
          'ICF rules.',
          'Queen must be covered.',
          'Thumb stroke allowed.',
          'White breaks first.',
          'Time limit: 1 min per shot.'
        ]
      }
    },
    {
      id: 19,
      category: 'gaming',
      title: 'Box Cricket',
      emoji: '🏏',
      description: '6-a-side box cricket tournament in a fast-paced format.',
      fee: '₹300',
      teamSize: 'Team of 6 (1 Sub)',
      formLink: 'https://forms.gle/H8Zuka6id7WjX2R36',
      image: '/images/events/box-cricket.jpeg',
      details: {
        rules: [
          'Underarm bowling.',
          'Tennis ball.',
          'Report 15 mins early.',
          'Sports shoes mandatory (no spikes).',
          'Umpire decision final.'
        ]
      }
    },
    {
      id: 20,
      category: 'gaming',
      title: 'Netflix Trivia',
      emoji: '🎬',
      description: 'Quiz on Netflix originals, movies, and pop culture.',
      fee: '₹100',
      teamSize: 'Team of 2',
      formLink: 'https://forms.gle/VoM1j62BPmiuJy6eA',
      image: '/images/events/netflix-trivia.jpeg',
      details: {
        rules: [
          'No phones/internet.',
          'Answers submitted on sheets.',
          'No communication with other teams.'
        ],
        judging: ['Accuracy (100%)', 'Tie-breaker: Speed of submission']
      }
    },
    {
      id: 21,
      category: 'carnival',
      title: 'Coin Drop',
      emoji: '🪙',
      description: 'Drop a coin into a glass inside a water bucket.',
      fee: '₹30',
      teamSize: 'Individual',
      formLink: '',
      image: '/images/events/coin-drop.jpeg',
      details: {
        rules: ['Drop from chest height.', 'Must stay in cup.', 'No leaning over.', 'One coin per entry.'],
        prizes: ['Success: Chocolate/Keychain', '3 Drops: Bonus Prize']
      }
    },
    {
      id: 22,
      category: 'carnival',
      title: 'Stack Attack',
      emoji: '🥤',
      description: 'Build and dismantle a cup pyramid in 10s.',
      fee: '₹30',
      teamSize: 'Individual',
      formLink: '',
      image: '/images/events/stack-attack.jpeg',
      details: {
        rules: ['10 cups.', '4-3-2-1 structure.', 'One hand only.', 'Time limit: 10s.', 'Cups must not topple.'],
        prizes: ['Success: Surprise Event Entry', '< 7 secs: Bonus Chocolate']
      }
    },
    {
      id: 23,
      category: 'carnival',
      title: 'Ticket Toss',
      emoji: '🎟️',
      description: 'Toss tickets to land near a target line.',
      fee: '₹30',
      teamSize: 'Individual',
      formLink: '',
      image: '/images/events/ticket-toss.jpeg',
      details: {
        rules: ['Stand behind throwing line.', 'Closest without crossing wins.', 'Best of 5 throws.', 'Must land flat.'],
        prizes: ['Within 6 inches: Coupon', 'Closest Overall: Special Prize']
      }
    },
    {
      id: 24,
      category: 'carnival',
      title: 'Brick Balance',
      emoji: '🧱',
      description: 'Hold a wet brick with two fingers for 60s.',
      fee: '₹30',
      teamSize: 'Individual',
      formLink: '',
      image: '/images/events/brick-balance.jpeg',
      details: {
        rules: ['Two fingers only (Thumb+1).', 'Horizontal hold.', 'No resting on body.', '60 seconds.'],
        prizes: ['Success: Merchandise', 'Record Holder: Grand Prize']
      }
    },
    {
      id: 25,
      category: 'carnival',
      title: 'Elbow Flip',
      emoji: '💪',
      description: 'Flip coins from elbow and catch them mid-air.',
      fee: '₹30',
      teamSize: 'Individual',
      formLink: '',
      image: '/images/events/elbow-flip.jpeg',
      details: {
        rules: ['Place 5-10 coins on elbow.', 'Flip and catch with same hand.', 'One attempt.', 'No assisting hand.'],
        prizes: ['3+ Caught: Chocolate', '7+ Caught: Premium', 'All 10: Grand Prize']
      }
    },
    {
      id: 26,
      category: 'carnival',
      title: 'Blow the Ball',
      emoji: '🌬️',
      description: 'Move a ball across a table using only breath.',
      fee: '₹30',
      teamSize: 'Individual',
      formLink: '',
      image: '/images/events/blow-the-ball.jpeg',
      details: {
        rules: ['No touching with hands/body.', 'Must cross finish line.', '30 seconds limit.'],
        prizes: ['Success: Gift', '< 15 secs: Premium Prize']
      }
    },
    {
      id: 27,
      category: 'carnival',
      title: 'Rubber Band Shot',
      emoji: '🎯',
      description: 'Knock down a cup pyramid with rubber bands.',
      fee: '₹30',
      teamSize: 'Individual',
      formLink: '',
      image: '/images/events/rubber-band-shot.jpeg',
      details: {
        rules: ['Distance 8-10ft.', '3-5 rubber bands.', 'All cups must fall.', 'Pyramid must be dismantled.'],
        prizes: ['Success: Chocolate', '1-2 shots: Premium Prize']
      }
    },
    {
      id: 28,
      category: 'carnival',
      title: 'Straw Suction',
      emoji: '🥤',
      description: 'Transfer paper balls using straw suction.',
      fee: '₹30',
      teamSize: 'Individual',
      formLink: '',
      image: '/images/events/straw-suction.jpeg',
      details: {
        rules: ['No hands.', 'Transfer 7+ balls.', '60 seconds limit.', 'Only inhaling suction allowed.'],
        prizes: ['7+ balls: Treat', '12+ balls: Premium Box']
      }
    },
    {
      id: 29,
      category: 'carnival',
      title: 'Emoji Riddle',
      emoji: '🧩',
      description: 'Decode emoji sequences within time limit.',
      fee: '₹30',
      teamSize: 'Individual',
      formLink: '',
      image: '/images/events/emoji-riddle.jpeg',
      details: {
        rules: ['5 mins total.', 'Solve as many as possible.', 'No phones.', 'Spelling must be recognizable.'],
        prizes: ['5+ Correct: Small Prize', '10+ Correct: Premium', 'All Correct: Grand Prize']
      }
    },
    {
      id: 30,
      category: 'carnival',
      title: 'Color Trick',
      emoji: '🎨',
      description: 'Say the ink color, not the word.',
      fee: '₹30',
      teamSize: 'Individual',
      formLink: '',
      image: '/images/events/color-trick.jpeg',
      details: {
        rules: ['Read chart top to bottom.', 'Say INK COLOR not word.', '30 seconds.', 'One restart allowed.'],
        prizes: ['15+ Correct: Chocolate', '25+ Correct: Premium', 'Perfect Score: Grand Prize']
      }
    },
    {
      id: 31,
      category: 'carnival',
      title: '7 Up 7 Down',
      emoji: '🎲',
      description: 'Bet on dice roll outcomes.',
      fee: '₹30',
      teamSize: 'Individual',
      formLink: '',
      image: '/images/events/7up-7down.jpeg',
      details: {
        rules: ['Bet on <7, >7, or =7.', 'One roll.', 'No changing bets.', 'Rolled by organizer.'],
        prizes: ['Correct: Chocolate', 'Lucky 7: Triple Prize']
      }
    },
    {
      id: 32,
      category: 'carnival',
      title: 'Confusing Words',
      emoji: '😵',
      description: 'Read backwards words or palindromes.',
      fee: '₹30',
      teamSize: 'Individual',
      formLink: '',
      image: '/images/events/confusing-words.jpeg',
      details: {
        rules: ['45 seconds.', 'Decode and say/write word.', 'Spelling counts.', 'Skip allowed.'],
        prizes: ['8+ Correct: Small Prize', '15+ Correct: Premium', 'All Correct: Grand Prize']
      }
    },
    {
      id: 33,
      category: 'carnival',
      title: 'Penny Stack',
      emoji: '💰',
      description: 'Stack coins vertically without toppling.',
      fee: '₹30',
      teamSize: 'Individual',
      formLink: '',
      image: '/images/events/penny-stack.jpeg',
      details: {
        rules: ['Free-standing tower.', '45 seconds.', 'Must stand for 3s.', 'No adhesive.'],
        prizes: ['15+ Coins: Chocolate', '25+ Coins: Premium Box', 'Record Holder: Merch']
      }
    },
    {
      id: 34,
      category: 'carnival',
      title: 'Paper Ball Basket',
      emoji: '🗑️',
      description: 'Shoot paper balls into bowls at distances.',
      fee: '₹30',
      teamSize: 'Individual',
      formLink: '',
      image: '/images/events/paper-ball-basket.jpeg',
      details: {
        rules: ['10 shots total.', 'Different points for distances.', 'Min 15 pts to win.'],
        prizes: ['15+ Pts: Surprise', '30+ Pts: Premium', '45+ Pts: Grand Prize']
      }
    }
  ]

  // --- Filter Logic ---
  const filteredEvents = events.filter(e => {
    const matchesCategory = filter === 'all' ? true : e.category === filter
    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          e.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const categories = ['all', 'technical', 'non-technical', 'gaming', 'carnival']
  
  // FIXED: Added 'any' type to ignore TS errors on arguments
  const handleRegisterClick = (event: any, e: any) => {
    if (event.category === 'carnival') return; // Carnival buttons say "Play", no link needed
    if (event.formLink) {
        window.open(event.formLink, '_blank');
    } else {
        alert("Registration opening soon!");
    }
  };

  const handleLearnMoreClick = (event: any, e: any) => {
     setSelectedEvent(event);
  };

  return (
    <>
      <Header />
      <section className="relative pt-32 pb-20 min-h-screen bg-[#0a0a0a] text-white overflow-hidden font-sans selection:bg-purple-500/30">

        {/* --- Background (Clean Dark Base) --- */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a] z-0 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* --- Header Section --- */}
          <div className="text-center mb-24">
            <h2 className="text-sm font-bold text-orange-500 mb-3 tracking-[0.2em] uppercase">/ Compete & Win</h2>
            <h3 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-4 text-white">
              Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500">Catalog</span>
            </h3>
            <p className="text-neutral-400 max-w-2xl mx-auto text-lg">
              Explore over 30+ curated events designed to challenge your skills, creativity, and wit.
            </p>
          </div>

          {/* --- Search & Filter Section --- */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
             {/* Search Bar */}
             <div className="relative w-full md:w-[400px] group">
                <input 
                  type="text" 
                  placeholder="Search events..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3.5 pl-12 pr-4 rounded-2xl bg-[#121212] border border-white/10 focus:border-white/30 text-white placeholder-neutral-500 outline-none transition-all shadow-lg"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-focus-within:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                </span>
             </div>

             {/* Filter Buttons */}
             <div className="flex flex-wrap gap-2 justify-center">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                      filter === cat 
                        ? cat === 'all' ? 'bg-white text-black border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' :
                          cat === 'technical' ? 'bg-purple-500/10 border-purple-500 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]' :
                          cat === 'non-technical' ? 'bg-pink-500/10 border-pink-500 text-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.3)]' :
                          cat === 'gaming' ? 'bg-green-500/10 border-green-500 text-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]' :
                          'bg-orange-500/10 border-orange-500 text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.3)]'
                        : 'bg-transparent text-neutral-500 border-white/5 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {cat.replace('-', ' ')}
                  </button>
                ))}
             </div>
          </div>

          {/* --- THE "PICTURE PERFECT" CARDS --- */}
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => {
                const theme = getTheme(event.category);
                return (
                  <div
                    key={event.id}
                    className="group relative h-full"
                  >
                    {/* Hover Glow Background */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${theme.gradient} rounded-[2rem] opacity-0 group-hover:opacity-30 blur-lg transition duration-500`} />
                    
                    {/* Card Container */}
                    <div className={`relative h-full bg-[#0F0F0F] rounded-[2rem] border border-white/5 overflow-hidden flex flex-col transition-all duration-500 group-hover:-translate-y-2 hover:shadow-2xl ${theme.border}`}>
                      
                      {/* Image Area */}
                      <div className="relative h-60 w-full overflow-hidden bg-neutral-900">
                          <img 
                            src={event.image} 
                            onError={(e) => {e.currentTarget.src = "https://via.placeholder.com/600x400/1a1a1a/333?text=Image+Not+Found"}}
                            alt={event.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent opacity-90"></div>
                          <div className="absolute top-4 right-4">
                             <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-xl border ${theme.bg} ${theme.border} ${theme.text}`}>
                                {event.category}
                             </span>
                          </div>
                      </div>
                      
                      {/* Content Area */}
                      <div className="p-6 flex flex-col flex-grow relative z-10 -mt-6">
                          <div className="flex items-start justify-between mb-4">
                             <h3 className={`text-2xl font-bold text-white leading-tight transition-colors duration-300 group-hover:${theme.text}`}>{event.title}</h3>
                             <span className={`text-3xl filter drop-shadow-lg`}>{event.emoji}</span>
                          </div>
                          
                          <p className="text-neutral-400 text-sm leading-relaxed mb-8 line-clamp-3 font-medium">
                            {event.description}
                          </p>
                          
                          {/* Buttons */}
                          <div className="mt-auto flex gap-4 pt-6 border-t border-white/5">
                            <button
                              onClick={(e) => handleLearnMoreClick(event, e)}
                              className="flex-1 py-3 rounded-xl border border-white/10 text-neutral-400 text-xs font-bold uppercase tracking-wide hover:bg-white/5 hover:text-white hover:border-white/30 transition-all"
                            >
                              Info & Rules
                            </button>
                            
                            <button
                              onClick={(e) => handleRegisterClick(event, e)}
                              className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wide text-white transition-all transform active:scale-95 ${theme.button} ${(!event.formLink && event.category !== 'carnival') ? 'opacity-50 cursor-not-allowed grayscale' : ''}`}
                              disabled={event.category !== 'carnival' && !event.formLink}
                            >
                              {event.category === 'carnival' ? 'Play' : (event.formLink ? 'Register' : 'Closed')}
                            </button>
                          </div>
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <div className="col-span-full py-32 text-center">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-neutral-500 text-xl">No events found matching "{searchTerm}"</p>
              </div>
            )}
          </div>
        </div>

        {/* --- MODAL (Full Detail View) --- */}
        {selectedEvent && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-in fade-in duration-300"
            onClick={() => setSelectedEvent(null)}
          >
            <div 
              className="bg-[#121212] border border-white/10 rounded-[2rem] w-full max-w-3xl max-h-[90vh] overflow-hidden relative shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-5 right-5 p-2.5 rounded-full bg-black/50 hover:bg-white/20 text-white/80 hover:text-white transition-colors z-50 backdrop-blur-md"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Modal Scrollable Content */}
              <div className="overflow-y-auto custom-scrollbar">
                
                {/* Cover Image */}
                <div className="h-80 w-full relative bg-neutral-900">
                   <img 
                      src={selectedEvent.image} 
                      onError={(e) => {e.currentTarget.src = "https://via.placeholder.com/800x400/111/444?text=Event"}}
                      className="w-full h-full object-cover opacity-80"
                      alt={selectedEvent.title}
                   />
                   <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#121212]/50 to-[#121212]"></div>
                   
                   <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
                      <div>
                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">{selectedEvent.title}</h3>
                        <span className={`text-sm font-bold uppercase tracking-widest ${
                          selectedEvent.category === 'technical' ? 'text-purple-400' :
                          selectedEvent.category === 'non-technical' ? 'text-pink-400' :
                          selectedEvent.category === 'gaming' ? 'text-green-400' : 'text-orange-400'
                        }`}>
                          {selectedEvent.category} Event
                        </span>
                      </div>
                      <span className="text-6xl filter drop-shadow-2xl hidden md:block">{selectedEvent.emoji}</span>
                   </div>
                </div>

                <div className="p-8 md:p-10">
                  
                  {/* Key Info Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-10">
                      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                        <span className="block text-xs text-neutral-500 uppercase font-bold mb-1 tracking-wider">Entry Fee</span>
                        <span className="text-white font-mono text-xl">{selectedEvent.fee}</span>
                      </div>
                      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                        <span className="block text-xs text-neutral-500 uppercase font-bold mb-1 tracking-wider">Team Size</span>
                        <span className="text-white font-mono text-xl">{selectedEvent.teamSize}</span>
                      </div>
                  </div>

                  <div className="prose prose-invert max-w-none">
                    <p className="text-neutral-300 text-base leading-relaxed mb-10 font-light">
                      {selectedEvent.description}
                    </p>

                    <div className="space-y-10">
                      {/* Dynamic Sections based on availability */}
                      {selectedEvent.details.rounds && (
                        <div>
                          <h4 className="text-white text-lg font-bold uppercase mb-4 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_blue]"></span> Rounds & Structure
                          </h4>
                          <ul className="space-y-3">
                            {selectedEvent.details.rounds.map((r,i) => (
                              <li key={i} className="flex items-start gap-3 text-neutral-400 text-sm leading-relaxed">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0"></span>
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {selectedEvent.details.rules && (
                        <div>
                          <h4 className="text-white text-lg font-bold uppercase mb-4 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_red]"></span> Rules & Guidelines
                          </h4>
                          <ul className="space-y-3">
                            {selectedEvent.details.rules.map((r,i) => (
                              <li key={i} className="flex items-start gap-3 text-neutral-400 text-sm leading-relaxed">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0"></span>
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedEvent.details.judging && (
                        <div>
                          <h4 className="text-white text-lg font-bold uppercase mb-4 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_purple]"></span> Judging Criteria
                          </h4>
                          <ul className="space-y-3">
                            {selectedEvent.details.judging.map((r,i) => (
                              <li key={i} className="flex items-start gap-3 text-neutral-400 text-sm leading-relaxed">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0"></span>
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedEvent.details.prizes && (
                        <div>
                          <h4 className="text-white text-lg font-bold uppercase mb-4 flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_green]"></span> Prizes & Rewards
                          </h4>
                          <ul className="space-y-3">
                            {selectedEvent.details.prizes.map((r,i) => (
                              <li key={i} className="flex items-start gap-3 text-neutral-400 text-sm leading-relaxed">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0"></span>
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-white/10 flex justify-end">
                      {selectedEvent.formLink && (
                        <a 
                          href={selectedEvent.formLink}
                          target="_blank"
                          rel="noreferrer"
                          className={`px-10 py-4 rounded-2xl font-bold text-white shadow-2xl hover:scale-105 transition-transform ${
                            selectedEvent.category === 'technical' ? 'bg-gradient-to-r from-purple-600 to-purple-500' :
                            selectedEvent.category === 'non-technical' ? 'bg-gradient-to-r from-pink-600 to-pink-500' :
                            selectedEvent.category === 'gaming' ? 'bg-gradient-to-r from-green-600 to-green-500' : 'bg-gradient-to-r from-orange-600 to-orange-500'
                          }`}
                        >
                          Register Now
                        </a>
                      )}
                      {selectedEvent.category === 'carnival' && (
                         <div className="px-10 py-4 rounded-2xl font-bold text-white bg-orange-600/80 cursor-default border border-orange-500/30">
                           Pay & Play On-Spot
                         </div>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </section>
      <Footer />
    </>
  )
}

export default Events