---
inclusion: always
---

# Technical Stack

## Core Technologies

- **HTML5**: Semantic markup with accessibility attributes
- **Vanilla JavaScript (ES6+)**: No frameworks or build tools
- **CSS3**: Custom properties (CSS variables) with design system
- **localStorage API**: Client-side data persistence

## Key Libraries & Resources

- **Google Fonts**: Inter font family (weights 400, 500, 600, 700)
- No external JavaScript libraries or frameworks

## Design System

The project uses a CSS custom properties-based design system with:
- HSL color values for easy theming
- Dark mode support (defined but not actively used)
- Responsive breakpoints: 640px, 768px, 1024px
- Mobile-first approach

## Browser APIs Used

- localStorage for data persistence
- Clipboard API for copy functionality
- Vibration API for haptic feedback (mobile)
- Service Worker support (prepared but not implemented)

## Development Workflow

### Running the Application

Simply open `index.html` in a web browser. No build process required.

### Testing

- Test in multiple browsers (Chrome, Firefox, Safari, Edge)
- Test on mobile devices for touch interactions
- Test with reduced motion preferences
- Test with high contrast mode

### Deployment

Static files can be deployed to any web server or hosting service:
- GitHub Pages
- Netlify
- Vercel
- Any static file hosting

## Code Conventions

- Use Portuguese for user-facing text and comments
- Use camelCase for JavaScript variables and functions
- Use kebab-case for CSS classes and IDs
- Prefix group IDs with `grupo_` for uniqueness
