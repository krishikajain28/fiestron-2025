import React from 'react'
import Footer from './Footer';
import Header from './Header'; 

const Team: React.FC = () => {

  // --- 1. LEADERSHIP ---
  const leadership = {
    vc: {
      name: 'Prof.(Dr.) Hemlata K. Bagla', 
      role: 'Hon. Vice Chancellor',
      description: 'Leading HSNC University, Mumbai with a vision of academic excellence and innovation.',
      image: '/images/team/vc.jpg', 
      emoji: '🎓',
      position: 'object-top'
    },
    principal: {
      name: 'Prof.(Dr.) Tejashree Shanbhag', 
      role: 'I/C Principal',
      description: 'Guiding K.C. College towards new heights of research, technology, and student development.',
      image: '/images/team/principal.jpg', 
      emoji: '🏫',
      position: 'object-top'
    },
    vps: [
      { name: 'Dr. Shalini Sinha', role: 'Vice Principal', description: 'Ensuring academic rigor and student discipline.', emoji: '👩‍🏫', image: '/images/team/vp-shalini.jpg', position: 'object-top' },
      { name: 'Dr. Rajesh Ashok Samant', role: 'Vice Principal', description: 'Managing administrative excellence and student welfare.', emoji: '👨‍🏫', image: '/images/team/vp-samant.jpg', position: 'object-top' },
      { name: 'Dr. Ritika Pathak', role: 'Vice Principal', description: 'Driving cultural and extracurricular vibrancy.', emoji: '👩‍🏫', image: '/images/team/vp-ritika.jpg', position: 'object-top' },
    ],
    hod: {
      name: 'Dr. S. B. Muley',
      role: 'Coordinator - CS Dept',
      description: 'The technical backbone of the CS department, mentoring students to innovate.',
      image: '/images/team/hod-muley.jpg',
      emoji: '👨‍💻',
      position: 'object-top'
    }
  }

  // --- 2. FACULTY ADVISORS ---
  const faculty = [
    { name: 'Ms. Geeta Brijwani', role: 'Faculty Advisor', description: 'Guiding student initiatives with patience and experience.', emoji: '👩‍🏫', image: '/images/team/faculty-geeta.jpg', position: 'object-top' },
    { name: 'Ms. Beena Karutharan', role: 'Faculty Advisor', description: 'Expert in computational logic and student mentorship.', emoji: '👩‍🏫', image: '/images/team/faculty-beena.jpg', position: 'object-top' },
    { name: 'Ms. Jovairia Ansari', role: 'Faculty Advisor', description: 'Fostering creative thinking and technical writing skills.', emoji: '👩‍🏫', image: '/images/team/faculty-jovairia.jpg', position: 'object-top' },
    { name: 'Ms. Ritika Sharma', role: 'Faculty Advisor', description: 'Managing events and coordinating departmental activities.', emoji: '👩‍🏫', image: '/images/team/faculty-ritika.jpg', position: 'object-top' },
    { name: 'Ms. Shalini Maheshgauri', role: 'Faculty Advisor', description: 'Supporting technical infrastructure and coding clubs.', emoji: '👩‍🏫', image: '/images/team/faculty-shalini-m.jpg' },
    { name: 'Ms. Dhanashree Ingle', role: 'Faculty Advisor', description: 'Encouraging participation and competitive spirit.', emoji: '👩‍🏫', image: '/images/team/faculty-dhanashree.jpg', position: 'object-top' },
  ]

  // --- 3. STUDENT CORE TEAM ---
  const coreTeam = [
    { 
      name: 'Akanksha Jadhav', 
      role: 'Core Member', 
      description: 'Strategic planning and team coordination.', 
      emoji: '🦁', 
      image: '/images/team/core-akanksha.jpg',
      position: 'object-center' 
    },
    { 
      name: 'Rida Ansari', 
      role: 'Core Member', 
      description: 'Operations and management execution.', 
      emoji: '🐯', 
      image: '/images/team/core-rida.jpg',
      position: 'object-top' 
    },
    { 
      name: 'Qusai Kagalwala', 
      role: 'Core Member', 
      description: 'Technical oversight and resource management.', 
      emoji: '🦅', 
      image: '/images/team/core-qusai.jpg',
      position: 'object-center' 
    },
    { 
      name: 'Mohammad Husain', 
      role: 'Core Member', 
      description: 'Event flow and logistical support.', 
      emoji: '🐺', 
      image: '/images/team/core-husain.jpg',
      position: 'object-top' 
    },
  ]
  
  // --- 4. DEPARTMENTS ---
  const departments = [
    { 
      name: 'Accounts', 
      head: { name: 'Pratham Chudasama', image: '/images/team/dept-accounts-head.jpg' },
      cohead: { name: 'Amruta Bhosale', image: '/images/team/dept-accounts-cohead.jpg' },
      description: 'Managing income, expenses, and maintaining financial transparency for the fest.', 
      emoji: '💰' 
    },
    { 
      name: 'Website', 
      head: { name: 'Krishika Jain', image: '/images/team/dept-web-head.jpg' },
      cohead: { name: 'Anushka Thakur', image: '/images/team/dept-web-cohead.jpg',position:'object-center' },
      description: 'Building, designing, and maintaining the official Fiestron website.', 
      emoji: '🌐' 
    },
    { 
      name: 'Admin', 
      head: { name: 'Tirth Sanghavi', image: '/images/team/dept-admin-head.jpg', position: 'object-centre'},
      cohead: { name: 'Yogashri Bhadekar', image: '/images/team/dept-admin-cohead.jpg' },
      description: 'Handling permissions, venue allocation, contracts, and official documentation.', 
      emoji: '📂' 
    },
    { 
      name: 'Coverage', 
      head: { name: 'Mohammed Amaan', image: '/images/team/dept-coverage-head.jpg' },
      cohead: { name: 'Mohammed Akib', image: '/images/team/dept-coverage-cohead.jpg' },
      description: 'Capturing photos, videos, highlights, and managing media coverage for events.', 
      emoji: '📸' 
    },
    { 
      name: 'Decor', 
      head: { name: 'Sreya Nair', image: '/images/team/dept-decor-head.jpg' },
      cohead: { name: 'Diya Nambiar', image: '/images/team/dept-decor-cohead.jpg' },
      description: 'Designing immersive decorations matching event themes and managing creative resources.', 
      emoji: '✨' 
    },
    { 
      name: 'Design', 
      head: { name: 'Kasturi Jadhav', image: '/images/team/dept-design-head.jpg' },
      cohead: { name: 'Tisha Shah', image: '/images/team/dept-design-cohead.jpg' },
      description: 'Creating brochures, flyers, social media posts, and defining the visual theme.', 
      emoji: '🎨' 
    },
    { 
      name: 'Logistics', 
      head: { name: 'Chetan Rathod', image: '/images/team/dept-logistics-head.jpg', position: 'object-[50%_20%]' },
      cohead: { name: 'Tarang Jain', image: '/images/team/dept-logistics-cohead.jpg', position: 'object-[50%_85%]'},
      description: 'Handling on-ground requirements, equipment, and coordinating resource needs.', 
      emoji: '🚚' 
    },
    { 
      name: 'Hospitality', 
      head: { name: 'Radhika Khatri', image: '/images/team/dept-hospitality-head.jpg' },
      cohead: { name: 'Saadiya Farooqui', image: '/images/team/dept-hospitality-cohead.jpg' },
      description: 'Welcoming guests, managing seating, refreshments, and ensuring comfort.', 
      emoji: '🤝' 
    },
    { 
      name: 'Marketing', 
      head: { name: 'Pavan Mahadik', image: '/images/team/dept-marketing-head.jpg' },
      cohead: { name: 'Iqra Shaikh', image: '/images/team/dept-marketing-cohead.jpg', position: 'object-[50%_25%]' },
      description: 'Promoting the club, managing campaigns, and building sponsor relationships.', 
      emoji: '📢' 
    },
    { 
      name: 'Security', 
      head: { name: 'Chaitanya Salvi', image: '/images/team/dept-security-head.jpg', position: 'object-[50%_30%]' },
      cohead: { name: 'Jahnvi Nair', image: '/images/team/dept-security-cohead.jpg' },
      description: 'Crowd management, access control, safety, and emergency response.', 
      emoji: '🛡️' 
    },
    { 
      name: 'Technical', 
      head: { name: 'Rahil Shaikh', image: '/images/team/dept-tech-head.jpg',position: 'object-[50%_20%]' },
      cohead: { name: 'Asadullah Khan', image: '/images/team/dept-tech-cohead.jpg' }, 
      description: 'Handling sound, lights, stage setup, and providing technical support.', 
      emoji: '💻' 
    },
    { 
      name: 'Public Relations', 
      head: { name: 'Akriti Rajbhar', image: '/images/team/dept-pr-head.jpg',position: 'object-[50%_20%]' },
      cohead: { name: 'Sneha Chaurasia', image: '/images/team/dept-pr-cohead.jpg' }, 
      description: 'Building connections, driving campaigns, and strengthening sponsor ties.', 
      emoji: '🔗' 
    },
  ]

  // Reusable Glass Profile Card
  const ProfileCard = ({ name, role, description, image, emoji, position, isLarge = false }: any) => (
    <div 
      className={`
        group relative flex flex-col items-center text-center p-8 
        rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl
        transition-all duration-500 ease-out
        hover:scale-105 hover:z-50 hover:border-purple-500/30 hover:bg-white/[0.05] hover:shadow-2xl
        ${isLarge ? 'min-w-[300px] md:min-w-[350px]' : 'w-full'}
      `}
    >
      {/* Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

      {/* Image Circle */}
      <div className={`
        relative mb-6 overflow-hidden rounded-full border-4 border-white/10 
        transition-all duration-500 group-hover:border-orange-500/50 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.3)]
        ${isLarge ? 'w-40 h-40 md:w-48 md:h-48' : 'w-32 h-32'}
      `}>
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-6xl">
          {emoji}
        </div>
        <img 
          src={image} 
          alt={name} 
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${position || 'object-center'}`}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} 
        />
      </div>

      <h3 className={`font-bold text-white transition-colors duration-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-400 group-hover:to-purple-400 mb-2 ${isLarge ? 'text-2xl md:text-3xl' : 'text-xl'}`}>
        {name}
      </h3>
      <p className="text-white/40 text-xs uppercase tracking-widest font-bold mb-4">
        {role}
      </p>
      
      {/* Description - Reveal on Hover */}
      <div className="
        relative overflow-hidden transition-all duration-500 ease-in-out
        max-h-0 opacity-0 group-hover:max-h-32 group-hover:opacity-100
      ">
        <p className="text-white/70 text-sm leading-relaxed px-2 pt-4 border-t border-white/10">
          {description}
        </p>
      </div>
    </div>
  )

  return (
    <>
      <Header />
      <section className="relative pt-36 py-24 bg-black min-h-screen overflow-hidden font-sans selection:bg-purple-500/30">
        
        {/* --- SHARED BACKGROUND --- */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none z-0" 
             style={{ backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")' }}>
        </div>
        <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
           <div className="absolute top-20 left-[-10%] w-[600px] h-[600px] bg-purple-900/20 rounded-full blur-[120px]" />
           <div className="absolute bottom-20 right-[-10%] w-[500px] h-[500px] bg-orange-900/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-[90rem] mx-auto px-6 relative z-10">
          
          {/* Header */}
          <div className="text-center mb-24">
            <h2 className="text-sm font-bold text-purple-500 mb-3 tracking-[0.2em] uppercase animate-pulse">/ The Core</h2>
            <h2 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-white mb-6">
              Minds Behind <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500">Fiestron</span>
            </h2>
            <p className="text-white/50 text-lg max-w-3xl mx-auto leading-relaxed">
             Driven by a team of educators and students who bring structure, creativity, and technical expertise together.
            </p>
          </div>

          {/* --- 1. LEADERSHIP SECTION --- */}
          <div className="mb-32 flex flex-col gap-16 items-center">
            
            {/* Tier 1: VC & Principal */}
            <div className="w-full">
                <h3 className="text-center text-white/30 uppercase tracking-[0.2em] text-sm font-bold mb-12">Visionaries</h3>
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                   <ProfileCard {...leadership.vc} isLarge={true} />
                   <ProfileCard {...leadership.principal} isLarge={true} />
                </div>
            </div>

            {/* Tier 2: Vice Principals */}
            <div className="w-full">
              <h3 className="text-center text-white/30 uppercase tracking-[0.2em] text-sm font-bold mb-12">Vice Principals</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {leadership.vps.map((vp, idx) => (
                  <div key={idx} className="flex justify-center">
                    <ProfileCard {...vp} />
                  </div>
                ))}
              </div>
            </div>

            {/* Tier 3: HOD */}
            <div className="w-full flex flex-col items-center">
               <h3 className="text-center text-white/30 uppercase tracking-[0.2em] text-sm font-bold mb-12">Department Head</h3>
               <ProfileCard {...leadership.hod} isLarge={true} />
            </div>
          </div>

          {/* --- 2. FACULTY SECTION --- */}
          <div className="mb-32">
            <h3 className="text-center text-white/30 uppercase tracking-[0.2em] text-sm font-bold mb-12">Faculty Advisors</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {faculty.map((f, idx) => (
                <ProfileCard key={idx} {...f} />
              ))}
            </div>
          </div>

          {/* --- 3. CORE TEAM --- */}
          <div className="mb-32">
            <h3 className="text-center text-white/30 uppercase tracking-[0.2em] text-sm font-bold mb-12">Student Core Team</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {coreTeam.map((c, idx) => (
                <ProfileCard key={idx} {...c} />
              ))}
            </div>
          </div>

          {/* --- 4. DEPARTMENTS SECTION --- */}
          <div>
            <h3 className="text-center text-white/30 uppercase tracking-[0.2em] text-sm font-bold mb-12">Department Leads</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {departments.map((dept, idx) => (
                <div 
                  key={idx} 
                  className="group relative p-8 rounded-3xl border border-white/10 bg-white/[0.02] backdrop-blur-xl
                             hover:border-purple-500/30 hover:bg-white/[0.04] hover:-translate-y-2 hover:shadow-2xl
                             transition-all duration-500 ease-out flex flex-col justify-between min-h-[450px]"
                >
                  {/* Dept Header */}
                  <div className="flex flex-col items-center gap-4 mb-8">
                    <span className="text-5xl bg-white/5 p-4 rounded-2xl shadow-inner border border-white/5">{dept.emoji}</span>
                    <h4 className="text-3xl font-bold text-white group-hover:text-orange-400 transition-colors text-center tracking-tight">
                      {dept.name}
                    </h4>
                  </div>

                  {/* Heads Container */}
                  <div className="flex justify-center gap-6 mb-6">
                    {/* HEAD */}
                    <div className="flex-1 flex flex-col items-center text-center">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 mb-3 group-hover:border-purple-500/50 transition-all duration-500 shadow-lg relative">
                        <img 
                          src={dept.head.image} 
                          alt={dept.head.name} 
                          className={`w-full h-full object-cover ${dept.head.position || 'object-top'}`}
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Head' }} 
                        />
                      </div>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Head</p>
                      <p className="text-white text-sm font-bold leading-tight">{dept.head.name}</p>
                    </div>

                    {/* Vertical Divider */}
                    <div className="w-px bg-white/10 my-4" />

                    {/* CO-HEAD */}
                    <div className="flex-1 flex flex-col items-center text-center">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/20 mb-3 group-hover:border-orange-500/50 transition-all duration-500 shadow-lg relative">
                        <img 
                          src={dept.cohead.image} 
                          alt={dept.cohead.name} 
                          className={`w-full h-full object-cover ${dept.cohead.position || 'object-top'}`}
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=CoHead' }} 
                        />
                      </div>
                      <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold mb-1">Co-Head</p>
                      <p className="text-white text-sm font-bold leading-tight">{dept.cohead.name}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="border-t border-white/5 pt-6 mt-auto">
                    <p className="text-sm text-white/60 italic text-center font-light leading-relaxed">
                      {dept.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </section>
      <Footer/>
    </>
  )
}

export default Team