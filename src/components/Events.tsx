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
  maxParticipants?: string;
  duration?: string;
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

  // --- EVENT DATABASE (Full Detailed Data) ---
  const events: EventData[] = [
    // =======================
    //   TECHNICAL EVENTS
    // =======================
    {
      id: 1,
      category: 'technical',
      title: 'Code Quest',
      emoji: '💻',
      description: 'A multi-round programming challenge testing vintage knowledge and modern problem-solving.',
      fee: '₹100',
      teamSize: 'Team of 2',
      formLink: 'https://forms.gle/CTGfGhXCL4Pnbe616',
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
      title: 'Geocities.AI',
      emoji: '🤖',
      description: 'Design a 90s aesthetic website using ONLY AI prompts to solve a modern problem.',
      fee: '₹50',
      teamSize: 'Individual',
      formLink: 'https://forms.gle/whv4Xy1xWBSJJDaX7',
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

    // =======================
    //   NON-TECHNICAL EVENTS
    // =======================
    {
      id: 8,
      category: 'non-technical',
      title: 'Brain Buster',
      emoji: '🧠',
      description: 'A fast-paced, buzzer-based quiz show blending retro pop culture and modern trends.',
      fee: '₹100',
      teamSize: 'Team of 2',
      formLink: 'https://forms.gle/FhY7Lgn4EzQmysNq7',
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

    // =======================
    //   GAMING EVENTS
    // =======================
    {
      id: 14,
      category: 'gaming',
      title: 'BGMI',
      emoji: '🔫',
      description: 'Battle Royale squad tournament.',
      fee: '₹200',
      teamSize: 'Team of 4 (1 Sub)',
      formLink: 'https://forms.gle/PfwM6sorLYNdfYjM6',
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
      details: {
        rules: [
          'No phones/internet.',
          'Answers submitted on sheets.',
          'No communication with other teams.'
        ],
        judging: ['Accuracy (100%)', 'Tie-breaker: Speed of submission']
      }
    },

    // =======================
    //   CARNIVAL GAMES
    // =======================
    {
      id: 21,
      category: 'carnival',
      title: 'Coin Drop',
      emoji: '🪙',
      description: 'Drop a coin into a glass inside a water bucket.',
      fee: '₹30',
      teamSize: 'Individual',
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
      details: {
        rules: ['10 shots total.', 'Different points for distances.', 'Min 15 pts to win.'],
        prizes: ['15+ Pts: Surprise', '30+ Pts: Premium', '45+ Pts: Grand Prize']
      }
    }
  ]

  // Filter Logic
  const filteredEvents = events.filter(e => {
    const matchesCategory = filter === 'all' ? true : e.category === filter
    const matchesSearch = e.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          e.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const categories = ['all', 'technical', 'non-technical', 'gaming', 'carnival']

  // Category Color Helpers
  const getCategoryColor = (cat: string) => {
    switch(cat) {
        case 'technical': return 'text-purple-400 border-purple-500/30 bg-purple-500/10';
        case 'non-technical': return 'text-pink-400 border-pink-500/30 bg-pink-500/10';
        case 'gaming': return 'text-green-400 border-green-500/30 bg-green-500/10';
        case 'carnival': return 'text-orange-400 border-orange-500/30 bg-orange-500/10';
        default: return 'text-white border-white/20 bg-white/5';
    }
  }

  return (
    <>
      <Header />
      <section className="relative pt-32 pb-20 min-h-screen bg-black text-white overflow-hidden font-sans selection:bg-purple-500/30">

        {/* --- SHARED BACKGROUND --- */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0" 
             style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}>
        </div>
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
           <div className="absolute top-20 left-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px]" />
           <div className="absolute bottom-20 right-[-10%] w-[500px] h-[500px] bg-orange-900/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* Header */}
          <div className="text-center mb-16">
             <h2 className="text-sm font-bold text-orange-500 mb-3 tracking-[0.2em] uppercase animate-pulse">/ Compete & Win</h2>
             <h3 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-6">
               Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-500">Events</span>
             </h3>
             <p className="text-white/50 text-lg max-w-2xl mx-auto">
               Browse the complete list of 30+ competitions. <br/> From coding marathons to carnival chaos.
             </p>
          </div>

          {/* Search & Filter */}
          <div id="event-search" className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
             {/* Search */}
             <div className="relative w-full md:w-96 group">
                <input 
                  type="text" 
                  placeholder="Search events..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full py-3 pl-12 pr-6 rounded-full bg-white/5 border border-white/10 focus:border-purple-500 focus:bg-black/50 text-white placeholder-white/30 outline-none transition-all backdrop-blur-sm"
                />
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-purple-400 transition-colors">🔍</span>
             </div>

             {/* Filters */}
             <div className="flex flex-wrap gap-2 justify-center">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider border transition-all duration-300
                      ${filter === cat 
                        ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] scale-105'
                        : 'bg-transparent text-white/60 border-white/10 hover:border-white/40 hover:text-white'}`
                    }
                  >
                    {cat.replace('-', ' ')}
                  </button>
                ))}
             </div>
          </div>

          {/* Events Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredEvents.length > 0 ? (
              filteredEvents.map(event => (
                <div
                  key={event.id}
                  onClick={() => setSelectedEvent(event)}
                  className="group relative bg-white/[0.02] border border-white/10 p-6 rounded-3xl cursor-pointer hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300 hover:-translate-y-2 flex flex-col h-full backdrop-blur-md overflow-hidden"
                >
                  {/* Hover Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10 flex flex-col h-full">
                      {/* Top Row */}
                      <div className="flex justify-between items-start mb-4">
                          <span className="text-4xl group-hover:scale-110 transition-transform duration-300 filter drop-shadow-lg">{event.emoji}</span>
                          <span className={`text-[10px] px-2 py-1 rounded-lg font-bold uppercase tracking-wider border ${
                              event.category === 'technical' ? 'border-purple-500/30 text-purple-400' : 
                              event.category === 'gaming' ? 'border-green-500/30 text-green-400' :
                              event.category === 'carnival' ? 'border-orange-500/30 text-orange-400' :
                              'border-pink-500/30 text-pink-400'
                          }`}>
                            {event.category}
                          </span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">{event.title}</h3>
                      <p className="text-white/50 text-sm mb-6 line-clamp-2 flex-grow">{event.description}</p>
                      
                      {/* Footer Info */}
                      <div className="flex justify-between items-center border-t border-white/10 pt-4 mt-auto">
                        <div>
                          <p className="text-[10px] text-white/30 uppercase font-bold tracking-wider">Entry</p>
                          <p className="font-bold text-white">{event.fee}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-white/30 uppercase font-bold tracking-wider">Team</p>
                          <p className="font-bold text-white/80 text-sm">{event.teamSize}</p>
                        </div>
                      </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center border border-white/10 rounded-3xl bg-white/[0.02]">
                <p className="text-white/40 text-lg">No events found matching "{searchTerm}"</p>
              </div>
            )}
          </div>
        </div>

        {/* --- EVENT DETAILS MODAL --- */}
        {selectedEvent && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setSelectedEvent(null)}
          >
            <div 
              className="bg-[#0a0a0a] border border-white/10 rounded-3xl w-full max-w-2xl max-h-[85vh] overflow-y-auto relative shadow-2xl custom-scrollbar"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedEvent(null)}
                className="sticky top-4 right-4 float-right ml-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-50 backdrop-blur-md"
              >
                ✕
              </button>

              <div className="p-8">
                {/* Modal Header */}
                <div className="flex items-start gap-6 mb-8">
                  <span className="text-6xl md:text-7xl filter drop-shadow-2xl">{selectedEvent.emoji}</span>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">{selectedEvent.title}</h3>
                    <div className="flex flex-wrap gap-3">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wide border ${getCategoryColor(selectedEvent.category)}`}>
                        {selectedEvent.category}
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80 text-xs font-bold uppercase tracking-wide">
                        {selectedEvent.fee} Entry
                      </span>
                      <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/80 text-xs font-bold uppercase tracking-wide">
                        {selectedEvent.teamSize}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-white/80 text-lg mb-8 leading-relaxed font-light border-l-2 border-purple-500 pl-6">
                  {selectedEvent.description}
                </p>

                {/* Details Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  
                  {/* Rounds / Format */}
                  {(selectedEvent.details.rounds || selectedEvent.details.format) && (
                    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                      <h4 className="text-orange-400 font-bold uppercase tracking-widest text-xs mb-4">
                        {selectedEvent.details.rounds ? 'Structure' : 'Format'}
                      </h4>
                      <ul className="space-y-3">
                        {(selectedEvent.details.rounds || selectedEvent.details.format)?.map((r, i) => (
                          <li key={i} className="text-white/70 text-sm flex items-start gap-3">
                            <span className="text-orange-500/50 mt-1">●</span> 
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Rules */}
                  {selectedEvent.details.rules && (
                    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                      <h4 className="text-pink-400 font-bold uppercase tracking-widest text-xs mb-4">Rules</h4>
                      <ul className="space-y-3">
                        {selectedEvent.details.rules.map((r, i) => (
                          <li key={i} className="text-white/70 text-sm flex items-start gap-3">
                            <span className="text-pink-500/50 mt-1">●</span> 
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Judging / Points */}
                  {(selectedEvent.details.judging || selectedEvent.details.points) && (
                    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                      <h4 className="text-purple-400 font-bold uppercase tracking-widest text-xs mb-4">
                        {selectedEvent.details.points ? 'Scoring' : 'Judging'}
                      </h4>
                      <ul className="space-y-3">
                        {(selectedEvent.details.judging || selectedEvent.details.points)?.map((j, i) => (
                          <li key={i} className="text-white/70 text-sm flex items-start gap-3">
                            <span className="text-purple-500/50 mt-1">●</span> 
                            <span>{j}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Prizes / Categories */}
                  {(selectedEvent.details.prizes || selectedEvent.details.categories) && (
                    <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5">
                      <h4 className="text-green-400 font-bold uppercase tracking-widest text-xs mb-4">
                        {selectedEvent.details.prizes ? 'Prizes' : 'Categories'}
                      </h4>
                      <ul className="space-y-3">
                        {(selectedEvent.details.prizes || selectedEvent.details.categories)?.map((p, i) => (
                          <li key={i} className="text-white/70 text-sm flex items-start gap-3">
                            <span className="text-green-500/50 mt-1">●</span> 
                            <span>{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Register Footer */}
                <div className="sticky bottom-0 -mx-8 -mb-8 p-6 bg-[#0a0a0a]/95 border-t border-white/10 backdrop-blur-xl flex justify-end">
                  {selectedEvent.category === 'carnival' ? (
                    <div className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/60 font-medium text-sm cursor-default w-full text-center">
                      Pay & Play at Venue (On-Spot)
                    </div>
                  ) : selectedEvent.formLink ? (
                    <a 
                      href={selectedEvent.formLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-full md:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold hover:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all flex items-center justify-center gap-2 transform hover:scale-[1.02]"
                    >
                      Register Now <span>→</span>
                    </a>
                  ) : (
                    <button disabled className="w-full md:w-auto px-8 py-3 bg-white/10 rounded-xl text-white/40 font-bold cursor-not-allowed">
                      Registration Closed
                    </button>
                  )}
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