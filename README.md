# TechClub Website

A modern, responsive tech club website built with **React**, **Vite**, and **Tailwind CSS**.

## Features

- 🎨 **Modern UI** - Beautiful, gradient-based design with smooth animations
- 📱 **Fully Responsive** - Looks great on desktop, tablet, and mobile
- ⚡ **Fast Performance** - Built with Vite for lightning-fast load times
- 🎯 **Component-Based** - Modular React components for easy maintenance
- 🎭 **Tailwind CSS** - Utility-first CSS framework for rapid styling

## Sections

- **Header** - Sticky navigation with mobile menu
- **Hero** - Eye-catching welcome section
- **About** - Information about the tech club
- **Events** - Upcoming events and workshops
- **Gallery** - Event highlights and memories
- **Team** - Meet the club leadership
- **Footer** - Contact and social links

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
```bash
cd TechClubReact
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist` folder.

## Project Structure

```
TechClubReact/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── About.tsx
│   │   ├── Events.tsx
│   │   ├── Gallery.tsx
│   │   ├── Team.tsx
│   │   └── Footer.tsx
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
└── tsconfig.json
```

## Technologies Used

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TypeScript** - Type-safe JavaScript
- **CSS** - CSS framework
- **PostCSS** - CSS transformation

## Customization

### Update Club Information
Edit component files to customize:
- Club name and branding in `Header.tsx`
- Events in `Events.tsx`
- Team members in `Team.tsx`
- Contact info in `Footer.tsx`

### Colors and Styling
- Modify colors in `tailwind.config.js`
- Update component className attributes

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

MIT License - Feel free to use this project for your tech club!
