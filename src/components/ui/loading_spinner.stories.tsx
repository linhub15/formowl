import type { Meta, StoryObj } from "@storybook/react-vite";

import { LoadingSpinner } from "./loading_spinner";

const meta: Meta<typeof LoadingSpinner> = {
  component: LoadingSpinner,
};

type Story = StoryObj<typeof LoadingSpinner>;

export default meta;

export const Default: Story = {
  render: () => (
    <div className="">
      <LoadingSpinner />
    </div>
  ),
};
