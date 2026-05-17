# Portfolio Website Specification

## Project Overview
- **Type**: Single-page portfolio website
- **Core functionality**: Showcase skills, projects, and contact info for a software developer
- **Target users**: Potential employers, clients, collaborators
- **Design theme**: Futuristic, elegant, dark mode with neon accents

## Visual Specification

### Color Palette
- **Background**: Deep space black (#050508) to dark blue (#0a0a15)
- **Primary accent**: Cyan (#00f0ff)
- **Secondary accent**: Magenta/purple (#ff00aa)
- **Tertiary**: Electric blue (#0066ff)
- **Text primary**: Off-white (#e8e8f0)
- **Text secondary**: Muted gray (#8888aa)

### Typography
- **Headings**: "Orbitron" (futuristic, geometric)
- **Body**: "Exo 2" (clean, modern, readable)
- **Code/tech**: "JetBrains Mono" (monospace for tech elements)

### Layout Sections
1. **Hero** - Full viewport intro with animated text, name, title
2. **About** - Brief bio with floating tech icons
3. **Skills** - Animated skill bars or categorized tech tags
4. **Projects** - Card grid with hover effects showing project details
5. **Experience** - Timeline of work history
6. **Contact** - Contact form or social links with glowing buttons
7. **Footer** - Minimal with copyright

### Visual Effects
- Floating particles background (subtle, not distracting)
- Glowing text effects on hover
- Smooth scroll behavior
- Glassmorphism cards with backdrop blur
- Gradient borders and subtle animations
- Grid pattern overlay (subtle)
- Scanline or matrix-style decorative elements

### Responsive
- Mobile: Single column, stacked
- Tablet: 2 columns where appropriate
- Desktop: Full multi-column layout

## Content Structure

### Hero Section
- Name: "Your Name"
- Title: "Software Engineer | Developer | Programmer"
- Tagline with typewriter or fade effect
- CTA buttons: "View Projects" and "Contact Me"

### About Section
- 2-3 sentences about professional background
- Key highlights (years experience, focus areas)

### Skills Section
Categories:
- Languages: Python, JavaScript, TypeScript, C++, Java, etc.
- Frontend: React, Vue, Angular, HTML/CSS
- Backend: Node.js, Python/Django, APIs
- Tools: Git, Docker, AWS, Linux

### Projects Section (4-6 projects)
- Project name
- Tech stack used
- Brief description
- Links to demo/repo (placeholder)

### Experience Section
- Job title, company, duration
- Key responsibilities/achievements

### Contact Section
- Email address
- LinkedIn, GitHub, Twitter links
- Optional: Simple contact form

## Acceptance Criteria
1. All sections render correctly on desktop and mobile
2. Animations are smooth (60fps)
3. All fonts load from Google Fonts
4. No broken images or resources
5. Navigation works (scroll to sections)
6. Hover effects work on interactive elements
7. Page loads without console errors