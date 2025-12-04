---
inclusion: always
---

# Project Structure

## File Organization

```
/
├── index.html          # Main HTML structure
├── script.js           # Application logic
├── style.css           # Styles and design system
├── .gitattributes      # Git configuration
└── .kiro/              # Kiro AI assistant configuration
    └── steering/       # AI guidance documents
```

## Architecture Pattern

**Single-Page Application (SPA)** with vanilla JavaScript:
- No routing or state management libraries
- Direct DOM manipulation
- Event-driven architecture
- Component-like structure using functions

## Code Organization in script.js

### Global State
- `grupoIdCounter`: Unique ID generator
- `grupoIcons`: Array of emoji icons for groups
- `cardColors`: Array of CSS color classes
- `colorCounter`, `iconCounter`: Rotation counters
- `historicoSorteios`: Array storing lottery history

### Core Functions

**Group Management**
- `criarGrupo()`: Creates a new lottery group
- `adicionarGrupo()`: Prompts user and adds group
- `excluirGrupo()`: Removes a group with confirmation
- `gerarIdGrupo()`: Generates unique group IDs

**Lottery Logic**
- `realizarSorteio()`: Main lottery execution
- `executarSorteio()`: Performs the actual number drawing
- `iniciarContadorRegressivo()`: Countdown timer before reveal

**Data Persistence**
- `salvarDados()`: Saves state to localStorage
- `carregarDados()`: Restores state from localStorage
- `limparTudo()`: Clears all data

**History & Sharing**
- `atualizarHistorico()`: Updates history display
- `atualizarTextoCopia()`: Formats results for sharing
- `copiarResultados()`: Copies results to clipboard

**Security & Validation**
- `sanitizeInput()`: Prevents XSS attacks
- `validateNumberInput()`: Validates number format

**UI Feedback**
- `mostrarNotificacao()`: Toast notifications
- `adicionarCelebracao()`: Celebration animations

## CSS Architecture

### Design Tokens
- CSS custom properties in `:root` for light theme
- `.dark` class for dark theme (prepared)
- HSL color format for easy manipulation

### Component Styles
- `.container`: Main wrapper
- `.grupo`: Individual lottery group card
- `.card-container`, `.card`: Flip animation system
- `.button-group`: Flexible button layout
- `.history-section`: Results history
- `.copy-section`: Share functionality
- `.notification`: Toast messages

### Responsive Design
- Mobile-first base styles
- Progressive enhancement at breakpoints
- Touch-friendly minimum sizes (44px)
- Flexible layouts with flexbox

## HTML Structure

- Semantic HTML5 elements
- Accessibility attributes (ARIA labels)
- Meta tags for mobile optimization
- Portuguese language attribute (`lang="pt-BR"`)
