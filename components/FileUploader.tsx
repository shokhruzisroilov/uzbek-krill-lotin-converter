"use client";

import { useRef, useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { Button } from "./Button";
import {
  isValidFileType,
  isValidFileSize,
  extractTextFromTxt,
  extractTextFromDocx,
} from "@/lib/utils";

interface FileUploaderProps {
  onFileSelected: (text: string, filename: string) => void;
  loading?: boolean;
}

export function FileUploader({
  onFileSelected,
  loading = false,
}: FileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setIsProcessing(true);

    try {
      // Validate file
      if (!isValidFileType(file)) {
        setError(".txt yoki .docx faylini yuklang");
        return;
      }

      if (!isValidFileSize(file)) {
        setError("Fayl o'lchami 5MB dan kam bo'lishi kerak");
        return;
      }

      // Extract text based on file type
      let text: string;
      if (file.type === "text/plain" || file.name.endsWith(".txt")) {
        text = await extractTextFromTxt(file);
      } else if (
        file.type ===
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
        file.name.endsWith(".docx")
      ) {
        text = await extractTextFromDocx(file);
      } else {
        setError("Noma'lum fayl turi");
        return;
      }

      if (!text.trim()) {
        setError("Fayl bo'sh");
        return;
      }

      onFileSelected(text, file.name);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Faylni o'qishda xato");
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="w-full">
      <input
        ref={fileInputRef}
        type="file"
        accept=".txt,.docx"
        onChange={handleFileChange}
        className="hidden"
        disabled={loading || isProcessing}
      />
      <Button
        onClick={() => fileInputRef.current?.click()}
        variant="secondary"
        loading={isProcessing}
        disabled={loading || isProcessing}
        className="w-full inline-flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            Yuklanmoqda...
          </>
        ) : (
          <>
            <Upload size={18} />
            Faylni yuklash (.txt yoki .docx)
          </>
        )}
      </Button>
      {error && (
        <p className="mt-2 text-xs text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}
