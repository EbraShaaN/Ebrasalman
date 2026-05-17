// Default Data
const defaultData = {
  hero: {
    photo: 'https://raw.githubusercontent.com/EbraShaaN/Ebrasalman/main/Salman.png',
    logo: 'E',
    name: 'EBRA SALMAN',
    title: 'Software Engineer | Developer | Programmer',
    tagline: 'Building the future, one line of code at a time...',
    description: 'Passionate software engineer with expertise in building scalable applications, crafting elegant solutions, and bringing innovative ideas to life through code.'
  },
  about: {
    text: "I'm a dedicated software engineer with a passion for creating efficient, user-friendly, and innovative solutions. With a strong foundation in multiple programming languages and modern development practices, I specialize in building robust applications that solve real-world problems.|My journey in technology is driven by curiosity and a constant desire to learn. I believe in writing clean, maintainable code and following best practices to deliver high-quality software products.",
    stats: { exp: '3+', projects: '20+', tech: '10+', satisfaction: '100%' }
  },
  skills: {
    languages: ['Python', 'JavaScript', 'TypeScript', 'C++', 'Java', 'C#', 'SQL'],
    frontend: ['React', 'Vue.js', 'Angular', 'HTML5', 'CSS3', 'Tailwind', 'Next.js'],
    backend: ['Node.js', 'Express', 'Django', 'FastAPI', 'REST APIs', 'GraphQL'],
    tools: ['Git', 'Docker', 'AWS', 'Linux', 'MongoDB', 'PostgreSQL', 'Redis']
  },
  projects: [
    { title: 'E-Commerce Platform', desc: 'A full-featured online shopping platform with cart functionality, payment integration, and admin dashboard.', tech: ['React', 'Node.js', 'MongoDB', 'Stripe'], demo: '', github: '' },
    { title: 'Task Management App', desc: 'Collaborative task management tool with real-time updates, team workspaces, and productivity analytics.', tech: ['Vue.js', 'Firebase', 'Vuex'], demo: '', github: '' },
    { title: 'Portfolio Website', desc: 'Modern, responsive portfolio with smooth animations, dark mode, and optimized performance.', tech: ['HTML/CSS', 'JavaScript', 'GSAP'], demo: '', github: '' },
    { title: 'AI Chatbot', desc: 'Intelligent chatbot with natural language processing, custom knowledge base, and multi-platform support.', tech: ['Python', 'TensorFlow', 'FastAPI'], demo: '', github: '' },
    { title: 'Analytics Dashboard', desc: 'Real-time data visualization dashboard with interactive charts, custom reports, and export capabilities.', tech: ['React', 'D3.js', 'Express'], demo: '', github: '' },
    { title: 'REST API Service', desc: 'Scalable RESTful API with authentication, rate limiting, comprehensive documentation, and Docker deployment.', tech: ['Node.js', 'Express', 'Docker'], demo: '', github: '' }
  ],
  experience: [
    { date: '2023 - Present', title: 'Senior Software Engineer', company: 'Tech Innovators Inc.', desc: 'Leading development of cloud-based solutions, mentoring junior developers, and implementing best practices.' },
    { date: '2021 - 2023', title: 'Software Developer', company: 'Digital Solutions Ltd.', desc: 'Built and maintained web applications, collaborated with cross-functional teams, and optimized performance.' },
    { date: '2020 - 2021', title: 'Junior Developer', company: 'StartUp Hub', desc: 'Developed frontend components, debugged issues, and learned modern development workflows and methodologies.' }
  ],
  social: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    email: 'mailto:ebra@example.com',
    twitter: 'https://twitter.com',
    instagram: '',
    facebook: '',
    youtube: '',
    reddit: '',
    stackoverflow: '',
    codepen: '',
    dribbble: '',
    behance: ''
  },
  stats: {
    visits: '1,247',
    growth: '89%',
    projects: '24',
    messages: '156'
  },
  contact: {
    text: "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Let's create something amazing together."
  },
  messages: []
};

// Load or initialize data
let siteData = JSON.parse(localStorage.getItem('portfolioData')) || defaultData;
if (!siteData.messages) siteData.messages = [];

// Ensure social data exists with defaults
if (!siteData.social) siteData.social = defaultData.social;
else {
  const defaultSocial = defaultData.social;
  Object.keys(defaultSocial).forEach(key => {
    if (!siteData.social[key]) siteData.social[key] = defaultSocial[key];
  });
}

// Ensure projects have demo and github fields
if (siteData.projects && siteData.projects.length > 0) {
  siteData.projects.forEach(proj => {
    if (proj.demo === undefined) proj.demo = '';
    if (proj.github === undefined) proj.github = '';
  });
}

let isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
let isAdminLocked = localStorage.getItem('adminLocked') === 'true';

// Check lock on load
if (isAdminLocked) {
  document.getElementById('lockedOverlay').classList.remove('hidden');
  document.getElementById('lockBtn').classList.add('locked');
  document.getElementById('lockBtn').innerHTML = '&#x1F513;';
}

// Initialize page
function init() {
  createParticles();
  handleScrollAnimations();
  renderContent();
  if (isLoggedIn) showAdminState();
}

function renderContent() {
  // Hero - Profile Photo or Logo
  const heroLogo = document.getElementById('heroLogo');
  const navLogo = document.getElementById('navLogo');
  if (siteData.hero.photo) {
    heroLogo.innerHTML = `<img src="${siteData.hero.photo}" style="width: 100%; height: 100%; border-radius: inherit; object-fit: cover;">`;
    navLogo.innerHTML = `<img src="${siteData.hero.photo}" style="width: 100%; height: 100%; border-radius: inherit; object-fit: cover;">`;
  } else {
    heroLogo.textContent = siteData.hero.logo;
    heroLogo.innerHTML = siteData.hero.logo;
    navLogo.textContent = siteData.hero.logo;
  }
  document.getElementById('navLogoText').innerHTML = `&lt;${siteData.hero.name.replace(' ', ' &nbsp;')} /&gt;`;
  document.getElementById('heroName').setAttribute('data-text', siteData.hero.name);
  document.getElementById('heroName').textContent = siteData.hero.name;
  document.getElementById('heroTitle').textContent = siteData.hero.title;
  document.getElementById('heroTagline').textContent = siteData.hero.tagline;
  document.getElementById('heroDesc').textContent = siteData.hero.description;
  document.getElementById('footerName').textContent = siteData.hero.name.split(' ')[0] + ' ' + siteData.hero.name.split(' ')[1];

  // About
  const aboutParagraphs = siteData.about.text.split('|');
  document.getElementById('aboutText').innerHTML = aboutParagraphs.map(p => `<p>${p}</p>`).join('');
  document.getElementById('statExp').textContent = siteData.about.stats.exp;
  document.getElementById('statProjects').textContent = siteData.about.stats.projects;
  document.getElementById('statTech').textContent = siteData.about.stats.tech;
  document.getElementById('statSatisfaction').textContent = siteData.about.stats.satisfaction;

  // Skills - with fallback
  const skillsGrid = document.getElementById('skillsGrid');

  // Ensure skills data exists
  if (!siteData.skills) siteData.skills = defaultData.skills;

  // Get dynamic categories from siteData.skills
  const skillCategories = Object.keys(siteData.skills).map(key => ({
    name: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
    key: key
  }));

  skillsGrid.innerHTML = skillCategories.map((cat, i) => `
    <div class="skill-category fade-in slide-left stagger-${(i % 4) + 1} visible">
      <h3>${cat.name}</h3>
      <div class="skill-tags">
        ${(siteData.skills[cat.key] || []).map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
      </div>
    </div>
  `).join('');

  // Projects - with fallback
  const projectsGrid = document.getElementById('projectsGrid');
  const projectIcons = ['&#x1F4BB;', '&#x1F4CA;', '&#x1F3AF;', '&#x1F4D0;', '&#x1F4C8;', '&#x1F310;'];

  // Ensure projects array exists
  if (!siteData.projects || siteData.projects.length === 0) {
    siteData.projects = defaultData.projects;
  }

  projectsGrid.innerHTML = siteData.projects.map((proj, i) => `
    <div class="project-card zoom-in stagger-${(i % 3) + 1} visible">
      <div class="project-image">
        <span class="project-icon">${projectIcons[i % projectIcons.length]}</span>
      </div>
      <div class="project-content">
        <h3>${proj.title}</h3>
        <p>${proj.desc}</p>
        <div class="project-tech">
          ${(proj.tech || []).map(t => `<span>${t}</span>`).join('')}
        </div>
        <div class="project-links">
          ${proj.demo ? `<a href="${proj.demo}" target="_blank" class="project-link">Live Demo &#8594;</a>` : ''}
          ${proj.github ? `<a href="${proj.github}" target="_blank" class="project-link">GitHub &#8594;</a>` : ''}
        </div>
      </div>
    </div>
  `).join('');

  // Experience - with fallback
  const timeline = document.getElementById('timeline');

  // Ensure experience data exists
  if (!siteData.experience || siteData.experience.length === 0) {
    siteData.experience = defaultData.experience;
  }

  timeline.innerHTML = siteData.experience.map((exp, i) => `
    <div class="timeline-item fade-in stagger-${i+1} visible">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <span class="timeline-date">${exp.date}</span>
        <h3>${exp.title}</h3>
        <h4>${exp.company}</h4>
        <p>${exp.desc}</p>
      </div>
    </div>
  `).join('');

  // Contact Text
  const contactText = siteData.contact && siteData.contact.text ? siteData.contact.text : "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Let's create something amazing together.";
  document.getElementById('contactText').textContent = contactText;

  // Social Links - Dynamic with all social sites
  const socialLinks = document.getElementById('socialLinks');
  const socialIcons = {
    github: '<path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>',
    linkedin: '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>',
    email: '<path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>',
    twitter: '<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>',
    instagram: '<path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>',
    facebook: '<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>',
    youtube: '<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .482 6.186C0 8.986 0 12 0 12s0 3.014.482 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.014 24 12 24 12s0-3.014-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>',
    reddit: '<path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.724-1.489l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.662 11.047c.145 0 .27-.118.27-.255 0-.065-.053-.137-.212-.155l-.703-.13a.342.342 0 0 1-.14-.197.35.35 0 0 1-.038-.211l.125-.551c.07-.309.434-.463.797-.463.148 0 .27.118.27.255 0 .065-.053.137-.212.155l-.704.13a.342.342 0 0 1-.14.197.35.35 0 0 1-.038.211l.125.551c.07.309.434.463.797.463zm3.596-1.132a.27.27 0 0 0-.27-.256c-.145 0-.27.118-.27.256 0 .065.053.137.212.155l.703.13a.342.342 0 0 1 .14.197.35.35 0 0 1 .038.211l-.125.551c-.07.309-.434.463-.797.463-.148 0-.27-.118-.27-.256 0-.065.053-.137.212-.155l.704-.13a.342.342 0 0 1 .14-.197.35.35 0 0 1 .038-.211l-.125-.551c-.07-.309-.434-.463-.797-.463z"/>',
    stackoverflow: '<path d="M15 21h-10v-2h10v2zm6-11.665l-1.621-9.335-1.344.346 1.62 9.335 1.345-.346zm-5.964 6.937l-9.746-.975-.186 2.016 9.755.879.177-1.92zm.538-2.587l-9.282-6.174-.28 1.348 9.306 6.174.256-1.348zm1.204-2.413l-8.297-4.864-1.029.986 8.298 4.865 1.028-.987zm2.086-2.701l-5.339-3.397-1.553 1.128 5.339 3.397 1.553-1.128zm2.704-.936l-1.858-1.797-1.857 1.797 1.857 1.797 1.858-1.797zm-6.112 10.906l-.13.469-.468-.13.598-2.102.001.001v.001l.001.001-.002-.001.001-.001.001-.001.001-.001.001-.001v-.001l-.001-.001-.001-.001v-.001l-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001v-.001l-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001v-.001l-.001-.001-.001-.001-.001-.001v-.001l-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001v-.001l-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001v-.001l-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001v-.001l-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001v-.001l-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001-.001v-.001l-.001-.001-.001-.001-.001-.001-.001-.001v-.001l-.001-.001-.001-.001-.001-.001-.001-.001v-.001l-.001-.001-.001-.001-.001-.001-.001-.001v-.001l-.001-.001-.001-.001-.001-.001-.001-.001v-.001l-.001-.001-.001-.001v-.001l-.001-.001-.001-.001v-.001l-.001-.001-.001-.001v-.001l-.001-.001-.001-.001v-.001l-.001-.001-.001-.001v-.001l-.001-.001-.001-.001v-.001l-.001-.001-.001-.001v-.001l-.001-.001-.001-.001v-.001l-.001-.001-.001-.001v-.001l-.001-.001-.001-.001v-.001l-.001-.001v-.001l-.001-.001v-.001l-.001-.001v-.001l-.001-.001v-.001l.13-.469.536 1.954.536-1.954.13.469zm-2.647 4.152l-.29.387.387.29.387-.29-.29-.387-.194.194zm3.906.387l-.29.387.387.29.387-.29-.29-.387-.194.194zm2.647-.774l-.29.387.387.29.387-.29-.29-.387-.194.194z"/>',
    codepen: '<path d="M12 0L1.373 6.186v11.628L12 24l10.627-6.186V6.186L12 0zm-1.372 15.931L5.54 12 10.628 8.069l5.088 3.931-5.088 3.931zm5.088-7.862L5.54 12l5.088 3.931 5.088-3.931-5.088-3.931zm1.372 5.7l-5.46 3.134-5.46-3.134 1.372-1.072 4.088 2.138 4.088-2.138 1.372 1.072z"/>',
    dribbble: '<path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.3-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4-.814zm-11.62-2.58c.232-.4 3.04-5.19 8.332-6.55.228-.055.47-.11.71-.153-.26-.585-.54-1.167-.832-1.74C7.17 11.775 2.206 11.71 1.756 11.7l-.004.312c0 2.633.998 5.037 2.634 6.855zm-2.42-8.23c.46.008 3.19.03 6.18-1.248-1.1-2.593-2.61-4.99-3.146-5.55-2.867 1.35-5.01 3.8-5.24 4.158-.49.76-.822 1.64-.97 2.61l.004.004-.002.004v.004l-.003.006-.006.025c-.003.02-.007.04-.007.06 0 .1.016.2.04.3l.002-.002zm7.14-2.658c1.39 0 2.52.62 2.52.62s-2.18 1.82-2.52 4.92c0 0-.58-2.69-.99-4.62-.18-.88-.72-1.88-1.64-2.36 0 0-.58.66-.37 1.96.25 1.56 1.58 3.73 1.58 3.73s-1.32-.46-1.9-1.23c-.7-.98-.86-2.17-.86-2.17s.03.03.08.08c.27.26 1.43 1.66 1.43 1.66s-.2-.06-.46-.14l-.14-.04c-.04-.01-.08-.02-.13-.02-1.2-.17-2.3-.67-2.88-1.54 0 0 .28.35.71.72.72.62 1.73.74 1.73.74zm11.39 4.74c-.5-2.73-2.47-5.09-5.26-6.22-.34-.14-.68-.27-1.03-.39-.12-.04-.24-.08-.37-.12-.28-.09-.57-.17-.86-.24l-.01-.12c-.04-.3-.08-.59-.11-.88l-.01-.16-.02-.3c-.01-.11-.03-.22-.04-.33l-.05-.3c-.03-.16-.07-.31-.1-.46l-.05-.2-.03-.14c0 .02-.01.05-.01.07v.04l-.01.11-.02.34c-.03.48-.04.95-.02 1.41 0 .08 0 .16.01.24v.28c.03.18.06.35.1.52l.03.15c.04.2.09.4.14.59l.08.27c.07.23.14.46.22.68l.06.18.06.17c.2.52.46 1.01.78 1.45l.02.03c.54.79 1.22 1.45 2 1.92l.01.01c.65.4 1.41.71 2.23.89.26.06.53.1.8.13l.12.01c.23.02.47.03.71.03.08 0 .17 0 .25-.01h.01c.01 0 .03 0 .04-.01h.01l.03.01h.03l.01-.01.01-.01.01-.01.01-.01.01-.02.01-.01.01-.02.01-.01.01-.02.01-.01.02-.03.01-.02.01-.02.01-.01.01-.02.01-.01.01-.02.01-.01.01-.02.01-.01.02-.02.01-.01.01-.02.01-.01.01-.02.01-.01.02-.02.01-.01.01-.02.01-.01.01-.02.01-.01.02-.02.01-.01.01-.02.01-.01.01-.02.01-.01.02-.02.01-.01.01-.02.01-.01.01-.02.01-.01.02-.02.01-.01.01-.02.01-.01.01-.02.01-.01.02-.02.01-.01.01-.02.01-.01.01-.02.01-.01.02-.02.01-.01.01-.02.01-.01.01-.02.01-.01.02-.02.01-.01.01-.02.01-.01.01-.02.01-.01.02-.02.01-.01.01-.02.01-.01.01-.02.01-.01.02-.02.01-.01.01-.02.01-.01.01-.02.01-.01.02-.02.01-.01.01-.02.01-.01.01-.02.01-.01.02-.02.01-.01.01-.02.01-.01.01-.02.01-.01.02-.02.01-.01.01-.02.01-.01.01-.02.01-.01.02-.02.01-.01.01-.02.01-.01.01-.02.01-.01.02-.02.01-.01.01-.02.01-.01.01-.02.01-.01.02-.02.01-.01.01-.02.01-.01.01-.02.01-.01.02-.02.01-.01.01-.02.01-.01.01-.02.01-.01.02-.02z"/>',
    behance: '<path d="M22 7h-5v-2h5v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.139H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 5.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.391c3.055 0 2.868-3.001-.001-3.016z"/>'
  };

  let socialHTML = '';
  const socialOrder = ['github', 'linkedin', 'email', 'twitter', 'instagram', 'facebook', 'youtube', 'reddit', 'stackoverflow', 'codepen', 'dribbble', 'behance'];

  const customLogos = siteData.socialLogos || {};

  socialOrder.forEach(site => {
    if (siteData.social[site] && socialIcons[site]) {
      const hasCustomLogo = customLogos[site];
      socialHTML += `<a href="${siteData.social[site]}" target="_blank" class="social-link">
        <div class="link-icon">
          ${hasCustomLogo
            ? `<img src="${customLogos[site]}" style="width: 20px; height: 20px; object-fit: contain;">`
            : `<svg viewBox="0 0 24 24"><path d="${socialIcons[site]}"/></svg>`
          }
        </div>
        <span>${site.charAt(0).toUpperCase() + site.slice(1)}</span>
      </a>`;
    }
  });
  socialLinks.innerHTML = socialHTML;

  // Dashboard stats
  document.getElementById('dashVisits').textContent = siteData.stats.visits;
  document.getElementById('dashGrowth').textContent = siteData.stats.growth;
  document.getElementById('dashProjects').textContent = siteData.stats.projects;
  document.getElementById('dashMessages').textContent = siteData.messages ? siteData.messages.length : 0;

  // Re-trigger animations
  setTimeout(handleScrollAnimations, 100);
}

// Login functions
function openLogin() {
  if (isLoggedIn) {
    toggleAdmin();
  } else {
    document.getElementById('loginOverlay').classList.add('active');
  }
}

function attemptLogin() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  const storedPass = localStorage.getItem('adminPassword') || 'ebra123';

  if (user === 'admin' && pass === storedPass) {
    isLoggedIn = true;
    localStorage.setItem('adminLoggedIn', 'true');
    document.getElementById('loginOverlay').classList.remove('active');
    document.getElementById('loginError').textContent = '';
    // Clear fields
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    showAdminState();
    toggleAdmin();
  } else {
    document.getElementById('loginError').textContent = 'Invalid username or password';
  }
}

function goToHome() {
  document.getElementById('loginOverlay').classList.remove('active');
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showChangePassword() {
  const section = document.getElementById('changePasswordSection');
  section.style.display = section.style.display === 'none' ? 'block' : 'none';
}

function updatePassword() {
  // Kept for backward compatibility - redirects to admin panel
  document.getElementById('loginOverlay').classList.remove('active');
  openLogin();
}

function updateAdminPassword() {
  const current = document.getElementById('adminCurrentPass').value;
  const newPass = document.getElementById('adminNewPass').value;
  const confirm = document.getElementById('adminConfirmPass').value;
  const storedPass = localStorage.getItem('adminPassword') || 'ebra123';

  if (current !== storedPass) {
    alert('Current password is incorrect!');
    return;
  }

  if (newPass !== confirm) {
    alert('New passwords do not match!');
    return;
  }

  if (newPass.length < 4) {
    alert('Password must be at least 4 characters!');
    return;
  }

  localStorage.setItem('adminPassword', newPass);
  alert('Password updated successfully!');

  // Clear fields
  document.getElementById('adminCurrentPass').value = '';
  document.getElementById('adminNewPass').value = '';
  document.getElementById('adminConfirmPass').value = '';
}

function showAdminState() {
  document.getElementById('adminToggle').classList.remove('hidden');
  document.getElementById('adminNavBtn').textContent = 'Admin Panel';
}

function logout() {
  isLoggedIn = false;
  localStorage.removeItem('adminLoggedIn');
  document.getElementById('adminToggle').classList.add('hidden');
  document.getElementById('adminNavBtn').textContent = 'Admin';
  toggleAdmin();
}

// Message System Functions
function submitMessage(e) {
  e.preventDefault();
  const name = document.getElementById('msgName').value;
  const email = document.getElementById('msgEmail').value;
  const content = document.getElementById('msgContent').value;

  const newMessage = {
    id: Date.now(),
    name: name,
    email: email,
    content: content,
    time: new Date().toISOString(),
    read: false
  };

  siteData.messages.unshift(newMessage);
  localStorage.setItem('portfolioData', JSON.stringify(siteData));

  // Show success
  const form = document.getElementById('contactForm');
  form.innerHTML = '<div class="form-success">Message sent successfully! I will get back to you soon.</div>';

  // Reset after 3 seconds
  setTimeout(() => {
    form.innerHTML = `
      <div class="form-group">
        <label>Your Name</label>
        <input type="text" class="form-input" id="msgName" placeholder="Enter your name" required>
      </div>
      <div class="form-group">
        <label>Email Address</label>
        <input type="email" class="form-input" id="msgEmail" placeholder="Enter your email" required>
      </div>
      <div class="form-group">
        <label>Message</label>
        <textarea class="form-textarea" id="msgContent" placeholder="Write your message here..." required></textarea>
      </div>
      <button type="submit" class="submit-btn">Send Message</button>
    `;
  }, 5000);

  updateMessageBadge();
}

function renderMessages() {
  const container = document.getElementById('messagesContainer');
  const messages = siteData.messages;

  if (messages.length === 0) {
    container.innerHTML = `
      <div class="no-messages">
        <div class="no-messages-icon">&#x1F4AC;</div>
        <p>No messages yet</p>
      </div>
    `;
    return;
  }

  container.innerHTML = messages.map(msg => {
    const date = new Date(msg.time);
    const timeAgo = getTimeAgo(date);
    return `
      <div class="message-card ${msg.read ? '' : 'unread'}" data-id="${msg.id}">
        <div class="message-header">
          <span class="message-sender">${msg.name}</span>
          <span class="message-time">${timeAgo}</span>
        </div>
        <div class="message-email">${msg.email}</div>
        <div class="message-content">${msg.content}</div>
        <div class="message-actions">
          <button class="msg-action-btn msg-read" onclick="markAsRead(${msg.id})">
            ${msg.read ? 'Mark Unread' : 'Mark Read'}
          </button>
          <button class="msg-action-btn msg-delete" onclick="deleteMessage(${msg.id})">Delete</button>
        </div>
      </div>
    `;
  }).join('');
}

function getTimeAgo(date) {
  const now = new Date();
  const diff = now - date;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return minutes + ' min ago';
  if (hours < 24) return hours + ' hours ago';
  if (days < 7) return days + ' days ago';
  return date.toLocaleDateString();
}

function markAsRead(id) {
  const msg = siteData.messages.find(m => m.id === id);
  if (msg) {
    msg.read = !msg.read;
    localStorage.setItem('portfolioData', JSON.stringify(siteData));
    renderMessages();
    updateMessageBadge();
  }
}

function deleteMessage(id) {
  siteData.messages = siteData.messages.filter(m => m.id !== id);
  localStorage.setItem('portfolioData', JSON.stringify(siteData));
  renderMessages();
  updateMessageBadge();
  showToast('Message deleted!');
}

function updateMessageBadge() {
  const unreadCount = siteData.messages.filter(m => !m.read).length;
  const badge = document.getElementById('msgBadge');
  if (unreadCount > 0) {
    badge.textContent = unreadCount;
    badge.style.display = 'flex';
  } else {
    badge.style.display = 'none';
  }
}

// Admin panel functions
function toggleAdmin() {
  document.querySelector('.admin-panel').classList.toggle('active');
  document.querySelector('.admin-overlay').classList.toggle('active');
  populateEditForms();
  if (document.querySelector('.admin-panel').classList.contains('active')) {
    renderMessages();
    updateMessageBadge();
  }
}

function showAdminTab(tabName) {
  document.querySelectorAll('.admin-tab').forEach(tab => tab.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('.admin-section').forEach(section => section.classList.remove('active'));
  document.getElementById('admin-' + tabName).classList.add('active');
  if (tabName === 'messages') {
    renderMessages();
  }
}

function populateEditForms() {
  // Hero Section
  document.getElementById('editPhotoUrl').value = siteData.hero.photo || '';
  document.getElementById('editLogo').value = siteData.hero.logo;
  document.getElementById('editName').value = siteData.hero.name;
  document.getElementById('editTitle').value = siteData.hero.title;
  document.getElementById('editTagline').value = siteData.hero.tagline;
  document.getElementById('editDesc').value = siteData.hero.description;

  // Photo Preview
  showPhotoPreview(siteData.hero.photo);

  // About Section
  document.getElementById('editAbout').value = siteData.about.text;
  document.getElementById('editStatExp').value = siteData.about.stats.exp;
  document.getElementById('editStatProjects').value = siteData.about.stats.projects;
  document.getElementById('editStatTech').value = siteData.about.stats.tech;
  document.getElementById('editStatSatisfaction').value = siteData.about.stats.satisfaction;

  // Social/Contact
  document.getElementById('editGithub').value = siteData.social.github || '';
  document.getElementById('editLinkedin').value = siteData.social.linkedin || '';
  document.getElementById('editEmail').value = siteData.social.email || '';
  document.getElementById('editTwitter').value = siteData.social.twitter || '';
  document.getElementById('editInstagram').value = siteData.social.instagram || '';
  document.getElementById('editFacebook').value = siteData.social.facebook || '';
  document.getElementById('editYoutube').value = siteData.social.youtube || '';
  document.getElementById('editReddit').value = siteData.social.reddit || '';
  document.getElementById('editStackoverflow').value = siteData.social.stackoverflow || '';
  document.getElementById('editCodepen').value = siteData.social.codepen || '';
  document.getElementById('editDribbble').value = siteData.social.dribbble || '';
  document.getElementById('editBehance').value = siteData.social.behance || '';
  document.getElementById('editContactText').value = siteData.contact ? siteData.contact.text : '';

  // Update Dashboard Stats
  document.getElementById('dashVisits2').textContent = siteData.stats.visits;
  document.getElementById('dashGrowth2').textContent = siteData.stats.growth;
  document.getElementById('dashProjects2').textContent = siteData.stats.projects;
  document.getElementById('dashMessages2').textContent = siteData.messages ? siteData.messages.length : 0;

  renderSkillsEditor();
  renderProjectsEditor();
  renderExperienceEditor();
}

function renderSkillsEditor() {
  const container = document.getElementById('skillsEditor');

  if (!siteData.skills) {
    siteData.skills = {
      languages: ['Python', 'JavaScript', 'TypeScript', 'C++', 'Java', 'C#', 'SQL'],
      frontend: ['React', 'Vue.js', 'Angular', 'HTML5', 'CSS3', 'Tailwind', 'Next.js'],
      backend: ['Node.js', 'Express', 'Django', 'FastAPI', 'REST APIs', 'GraphQL'],
      tools: ['Git', 'Docker', 'AWS', 'Linux', 'MongoDB', 'PostgreSQL', 'Redis']
    };
  }

  const categories = Object.keys(siteData.skills).map(key => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    key: key
  }));

  container.innerHTML = categories.map((cat, index) => `
    <div class="project-editor-item" style="margin-bottom: 20px; padding: 20px; background: var(--bg-card); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 12px;">
      <h4 style="color: #00f0ff; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
        ${cat.name}
        <button class="edit-delete-btn" onclick="deleteSkillCategory('${cat.key}')" style="width: 30px; height: 30px; background: rgba(255, 0, 100, 0.2); border: 1px solid #ff0064; border-radius: 6px; color: #ff0064; cursor: pointer; font-size: 0.9rem;">&#x2715;</button>
      </h4>
      <div class="edit-field">
        <label style="display: block; font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 8px;">Category Name</label>
        <input type="text" class="edit-input" id="editCatName${index}" value="${cat.name}" onchange="updateSkillName('${cat.key}', this.value)" style="width: 100%; padding: 10px 15px; background: var(--bg-secondary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 8px; color: var(--text-primary); margin-bottom: 15px;">
      </div>
      <div class="edit-field">
        <label style="display: block; font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 8px;">Skills (comma separated)</label>
        <input type="text" class="edit-tags-input" id="edit${cat.key}"
          value="${siteData.skills[cat.key].join(', ')}"
          onchange="updateSkill('${cat.key}', this.value)"
          style="width: 100%; padding: 12px 15px; background: var(--bg-secondary); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 8px; color: var(--text-primary);">
      </div>
    </div>
  `).join('');
}

function viewAllSkills() {
  const container = document.getElementById('skillsViewContainer');
  const isVisible = container.style.display !== 'none';

  if (isVisible) {
    container.style.display = 'none';
    return;
  }

  if (!siteData.skills || Object.keys(siteData.skills).length === 0) {
    container.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 20px;">No skills categories added yet.</p>';
    container.style.display = 'block';
    return;
  }

  const categories = Object.keys(siteData.skills).map(key => ({
    name: key.charAt(0).toUpperCase() + key.slice(1).replace(/_/g, ' '),
    key: key,
    skills: siteData.skills[key]
  }));

  container.innerHTML = categories.map((cat, catIndex) => `
    <div style="background: var(--bg-card); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 12px; padding: 20px; margin-bottom: 15px;">
      <h4 style="color: #00f0ff; margin-bottom: 15px; font-size: 1rem; display: flex; justify-content: space-between; align-items: center;">
        ${cat.name}
        <div style="display: flex; gap: 8px; align-items: center;">
          <button onclick="addSkillToCategory('${cat.key}')" style="padding: 4px 10px; font-size: 0.7rem; background: rgba(0, 240, 255, 0.15); border: 1px solid rgba(0, 240, 255, 0.3); border-radius: 6px; color: #00f0ff; cursor: pointer;">+ Add</button>
          <button onclick="deleteSkillCategoryFromView('${cat.key}')" style="padding: 4px 10px; font-size: 0.7rem; background: rgba(255, 0, 100, 0.15); border: 1px solid rgba(255, 0, 100, 0.3); border-radius: 6px; color: #ff0064; cursor: pointer;">&#x2715;</button>
        </div>
      </h4>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        ${cat.skills.length > 0 ? cat.skills.map((skill, skillIndex) => `
          <span style="background: linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(168, 85, 247, 0.1)); border: 1px solid rgba(0, 240, 255, 0.3); border-radius: 20px; padding: 6px 14px; font-size: 0.85rem; color: var(--text-primary); display: inline-flex; align-items: center; gap: 6px;">
            ${skill}
            <button onclick="deleteSingleSkill('${cat.key}', ${skillIndex})" style="background: none; border: none; color: #ff0064; cursor: pointer; padding: 0; font-size: 0.9rem; line-height: 1;">&#x2715;</button>
          </span>
        `).join('') : '<span style="color: var(--text-muted); font-size: 0.85rem;">No skills in this category</span>'}
      </div>
    </div>
  `).join('');

  container.innerHTML += `
    <div style="text-align: center; margin-top: 15px;">
      <button onclick="addNewSkillCategory()" style="padding: 10px 20px; background: linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(168, 85, 247, 0.2)); border: 1px solid rgba(0, 240, 255, 0.4); border-radius: 8px; color: #00f0ff; cursor: pointer; font-size: 0.85rem;">+ Add New Category</button>
    </div>
  `;

  container.style.display = 'block';
}

function deleteSingleSkill(catKey, skillIndex) {
  siteData.skills[catKey].splice(skillIndex, 1);
  localStorage.setItem('portfolioData', JSON.stringify(siteData));
  viewAllSkills();
  showToast('Skill deleted!');
}

function deleteSkillCategoryFromView(key) {
  delete siteData.skills[key];
  localStorage.setItem('portfolioData', JSON.stringify(siteData));
  viewAllSkills();
  showToast('Category deleted!');
}

function addSkillToCategory(catKey) {
  const skillName = prompt('Enter skill name:');
  if (skillName && skillName.trim()) {
    siteData.skills[catKey].push(skillName.trim());
    localStorage.setItem('portfolioData', JSON.stringify(siteData));
    viewAllSkills();
    showToast('Skill added!');
  }
}

function updateSkill(key, value) {
  siteData.skills[key] = value.split(',').map(s => s.trim()).filter(s => s);
}

function updateSkillName(oldKey, newName) {
  if (!newName.trim()) return;

  const newKey = newName.toLowerCase().replace(/\s+/g, '_');

  if (oldKey !== newKey) {
    siteData.skills[newKey] = siteData.skills[oldKey];
    delete siteData.skills[oldKey];
  }
}

function addNewSkillCategory() {
  const container = document.getElementById('skillsEditor');

  // Check if form already exists
  if (document.getElementById('newCategoryForm')) {
    showToast('Please save or cancel the current form first!', 'error');
    return;
  }

  // Add inline form
  const formHTML = `
    <div id="newCategoryForm" style="margin-bottom: 20px; padding: 25px; background: linear-gradient(145deg, rgba(0, 240, 255, 0.1), rgba(168, 85, 247, 0.05)); border: 1px solid rgba(0, 240, 255, 0.3); border-radius: 16px;">
      <h4 style="color: #00f0ff; margin-bottom: 20px; font-family: Orbitron, sans-serif; font-size: 1rem;">&#x2795; Add New Category</h4>
      <div class="edit-field">
        <label style="display: block; font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Category Name</label>
        <input type="text" id="newCategoryName" class="edit-input" placeholder="e.g., Databases, AI/ML, Cloud..." style="width: 100%; padding: 14px 18px; background: var(--bg-secondary); border: 1px solid rgba(0, 240, 255, 0.3); border-radius: 10px; color: var(--text-primary); font-size: 1rem;">
      </div>
      <div class="edit-field">
        <label style="display: block; font-size: 0.8rem; color: var(--text-secondary); margin-bottom: 8px; text-transform: uppercase; letter-spacing: 1px;">Skills (comma separated)</label>
        <input type="text" id="newCategorySkills" class="edit-tags-input" placeholder="e.g., MySQL, PostgreSQL, MongoDB" style="width: 100%; padding: 14px 18px; background: var(--bg-secondary); border: 1px solid rgba(0, 240, 255, 0.3); border-radius: 10px; color: var(--text-primary); font-size: 1rem;">
      </div>
      <div style="display: flex; gap: 12px; margin-top: 20px;">
        <button onclick="saveNewSkillCategory()" style="flex: 1; padding: 14px 25px; background: linear-gradient(135deg, #00f0ff, #a855f7); border: none; border-radius: 10px; color: #0a0a0f; font-weight: 600; cursor: pointer; font-size: 0.9rem;">&#x2714; Add Category</button>
        <button onclick="cancelNewSkillCategory()" style="padding: 14px 25px; background: transparent; border: 1px solid var(--text-muted); border-radius: 10px; color: var(--text-secondary); cursor: pointer; font-size: 0.9rem;">&#x2716; Cancel</button>
      </div>
    </div>
  `;

  container.insertAdjacentHTML('afterbegin', formHTML);
}

function saveNewSkillCategory() {
  const name = document.getElementById('newCategoryName').value.trim();
  const skills = document.getElementById('newCategorySkills').value.trim();

  if (!name) {
    showToast('Please enter a category name!', 'error');
    return;
  }

  const key = name.toLowerCase().replace(/\s+/g, '_');

  if (siteData.skills[key]) {
    showToast('Category already exists!', 'error');
    return;
  }

  siteData.skills[key] = skills ? skills.split(',').map(s => s.trim()).filter(s => s) : [];
  cancelNewSkillCategory();
  renderSkillsEditor();
  showToast(`Category "${name}" added successfully!`);
}

function cancelNewSkillCategory() {
  const form = document.getElementById('newCategoryForm');
  if (form) form.remove();
}

function deleteSkillCategory(key) {
  delete siteData.skills[key];
  renderSkillsEditor();
  showToast('Category deleted!');
}

// Projects Editor
function renderProjectsEditor() {
  const container = document.getElementById('projectsEditor');
  container.innerHTML = siteData.projects.map((proj, i) => `
    <div class="project-editor-item">
      <h4>Project ${i + 1} <span>
        <button class="edit-delete-btn" onclick="deleteProject(${i})">&#x2715;</button>
      </span></h4>
      <div class="edit-field">
        <label>Title</label>
        <input type="text" class="edit-input" value="${proj.title}" onchange="updateProject(${i}, 'title', this.value)">
      </div>
      <div class="edit-field">
        <label>Description</label>
        <textarea class="edit-textarea" onchange="updateProject(${i}, 'desc', this.value)">${proj.desc}</textarea>
      </div>
      <div class="edit-field">
        <label>Technologies (comma separated)</label>
        <input type="text" class="edit-tags-input" value="${proj.tech.join(', ')}" onchange="updateProject(${i}, 'tech', this.value)">
      </div>
      <div class="edit-field">
        <label>Live Demo URL</label>
        <input type="text" class="edit-input" value="${proj.demo || ''}" placeholder="https://demo.com" onchange="updateProject(${i}, 'demo', this.value)">
      </div>
      <div class="edit-field">
        <label>GitHub URL</label>
        <input type="text" class="edit-input" value="${proj.github || ''}" placeholder="https://github.com/..." onchange="updateProject(${i}, 'github', this.value)">
      </div>
    </div>
  `).join('');
}

function updateProject(index, field, value) {
  if (field === 'tech') {
    siteData.projects[index][field] = value.split(',').map(s => s.trim()).filter(s => s);
  } else {
    siteData.projects[index][field] = value;
  }
}

// Toast/Popup Notification
function showToast(message, type = 'success') {
  const notificationArea = document.getElementById('adminNotification');
  const existing = notificationArea.querySelector('.admin-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `admin-toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${type === 'success' ? '&#x2714;' : '&#x26A0;'}</span>
    <span class="toast-message">${message}</span>
  `;
  notificationArea.appendChild(toast);

  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function deleteProject(index) {
  siteData.projects.splice(index, 1);
  renderProjectsEditor();
  showToast('Project deleted!');
}

function viewAllProjects() {
  const container = document.getElementById('projectsViewContainer');
  const isVisible = container.style.display !== 'none';

  if (isVisible) {
    container.style.display = 'none';
    return;
  }

  if (!siteData.projects || siteData.projects.length === 0) {
    container.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 20px;">No projects added yet.</p>';
    container.style.display = 'block';
    return;
  }

  container.innerHTML = siteData.projects.map((proj, i) => `
    <div style="background: var(--bg-card); border: 1px solid rgba(0, 240, 255, 0.2); border-radius: 12px; padding: 20px; margin-bottom: 15px;">
      <h4 style="color: #00f0ff; margin-bottom: 10px; font-size: 1rem; display: flex; justify-content: space-between; align-items: center;">
        ${proj.title}
        <button onclick="deleteProjectFromView(${i})" style="padding: 4px 10px; font-size: 0.7rem; background: rgba(255, 0, 100, 0.15); border: 1px solid rgba(255, 0, 100, 0.3); border-radius: 6px; color: #ff0064; cursor: pointer;">&#x2715; Delete</button>
      </h4>
      <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 10px;">${proj.desc}</p>
      <div style="display: flex; flex-wrap: wrap; gap: 6px;">
        ${proj.tech.map(t => `
          <span style="background: rgba(168, 85, 247, 0.15); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 15px; padding: 4px 12px; font-size: 0.75rem; color: #a855f7;">${t}</span>
        `).join('')}
      </div>
    </div>
  `).join('');

  container.innerHTML += `
    <div style="text-align: center; margin-top: 15px;">
      <button onclick="addNewProject()" style="padding: 10px 20px; background: linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(168, 85, 247, 0.2)); border: 1px solid rgba(0, 240, 255, 0.4); border-radius: 8px; color: #00f0ff; cursor: pointer; font-size: 0.85rem;">+ Add New Project</button>
    </div>
  `;

  container.style.display = 'block';
}

function deleteProjectFromView(index) {
  siteData.projects.splice(index, 1);
  localStorage.setItem('portfolioData', JSON.stringify(siteData));
  renderContent();
  viewAllProjects();
  showToast('Project deleted!');
}

function addNewProject() {
  siteData.projects.push({
    title: 'New Project',
    desc: 'Project description here...',
    tech: ['React', 'Node.js'],
    demo: '',
    github: ''
  });
  renderProjectsEditor();
  showToast('New project added! Click Save to apply.');
}

// Experience Editor
function renderExperienceEditor() {
  const container = document.getElementById('experienceEditor');
  container.innerHTML = siteData.experience.map((exp, i) => `
    <div class="experience-editor-item">
      <h4>Experience ${i + 1} <span>
        <button class="edit-delete-btn" onclick="deleteExperience(${i})">&#x2715;</button>
      </span></h4>
      <div class="edit-field">
        <label>Date Range</label>
        <input type="text" class="edit-input" value="${exp.date}" onchange="updateExperience(${i}, 'date', this.value)">
      </div>
      <div class="edit-field">
        <label>Job Title</label>
        <input type="text" class="edit-input" value="${exp.title}" onchange="updateExperience(${i}, 'title', this.value)">
      </div>
      <div class="edit-field">
        <label>Company</label>
        <input type="text" class="edit-input" value="${exp.company}" onchange="updateExperience(${i}, 'company', this.value)">
      </div>
      <div class="edit-field">
        <label>Description</label>
        <textarea class="edit-textarea" onchange="updateExperience(${i}, 'desc', this.value)">${exp.desc}</textarea>
      </div>
    </div>
  `).join('');
}

function updateExperience(index, field, value) {
  siteData.experience[index][field] = value;
}

function deleteExperience(index) {
  siteData.experience.splice(index, 1);
  renderExperienceEditor();
  showToast('Experience deleted!');
}

function viewAllExperience() {
  const container = document.getElementById('experienceViewContainer');
  const isVisible = container.style.display !== 'none';

  if (isVisible) {
    container.style.display = 'none';
    return;
  }

  if (!siteData.experience || siteData.experience.length === 0) {
    container.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 20px;">No experience entries added yet.</p>';
    container.style.display = 'block';
    return;
  }

  container.innerHTML = siteData.experience.map((exp, i) => `
    <div style="background: var(--bg-card); border: 1px solid rgba(168, 85, 247, 0.2); border-radius: 12px; padding: 20px; margin-bottom: 15px;">
      <h4 style="color: #a855f7; margin-bottom: 8px; font-size: 1rem; display: flex; justify-content: space-between; align-items: center;">
        ${exp.title}
        <button onclick="deleteExperienceFromView(${i})" style="padding: 4px 10px; font-size: 0.7rem; background: rgba(255, 0, 100, 0.15); border: 1px solid rgba(255, 0, 100, 0.3); border-radius: 6px; color: #ff0064; cursor: pointer;">&#x2715; Delete</button>
      </h4>
      <p style="color: #00f0ff; font-size: 0.85rem; margin-bottom: 5px;">${exp.company}</p>
      <p style="color: var(--text-muted); font-size: 0.8rem; margin-bottom: 10px;">${exp.date}</p>
      <p style="color: var(--text-secondary); font-size: 0.9rem;">${exp.desc}</p>
    </div>
  `).join('');

  container.innerHTML += `
    <div style="text-align: center; margin-top: 15px;">
      <button onclick="addNewExperience()" style="padding: 10px 20px; background: linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(0, 240, 255, 0.2)); border: 1px solid rgba(168, 85, 247, 0.4); border-radius: 8px; color: #a855f7; cursor: pointer; font-size: 0.85rem;">+ Add New Experience</button>
    </div>
  `;

  container.style.display = 'block';
}

function deleteExperienceFromView(index) {
  siteData.experience.splice(index, 1);
  localStorage.setItem('portfolioData', JSON.stringify(siteData));
  renderContent();
  viewAllExperience();
  showToast('Experience deleted!');
}

function addNewExperience() {
  siteData.experience.push({
    date: '2024 - Present',
    title: 'Job Title',
    company: 'Company Name',
    desc: 'Job description here...'
  });
  renderExperienceEditor();
  showToast('New experience added! Click Save to apply.');
}

function saveContact() {
  if (!siteData.contact) siteData.contact = {};
  siteData.contact.text = document.getElementById('editContactText').value;
  saveAndRender();
}

// Lock/Unlock Functions
function toggleLock() {
  isAdminLocked = !isAdminLocked;
  localStorage.setItem('adminLocked', isAdminLocked.toString());

  const overlay = document.getElementById('lockedOverlay');
  const lockBtn = document.getElementById('lockBtn');

  if (isAdminLocked) {
    overlay.classList.remove('hidden');
    lockBtn.classList.add('locked');
    lockBtn.innerHTML = '&#x1F513;';
    // Close admin panel when locked
    document.querySelector('.admin-panel').classList.remove('active');
    document.querySelector('.admin-overlay').classList.remove('active');
  } else {
    overlay.classList.add('hidden');
    lockBtn.classList.remove('locked');
    lockBtn.innerHTML = '&#x1F512;';
  }
}

function unlockAdmin() {
  const password = document.getElementById('unlockPassword').value;
  const storedPass = localStorage.getItem('adminPassword') || 'ebra123';
  if (password === storedPass) {
    isAdminLocked = false;
    localStorage.setItem('adminLocked', 'false');
    document.getElementById('lockedOverlay').classList.add('hidden');
    document.getElementById('lockBtn').classList.remove('locked');
    document.getElementById('lockBtn').innerHTML = '&#x1F512;';
    document.getElementById('unlockPassword').value = '';
  } else {
    alert('Incorrect password!');
  }
}

function clearAllData() {
  if (confirm('Are you sure you want to reset all data? This cannot be undone!')) {
    localStorage.removeItem('portfolioData');
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminLocked');
    location.reload();
  }
}

// ─────────────────────────────────────────────────────
// PROFILE PHOTO
// GitHub-এ image রেখে raw URL paste করলে
// সব device ও browser-এ দেখা যাবে।
// ─────────────────────────────────────────────────────
function handlePhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    siteData.hero.photo = e.target.result;
    document.getElementById('editPhotoUrl').value = '';
    showPhotoPreview(e.target.result);
    localStorage.setItem('portfolioData', JSON.stringify(siteData));
    renderContent();
    showToast('⚠️ শুধু এই browser-এ দেখা যাবে। সব device-এ দেখাতে GitHub raw URL দিন।', 'error');
  };
  reader.readAsDataURL(file);
  event.target.value = '';
}

function updateProfilePhoto(url) {
  url = (url || '').trim();
  if (!url) return;
  // Regular GitHub URL → raw URL auto-convert
  url = url
    .replace('https://github.com/', 'https://raw.githubusercontent.com/')
    .replace('/blob/', '/');
  siteData.hero.photo = url;
  showPhotoPreview(url);
  showToast('✅ Photo URL set! Save Hero চাপুন।');
}

function showPhotoPreview(src) {
  const preview = document.getElementById('photoPreview');
  const img = document.getElementById('photoPreviewImg');
  if (src) {
    img.src = src;
    preview.style.display = 'block';
  } else {
    preview.style.display = 'none';
  }
}

function removeProfilePhoto() {
  siteData.hero.photo = '';
  document.getElementById('editPhotoUrl').value = '';
  document.getElementById('photoPreview').style.display = 'none';
  document.getElementById('photoUpload').value = '';
}

function saveHero() {
  siteData.hero.photo = siteData.hero.photo || '';
  siteData.hero.logo = document.getElementById('editLogo').value;
  siteData.hero.name = document.getElementById('editName').value;
  siteData.hero.title = document.getElementById('editTitle').value;
  siteData.hero.tagline = document.getElementById('editTagline').value;
  siteData.hero.description = document.getElementById('editDesc').value;
  saveAndRender();
}

function saveAbout() {
  siteData.about.text = document.getElementById('editAbout').value;
  siteData.about.stats.exp = document.getElementById('editStatExp').value;
  siteData.about.stats.projects = document.getElementById('editStatProjects').value;
  siteData.about.stats.tech = document.getElementById('editStatTech').value;
  siteData.about.stats.satisfaction = document.getElementById('editStatSatisfaction').value;
  saveAndRender();
}

function saveSettings() {
  siteData.social.github = document.getElementById('editGithub').value;
  siteData.social.linkedin = document.getElementById('editLinkedin').value;
  siteData.social.email = document.getElementById('editEmail').value;
  siteData.social.twitter = document.getElementById('editTwitter').value;
  siteData.social.instagram = document.getElementById('editInstagram').value;
  siteData.social.facebook = document.getElementById('editFacebook').value;
  siteData.social.youtube = document.getElementById('editYoutube').value;
  siteData.social.reddit = document.getElementById('editReddit').value;
  siteData.social.stackoverflow = document.getElementById('editStackoverflow').value;
  siteData.social.codepen = document.getElementById('editCodepen').value;
  siteData.social.dribbble = document.getElementById('editDribbble').value;
  siteData.social.behance = document.getElementById('editBehance').value;
  saveAndRender();
}

// Social Logos Management
function toggleSocialLogos() {
  const container = document.getElementById('socialLogosContainer');
  if (container.style.display === 'none') {
    container.style.display = 'block';
    renderSocialLogos();
  } else {
    container.style.display = 'none';
  }
}

function renderSocialLogos() {
  const container = document.getElementById('socialLogosList');

  if (!siteData.socialLogos) {
    siteData.socialLogos = {};
  }

  const socialSites = [
    { key: 'github', name: 'GitHub', icon: '&#x1F4BB;' },
    { key: 'linkedin', name: 'LinkedIn', icon: '&#x1F4BC;' },
    { key: 'email', name: 'Email', icon: '&#x1F4E7;' },
    { key: 'twitter', name: 'Twitter', icon: '&#x1F426;' },
    { key: 'instagram', name: 'Instagram', icon: '&#x1F4F7;' },
    { key: 'facebook', name: 'Facebook', icon: '&#x1F30A;' },
    { key: 'youtube', name: 'YouTube', icon: '&#x25B6;' },
    { key: 'reddit', name: 'Reddit', icon: '&#x1F47B;' },
    { key: 'stackoverflow', name: 'Stack Overflow', icon: '&#x1F4DD;' },
    { key: 'codepen', name: 'CodePen', icon: '&#x270D;' },
    { key: 'dribbble', name: 'Dribbble', icon: '&#x1F3A8;' },
    { key: 'behance', name: 'Behance', icon: '&#x1F3A8;' }
  ];

  container.innerHTML = socialSites.map(site => `
    <div style="display: flex; align-items: center; gap: 15px; padding: 12px; background: var(--bg-secondary); border-radius: 8px; margin-bottom: 10px;">
      <div style="width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; background: rgba(0, 240, 255, 0.1); border-radius: 6px; font-size: 1rem;">
        ${site.icon}
      </div>
      <div style="flex: 1;">
        <label style="color: var(--text-primary); font-size: 0.85rem;">${site.name} Logo</label>
        <div style="display: flex; align-items: center; gap: 8px; margin-top: 5px;">
          ${siteData.socialLogos[site.key] ? `<img src="${siteData.socialLogos[site.key]}" style="width: 24px; height: 24px; border-radius: 4px; object-fit: cover;">` : ''}
          <input type="text" id="logo${site.key}" class="edit-input" style="flex: 1; padding: 8px 12px; font-size: 0.8rem;" placeholder="Enter logo URL" value="${siteData.socialLogos[site.key] || ''}">
          <input type="file" id="uploadLogo${site.key}" accept="image/*" onchange="uploadSocialLogo('${site.key}', event)" style="display: none;">
          <button onclick="document.getElementById('uploadLogo${site.key}').click()" style="padding: 6px 10px; background: rgba(0, 240, 255, 0.15); border: 1px solid rgba(0, 240, 255, 0.3); border-radius: 6px; color: #00f0ff; cursor: pointer; font-size: 0.75rem;">&#x1F4F7;</button>
          ${siteData.socialLogos[site.key] ? `<button onclick="removeSocialLogo('${site.key}')" style="padding: 6px 10px; background: rgba(255, 0, 100, 0.15); border: 1px solid rgba(255, 0, 100, 0.3); border-radius: 6px; color: #ff0064; cursor: pointer; font-size: 0.75rem;">&#x2715;</button>` : ''}
        </div>
      </div>
    </div>
  `).join('');

  container.innerHTML += `
    <button onclick="saveSocialLogos()" style="width: 100%; padding: 12px; background: linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(168, 85, 247, 0.2)); border: 1px solid rgba(0, 240, 255, 0.4); border-radius: 8px; color: #00f0ff; cursor: pointer; font-size: 0.85rem; margin-top: 10px;">&#x1F4BE; Save Logos</button>
  `;
}

function uploadSocialLogo(siteKey, event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    if (!siteData.socialLogos) siteData.socialLogos = {};
    siteData.socialLogos[siteKey] = e.target.result;
    renderSocialLogos();
    showToast('⚠️ Logo শুধু এই browser-এ দেখা যাবে। সব device-এ দেখাতে GitHub raw URL দিন।', 'error');
  };
  reader.readAsDataURL(file);
  event.target.value = '';
}

function removeSocialLogo(siteKey) {
  if (siteData.socialLogos && siteData.socialLogos[siteKey]) {
    delete siteData.socialLogos[siteKey];
    renderSocialLogos();
    showToast('Logo removed!');
  }
}

function saveSocialLogos() {
  const socialSites = ['github', 'linkedin', 'email', 'twitter', 'instagram', 'facebook', 'youtube', 'reddit', 'stackoverflow', 'codepen', 'dribbble', 'behance'];

  if (!siteData.socialLogos) siteData.socialLogos = {};

  socialSites.forEach(site => {
    const input = document.getElementById('logo' + site);
    if (input && input.value.trim()) {
      siteData.socialLogos[site] = input.value.trim();
    }
  });

  localStorage.setItem('portfolioData', JSON.stringify(siteData));
  renderContent();
  showToast('Social logos saved!');
}

function saveStats() {
  siteData.stats.visits = document.getElementById('dashVisits').textContent;
  siteData.stats.growth = document.getElementById('dashGrowth').textContent;
  siteData.stats.projects = document.getElementById('dashProjects').textContent;
  siteData.stats.messages = siteData.messages ? siteData.messages.length.toString() : '0';
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem('portfolioData', JSON.stringify(siteData));
  renderContent();
  showToast('Saved successfully!');
}

// Particles
function createParticles() {
  const container = document.getElementById('particles');
  container.innerHTML = '';
  for (let i = 0; i < 60; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (12 + Math.random() * 12) + 's';
    const colors = ['#00f0ff', '#a855f7', '#6366f1', '#00f0ff', '#a855f7'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = color;
    particle.style.width = (2 + Math.random() * 2) + 'px';
    particle.style.height = particle.style.width;
    container.appendChild(particle);
  }
}

// Scroll animations
function handleScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  elements.forEach(el => observer.observe(el));
}

// Smooth scroll
document.querySelectorAll('.nav-links a, .cta-buttons a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Enter key for login
document.getElementById('password').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') attemptLogin();
});

init();