# 🔄 Uzbek Text Converter

A modern, professional web application for converting Uzbek text between Cyrillic and Latin scripts. Built with Next.js, TypeScript, and TailwindCSS.

## ✨ Features

### Core Functionality

- **Bidirectional Conversion**: Seamlessly convert between Cyrillic (Крилл) and Latin (Lotin) Uzbek text
- **Auto-Detection**: Automatically detects text direction and converts accordingly
- **Real-time Conversion**: Toggle real-time conversion with instant updates
- **File Support**: Upload .txt and .docx files for conversion

### Uzbek-Specific Features

- **Correct Character Mapping**: Properly handles Uzbek special characters:
  - `ғ` ↔ `g'` (voiced pharyngeal fricative)
  - `ў` ↔ `u'` (labial approximant)
  - `ш` ↔ `sh` (voiceless postalveolar fricative)
  - `ч` ↔ `ch` (voiceless postalveolar affricate)
  - `ң` ↔ `ng` (velar nasal)
- **Punctuation Preservation**: Maintains all punctuation and formatting

### User Experience

- **Modern Design**: Clean, professional UI with smooth animations
- **Dark Mode**: Full dark mode support with system preference detection
- **Responsive Layout**: Mobile-first design that works on all devices
- **Toast Notifications**: Real-time feedback for actions
- **Character Count**: Live character count for both input and output
- **Conversion History**: Track recent conversions
- **Local Storage**: Auto-saves last input for convenience
- **Copy & Download**: One-click copy to clipboard and file download

### Technical Excellence

- **TypeScript**: Fully type-safe implementation
- **React Hooks**: Modern functional components with hooks
- **Next.js 15**: Latest App Router architecture
- **TailwindCSS**: Utility-first CSS framework
- **No External UI Libraries**: Pure component implementation
- **Debounced Real-time Conversion**: Optimized performance with debouncing
- **File Processing**: Safe file upload with validation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone or navigate to the project directory:**

```bash
cd uzbek-krill-lotin-converter
```

2. **Install dependencies:**

```bash
npm install
# or
yarn install
```

3. **Start the development server:**

```bash
npm run dev
# or
yarn dev
```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Project Structure

```
krill-lotin/
├── app/
│   ├── layout.tsx          # Root layout with providers
│   └── page.tsx            # Home page
├── components/
│   ├── Button.tsx          # Reusable button component
│   ├── TextArea.tsx        # Reusable textarea component
│   ├── ToggleSwitch.tsx    # Reusable toggle switch
│   ├── FileUploader.tsx    # File upload component
│   ├── ConverterPage.tsx   # Main converter logic
│   ├── ToastContext.tsx    # Toast notification context
│   ├── ToastContainer.tsx  # Toast display container
│   └── ThemeProvider.tsx   # Dark mode provider
├── lib/
│   ├── converter.ts        # Cyrillic ↔ Latin conversion logic
│   └── utils.ts            # Helper functions (debounce, localStorage, etc.)
├── globals.css             # Global styles + TailwindCSS directives
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
├── next.config.ts          # Next.js configuration
├── postcss.config.js       # PostCSS configuration
└── package.json            # Dependencies and scripts
```

## 🎨 Component Architecture

### Reusable Components

#### Button

```tsx
<Button variant="primary" size="md" loading={false}>
  Click me
</Button>
```

**Variants**: primary, secondary, danger, success
**Sizes**: sm, md, lg

#### TextArea

```tsx
<TextArea
  label="Input"
  value={value}
  onChange={handleChange}
  characterCount={count}
  placeholder="Enter text..."
/>
```

#### ToggleSwitch

```tsx
<ToggleSwitch checked={enabled} onChange={setEnabled} label="Enable feature" />
```

#### FileUploader

```tsx
<FileUploader
  onFileSelected={(text, filename) => handleFile(text, filename)}
  loading={false}
/>
```

## 🔤 Conversion Reference

### Cyrillic to Latin

| Cyrillic | Latin |
| -------- | ----- |
| А/а      | A/a   |
| Ғ/ғ      | G'/g' |
| Ў/ў      | U'/u' |
| Ш/ш      | Sh/sh |
| Ч/ч      | Ch/ch |
| Ң/ң      | Ng/ng |

Full mapping available in `lib/converter.ts`

## 🛠️ Built-in Functions

### Converter API

```typescript
import {
  cyrillicToLatin,
  latinToCyrillic,
  autoConvert,
  isCyrillic,
  isLatin,
  getCharacterCount,
} from "@/lib/converter";

// Convert Cyrillic to Latin
const result = cyrillicToLatin("Ҳалқаро"); // "Haqkaro"

// Convert Latin to Cyrillic
const result = latinToCyrillic("Yoshlik"); // "Ёшлик"

// Auto-detect and convert
const result = autoConvert("Ўзбекча"); // "O'zbekcha"
```

### Utility Functions

```typescript
import {
  debounce,
  saveToLocalStorage,
  getFromLocalStorage,
  copyToClipboard,
  downloadAsTextFile,
  extractTextFromTxt,
  extractTextFromDocx,
  isValidFileType,
  isValidFileSize,
} from "@/lib/utils";
```

## 🎯 Build and Deploy

### Build for Production

```bash
npm run build
npm run start
```

### Deployment Options

- **Vercel** (Recommended): `git push` to deploy automatically
- **Netlify**: Connect repository for automatic deployment
- **Docker**: Create a Dockerfile for containerization
- **Self-hosted**: Build and run on your own server

## 🌙 Dark Mode

Dark mode is automatically enabled based on system preferences. Users can toggle manually using the theme button in the top-right corner.

## 📱 Responsive Design

- **Mobile**: Optimized for screens 320px and up
- **Tablet**: Enhanced layout for 768px and up
- **Desktop**: Full-featured experience for 1024px and up

## ⌨️ Keyboard Shortcuts (Future Enhancement)

Potential shortcuts to implement:

- `Ctrl+Enter`: Convert
- `Ctrl+Shift+L`: Clear
- `Ctrl+C` (on output): Copy

## 🐛 Troubleshooting

### Issue: Characters not converting correctly

- Ensure you're using valid Uzbek characters
- Check that the text isn't a mix of multiple scripts
- Try the auto-convert feature

### Issue: File upload fails

- Ensure file is .txt or .docx
- Check file size is under 5MB
- Try converting the file to UTF-8 encoding

### Issue: Dark mode not working

- Clear browser cache and localStorage
- Check if browser supports CSS media queries
- Ensure JavaScript is enabled

## 📝 License

MIT License - Feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## 📧 Support

For questions or support, please create an issue in the repository.

---

**Built with ❤️ for the Uzbek community**
