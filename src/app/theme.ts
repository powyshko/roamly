
import type { GlobalThemeOverrides } from "naive-ui";

export const themeOverrides: GlobalThemeOverrides = {
  common: {
    // Primary — Sage
    primaryColor: "var(--color-sage-600)",
    primaryColorHover: "#788A70",
    primaryColorPressed: "var(--color-sage-900)",
    primaryColorSuppl: "var(--color-sage-600)",

    // Info — Ocean
    infoColor: "var(--color-ocean-600)",
    infoColorHover: "#78968D",
    infoColorPressed: "#526F66",

    // Success — Sage
    successColor: "var(--color-sage-600)",
    successColorHover: "#788A70",
    successColorPressed: "var(--color-sage-900)",

    // Warning — Terracotta
    warningColor: "var(--color-terracotta-500)",
    warningColorHover: "#D18E70",
    warningColorPressed: "#AD6549",

    // Error
    errorColor: "#B85C50",
    errorColorHover: "#CA7165",
    errorColorPressed: "#A54A40",

    borderRadius: "8px",
  },

  Button: {
    borderRadiusMedium: "8px",
    borderRadiusSmall: "6px",
    borderRadiusLarge: "10px",
  },
};
