# Installation & Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages:

- Next.js 15 (with App Router)
- React 19
- TypeScript 5
- TailwindCSS 3.4
- Additional utilities (docx parser)

### 2. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
npm run start
```

## Project Files Overview

### Configuration Files

- **package.json** - Dependencies and scripts
- **tsconfig.json** - TypeScript configuration with path aliases
- **next.config.ts** - Next.js configuration
- **tailwind.config.ts** - Tailwind theme configuration
- **postcss.config.js** - PostCSS plugins for Tailwind
- **.eslintrc.json** - ESLint rules for code quality
- **.npmrc** - NPM configuration
- **.gitignore** - Git ignore patterns

### Core Application Files

#### App Directory (Next.js 15 App Router)

- **app/layout.tsx** - Root layout with providers (ToastProvider, ThemeProvider)
- **app/page.tsx** - Home page that renders ConverterPage component

#### Components (`/components`)

- **Button.tsx** - Reusable button with variants and sizes
- **TextArea.tsx** - Reusable textarea with character count
- **ToggleSwitch.tsx** - Switch component for features
- **FileUploader.tsx** - File upload handler for .txt and .docx
- **ConverterPage.tsx** - Main converter logic and UI
- **ToastContext.tsx** - Toast notification context provider
- **ToastContainer.tsx** - Toast display component
- **ThemeProvider.tsx** - Dark mode toggle and management
- **index.ts** - Barrel export for clean imports

#### Libraries (`/lib`)

- **converter.ts** - Uzbek Cyrillic ↔ Latin conversion logic
- **utils.ts** - Helper functions (clipboard, localStorage, debounce, file handling)
- **index.ts** - Barrel export

#### Styles

- **globals.css** - Global TailwindCSS directives and custom components

#### Documentation

- **README.md** - Complete project documentation

## Key Features Implementation

### 1. Text Conversion

The `lib/converter.ts` module provides:

- `cyrillicToLatin()` - Convert Uzbek Cyrillic to Latin
- `latinToCyrillic()` - Convert Latin to Uzbek Cyrillic
- `autoConvert()` - Auto-detect and convert
- `isCyrillic()` / `isLatin()` - Text detection

### 2. Real-time Conversion

Implemented using:

- React `useState` for state management
- `debounce` utility (300ms) for performance
- Auto-detection of text direction

### 3. File Upload

Supports:

- `.txt` files via `extractTextFromTxt()`
- `.docx` files via `extractTextFromDocx()`
- File validation (type, size)
- Error handling and user feedback

### 4. Local Storage

- Auto-saves input text to `converter-input` key
- Loads on page refresh
- Error handling for quota exceeded

### 5. Dark Mode

- System preference detection
- Manual toggle button (top-right)
- Persisted in localStorage
- CSS custom properties for seamless switching

### 6. Toast Notifications

- Context-based API: `useToast()`
- Types: success, error, info
- Auto-dismiss with customizable duration
- Fixed bottom-right position

### 7. Character Counting

- Excludes whitespace
- Real-time update
- Display for input and output

## Component Usage Examples

### Using the Converter Hook

```tsx
import { useToast } from "@/components/ToastContext";

function MyComponent() {
  const { addToast } = useToast();

  const handleClick = () => {
    addToast("Success!", "success", 3000);
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

### Using Converter Functions

```tsx
import { cyrillicToLatin, latinToCyrillic } from "@/lib/converter";

const latin = cyrillicToLatin("Ўзбекча"); // "O'zbekcha"
const cyrillic = latinToCyrillic("Yoshlik"); // "Ёшлик"
```

### Using Utility Functions

```tsx
import { copyToClipboard, debounce } from "@/lib/utils";

// Copy to clipboard
await copyToClipboard("Text to copy");

// Debounce a function
const debouncedSearch = debounce((query) => {
  // Search logic
}, 500);
```

## Styling with TailwindCSS

### Custom Utility Classes (from globals.css)

- `.smooth-transition` - Smooth animation transitions
- `.input-base` - Base input styling
- `.button-base` - Base button styling

### Dark Mode

- Add `dark:` prefix to TailwindCSS classes
- Example: `bg-white dark:bg-gray-900`

### Responsive Design

- `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px)
- Mobile-first approach

## Environment Variables (Optional)

Create `.env.local` for custom configuration:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Performance Optimizations

1. **Debouncing** - Real-time conversion uses 300ms debounce
2. **Code Splitting** - Next.js automatic code splitting
3. **Image Optimization** - Next.js Image component ready
4. **CSS Minification** - TailwindCSS production mode
5. **Component Memoization** - Ready for React.memo() when needed

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

## Troubleshooting

### Port already in use

```bash
npm run dev -- -p 3001
```

### Clear cache and rebuild

```bash
rm -rf .next node_modules
npm install
npm run build
```

### TypeScript errors

```bash
npm run build  # Full type checking
```

## Next Steps

1. **Customize** - Modify colors in `tailwind.config.ts`
2. **Add Features** - Create new components in `/components`
3. **Deploy** - Push to GitHub and deploy on Vercel
4. **Test** - Add tests using Jest/Vitest
5. **Analytics** - Integrate Google Analytics or similar

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [TailwindCSS Documentation](https://tailwindcss.com)

---

Happy converting! 🎉
