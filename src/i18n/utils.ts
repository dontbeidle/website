import { ui, defaultLang } from "./ui";

export type Lang = keyof typeof ui;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]): string {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export function getLocalePath(lang: Lang, path: string = ""): string {
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  if (lang === defaultLang) {
    return cleanPath ? `/${cleanPath}` : "/";
  }
  return cleanPath ? `/${lang}/${cleanPath}` : `/${lang}`;
}

export function getSwitchLangPath(currentLang: Lang, currentPath: string): string {
  const targetLang = currentLang === "kaa" ? "en" : "kaa";

  let pathWithoutLang = currentPath;
  if (currentLang !== defaultLang) {
    pathWithoutLang = currentPath.replace(`/${currentLang}`, "") || "/";
  }

  return getLocalePath(targetLang, pathWithoutLang === "/" ? "" : pathWithoutLang);
}
