export type Theme = {
  primary: string;
  secondary: string;
  success: string;
  error: string;
  background: string;
  surface: string;
  text: string;
};

export const themeKeys: Array<keyof Theme> = [
  "primary",
  "secondary",
  "success",
  "error",
  "background",
  "surface",
  "text",
];

// PUBLIC_INTERFACE
export function applyCssVariables(theme: Theme) {
  /** Apply runtime CSS variables for theme colors (optional enhancement). */
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.style.setProperty("--color-primary", theme.primary);
  root.style.setProperty("--color-secondary", theme.secondary);
  root.style.setProperty("--color-success", theme.success);
  root.style.setProperty("--color-error", theme.error);
  root.style.setProperty("--color-background", theme.background);
  root.style.setProperty("--color-surface", theme.surface);
  root.style.setProperty("--color-text", theme.text);
}
