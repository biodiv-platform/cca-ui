import { extendTheme } from "@chakra-ui/react";
import { withProse } from "@nikolovlazar/chakra-ui-prose";

const defaultFontFamily =
  "-apple-system,BlinkMacSystemFont,Segoe UI,Inter,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji";

export const customTheme = extendTheme(
  {
    fonts: {
      body: defaultFontFamily,
      heading: defaultFontFamily
    },
    fontWeights: {
      bold: 600
    },
    styles: {
      global: {
        body: {
          scrollBehavior: "smooth"
        }
      }
    },
    components: {
      Input: {
        sizes: {
          md: {
            addon: { px: 2.5 },
            field: { px: 2.5 }
          }
        }
      }
    },
    colors: {
      blue: {
        "50": "#e6fffa",
        "100": "#b2f5ea",
        "200": "#81e6d9",
        "300": "#4fd1c5",
        "400": "#38b2ac",
        "500": "#319795",
        "600": "#2c7a7b",
        "700": "#285e61",
        "800": "#234e52",
        "900": "#1d4044"
      }
    }
  },
  withProse({
    baseStyle: {
      a: {
        color: "blue.500",
        wordBreak: "break-all"
      },
      table: {
        td: {
          border: "1px solid",
          borderColor: "gray.300",
          p: 2,
          verticalAlign: "inherit"
        },
        th: {
          border: "1px solid",
          borderColor: "gray.300",
          p: 2,
          verticalAlign: "inherit"
        },
        tr: {
          border: 0
        }
      }
    }
  })
);
