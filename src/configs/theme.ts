import { createSystem, defaultConfig } from "@chakra-ui/react";

const defaultFontFamily =
  "-apple-system,BlinkMacSystemFont,Segoe UI,Inter,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji";

export const customTheme = createSystem(defaultConfig, {
  globalCss: {
    "html, body": {
      scrollBehavior: "smooth"
    }
  },
  theme: {
    tokens: {
      fonts: {
        heading: { value: defaultFontFamily },
        body: { value: defaultFontFamily }
      },
      fontWeights: {
        bold: { value: 600 }
      },
      colors: {
        blue: {
          50: { value: "#e6fffa" },
          100: { value: "#b2f5ea" },
          200: { value: "#81e6d9" },
          300: { value: "#4fd1c5" },
          400: { value: "#38b2ac" },
          500: { value: "#319795" },
          600: { value: "#2c7a7b" },
          700: { value: "#285e61" },
          800: { value: "#234e52" },
          900: { value: "#1d4044" }
        }
      }
    },
    semanticTokens: {
      colors: {
        "chakra-border-color": { value: "{colors.gray.300}" }
      }
    }
  }
});
