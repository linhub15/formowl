import "../src/main.css";
import type { Preview } from "@storybook/react";

const isDarkMode = globalThis
  ? globalThis.matchMedia("(prefers-color-scheme: dark)").matches
  : false;

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: isDarkMode ? "dark" : "Light",
      values: [
        {
          name: "light",
          value: "#f4f4f5",
        },
        {
          name: "dark",
          value: "#18181b",
        },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
