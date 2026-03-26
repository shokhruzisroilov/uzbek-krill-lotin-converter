# 🚀 Quick Start Guide

## Installation (2 minutes)

### Step 1: Install Dependencies

```bash
npm install
```

This installs:

- Next.js 15 with App Router
- React 19
- TypeScript 5
- TailwindCSS 3.4
- All necessary utilities

### Step 2: Run Development Server

```bash
npm run dev
```

### Step 3: Open Browser

Navigate to: **http://localhost:3000**

✅ Done! The app is running!

---

## 📝 What You Got

### ✨ Complete Features

- ✅ Uzbek Cyrillic ↔ Latin converter
- ✅ Real-time conversion toggle
- ✅ File upload (.txt & .docx)
- ✅ File download as .txt
- ✅ Character counter
- ✅ Copy to clipboard
- ✅ Dark/Light mode
- ✅ Toast notifications
- ✅ Conversion history
- ✅ Auto-save to localStorage
- ✅ Mobile responsive
- ✅ Professional design

### 🎨 Fully Styled

- Clean modern UI
- Rounded inputs/buttons
- Smooth animations
- Dark mode with toggle
- Responsive layout
- Professional shadows & colors

### 🔧 Production Ready

- TypeScript strict mode
- Proper error handling
- Input validation
- Security best practices
- Clean code structure
- Modular components

---

## 📂 File Structure

```
krill-lotin/
├── app/                    ← Next.js pages
├── components/             ← Reusable React components
├── lib/                    ← Core logic & utilities
├── globals.css             ← Tailwind styles
├── tailwind.config.ts      ← Style configuration
├── package.json            ← Dependencies
└── README.md               ← Full documentation
```

---

## 🎯 Key Commands

```bash
# Development
npm run dev                 # Start dev server

# Production
npm run build              # Build for production
npm run start              # Start production server

# Quality
npm run lint               # Check code quality
```

---

## 💡 Tips

### Customize Colors

Edit `tailwind.config.ts`:

```typescript
colors: {
  primary: {
    /* your colors */
  }
}
```

### Add New Pages

Create files in `app/` directory:

```
app/
├── page.tsx        ← Home (already created)
└── about/
    └── page.tsx    ← About page (create this)
```

### Add New Components

Create in `components/` and import:

```tsx
import { MyComponent } from "@/components/MyComponent";
```

---

## 🔄 Conversion Examples

```typescript
import { cyrillicToLatin, latinToCyrillic } from "@/lib/converter";

// Cyrillic to Latin
cyrillicToLatin("Ќирилл"); // → "Kirill"
cyrillicToLatin("Ўзбекча"); // → "O'zbekcha"

// Latin to Cyrillic
latinToCyrillic("Lotin"); // → "Лотин"
latinToCyrillic("Osh"); // → "Ош"
```

---

## 🚀 Deployment

### On Vercel (Easiest)

1. Push code to GitHub
2. Import project to Vercel
3. Click Deploy
4. Done! 🎉

### On Other Platforms

```bash
npm run build     # Creates optimized build
npm run start     # Runs production server
```

---

## ❓ Troubleshooting

### Port Already in Use

```bash
npm run dev -- -p 3001
```

### Clear Cache

```bash
rm -rf .next node_modules
npm install
```

### TypeScript Errors

```bash
npm run build  # Full type checking
```

---

## 📚 Learn More

- `README.md` - Full documentation
- `SETUP.md` - Detailed setup guide
- `PROJECT_SUMMARY.md` - Complete feature list
- Code comments explain complex logic

---

## 🎉 You're Ready!

```bash
npm install && npm run dev
```

Visit http://localhost:3000 and start converting! 🚀

---

Next.js | React | TypeScript | TailwindCSS
