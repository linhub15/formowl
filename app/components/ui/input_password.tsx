import { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";

type Props = Omit<React.ComponentProps<typeof Input>, "type">;

export function InputPassword({ className, ref, ...props }: Props) {
  const [asDots, setAsDots] = useState(true);
  return (
    <div className="relative flex gap-3" data-slot="control">
      <Input
        {...props}
        type={asDots ? "password" : "text"}
        maxLength={32}
      />
      <Button
        variant="outline"
        color="dark/zinc"
        onClick={() => setAsDots((prev) => !prev)}
      >
        {asDots
          ? <EyeSlashIcon data-slot="icon" />
          : <EyeIcon data-slot="icon" />}
      </Button>
    </div>
  );
}
