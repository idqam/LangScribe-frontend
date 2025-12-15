import { franc } from "franc-min";

export const detectLanguage = (text: string): "en" | "es" => {
  // 1. Spanish overrides for specific characters
  const spanishChars = ["á", "é", "í", "ó", "ú", "ñ", "ü", "¿", "¡"];
  if (spanishChars.some((char) => text.includes(char))) {
    return "es";
  }

  // 2. Use franc-min
  const detected = franc(text);

  // 3. Return 'es' if detected, otherwise default to 'en'
  if (detected === "spa") {
    return "es";
  }

  return "en";
};
