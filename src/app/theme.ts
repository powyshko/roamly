
import type { GlobalThemeOverrides } from "naive-ui";

export const themeOverrides: GlobalThemeOverrides = {
  common: {
    // Primary — Sage
    primaryColor: "var(--color-sage-600)",
    primaryColorHover: "var(--color-sage-500)",
    primaryColorPressed: "var(--color-sage-700)",
    primaryColorSuppl: "var(--color-sage-600)",

    // Info — Ocean
    infoColor: "var(--color-ocean-600)",
    infoColorHover: "var(--color-ocean-500)",
    infoColorPressed: "var(--color-ocean-700)",

    // Success — Sage
    successColor: "var(--color-sage-600)",
    successColorHover: "var(--color-sage-500)",
    successColorPressed: "var(--color-sage-700)",

    // Warning — Terracotta
    warningColor: "var(--color-terracotta-500)",
    warningColorHover: "var(--color-terracotta-400)",
    warningColorPressed: "var(--color-terracotta-600)",

    // Error
    errorColor: "var(--color-error-500)",
    errorColorHover: "var(--color-error-400)",
    errorColorPressed: "var(--color-error-600)",

    borderRadius: "8px",
  },

  // Buttons
  Button: {
    borderRadiusMedium: "8px",
    borderRadiusSmall: "6px",
    borderRadiusLarge: "10px",
  },

  // Input
  Input: {
    border: "1px solid var(--color-border)",
    borderHover: "1px solid var(--color-sage-600)",
    borderFocus: "1px solid var(--color-sage-600)",
    boxShadowFocus: "0 0 0 2px var(--color-sage-50)",
    caretColor: "var(--color-sage-600)",
  },

  // Input number
  InputNumber: {
    border: "1px solid var(--color-border)",
    borderHover: "1px solid var(--color-sage-600)",
    borderFocus: "1px solid var(--color-sage-600)",
    boxShadowFocus: "0 0 0 2px var(--color-sage-50)",
    caretColor: "var(--color-sage-600)",
  },

  // Select
  Select: {
    peers: {
      InternalSelection: {
        border: "1px solid var(--color-border)",
        borderHover: "1px solid var(--color-sage-600)",
        borderActive: "1px solid var(--color-sage-600)",
        boxShadowActive: "0 0 0 2px var(--color-sage-50)",
      },
    },
  },

  // Card
  Card: {
    color: "var(--color-surface)",
    colorModal: "var(--color-surface)",
    colorPopover: "var(--color-surface)",
    textColor: "var(--color-text-primary)",
    titleTextColor: "var(--color-text-primary)",
    borderColor: "var(--color-border)",
    borderRadius: "10px",
  },

  // Dropdown
  Dropdown: {
    color: "var(--color-surface)",
    optionColorHover: "var(--color-sage-50)",
    optionTextColor: "var(--color-text-primary)",
    optionTextColorHover: "var(--color-sage-900)",
    optionCheckColor: "var(--color-sage-600)",
    dividerColor: "var(--color-border)",
    borderRadius: "8px",
  },

  // Modal
  Modal: {
    color: "var(--color-surface)",
    textColor: "var(--color-text-primary)",
    titleTextColor: "var(--color-text-primary)",
    borderRadius: "12px",
  },
};
