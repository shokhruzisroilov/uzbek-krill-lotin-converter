/**
 * Debounce function to delay execution
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, delay);
  };
}

/**
 * Save text to localStorage
 */
export function saveToLocalStorage(key: string, value: string): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error("Failed to save to localStorage:", error);
    }
  }
}

/**
 * Get text from localStorage
 */
export function getFromLocalStorage(key: string): string | null {
  if (typeof window !== "undefined") {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error("Failed to read from localStorage:", error);
      return null;
    }
  }
  return null;
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      const success = document.execCommand("copy");
      document.body.removeChild(textArea);
      return success;
    }
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    return false;
  }
}

/**
 * Download text as a .txt file
 */
export function downloadAsTextFile(content: string, filename: string): void {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(content),
  );
  element.setAttribute("download", filename);
  element.style.display = "none";
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

/**
 * Extract text from .docx file
 */
export async function extractTextFromDocx(file: File): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const { Document } = await import("docx");

    // For docx parsing, we'll use a simple approach
    // In production, you might want to use a dedicated library
    const text = await extractDocxText(arrayBuffer);
    return text;
  } catch (error) {
    console.error("Failed to extract text from DOCX:", error);
    throw new Error("Failed to read .docx file");
  }
}

/**
 * Helper function to extract text from docx buffer
 */
async function extractDocxText(arrayBuffer: ArrayBuffer): Promise<string> {
  // This is a simplified approach - for production, use a proper docx library
  const bytes = new Uint8Array(arrayBuffer);
  const text = new TextDecoder().decode(bytes);

  // Extract text between XML tags (very basic parsing)
  const matches = text.match(/<a:t>([^<]*)<\/a:t>|<w:t>([^<]*)<\/w:t>/g) || [];
  const extracted = matches
    .map((match) => {
      const content = match
        .replace(/<\/?[aw]:t>/g, "")
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">");
      return content;
    })
    .join("");

  return extracted || text.substring(0, 5000);
}

/**
 * Extract text from .txt file
 */
export async function extractTextFromTxt(file: File): Promise<string> {
  return file.text();
}

/**
 * Validate file type
 */
export function isValidFileType(file: File): boolean {
  const validTypes = [
    "text/plain",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  const validExtensions = [".txt", ".docx"];

  const isValidType = validTypes.includes(file.type);
  const isValidExtension = validExtensions.some((ext) =>
    file.name.toLowerCase().endsWith(ext),
  );

  return isValidType || isValidExtension;
}

/**
 * Validate file size (max 5MB)
 */
export function isValidFileSize(file: File, maxSizeMB: number = 5): boolean {
  const maxBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxBytes;
}
