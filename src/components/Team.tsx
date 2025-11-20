import React from 'react'
import Header from './Header' 
import Footer from './Footer'


const Team: React.FC = () => {

  // --- 1. LEADERSHIP  ---
  const leadership = {
    principal: {
      name: 'Dr. Hemlata Bagla', 
      role: 'Principal & Vice Chancellor (HSNCU)',
      description: 'Spearheading KC College towards new heights of research, technology, and holistic development.',
      image: '/images/principal.jpg', 
      emoji: '🏫'
    },
    vps: [
      { name: 'Dr. Shalini Sinha', role: 'Vice Principal', description: 'Ensuring academic rigor and student discipline.', emoji: '👩‍🏫', image: '/images/vp-shalini.jpg' },
      { name: 'Dr. Rajesh Ashok Samant', role: 'Vice Principal', description: 'Managing administrative excellence and student welfare.', emoji: '👨‍🏫', image: '/images/vp-samant.jpg' },
      { name: 'Dr. Ritika Pathak', role: 'Vice Principal', description: 'Driving cultural and extracurricular vibrancy.', emoji: '👩‍🏫', image: '/images/vp-ritika.jpg' },
    ],
    hod: {
      name: 'Dr. S. B. Muley',
      role: 'Coordinator - CS Dept',
      description: 'The technical backbone of the CS department, mentoring students to innovate.',
      image: '/images/hod-muley.jpg',
      emoji: '👨‍💻'
    }
  }

  // --- 2. FACULTY ADVISORS ---
  const faculty = [
    { name: 'Ms. Geeta Brijwani', role: 'Faculty Advisor', description: 'Guiding student initiatives with patience and experience.', emoji: '👩‍🏫', image: '/images/faculty-geeta.jpg' },
    { name: 'Ms. Beena Karutharan', role: 'Faculty Advisor', description: 'Expert in computational logic and student mentorship.', emoji: '👩‍🏫', image: '/images/faculty-beena.jpg' },
    { name: 'Ms. Jovairia Ansari', role: 'Faculty Advisor', description: 'Fostering creative thinking and technical writing skills.', emoji: '👩‍🏫', image: '/images/faculty-jovairia.jpg' },
    { name: 'Ms. Ritika Sharma', role: 'Faculty Advisor', description: 'Managing events and coordinating departmental activities.', emoji: '👩‍🏫', image: '/images/faculty-ritika.jpg' },
    { name: 'Ms. Shalini Maheshgauri', role: 'Faculty Advisor', description: 'Supporting technical infrastructure and coding clubs.', emoji: '👩‍🏫', image: '/images/faculty-shalini-m.jpg' },
    { name: 'Ms. Dhanashree Ingle', role: 'Faculty Advisor', description: 'Encouraging participation and competitive spirit.', emoji: '👩‍🏫', image: '/images/faculty-dhanashree.jpg' },
  ]

  // --- 3. STUDENT CORE TEAM ---
  const coreTeam = [
    { 
      name: 'Akanksha Jadhav', 
      role: 'Core Member', 
      description: 'Strategic planning and team coordination.', 
      emoji: '🦁', 
      image: '/images/core-akanksha.jpg' 
    },
    { 
      name: 'Rida Ansari', 
      role: 'Core Member', 
      description: 'Operations and management execution.', 
      emoji: '🐯', 
      image: '/images/core-rida.jpg' 
    },
    { 
      name: 'Qusai Kagalwala', 
      role: 'Core Member', 
      description: 'Technical oversight and resource management.', 
      emoji: '🦅', 
      image: '/images/core-qusai.jpg' 
    },
    { 
      name: 'Mohammad Husain', 
      role: 'Core Member', 
      description: 'Event flow and logistical support.', 
      emoji: '🐺', 
      image: '/images/core-husain.jpg' 
    },
  ]

  // --- 4. DEPARTMENTS (Updated Technical Co-Head) ---
  const departments = [
    { 
      name: 'Accounts', 
      head: { name: 'Pratham Chudasama', image: '/images/dept-accounts-head.jpg' },
      cohead: { name: 'Amruta Bhosale', image: '/images/dept-accounts-cohead.jpg' },
      description: 'Managing income, expenses, and maintaining financial transparency for the fest.', 
      emoji: '💰' 
    },
    { 
      name: 'Admin', 
      head: { name: 'Tirth Sanghavi', image: '/images/dept-admin-head.jpg' },
      cohead: { name: 'Yogashri Bhadekar', image: '/images/dept-admin-cohead.jpg' },
      description: 'Handling permissions, venue allocation, contracts, and official documentation.', 
      emoji: '📂' 
    },
    { 
      name: 'Coverage', 
      head: { name: 'Mohammed Amaan', image: '/images/dept-coverage-head.jpg' },
      cohead: { name: 'Mohammed Akib', image: '/images/dept-coverage-cohead.jpg' },
      description: 'Capturing photos, videos, highlights, and managing media coverage for events.', 
      emoji: '📸' 
    },
    { 
      name: 'Decor', 
      head: { name: 'Sreya Nair', image: '/images/dept-decor-head.jpg' },
      cohead: { name: 'Diya Nambiar', image: '/images/dept-decor-cohead.jpg' },
      description: 'Designing immersive decorations matching event themes and managing creative resources.', 
      emoji: '✨' 
    },
    { 
      name: 'Design', 
      head: { name: 'Kasturi Jadhav', image: '/images/dept-design-head.jpg' },
      cohead: { name: 'Tisha Shah', image: '/images/dept-design-cohead.jpg' },
      description: 'Creating brochures, flyers, social media posts, and defining the visual theme.', 
      emoji: '🎨' 
    },
    { 
      name: 'Logistics', 
      head: { name: 'Chetan Rathod', image: '/images/dept-logistics-head.jpg' },
      cohead: { name: 'Tarang Jain', image: '/images/dept-logistics-cohead.jpg' },
      description: 'Handling on-ground requirements, equipment, and coordinating resource needs.', 
      emoji: '🚚' 
    },
    { 
      name: 'Hospitality', 
      head: { name: 'Radhika Khatri', image: '/images/dept-hospitality-head.jpg' },
      cohead: { name: 'Saadiya Farooqui', image: '/images/dept-hospitality-cohead.jpg' },
      description: 'Welcoming guests, managing seating, refreshments, and ensuring comfort.', 
      emoji: '🤝' 
    },
    { 
      name: 'PR & Marketing', 
      head: { name: 'Pavan Mahadik', image: '/images/dept-marketing-head.jpg' },
      cohead: { name: 'Iqra Shaikh', image: '/images/dept-marketing-cohead.jpg' },
      description: 'Promoting the club, managing campaigns, and building sponsor relationships.', 
      emoji: '📢' 
    },
    { 
      name: 'Security', 
      head: { name: 'Chaitanya Salvi', image: '/images/dept-security-head.jpg' },
      cohead: { name: 'Jahnvi Nair', image: '/images/dept-security-cohead.jpg' },
      description: 'Crowd management, access control, safety, and emergency response.', 
      emoji: '🛡️' 
    },
    { 
      name: 'Technical', 
      head: { name: 'Rahil Shaikh', image: '/images/dept-tech-cohead.jpg' },
      cohead: { name: 'Asabdullah Khan', image: '/images/dept-tech-head.jpg' }, 
      description: 'Handling sound, lights, stage setup, and providing technical support.', 
      emoji: '💻' 
    },
    { 
      name: 'Website', 
      head: { name: 'Krishika Jain', image: '/images/dept-web-head.jpg' },
      cohead: { name: 'Anushka Thakur', image: '/images/dept-web-cohead.jpg' },
      description: 'Building, designing, and maintaining the official Fiestron website.', 
      emoji: '🌐' 
    },
  ]

  // --- HELPER: Bigger Profile Card ---
  // Increased width, padding, and image sizes for a more "Grand" look
  const ProfileCard = ({ name, role, description, image, emoji, isLarge = false }: any) => (
    <div 
      className={`
        group relative flex flex-col items-center text-center p-8 
        rounded-3xl border border-orange-500/20 
        bg-gradient-to-b from-[#1e1e2e] to-[#151520] 
        transition-all duration-500 ease-out
        hover:scale-105 hover:z-50 hover:shadow-[0_0_40px_rgba(0,0,0,0.6)] hover:border-teal-500/50
        ${isLarge ? 'min-w-[350px] min-h-[400px]' : 'w-full min-h-[350px]'}
      `}
    >
      {/* Image Circle - Increased Size */}
      <div className={`
        relative mb-6 overflow-hidden rounded-full border-4 border-orange-500/20 
        transition-all duration-500 group-hover:border-teal-400/50 group-hover:shadow-[0_0_25px_rgba(0,168,150,0.4)]
        ${isLarge ? 'w-48 h-48' : 'w-36 h-36'}
      `}>
        <div className="absolute inset-0 flex items-center justify-center bg-[#0d0d15] text-6xl">
          {emoji}
        </div>
        <img 
          src={image} 
          alt={name} 
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} 
        />
      </div>

      <h3 className={`font-bold text-white transition-colors duration-500 group-hover:text-teal-400 ${isLarge ? 'text-3xl' : 'text-2xl'}`}>
        {name}
      </h3>
      <p className="text-gray-400 text-sm uppercase tracking-wider font-medium mb-3">
        {role}
      </p>
      
      {/* Description */}
      <div className="
        max-h-0 overflow-hidden opacity-0 
        group-hover:max-h-40 group-hover:opacity-100 
        transition-all duration-700 ease-in-out delay-100
      ">
        <p className="text-gray-300 text-sm leading-relaxed px-2 pt-4 border-t border-white/10">
          {description}
        </p>
      </div>
    </div>
  )

  return (
    <>
      <Header />
      <section className="relative py-24 bg-black min-h-screen overflow-x-hidden">
        
        {/* Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-[90rem] mx-auto px-6 relative z-10"> {/* Wider Container */}
          
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-orange-500 to-teal-500 bg-clip-text text-transparent mb-6">
              The Team
            </h2>
            <p className="text-gray-400 text-xl max-w-3xl mx-auto">
              The visionaries, mentors, and creators behind Fiestron 2025.
            </p>
          </div>

          {/* --- 1. LEADERSHIP SECTION --- */}
          <div className="mb-32 flex flex-col gap-16 items-center">
            
            {/* Principal (Top) */}
            <div className="w-full flex justify-center">
               <ProfileCard {...leadership.principal} isLarge={true} />
            </div>

            {/* Vice Principals */}
            <div className="w-full">
              <h3 className="text-center text-gray-500 uppercase tracking-widest text-lg mb-10 font-semibold">Vice Principals</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 justify-center max-w-6xl mx-auto">
                {leadership.vps.map((vp, idx) => (
                  <div key={idx} className="flex justify-center">
                    <ProfileCard {...vp} />
                  </div>
                ))}
              </div>
            </div>

            {/* Coordinator/HOD */}
            <div className="w-full flex flex-col items-center">
               <h3 className="text-center text-gray-500 uppercase tracking-widest text-lg mb-10 font-semibold">Coordinator</h3>
               <div className="w-full max-w-md">
                  <ProfileCard {...leadership.hod} isLarge={true} />
               </div>
            </div>
          </div>

          {/* --- 2. FACULTY SECTION --- */}
          <div className="mb-32">
            <h3 className="text-4xl font-bold text-center text-white mb-16 border-b border-white/10 pb-6 inline-block w-full">
              Faculty Advisors
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
              {faculty.map((f, idx) => (
                <ProfileCard key={idx} {...f} />
              ))}
            </div>
          </div>

          {/* --- 3. STUDENT CORE TEAM --- */}
          <div className="mb-32">
            <h3 className="text-4xl font-bold text-center text-white mb-16 border-b border-white/10 pb-6 inline-block w-full">
              Core Team
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-7xl mx-auto">
              {coreTeam.map((c, idx) => (
                <ProfileCard key={idx} {...c} />
              ))}
            </div>
          </div>

          {/* --- 4. DEPARTMENTS SECTION (Super Sized) --- */}
          <div>
            <h3 className="text-4xl font-bold text-center text-white mb-16 border-b border-white/10 pb-6 inline-block w-full">
              Department Leads
            </h3>
            
            {/* Grid Gap Increased */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 max-w-7xl mx-auto">
              {departments.map((dept, idx) => (
                <div 
                  key={idx} 
                  className="group p-8 rounded-3xl border border-white/10 bg-[#0d0d15] 
                             hover:border-teal-500/50 hover:bg-[#151520] hover:z-50 hover:scale-105 hover:shadow-2xl
                             transition-all duration-500 ease-out min-h-[400px] flex flex-col justify-between"
                >
                  {/* Dept Header */}
                  <div className="flex flex-col items-center gap-4 mb-8">
                    <span className="text-6xl bg-white/5 p-4 rounded-2xl">{dept.emoji}</span>
                    <h4 className="text-3xl font-bold text-white group-hover:text-teal-400 transition-colors text-center">
                      {dept.name}
                    </h4>
                  </div>

                  {/* Heads Container (BIGGER IMAGES) */}
                  <div className="flex justify-center gap-8 mb-6">
                    {/* HEAD */}
                    <div className="flex-1 flex flex-col items-center text-center">
                      {/* Increased from w-16 to w-24/28 */}
                      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-orange-500/20 mb-4 group-hover:border-teal-500/50 transition-all duration-500 shadow-lg">
                        <img 
                          src={dept.head.image} 
                          alt={dept.head.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Head' }} 
                        />
                      </div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Head</p>
                      <p className="text-white text-lg font-semibold leading-tight">{dept.head.name}</p>
                    </div>

                    {/* CO-HEAD */}
                    <div className="flex-1 flex flex-col items-center text-center">
                      <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-orange-500/20 mb-4 group-hover:border-teal-500/50 transition-all duration-500 shadow-lg">
                        <img 
                          src={dept.cohead.image} 
                          alt={dept.cohead.name} 
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=CoHead' }} 
                        />
                      </div>
                      <p className="text-xs text-gray-500 uppercase tracking-widest font-bold mb-1">Co-Head</p>
                      <p className="text-white text-lg font-semibold leading-tight">{dept.cohead.name}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="border-t border-white/5 pt-4 mt-auto">
                    <p className="text-sm text-gray-400 italic opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 text-center">
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