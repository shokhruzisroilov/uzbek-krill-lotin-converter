"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Copy,
  Download,
  Trash2,
  Upload,
  ArrowRight,
  ArrowLeft,
  BarChart3,
  History,
  FileText,
  Keyboard,
} from "lucide-react";
import { TextArea } from "@/components/TextArea";
import { Button } from "@/components/Button";
import { ToggleSwitch } from "@/components/ToggleSwitch";
import { FileUploader } from "@/components/FileUploader";
import { useToast } from "@/components/ToastContext";
import {
  cyrillicToLatin,
  latinToCyrillic,
  isCyrillic,
  isLatin,
  autoConvert,
  getCharacterCount,
} from "@/lib/converter";
import {
  copyToClipboard,
  downloadAsTextFile,
  saveToLocalStorage,
  getFromLocalStorage,
  debounce,
} from "@/lib/utils";

interface ConversionHistoryItem {
  input: string;
  output: string;
  direction: "cyrillic-to-latin" | "latin-to-cyrillic";
  timestamp: number;
}

export function ConverterPage() {
  const { addToast } = useToast();
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [realTimeEnabled, setRealTimeEnabled] = useState(false);
  const [history, setHistory] = useState<ConversionHistoryItem[]>([]);
  const [fileName, setFileName] = useState<string>("");

  // Load saved input from localStorage on mount
  useEffect(() => {
    const savedInput = getFromLocalStorage("converter-input");
    if (savedInput) {
      setInput(savedInput);
    }
  }, []);

  // Save input to localStorage whenever it changes
  useEffect(() => {
    saveToLocalStorage("converter-input", input);
  }, [input]);

  // Load saved history from localStorage on mount
  useEffect(() => {
    const savedHistory = getFromLocalStorage("converter-history");
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        if (Array.isArray(parsed)) {
          setHistory(parsed);
        }
      } catch (error) {
        console.error("Failed to parse history:", error);
      }
    }
  }, []);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    saveToLocalStorage("converter-history", JSON.stringify(history));
  }, [history]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Enter or Cmd+Enter: Auto-convert
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        if (input.trim()) {
          const converted = autoConvert(input);
          setOutput(converted);
          setHistory((prev) =>
            [
              {
                input,
                output: converted,
                direction: (isCyrillic(input)
                  ? "cyrillic-to-latin"
                  : "latin-to-cyrillic") as
                  | "cyrillic-to-latin"
                  | "latin-to-cyrillic",
                timestamp: Date.now(),
              },
              ...prev,
            ].slice(0, 10),
          );
          addToast("Konvertatsiya qilindi ✓", "success", 2000);
        } else {
          addToast("Iltimos, o'zgartiradigan matn kiriting", "info");
        }
      }
      // Ctrl+Shift+C: Copy result
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "C") {
        e.preventDefault();
        handleCopyResult();
      }
      // Ctrl+K: Clear all
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        handleClear();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [input, addToast]);

  // Auto-convert with debounce when real-time is enabled
  const handleRealTimeConversion = useCallback(
    debounce((text: string) => {
      if (text.trim()) {
        const converted = autoConvert(text);
        setOutput(converted);
        setHistory((prev) =>
          [
            {
              input: text,
              output: converted,
              direction: (isCyrillic(text)
                ? "cyrillic-to-latin"
                : "latin-to-cyrillic") as
                | "cyrillic-to-latin"
                | "latin-to-cyrillic",
              timestamp: Date.now(),
            },
            ...prev,
          ].slice(0, 10),
        );
      }
    }, 300),
    [],
  );

  const handleInputChange = (value: string) => {
    setInput(value);
    if (realTimeEnabled && value.trim()) {
      handleRealTimeConversion(value);
    }
  };

  const handleConvertCyrillicToLatin = () => {
    if (!input.trim()) {
      addToast("Iltimos, o'zgartiradigan matn kiriting", "info");
      return;
    }

    const result = cyrillicToLatin(input);
    setOutput(result);
    setHistory((prev) =>
      [
        {
          input,
          output: result,
          direction: "cyrillic-to-latin" as
            | "cyrillic-to-latin"
            | "latin-to-cyrillic",
          timestamp: Date.now(),
        },
        ...prev,
      ].slice(0, 10),
    );
    addToast("Kirildan Lotinga o'zgartirildi ✓", "success", 2000);
  };

  const handleConvertLatinToCyrillic = () => {
    if (!input.trim()) {
      addToast("Iltimos, o'zgartiradigan matn kiriting", "info");
      return;
    }

    const result = latinToCyrillic(input);
    setOutput(result);
    setHistory((prev) =>
      [
        {
          input,
          output: result,
          direction: "latin-to-cyrillic" as
            | "cyrillic-to-latin"
            | "latin-to-cyrillic",
          timestamp: Date.now(),
        },
        ...prev,
      ].slice(0, 10),
    );
    addToast("Lotindan Kirilga o'zgartirildi ✓", "success", 2000);
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setFileName("");
    addToast("Barcha matn o'chirildi", "info", 1500);
  };

  const handleCopyResult = async () => {
    if (!output.trim()) {
      addToast("Ko'chirish uchun matn yo'q", "info");
      return;
    }

    const success = await copyToClipboard(output);
    if (success) {
      addToast("Nusxa olindi ✓", "success", 2000);
    } else {
      addToast("Ko'chirishda xato", "error");
    }
  };

  const handleDownload = () => {
    if (!output.trim()) {
      addToast("Yuklab olish uchun matn yo'q", "info");
      return;
    }

    const filename = fileName ? fileName.replace(/\.[^/.]+$/, "") : "converted";
    downloadAsTextFile(output, `${filename}_converted.txt`);
    addToast("Fayl yuklab olindi ✓", "success", 2000);
  };

  const handleFileSelected = (text: string, filename: string) => {
    setInput(text);
    setFileName(filename);
    addToast(`Fayl yuklandi: ${filename} ✓`, "success", 2000);

    if (realTimeEnabled) {
      const converted = autoConvert(text);
      setOutput(converted);
    }
  };

  const handleHistoryItemClick = (item: ConversionHistoryItem) => {
    setInput(item.input);
    setOutput(item.output);
    addToast("Konvertatsiya qayta yuklandi ✓", "success", 1500);
  };

  const inputCharCount = getCharacterCount(input);
  const outputCharCount = getCharacterCount(output);

  return (
    <div className="w-3/5 max-w-full mx-auto p-1 sm:p-2 lg:p-3">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-2">
          🔄 Kiril Lotin Konvertor
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          O‘zbek matni va fayllarni Kiril va Lotin yozuvlari o‘rtasida tez va
          oson konvertatsiya qiling. Matn kiriting yoki fayl yuklang — natijani
          darhol ko‘ring.
        </p>
      </div>

      {/* File Uploader */}
      <div className="mb-6">
        <FileUploader onFileSelected={handleFileSelected} />
      </div>

      {/* Real-time Conversion Toggle */}
      <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
        <ToggleSwitch
          checked={realTimeEnabled}
          onChange={setRealTimeEnabled}
          label="Real vaqtda konvertatsiya (yo‘nalishni avtomatik aniqlash)"
        />
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          {realTimeEnabled
            ? "Siz yozganingiz sari matn avtomatik konvertatsiya qilinadi..."
            : "Tezkor konvertatsiya uchun yoqing"}
        </p>
      </div>

      {/* Main Content */}
      <div className="flex gap-2 mb-6">
        {/* Input */}
        <div className="w-1/2">
          <TextArea
            label="Kirish matni"
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder="Kiril yoki Lotin matni kiriting..."
            characterCount={inputCharCount}
          />
        </div>

        {/* Output */}
        <div className="w-1/2">
          <TextArea
            label="Chiqish matni"
            value={output}
            readOnly
            placeholder="Konvertatsiya qilingan matn shu yerda ko‘rinadi..."
            characterCount={outputCharCount}
          />
        </div>
      </div>

      {/* Conversion Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
        <Button
          onClick={handleConvertCyrillicToLatin}
          variant="primary"
          className="w-full inline-flex items-center justify-center gap-2"
        >
          <ArrowRight size={20} />
          Kiril → Lotin
        </Button>
        <Button
          onClick={handleConvertLatinToCyrillic}
          variant="primary"
          className="w-full inline-flex items-center justify-center gap-2"
        >
          Lotin → Kiril
          <ArrowLeft size={20} />
        </Button>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
        <Button
          onClick={handleCopyResult}
          variant="success"
          className="w-full inline-flex items-center justify-center gap-2"
        >
          <Copy size={18} />
          Nusxalash
        </Button>
        <Button
          onClick={handleDownload}
          variant="success"
          className="w-full inline-flex items-center justify-center gap-2"
        >
          <Download size={18} />
          Yuklab olish
        </Button>
        <Button
          onClick={handleClear}
          variant="danger"
          className="w-full inline-flex items-center justify-center gap-2"
        >
          <Trash2 size={18} />
          O'chirish
        </Button>
      </div>

      {/* File Name Display */}
      {fileName && (
        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg mb-6 flex items-center gap-3">
          <FileText className="text-blue-600 dark:text-blue-400" size={20} />
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span className="font-medium">{fileName}</span> fayli bilan
            ishlanmoqda
          </p>
        </div>
      )}

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3
              size={18}
              className="text-primary-600 dark:text-primary-400"
            />
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              Kirish statistikasi
            </h3>
          </div>
          <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
            {inputCharCount}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            belgi (bo‘sh joylar hisobga olinmagan)
          </p>
        </div>

        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3
              size={18}
              className="text-primary-600 dark:text-primary-400"
            />
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
              Chiqish statistikasi
            </h3>
          </div>
          <p className="text-3xl font-bold text-primary-600 dark:text-primary-400">
            {outputCharCount}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            belgi (bo'sh joylar hisob qilinmadi)
          </p>
        </div>
      </div>

      {/* History */}
      {history.length > 0 && (
        <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <History size={20} className="text-gray-900 dark:text-white" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              So'nggi konvertatsiyalar
            </h3>
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {history.map((item) => (
              <div
                key={item.timestamp}
                onClick={() => handleHistoryItemClick(item)}
                className="p-3 bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors cursor-pointer"
              >
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 font-medium">
                  {item.direction === "cyrillic-to-latin"
                    ? "Kiril → Lotin"
                    : "Lotin → Kiril"}
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                  {item.input}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 truncate mt-1">
                  → {item.output}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Hints */}
      <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <div className="text-xs text-gray-600 dark:text-gray-400 space-y-2">
          <p className="font-medium text-gray-700 dark:text-gray-300 mb-3">
            ⌨️ Klaviatura yorliqlari:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
              <Keyboard
                size={16}
                className="text-primary-600 dark:text-primary-400 flex-shrink-0"
              />
              <span>
                <span className="font-medium">Ctrl+Enter</span> - Avtomatik
                konvertatsiya
              </span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
              <Copy
                size={16}
                className="text-primary-600 dark:text-primary-400 flex-shrink-0"
              />
              <span>
                <span className="font-medium">Ctrl+Shift+C</span> - Nusxalash
              </span>
            </div>
            <div className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
              <Trash2
                size={16}
                className="text-primary-600 dark:text-primary-400 flex-shrink-0"
              />
              <span>
                <span className="font-medium">Ctrl+K</span> - O'chirish
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
