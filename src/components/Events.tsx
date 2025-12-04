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
  venue: string;
  time: string;
  deadline: string; // ISO Date String for automatic closing logic
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
  };
}

const Events: React.FC = () => {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null)
  
  // Use a state for current time to ensure hydration matches (optional but good practice)
  const [currentTime, setCurrentTime] = useState(new Date());

  const location = useLocation();

  useEffect(() => {
    // Update time on mount to check for expirations immediately
    setCurrentTime(new Date());

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

  // --- CONSTANTS ---
  const PREMIUM_REWARD_CLAUSE = "Winners will receive a premium reward valued as per the event’s prize pool. T&C apply.";

  // --- EVENT DATABASE ---
  const events: EventData[] = [
    // === TECHNICAL EVENTS ===
    {
      id: 1,
      category: 'technical',
      title: 'Code Quest',
      emoji: '💻',
      description: 'Code Quest is the flagship technical event of Fiestron 2025, designed to be a rigorous test of a programmer\'s true mettle. It is not merely about writing code that works; it is about writing code that endures. The event bridges the gap between the foundational era of computing and the modern age of optimization. Participants will be thrust into a high-pressure environment where they must navigate through history—starting with pen-and-paper logic that mimics the punch-card era, moving into a typing sprint involving legacy languages like COBOL and BASIC, and finally culminating in a modern algorithmic showdown where Big-O complexity matters more than just output. This is a battleground for those who understand the roots of Computer Science.',
      fee: '₹100',
      teamSize: 'Team of 2',
      venue: 'CS Lab',
      time: '15 Dec | 11:30 AM - 1:30 PM',
      deadline: '2025-12-15T11:30:00',
      formLink: 'https://forms.gle/CTGfGhXCL4Pnbe616',
      image: '/images/events/code-quest.gif', 
      details: {
        rounds: [
          'Round 1: Retro Rush (20 Mins) - This is an elimination round testing your theoretical foundation. Teams will face 30 MCQs covering C/C++ output tracing, pointer arithmetic, and 90s tech trivia. No compilers allowed.',
          'Round 2: Typing Titan (20 Mins) - A test of syntax memory and raw typing speed. You will be given a printed sheet of code in a vintage language (BASIC/COBOL) or complex Java/C++ boilerplate. You must type it into the IDE exactly as shown, with zero syntax errors, against the clock.',
          'Round 3: The Optimizer (60 Mins) - The final showdown. Teams are given 3 working algorithmic problems (Brute Force complexity). The goal is to refactor the code to pass hidden test cases within stricter time limits (e.g., reducing O(n²) to O(n)).'
        ],
        rules: [
          'Mandatory Attendance: Participation in all three rounds is compulsory. Missing a round leads to immediate disqualification.',
          'Internet Policy: Strictly NO Internet access for Round 1 and Round 2. Limited access to official documentation may be allowed in Round 3 at the judge\'s discretion.',
          'Hardware: Participants are strongly advised to bring their own laptops with VS Code and GCC/Python/Java compilers pre-installed to avoid compatibility issues.',
          'Plagiarism: Any code found to be copied from another team or generated via unauthorized AI tools (ChatGPT/Copilot) will result in an instant ban from the event.',
          'Time Adherence: The submission portal closes exactly when the timer hits zero. No grace period will be given for file uploads.',
          'Language Restrictions: Solutions must be submitted in C, C++, Java, or Python unless a specific problem statement mandates a different language.'
        ],
        prizes: ['1st Place: 5000 PR Points', '2nd Place: 2500 PR Points', PREMIUM_REWARD_CLAUSE]
      }
    },
    {
      id: 2,
      category: 'technical',
      title: 'Hackathon',
      emoji: '🚀',
      description: 'The Fiestron Hackathon is a grueling 2-day intensive sprint where innovation meets nostalgia. The challenge is unique: "Modernizing the Past." Teams are tasked with selecting a classic software concept, a vintage website, or an archaic digital tool and completely reimagining it using a state-of-the-art tech stack. This is not just about writing code; it is about architectural decisions, UI/UX modernization, and full-stack deployment. Whether it is turning a CLI-based email client into a slick React app or reviving a GeoCities fan page with Next.js 14, your goal is to bridge the decades. You will build, debug, deploy, and pitch your creation to a panel of industry experts.',
      fee: '₹100',
      teamSize: 'Team of 2',
      venue: 'CS Lab',
      time: '16 Dec | 09:30 AM - 11:30 AM',
      deadline: '2025-12-16T09:30:00',
      formLink: 'https://forms.gle/NKx9zg1vyEy7mYrd7',
      image: '/images/events/hackathon.png',
      details: {
        rounds: [
          'Phase 1: The Build (Day 1) - Teams have 24 hours (including off-campus time) to build their prototype. A mandatory checkpoint submission is required at the end of Day 1.',
          'Phase 2: The Pitch (Day 2) - Top 10 selected teams present their deployed solution to a panel of judges. The presentation must cover the tech stack, the "Before vs After" comparison, and the live demo.'
        ],
        rules: [
          'Team Lockdown: Teams must be formed prior to the event. No member swaps or external assistance is allowed once the hackathon begins.',
          'Code Originality: All code must be written during the event duration. Usage of pre-built templates or cloning existing repositories is strictly forbidden and will be checked.',
          'Deployment Mandatory: The final project MUST be deployed (Vercel/Netlify/Heroku/AWS) and accessible via a public URL. Localhost demos will receive a significant penalty.',
          'Git History: Teams must maintain a GitHub repository with a clear commit history. A repo with a single "Initial Commit" at the end will be disqualified as suspicious activity.',
          'AI Usage: Generative AI (ChatGPT/Copilot) is permitted for debugging and boilerplate code, but the core logic and design must be original. AI usage must be disclosed during the pitch.'
        ],
        prizes: ['1st Place: 5000 PR Points', '2nd Place: 2500 PR Points', PREMIUM_REWARD_CLAUSE]
      }
    },
    {
      id: 3,
      category: 'technical',
      title: 'Syntax Sprint',
      emoji: '⚡',
      description: 'Syntax Sprint is the ultimate test of collaborative chemistry and coding adaptability. It mimics the real-world frustration of handling legacy code or working in a siloed team. One teammate (The Architect) builds the raw HTML skeleton, focusing purely on semantics and structure. Then, at the halfway mark, they are pulled off the keyboard, and the second teammate (The Designer) must take over to apply CSS styling and JavaScript functionality without ever having spoken to the first person. It is chaotic, it is fast, and it requires you to understand your partner\'s coding style implicitly.',
      fee: '₹100',
      teamSize: 'Team of 2',
      venue: 'CS Lab',
      time: '16 Dec | 12:00 PM - 02:00 PM',
      deadline: '2025-12-16T12:00:00',
      formLink: 'https://forms.gle/TMytyAesfsZRSbwg8',
      image: '/images/events/syntax-sprint.png',
      details: {
        rounds: [
          'Round 1 (The Architect - 45 Mins): Member A builds the raw structure using ONLY Semantic HTML5. No CSS classes or IDs allowed that hint at styling.',
          'Round 2 (The Designer - 45 Mins): Member B takes over the same machine. They must apply Tailwind CSS / Modern JS to the existing structure to match a target design provided by the judges.'
        ],
        rules: [
          'Silence Protocol: Absolute silence is required between team members. Member A cannot leave comments in the code for Member B.',
          'Strict Handoff: At the 45-minute mark, Member A must leave the workstation immediately. Member B cannot touch the keyboard before the signal.',
          'Restriction (Round 1): Member A is strictly prohibited from writing any CSS, Inline Styles, or Script tags.',
          'Restriction (Round 2): Member B is strictly prohibited from altering the HTML structure (DOM elements) created by Member A. They can only add classes/IDs to existing tags.',
          'Environment: VS Code with Live Server. Internet is allowed only for CDN links/Documentation.'
        ],
        prizes: ['1st Place: 5000 PR Points', '2nd Place: 2500 PR Points', PREMIUM_REWARD_CLAUSE]
      }
    },
    {
      id: 4,
      category: 'technical',
      title: 'Geocities.AI',
      emoji: '🤖',
      description: 'Geocities.AI is a unique prompt-engineering challenge where you must force advanced AI to be "dumb". Your task is to use state-of-the-art AI (ChatGPT/Gemini) to generate the code for a website that looks exactly like it was made in 1999—complete with neon backgrounds, scrolling marquees, hit counters, and under-construction GIFs—while solving a modern problem. This event tests your ability to control Large Language Models (LLMs) to produce specific, constrained outputs rather than generic modern code.',
      fee: '₹100',
      teamSize: 'Individual',
      venue: 'CS Lab (Hardware)',
      time: '15 Dec | 02:00 PM Onwards',
      deadline: '2025-12-15T14:00:00',
      formLink: 'https://forms.gle/whv4Xy1xWBSJJDaX7',
      image: '/images/events/geocites-ai.png',
      details: {
        rules: [
          'Prompt Only: You are NOT allowed to write a single line of code manually. Every tag, every style, and every script must be generated via AI prompts.',
          'Verification: You must submit a PDF/Screenshot log of your entire chat history with the AI model to prove no manual coding was done.',
          'Aesthetic Requirements: The site MUST include: A scrolling Marquee tag, a visible Table-based layout, at least 3 animated GIFs, and high-contrast "ugly" colors.',
          'Functional Requirement: Despite the bad looks, the website must actually perform a modern function (e.g., a working To-Do list, a Currency Converter, or a weather widget).',
          'Tools Allowed: ChatGPT 3.5/4, Gemini, Claude, or Copilot.'
        ],
        prizes: ['1st Place: 5000 PR Points', '2nd Place: 2500 PR Points', PREMIUM_REWARD_CLAUSE]
      }
    },
    {
      id: 5,
      category: 'technical',
      title: 'Design.exe',
      emoji: '🎨',
      description: 'Design.exe is the ultimate test of creativity under extreme limitation. In an era of Figma, Adobe XD, and Canva, we challenge you to go back to basics. Participants must design a sleek, modern, professional User Interface (UI) for a mobile application... using ONLY Microsoft Paint. No layers, no vectors, no undo history, no plugins. Just you, the pencil tool, the bucket fill, and your steady hand. This event proves that a true designer needs only a canvas and a pixel, not a subscription.',
      fee: '₹100',
      teamSize: 'Individual',
      venue: 'CS Lab (Outer)',
      time: '16 Dec | 02:30 PM Onwards',
      deadline: '2025-12-16T14:30:00',
      formLink: 'https://forms.gle/JUbreJcD7LZcdjGB6',
      image: '/images/events/design-exe.png',
      details: {
        rules: [
          'Software Restriction: The ONLY allowed software is the default Microsoft Paint (Classic or Windows 11 version). Photoshop, Canva, Figma, or GIMP are banned.',
          'Assets: You cannot import external images, icons, or UI kits. Every button, icon, and text box must be drawn or typed within Paint.',
          'Deliverable: You must design a set of 5-7 connected screens (Login, Home, Profile, Features) for a specific app theme given on the spot.',
          'Process Verification: Random spot checks will be conducted. Participants may be asked to undo/redo to prove layers were not pasted in.',
          'Submission: Files must be saved as individual .PNG files and named sequentially (Screen1, Screen2, etc.).'
        ],
        prizes: ['1st Place: 5000 PR Points', '2nd Place: 2500 PR Points', PREMIUM_REWARD_CLAUSE]
      }
    },
    {
      id: 6,
      category: 'technical',
      title: 'Retro Rendered',
      emoji: '🖼️',
      description: 'Retro Rendered is a battle of imagination and prompt engineering. Participants will be given a prompt related to "Futuristic Retro" (e.g., Cyberpunk 1980s Mumbai, Steampunk Space Travel). The goal is to generate the most visually stunning and thematically accurate image using AI tools, then refine it. This event explores the intersection of human creativity and machine generation, requiring you to understand lighting, composition, and style descriptors to get the perfect output.',
      fee: '₹100',
      teamSize: 'Individual',
      venue: 'CS Lab (Software)',
      time: '15 Dec | 02:00 PM Onwards',
      deadline: '2025-12-15T14:00:00',
      formLink: 'https://forms.gle/5MoNHYyqkEPLFwNS7',
      image: '/images/events/retro-rendered.png',
      details: {
        rules: [
          'Tools: Midjourney, DALL-E 3, Stable Diffusion, or Bing Image Creator are allowed.',
          'Prompt Logging: You must save the exact prompt text used to generate the final image. Judges will evaluate the complexity of the prompt.',
          'Editing: Minor post-processing (color correction, cropping) in Photoshop is allowed, but major composition changes must be done via In-Painting/AI.',
          'Theme Adherence: The image must strictly follow the "Retro-Futurism" theme provided on the spot.',
          'Resolution: Final submission must be at least 1080p resolution (1920x1080 or equivalent aspect ratio).'
        ],
        prizes: ['1st Place: 5000 PR Points', '2nd Place: 2500 PR Points', PREMIUM_REWARD_CLAUSE]
      }
    },
    {
      id: 7,
      category: 'technical',
      title: 'Vintage Ventures',
      emoji: '💼',
      description: 'Vintage Ventures is a Shark Tank-style business pitch competition with a twist. You must choose a tech company that failed or faded away (e.g., BlackBerry, Nokia, Orkut, Myspace, Kodak) and pitch a comprehensive strategy to revive it in 2025 using modern technology (AI, Blockchain, VR). You are not just presenting an idea; you are presenting a business revival plan. You need to analyze why they failed, identify a gap in the current market, and propose a viable product that brings the brand back to life.',
      fee: '₹100',
      teamSize: 'Team of 2',
      venue: 'Any Classroom',
      time: '16 Dec | 11:00 AM Onwards',
      deadline: '2025-12-16T11:00:00',
      formLink: 'https://forms.gle/HWvd6bbuyDzaifWE6',
      image: '/images/events/vintage-venture.png',
      details: {
        rules: [
          'Company Selection: You must select a real company that existed and declined. Fictional companies are not allowed.',
          'Uniqueness: No two teams can choose the same company. Selection is on a First-Come-First-Served basis during registration.',
          'Presentation Format: PPT/Canva slides are mandatory. Maximum 10 slides allowed.',
          'Time Limit: 8 Minutes for the Pitch + 4 Minutes for Q&A from the Judges.',
          'Content Requirements: The pitch must include: Root Cause of Failure, The New Solution (Product/Service), Revenue Model, and Marketing Strategy.',
          'Dress Code: Business Formals are highly recommended and carry bonus points for presentation.'
        ],
        prizes: ['1st Place: 5000 PR Points', '2nd Place: 2500 PR Points', PREMIUM_REWARD_CLAUSE]
      }
    },

    // === NON-TECHNICAL EVENTS ===
    {
      id: 8,
      category: 'non-technical',
      title: 'Brain Buster',
      emoji: '🧠',
      description: 'Brain Buster is a high-voltage trivia contest testing your knowledge of everything from 80s Pop Culture to 2025 Tech Trends. This is a buzzer-round format where speed is just as important as accuracy. Hesitate for a second, and you lose. The questions will span across movies, music, gaming history, viral internet moments, and general knowledge. It is designed to be fast, furious, and incredibly competitive.',
      fee: '₹100', 
      teamSize: 'Team of 2',
      venue: 'Any Classroom / CS Lab',
      time: '15 Dec | 04:30 PM Onwards',
      deadline: '2025-12-15T16:30:00',
      formLink: 'https://forms.gle/FhY7Lgn4EzQmysNq7',
      image: '/images/events/brain-buster.png',
      details: {
        rounds: [
          'Round 1: Retro Rush (15 Mins) - 20 questions from 80s-2000s tech/pop culture. This is a paper elimination round.',
          'Round 2: Modern Mashup (15 Mins) - 20 questions on today\'s innovations and current trends. Buzzer round.',
          'Round 3: Rewired Round (20 Mins) - 10 "Connect the Era" questions where you must link an old technology to its modern equivalent.'
        ],
        rules: [
          'Team Constraint: Exactly 2 members required. No solo participation in the buzzer rounds.',
          'Electronic Ban: Phones, smartwatches, and Bluetooth devices must be surrendered before the quiz begins.',
          'Buzzer Etiquette: Pressing the buzzer before the question ends allows you to answer, but if wrong, you get negative marks (-5 points).',
          'Tie-Breaker: A sudden death question will be asked. First correct answer wins immediately.',
          'Audience: Audience members are not allowed to prompt answers. Any help from the crowd voids the question.'
        ],
        prizes: ['1st Place: 2000 PR Points', '2nd Place: 1000 PR Points', '3rd Place: 500 PR Points', PREMIUM_REWARD_CLAUSE]
      }
    },
    {
      id: 9,
      category: 'non-technical',
      title: 'Escape Protocol',
      emoji: '🔐',
      description: 'Escape Protocol is an immersive physical escape room experience. Your team is locked in a room filled with cryptic puzzles, hidden keys, and logic locks. You have 45 minutes to decipher the clues, unlock the final door, and escape "The Glitch". The rooms are themed around the evolution of technology, starting from a dusty server room to a futuristic digital vault. Teamwork is essential; no single person can solve every puzzle alone.',
      fee: '₹200',
      teamSize: 'Team of 4',
      venue: 'Sports Room',
      time: '16 Dec | 02:00 PM - 05:00 PM',
      deadline: '2025-12-16T14:00:00',
      formLink: 'https://forms.gle/K9CbwhkwKmAfzTJP8',
      image: '/images/events/escape-protocol.png',
      details: {
        rounds: [
          'Level 1: The Forgotten Server Room (20 Mins) - Find the boot disk to restart the system.',
          'Level 2: The Vintage Office (25 Mins) - Crack the safe using clues hidden in old files.',
          'Level 3: The Digital Time Vault (30 Mins) - Solve logic puzzles to synchronize the clocks.'
        ],
        rules: [
          'No Force: Do not break, force, or unscrew any furniture or locks. Everything opens with logic, not strength.',
          'Search Policy: "Don\'t touch" stickers mean do not touch. Clues are hidden in accessible areas only.',
          'Hint System: Teams are allowed exactly 2 hints from the Gamemaster. Each hint adds a +5 minute penalty to your final time.',
          'Device Ban: All phones and flashlights must be deposited outside.',
          'Team Unity: The team must solve puzzles together. Splitting up into different zones is allowed, but you must exit together.'
        ],
        prizes: ['1st Place: 2000 PR Points', '2nd Place: 1000 PR Points', '3rd Place: 500 PR Points', PREMIUM_REWARD_CLAUSE]
      }
    },
    {
      id: 10,
      category: 'non-technical',
      title: 'Meme Mania',
      emoji: '😂',
      description: 'Meme Mania is a creative battle for the internet-savvy. Participants must create original, high-quality memes or short reels based on a theme provided on the spot (e.g., "Engineering Pain", "AI taking over", "Mumbai Local Trains"). The goal is to create content that is viral, relatable, and funny. You will be judged not just on the joke, but on the editing quality and visual appeal.',
      fee: '₹100',
      teamSize: 'Team of 2',
      venue: 'Any Classroom',
      time: '16 Dec | 02:00 PM Onwards',
      deadline: '2025-12-16T14:00:00',
      formLink: 'https://forms.gle/e9EbPwub7pQnLBwj7',
      image: '/images/events/meme-mania.jpeg',
      details: {
        rules: [
          'Originality: Strictly NO reposts. We use reverse image search. Found templates are allowed, but the caption/edit must be original.',
          'Content Warning: No political, religious, or explicit content. Offensive memes result in immediate disqualification.',
          'Formats: Static Memes (JPG/PNG) or Reels (MP4, max 30s).',
          'Submission: Must be uploaded to the provided drive link within the 90-minute creation window.',
          'Watermark: Every submission must have the Team Name watermarked in the corner.',
          'Tools: You can use Canva, Photoshop, Premiere Pro, or mobile editors like InShot.'
        ],
        prizes: ['1st Place: 2000 PR Points', '2nd Place: 1000 PR Points', '3rd Place: 500 PR Points', PREMIUM_REWARD_CLAUSE]
      }
    },
    {
      id: 11,
      category: 'non-technical',
      title: 'Ad-A-Bit',
      emoji: '📢',
      description: 'Ad-A-Bit is a marketing improv challenge. Teams are given a weird, useless, or broken product (e.g., "A water bottle with holes" or "Invisible Sunglasses") and must create a convincing video advertisement and sales pitch to sell it to the audience. You need to turn a flaw into a feature. It requires quick thinking, humor, and persuasive communication skills.',
      fee: '₹100',
      teamSize: 'Team of 2',
      venue: 'Any Classroom',
      time: '16 Dec | 04:30 PM Onwards',
      deadline: '2025-12-16T16:30:00',
      formLink: 'https://forms.gle/Y9frmA36fcc4r4tNA',
      image: '/images/events/ad-a-bit.png',
      details: {
        rules: [
          'Product Assignment: Products are assigned via a lucky draw 24 hours before the event via email.',
          'Video Requirement: A pre-recorded 30-60 second ad must be submitted before the event starts. This video will be played on the projector.',
          'Live Pitch: After screening the ad, the team has 2 minutes to "sell" the product live on stage to the judges.',
          'Tone: Humor is encouraged, but the sales logic must be "convincing" within the context of the joke.',
          'Format: Video must be .MP4, landscape 16:9 aspect ratio.',
          'Submission Deadline: Video must be submitted at least 2 hours before the event starts.'
        ],
        prizes: ['1st Place: 2000 PR Points', '2nd Place: 1000 PR Points', '3rd Place: 500 PR Points', PREMIUM_REWARD_CLAUSE]
      }
    },
    {
      id: 12,
      category: 'non-technical',
      title: 'Logo Lore',
      emoji: '🏷️',
      description: 'Logo Lore tests your brand awareness and visual memory. In this quiz, you will face distorted, zoomed-in, or minimalist versions of famous logos and must identify the brand, its tagline, or its history. We take logos you see every day and strip them down to their bare essentials or mess with their colors to confuse you. Only the most observant will win.',
      fee: '₹100',
      teamSize: 'Team of 2',
      venue: 'Any Classroom',
      time: '15 Dec | 01:00 PM Onwards',
      deadline: '2025-12-15T13:00:00',
      formLink: 'https://forms.gle/PRjaquuraJB5RdFj8',
      image: '/images/events/logo-lore.gif',
      details: {
        rounds: [
          'Round 1: Distorted Brands (20 Logos, 15 Mins) - Identify brands from pixelated or warped images.',
          'Round 2: Evolution Chain (10 Brands, 15 Mins) - Arrange the historical logos of a brand in chronological order.',
          'Round 3: The Brand Tag (15 Brands, 20 Mins) - Match the logo to its correct obscure tagline.'
        ],
        rules: [
          'No Tech: Strictly a pen-and-paper round. Phones must be in bags.',
          'Spelling: Brand names must be spelled correctly. "Addidas" instead of "Adidas" gets 0 points.',
          'Time Limit: 30 seconds per slide. No repeats.',
          'Whispering: Discussing answers loudly will result in a warning or deduction.',
          'Decision: The Quizmaster\'s decision on ambiguous answers is final.'
        ],
        prizes: ['1st Place: 2000 PR Points', '2nd Place: 1000 PR Points', '3rd Place: 500 PR Points', PREMIUM_REWARD_CLAUSE]
      }
    },
    {
      id: 13,
      category: 'non-technical',
      title: 'One Mic Stand',
      emoji: '🎤',
      description: 'One Mic Stand is your platform to shine. Whether you are a poet, a comedian, a beatboxer, or a storyteller, this is your chance to perform. The twist? You must incorporate a specific "word" or "theme" given to you 5 minutes before you go on stage. This tests your ability to improvise and adapt your set to fit the "Rewired" theme of the fest.',
      fee: '₹50',
      teamSize: 'Individual',
      venue: 'Any Classroom',
      time: '15 Dec | 03:00 PM Onwards',
      deadline: '2025-12-15T15:00:00',
      formLink: 'https://forms.gle/GxRmu4xewdEmBYWN9',
      image: '/images/events/one-mic-stand.jpeg',
      details: {
        rules: [
          'Performance Time: Minimum 2 minutes, Maximum 4 minutes. Going under or over time attracts penalties.',
          'The Twist: You will draw a chit (e.g., "Glitch", "Retro", "Future") and must mention or relate to it at least once in your act.',
          'Language: English, Hindi, or Hinglish permitted.',
          'Decency: No profanity, hate speech, or offensive content. Immediate mic cut if violated.',
          'Props: Musical instruments (Guitar/Ukulele) are allowed but must be brought by the participant.',
          'Backing Tracks: If you need a backing track, submit it on a USB drive 30 minutes prior.'
        ],
        prizes: ['1st Place: 2000 PR Points', '2nd Place: 1000 PR Points', '3rd Place: 500 PR Points', PREMIUM_REWARD_CLAUSE]
      }
    },

    // === GAMING EVENTS ===
    {
      id: 14,
      category: 'gaming',
      title: 'BGMI',
      emoji: '🔫',
      description: 'BGMI is the ultimate Battle Royale squad tournament. Squads drop into the battlegrounds of Erangel and Miramar to compete for survival and eliminations. High-stakes rotation, strategic positioning, and gun skill are all that matter. We follow standard competitive e-sports point systems to ensure the best team wins.',
      fee: '₹200',
      teamSize: 'Team of 4 (1 Sub)',
      venue: 'Online/Classroom',
      time: '15 Dec | 11:30 AM Onwards',
      deadline: '2025-12-15T11:30:00',
      formLink: 'https://forms.gle/PfwM6sorLYNdfYjM6',
      image: '/images/events/bgmi.jpeg',
      details: {
        rules: [
          'Version: Latest official BGMI version required. Players must have all maps downloaded.',
          'Format: 3-4 matches (Maps decided on spot). Mode: TPP Squad.',
          'Fair Play: No hacks, mods, config files, or GFX tools. Any suspicion leads to a permanent ban.',
          'Device: Mobile Phones ONLY. No iPads, Tablets, Emulators, or Triggers allowed.',
          'Punctuality: All players must be in the Custom Room 10 minutes before the match start time.',
          'Evidence: A screenshot of the final scoreboard must be submitted by the IGL after every match.'
        ],
        prizes: ['1st Place: 2500 PR Points', '2nd Place: 1500 PR Points', '3rd Place: 1000 PR Points', PREMIUM_REWARD_CLAUSE]
      }
    },
    {
      id: 15,
      category: 'gaming',
      title: 'FIFA Tournament',
      emoji: '⚽',
      description: 'The FIFA Tournament is a head-to-head virtual football competition using the latest FIFA 23/24 engine. It is a test of your tactical knowledge, skill moves, and mental fortitude. Played on high-end consoles/PCs, you will compete in a knockout bracket until one champion remains.',
      fee: '₹50',
      teamSize: 'Individual',
      venue: 'CS Lab (Inner)',
      time: '16 Dec | 02:30 PM Onwards',
      deadline: '2025-12-16T14:30:00',
      formLink: 'https://forms.gle/CL2fSX59r49cMAxy8',
      image: '/images/events/fifa-tournament.jpeg',
      details: {
        rules: [
          'Platform: PS5/PC. Latest FIFA version available.',
          'Teams: Club Teams Only. No International or "Soccer Aid" teams.',
          'Settings: Half Length = 6 Mins, Difficulty = Legendary, Speed = Normal.',
          'Conduct: No pausing the game while the ball is in play. Pausing during a goal opportunity results in disqualification.',
          'Settings: Tactical Defending is MANDATORY. Legacy Defending is banned.',
          'Draws: Knockout matches go to Classic Extra Time, followed by Penalties.',
          'Rage Quit: Leaving the game mid-match results in an automatic loss.'
        ],
        prizes: ['1st Place: 2500 PR Points', '2nd Place: 1500 PR Points', '3rd Place: 1000 PR Points', PREMIUM_REWARD_CLAUSE]
      }
    },
    {
      id: 16,
      category: 'gaming',
      title: 'Chess',
      emoji: '♟️',
      description: 'The Chess Tournament is a battle of intellect and strategy. Played over the board (OTB), this Rapid Chess tournament tests your ability to think ahead under time pressure. One wrong move can cost you the game. We follow standard FIDE rules for rapid play.',
      fee: '₹50',
      teamSize: 'Individual',
      venue: 'Sports Room',
      time: '15 Dec | 11:30 AM - 04:00 PM',
      deadline: '2025-12-15T11:30:00',
      formLink: 'https://forms.gle/qcxpdiqcDKoXpc62A',
      image: '/images/events/chess.png',
      details: {
        rules: [
          'Format: Swiss System followed by Knockouts for the top 4 players.',
          'Time Control: 10 Minutes + 0 Seconds increment (10|0 Rapid).',
          'Touch-Move: If you touch a piece, you MUST move it (if a legal move is possible).',
          'Clocks: Professional chess clocks provided. Players must hit the clock with the same hand used to move pieces.',
          'Electronic Ban: No phones or smartwatches allowed near the board.',
          'Illegal Moves: Two illegal moves result in an immediate loss of the game.'
        ],
        prizes: ['1st Place: 2500 PR Points', '2nd Place: 1500 PR Points', '3rd Place: 1000 PR Points', PREMIUM_REWARD_CLAUSE]
      }
    },
    {
      id: 17,
      category: 'gaming',
      title: 'Table Tennis',
      emoji: '🏓',
      description: 'Table Tennis is a game of speed, spin, and smash. This singles tournament is for those with quick reflexes and sharp eyes. Played on standard ITTF approved tables, matches are fast-paced and unforgiving. Bring your A-game and your own paddle if you prefer.',
      fee: '₹50',
      teamSize: 'Individual',
      venue: 'Sports Room',
      time: '16 Dec | 09:00 AM - 01:00 PM',
      deadline: '2025-12-16T09:00:00',
      formLink: 'https://forms.gle/T4Zh4xJF7Hua68HJA',
      image: '/images/events/table-tennis.png',
      details: {
        rules: [
          'Rules: Standard ITTF rules apply.',
          'Scoring: Best of 3 sets. Final is Best of 5. Each set is 11 points.',
          'Service: Ball must be tossed at least 6 inches up. Service must be diagonal.',
          'Rotation: Players alternate serving every 2 points.',
          'Deuce: If the score is 10-10, play continues until one player leads by 2 points.',
          'Equipment: Racquets provided, but personal racquets allowed (subject to inspection).'
        ],
        prizes: ['1st Place: 2500 PR Points', '2nd Place: 1500 PR Points', '3rd Place: 1000 PR Points', PREMIUM_REWARD_CLAUSE]
      }
    },
    {
      id: 18,
      category: 'gaming',
      title: 'Carrom',
      emoji: '🎯',
      description: 'Carrom is a test of precision and angles. This is a Doubles Carrom tournament, requiring excellent coordination between partners. You must pocket your color coins (Black/White) and secure the Queen before your opponents do.',
      fee: '₹100',
      teamSize: 'Team of 2 (Doubles)',
      venue: 'Sports Room',
      time: '15 Dec | 11:30 AM - 04:00 PM',
      deadline: '2025-12-15T11:30:00',
      formLink: 'https://forms.gle/SD8A6vguXjFbPB2H9',
      image: '/images/events/carrom.png',
      details: {
        rules: [
          'Governing Body: International Carrom Federation (ICF) rules apply.',
          'Queen: The Queen must be pocketed and "covered" by one of your own coins in the same or next strike.',
          'Striking: Thumb shots and Scissor styles are permitted.',
          'Fouls: Pocketing the striker results in a penalty (Return one pocketed coin to the center).',
          'Time Limit: 1 minute per shot maximum.',
          'Board: Standard tournament boards and powder provided.'
        ],
        prizes: ['1st Place: 2500 PR Points', '2nd Place: 1500 PR Points', '3rd Place: 1000 PR Points', PREMIUM_REWARD_CLAUSE]
      }
    },
    {
      id: 19,
      category: 'gaming',
      title: 'Box Cricket',
      emoji: '🏏',
      description: 'Box Cricket is cricket, but faster and more intense. Played in a confined "box" arena, every shot counts, and every mistake is a wicket. With limited overs and restricted boundaries, batsmen must rely on placement rather than power. It is high energy and high adrenaline.',
      fee: '₹300 (Per Team)',
      teamSize: 'Team of 6 + 1 Sub',
      venue: 'Quadrangle',
      time: '15 Dec | 11:30 AM Onwards',
      deadline: '2025-12-15T11:30:00',
      formLink: 'https://forms.gle/H8Zuka6id7WjX2R36',
      image: '/images/events/box-cricket.jpeg',
      details: {
        rules: [
          'Format: 5 Overs per innings. Tennis Ball.',
          'Bowling: Strictly Underarm bowling only. The ball must pitch beyond the designated crease line.',
          'Scoring: Runs are scored by hitting specific numbered zones (4/6) or running between wickets.',
          'Dismissals: Clean bowled, Catch out, Run out, and Hit-Wicket. Hitting the roof directly is a dead ball.',
          'Shoes: Players must wear sports shoes. Spikes/Studs are strictly prohibited to protect the turf.',
          'Umpire: The umpire\'s decision is final. Arguments or aggression will lead to immediate disqualification.'
        ],
        prizes: ['1st Place: 2500 PR Points', '2nd Place: 1500 PR Points', '3rd Place: 1000 PR Points', PREMIUM_REWARD_CLAUSE]
      }
    },
    {
      id: 20,
      category: 'gaming',
      title: 'Netflix Trivia',
      emoji: '🎬',
      description: 'Netflix Trivia is a quiz competition testing your knowledge of the streaming giant\'s vast library. From Stranger Things to Squid Game, from The Crown to Black Mirror, how well do you know your shows? This quiz will test your memory of plot points, character names, and viral pop culture moments.',
      fee: '₹100',
      teamSize: 'Team of 2',
      venue: 'Any Classroom',
      time: '16 Dec | 03:30 PM Onwards',
      deadline: '2025-12-16T15:30:00',
      formLink: 'https://forms.gle/VoM1j62BPmiuJy6eA',
      image: '/images/events/netflix-trivia.jpeg',
      details: {
        rules: [
          'Scope: Questions cover Netflix Originals, popular movies hosted on the platform, and documentaries.',
          'Format: Pen and Paper round followed by oral questions for finalists.',
          'Conduct: No phones, no Shazam, no Google Lens. Hands must be on the table.',
          'Communication: Whispering to your partner is allowed, but talking to other teams is forbidden.',
          'Tie-Breaker: A rapid-fire round will decide close calls.'
        ],
        prizes: ['1st Place: 2500 PR Points', '2nd Place: 1500 PR Points', '3rd Place: 1000 PR Points', PREMIUM_REWARD_CLAUSE]
      }
    },

    // === CARNIVAL GAMES (ALL ₹30) ===
    {
      id: 21,
      category: 'carnival',
      title: 'Coin Drop Challenge',
      emoji: '🪙',
      description: 'The Coin Drop Challenge is a deceptive test of hydro-dynamics and steady hands. A small shot glass is submerged at the bottom of a water-filled bucket. Your task is simple: drop a coin from the surface so it lands inside the glass. The water currents will fight you every step of the way.',
      fee: '₹30',
      teamSize: 'Individual',
      venue: 'Quadrangle',
      time: 'All Day',
      deadline: '2025-12-16T17:00:00', // All day events close at 5 PM on last day
      image: '/images/events/coin-drop.jpeg', 
      details: {
        rules: [
          'Stance: The participant must stand upright. Leaning excessively over the bucket is not allowed.',
          'Drop Height: The coin must be released from at least chest height.',
          'Technique: You must drop the coin, not throw it with force.',
          'Attempts: One ticket grants one single coin drop attempt.',
          'Win Condition: The coin must come to a complete rest inside the shot glass.'
        ],
        prizes: ['Instant Prize: Chocolate / Small Gift', PREMIUM_REWARD_CLAUSE]
      }
    },
    {
      id: 22,
      category: 'carnival',
      title: 'Stack Attack',
      emoji: '🥤',
      description: 'Stack Attack is a high-speed cup stacking sprint. You must build a pyramid of cups and then collapse them back into a single stack against the clock. It requires lightning-fast hands and rhythm. One slip, and the tower falls.',
      fee: '₹30',
      teamSize: 'Individual',
      venue: 'Quadrangle',
      time: 'All Day',
      deadline: '2025-12-16T17:00:00',
      image: '/images/events/stack-attack.jpeg',
      details: {
        rules: [
          'Formation: You must build a 4-3-2-1 pyramid using plastic cups.',
          'Sequence: Build the pyramid fully up, remove hands to show stability, then down-stack it back to a single column.',
          'Time Limit: You have exactly 15 seconds to complete the cycle.',
          'Hands: You may use both hands simultaneously.',
          'Fail Condition: If the pyramid topples at any point, the attempt is void.'
        ],
        prizes: ['Instant Prize: Surprise Gift', PREMIUM_REWARD_CLAUSE]
      }
    },
    {
      id: 23,
      category: 'carnival',
      title: 'Ticket Toss',
      emoji: '🎟️',
      description: 'Ticket Toss is a game of friction and force. You must toss a lightweight ticket or card onto a table so that it slides and stops exactly near the target line without falling off the edge. Too soft, and it stops short. Too hard, and it flies off.',
      fee: '₹30',
      teamSize: 'Individual',
      venue: 'Quadrangle',
      time: 'All Day',
      deadline: '2025-12-16T17:00:00',
      image: '/images/events/ticket-toss.jpeg',
      details: {
        rules: [
          'Distance: The participant must stand strictly behind the marked yellow line, located 5 feet from the table.',
          'Style: Underarm toss only. Overarm throwing is prohibited.',
          'Target: The ticket must land within the marked "Win Zone" strip on the table.',
          'Fail: If the ticket slides off the table or stops short of the zone, it is a loss.',
          'Attempts: Best of 3 tosses.'
        ],
        prizes: ['Instant Prize: Coupon/Voucher', PREMIUM_REWARD_CLAUSE]
      }
    },
    {
      id: 24,
      category: 'carnival',
      title: 'Brick Balance',
      emoji: '🧱',
      description: 'Brick Balance tests your finger strength and endurance. You must hold a heavy, wet brick using only a "pincer grip" (fingertips) for as long as possible. The water makes it slippery, and gravity makes it heavy. How long can you hold on?',
      fee: '₹30',
      teamSize: 'Individual',
      venue: 'Quadrangle',
      time: 'All Day',
      deadline: '2025-12-16T17:00:00',
      image: '/images/events/brick-balance.jpeg',
      details: {
        rules: [
          'Grip: You must use a pincer grip (Thumb on one side, fingers on the other). No cupping the brick from underneath.',
          'Arm Position: The arm must be extended straight out or hanging straight down. No resting against the body.',
          'Time to Beat: You must hold the brick for 60 seconds to win.',
          'Safety: Do not drop the brick on your toes. Drop it forward if you lose grip.'
        ],
        prizes: ['Instant Prize: Merchandise', PREMIUM_REWARD_CLAUSE]
      }
    },
    {
      id: 25,
      category: 'carnival',
      title: 'Elbow Flip',
      emoji: '💪',
      description: 'Elbow Flip is the ultimate coordination trick. You stack a pile of coins on your elbow, flick your arm down, and snatch them all out of the air before they hit the floor. It looks like magic, but it is pure reflex.',
      fee: '₹30',
      teamSize: 'Individual',
      venue: 'Quadrangle',
      time: 'All Day',
      deadline: '2025-12-16T17:00:00',
      image: '/images/events/elbow-flip.jpeg',
      details: {
        rules: [
          'Stack: Place a vertical stack of 5-10 coins on your elbow while your arm is bent.',
          'Motion: Swiftly drop the elbow and snatch the coins mid-air with the same hand.',
          'Win Condition: You must catch ALL coins in the same hand in a single motion.',
          'Fail: Dropping even one coin voids the attempt.'
        ],
        prizes: ['Instant Prize: Grand Prize', PREMIUM_REWARD_CLAUSE]
      }
    },
    {
      id: 26,
      category: 'carnival',
      title: 'Blow the Ball',
      emoji: '🌬️',
      description: 'Blow the Ball is a lung capacity test. You must guide a lightweight ping pong ball through a track of water-filled cups using only your breath. You cannot touch the ball, you cannot touch the cups. Just blow air with precision.',
      fee: '₹30',
      teamSize: 'Individual',
      venue: 'Quadrangle',
      time: 'All Day',
      deadline: '2025-12-16T17:00:00',
      image: '/images/events/blow-the-ball.jpeg',
      details: {
        rules: [
          'No Touch: You strictly cannot touch the ball or cups with your hands, nose, or lips.',
          'Method: Blow air to push the ball from the first cup to the last cup in the line.',
          'Restart: If the ball falls off the track, you must start over (if time permits).',
          'Time Limit: The entire course must be completed in 30 Seconds.'
        ],
        prizes: ['Instant Prize: Gift Hamper', PREMIUM_REWARD_CLAUSE]
      }
    },
    {
      id: 27,
      category: 'carnival',
      title: 'Rubber Band Shot',
      emoji: '🎯',
      description: 'Rubber Band Shot is sniper training. You are given a rubber band and a target: a pyramid of lightweight paper cups. You must knock them all down from a distance. Aim, stretch, and release.',
      fee: '₹30',
      teamSize: 'Individual',
      venue: 'Quadrangle',
      time: 'All Day',
      deadline: '2025-12-16T17:00:00',
      image: '/images/events/rubber-band-shot.jpeg',
      details: {
        rules: [
          'Ammo: You get exactly 3 rubber bands per ticket.',
          'Target: A pyramid of 6 lightweight cups arranged on a table.',
          'Win Condition: You must knock down ALL cups off the table to win.',
          'Distance: The shooting line is marked 6 feet away. Crossing the line disqualifies the shot.'
        ],
        prizes: ['Instant Prize: Chocolate', PREMIUM_REWARD_CLAUSE]
      }
    },
    {
      id: 28,
      category: 'carnival',
      title: 'Straw Suction',
      emoji: '🥤',
      description: 'Straw Suction is a vacuum race. You must use a plastic straw to create suction with your mouth and pick up M&Ms or beans, transferring them from one bowl to another. No hands allowed!',
      fee: '₹30',
      teamSize: 'Individual',
      venue: 'Quadrangle',
      time: 'All Day',
      deadline: '2025-12-16T17:00:00',
      image: '/images/events/straw-suction.jpeg',
      details: {
        rules: [
          'Tool: One standard plastic straw provided.',
          'Technique: Create suction with your mouth to lift the item. Do not bite the item.',
          'No Hands: Hands must remain behind your back at all times.',
          'Goal: Transfer 10 items from the source bowl to the destination bowl in 60 seconds.'
        ],
        prizes: ['Instant Prize: Sweet Treat', PREMIUM_REWARD_CLAUSE]
      }
    },
    {
      id: 29,
      category: 'carnival',
      title: 'Emoji Riddle',
      emoji: '🧩',
      description: 'Emoji Riddle is a pop culture decoding game. We show you a string of emojis, and you have to guess the movie, song, idiom, or famous phrase they represent. It requires quick lateral thinking.',
      fee: '₹30',
      teamSize: 'Individual',
      venue: 'Quadrangle',
      time: 'All Day',
      deadline: '2025-12-16T17:00:00',
      image: '/images/events/emoji-riddle.jpeg',
      details: {
        rules: [
          'Format: You will be shown 5 Riddle Cards sequentially.',
          'Time: You have 20 seconds to answer each card.',
          'Assistance: No asking friends or using Google Lens.',
          'Win: Solve at least 4 out of 5 riddles correctly to win.',
          'Answers: Answers must be exact titles (e.g., "The Lion King", not "Lion Movie").'
        ],
        prizes: ['Instant Prize: Premium Badge', PREMIUM_REWARD_CLAUSE]
      }
    },
    {
      id: 30,
      category: 'carnival',
      title: 'Color Trick',
      emoji: '🎨',
      description: 'Color Trick is based on the famous Stroop Effect. You will see a list of color words (e.g., "BLUE", "GREEN") printed in different colored inks (e.g., the word "BLUE" printed in Red ink). You must say the INK COLOR aloud, not the written word. It messes with your brain.',
      fee: '₹30',
      teamSize: 'Individual',
      venue: 'Quadrangle',
      time: 'All Day',
      deadline: '2025-12-16T17:00:00',
      image: '/images/events/color-trick.jpeg',
      details: {
        rules: [
          'Speed: You must read the whole chart (20 words) in under 20 seconds.',
          'Accuracy: Only one self-corrected mistake is allowed. Two mistakes result in Game Over.',
          'Protocol: You must speak loud and clear. Mumbling is not accepted.',
          'Win: Reach the end of the list without failing.'
        ],
        prizes: ['Instant Prize: Grand Prize', PREMIUM_REWARD_CLAUSE]
      }
    },
    {
      id: 31,
      category: 'carnival',
      title: '7 Up 7 Down',
      emoji: '🎲',
      description: '7 Up 7 Down is a classic casino-style probability game. Two large dice are rolled. You simply have to predict if the sum of the numbers will be Above 7, Below 7, or Exactly 7. It is a game of pure luck.',
      fee: '₹30',
      teamSize: 'Individual',
      venue: 'Quadrangle',
      time: 'All Day',
      deadline: '2025-12-16T17:00:00',
      image: '/images/events/7up-7down.jpeg',
      details: {
        rules: [
          'Betting: Place your token on one of three zones: "Up" (>7), "Down" (<7), or "7" (Exactly 7).',
          'Rolling: The organizer rolls two large dice in a cup.',
          'Winning: If the sum matches your zone, you win.',
          'Payout: "Up" and "Down" pay a standard reward. "Exact 7" pays a Triple Reward due to lower probability.'
        ],
        prizes: ['Instant Prize: Double/Triple Reward', PREMIUM_REWARD_CLAUSE]
      }
    },
    {
      id: 32,
      category: 'carnival',
      title: 'Confusing Words',
      emoji: '😵',
      description: 'Confusing Words is a tongue twister gauntlet. You will be given a list of intentionally difficult phrases (e.g., "Pad kid poured curd pulled cod"). You must read them aloud fast without stuttering or mispronouncing.',
      fee: '₹30',
      teamSize: 'Individual',
      venue: 'Quadrangle',
      time: 'All Day',
      deadline: '2025-12-16T17:00:00',
      image: '/images/events/confusing-words.jpeg',
      details: {
        rules: [
          'Challenge: Read 5 tongue twisters back-to-back.',
          'Time: 30 seconds total for all 5.',
          'Clarity: Every word must be audible and clear. Slurring words counts as a fail.',
          'Fail: Stuttering or stopping for more than 2 seconds ends the turn.'
        ],
        prizes: ['Instant Prize: Prize', PREMIUM_REWARD_CLAUSE]
      }
    },
    {
      id: 33,
      category: 'carnival',
      title: 'Penny Stack',
      emoji: '💰',
      description: 'Penny Stack is a test of architectural precision. You must stack coins in a single vertical column. The higher you go, the wobblier it gets. How high can you go before gravity wins?',
      fee: '₹30',
      teamSize: 'Individual',
      venue: 'Quadrangle',
      time: 'All Day',
      deadline: '2025-12-16T17:00:00',
      image: '/images/events/penny-stack.jpeg',
      details: {
        rules: [
          'Base: The stack starts on a single coin base.',
          'Method: Stack one coin at a time using only one hand.',
          'Time: 60 Seconds to build the tower.',
          'Stability: The tower must stand unsupported for 5 seconds after the timer ends.',
          'Win: Stack 25 coins or more to claim the prize.'
        ],
        prizes: ['Instant Prize: Special Prize', PREMIUM_REWARD_CLAUSE]
      }
    },
    {
      id: 34,
      category: 'carnival',
      title: 'Paper Ball Basket',
      emoji: '🗑️',
      description: 'Paper Ball Basket is classic office basketball. You are given crumpled paper balls and must throw them into a wastebasket from varying distances. It sounds easy, but the aerodynamics of paper are unpredictable.',
      fee: '₹30',
      teamSize: 'Individual',
      venue: 'Quadrangle',
      time: 'All Day',
      deadline: '2025-12-16T17:00:00',
      image: '/images/events/paper-ball-basket.jpeg',
      details: {
        rules: [
          'Shots: You get 5 shots total, taken from increasing distances marked on the floor.',
          'Foul Line: Do not cross the tape on the floor while throwing.',
          'Ball: Standard A4 paper crumpled into a ball.',
          'Win: You must sink at least 4 out of 5 shots to win.'
        ],
        prizes: ['Instant Prize: Prize', PREMIUM_REWARD_CLAUSE]
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
  
  const handleRegisterClick = (event: any, e: any) => {
    if (event.category === 'carnival') return; 
    
    // Check if event is closed before opening link
    if (new Date() > new Date(event.deadline)) {
        alert("Registration for this event has closed.");
        return;
    }

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
                // --- DEADLINE LOGIC ---
                const isExpired = currentTime > new Date(event.deadline);

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
                          
                          <p className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-3 font-medium">
                            {event.description}
                          </p>
                          
                          {/* Mini Info Line on Card */}
                          <div className="mb-8 flex flex-wrap gap-2 text-[10px] text-neutral-500 font-mono uppercase tracking-tight">
                            <span className="bg-white/5 px-2 py-1 rounded border border-white/5">{event.time}</span>
                            <span className="bg-white/5 px-2 py-1 rounded border border-white/5 truncate max-w-[150px]">{event.venue}</span>
                          </div>

                          {/* Buttons */}
                          <div className="mt-auto flex gap-4 pt-6 border-t border-white/5">
                            <button
                              onClick={(e) => handleLearnMoreClick(event, e)}
                              className="flex-1 py-3 rounded-xl border border-white/10 text-neutral-400 text-xs font-bold uppercase tracking-wide hover:bg-white/5 hover:text-white hover:border-white/30 transition-all"
                            >
                              Info & Rules
                            </button>
                            
                            {/* --- BUTTON LOGIC CHANGE: Carnival = Hidden, Expired = Closed, Valid = Register --- */}
                            {event.category !== 'carnival' && (
                                <button
                                  onClick={(e) => handleRegisterClick(event, e)}
                                  className={`flex-1 py-3 rounded-xl text-xs font-bold uppercase tracking-wide text-white transition-all transform active:scale-95 ${
                                    isExpired 
                                      ? 'bg-gray-700 cursor-not-allowed opacity-50' 
                                      : `${theme.button} ${(!event.formLink) ? 'opacity-50 cursor-not-allowed grayscale' : ''}`
                                  }`}
                                  disabled={isExpired || !event.formLink}
                                >
                                  {isExpired ? 'Registrations Full' : (event.formLink ? 'Register Now' : 'Closed')}
                                </button>
                            )}
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
                  
                  {/* Key Info Stats Grid */}
                  <div className="grid grid-cols-2 gap-6 mb-10">
                      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                        <span className="block text-[10px] text-neutral-500 uppercase font-bold mb-1 tracking-wider">Entry Fee</span>
                        <span className="text-white font-mono text-lg">{selectedEvent.fee}</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5">
                        <span className="block text-[10px] text-neutral-500 uppercase font-bold mb-1 tracking-wider">Team Size</span>
                        <span className="text-white font-mono text-lg">{selectedEvent.teamSize}</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 col-span-1">
                        <span className="block text-[10px] text-neutral-500 uppercase font-bold mb-1 tracking-wider">Venue</span>
                        <span className="text-white font-mono text-lg leading-tight block">{selectedEvent.venue}</span>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 col-span-1">
                        <span className="block text-[10px] text-neutral-500 uppercase font-bold mb-1 tracking-wider">Time</span>
                        <span className="text-white font-mono text-sm leading-tight block">{selectedEvent.time}</span>
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
                              <li key={i} className={`flex items-start gap-3 text-sm leading-relaxed ${r === PREMIUM_REWARD_CLAUSE ? 'text-yellow-400 font-bold' : 'text-neutral-400'}`}>
                                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${r === PREMIUM_REWARD_CLAUSE ? 'bg-yellow-400' : 'bg-white/20'}`}></span>
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-12 pt-8 border-t border-white/10 flex justify-end">
                      {/* --- BUTTON LOGIC CHANGE: Carnival = On Spot Text, Others = Link/Expired --- */}
                      {selectedEvent.category === 'carnival' ? (
                          <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400 text-center w-full">
                           <p className="font-bold text-lg">🎟️ On-Spot Registration</p>
                           <p className="text-sm mt-1 text-orange-400/70">Visit the registration desk at the Quadrangle/Foyer to participate in this event.</p>
                          </div>
                      ) : (
                          // Check if event is expired for Modal Button
                          currentTime > new Date(selectedEvent.deadline) ? (
                            <button
                              disabled
                              className="px-10 py-4 rounded-2xl font-bold text-white bg-gray-700 cursor-not-allowed opacity-50"
                            >
                              Registrations Full
                            </button>
                          ) : (
                            selectedEvent.formLink && (
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
                            )
                          )
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