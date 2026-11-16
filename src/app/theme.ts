import type { GlobalThemeOverrides } from 'naive-ui';

export const themeOverrides: GlobalThemeOverrides = {
  common: {
    // Primary — Sage
    primaryColor: '#64765c',
    primaryColorHover: '#788a70',
    primaryColorPressed: '#52634b',
    primaryColorSuppl: '#64765c',

    // Info — Ocean
    infoColor: '#64877d',
    infoColorHover: '#78968d',
    infoColorPressed: '#526f66',

    // Success — Sage
    successColor: '#64765c',
    successColorHover: '#788a70',
    successColorPressed: '#52634b',

    // Warning — Terracotta
    warningColor: '#c77b5b',
    warningColorHover: '#d18e70',
    warningColorPressed: '#ad6549',

    // Error
    errorColor: '#b85c50',
    errorColorHover: '#ca7165',
    errorColorPressed: '#a54a40',

    borderRadius: '8px',
  },

  // Buttons
  Button: {
    borderRadiusMedium: '8px',
    borderRadiusSmall: '6px',
    borderRadiusLarge: '10px',
  },

  // Input
  Input: {
    border: '1px solid var(--color-border)',
    borderHover: '1px solid var(--color-sage-600)',
    borderFocus: '1px solid var(--color-sage-600)',
    boxShadowFocus: '0 0 0 2px var(--color-sage-50)',
    caretColor: 'var(--color-sage-600)',
  },

  // Input number
  InputNumber: {
    border: '1px solid var(--color-border)',
    borderHover: '1px solid var(--color-sage-600)',
    borderFocus: '1px solid var(--color-sage-600)',
    boxShadowFocus: '0 0 0 2px var(--color-sage-50)',
    caretColor: 'var(--color-sage-600)',
  },

  // Select
  Select: {
    peers: {
      InternalSelection: {
        border: '1px solid var(--color-border)',
        borderHover: '1px solid var(--color-sage-600)',
        borderActive: '1px solid var(--color-sage-600)',
        boxShadowActive: '0 0 0 2px var(--color-sage-50)',
      },
    },
  },

  // Card
  Card: {
    color: 'var(--color-surface)',
    colorModal: 'var(--color-surface)',
    colorPopover: 'var(--color-surface)',
    textColor: 'var(--color-text-primary)',
    titleTextColor: 'var(--color-text-primary)',
    borderColor: 'var(--color-border)',
    borderRadius: '10px',
  },

  // Dropdown
  Dropdown: {
    color: 'var(--color-surface)',
    optionColorHover: 'var(--color-sage-50)',
    optionTextColor: 'var(--color-text-primary)',
    optionTextColorHover: 'var(--color-sage-900)',
    optionCheckColor: 'var(--color-sage-600)',
    dividerColor: 'var(--color-border)',
    borderRadius: '8px',
  },

  // Modal
  Modal: {
    color: 'var(--color-surface)',
    textColor: 'var(--color-text-primary)',
    titleTextColor: 'var(--color-text-primary)',
    borderRadius: '12px',
  },
};
