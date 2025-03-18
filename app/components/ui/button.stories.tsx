import type { Meta, StoryObj } from "@storybook/react";

import { Button, buttonVariants } from "./button";

const meta: Meta<typeof Button> = {
  component: Button,
  args: {
    children: "Click me!",
    onClick: () => alert("Clicked!"),
    className: buttonVariants(),
  },
};

type Story = StoryObj<typeof Button>;

export default meta;

export const Default: Story = {};
