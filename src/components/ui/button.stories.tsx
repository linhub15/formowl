import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./button";

const meta: Meta<typeof Button> = {
  component: Button,
  args: {
    children: "Click me!",
    onClick: () => alert("Clicked!"),
  },
};

type Story = StoryObj<typeof Button>;

export default meta;

export const Default: Story = {};

export const Outline: Story = {
  args: { variant: "outline" },
};

export const Plain: Story = {
  args: { variant: "plain" },
};
