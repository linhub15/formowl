import { usePrefersColorScheme } from "@/lib/utils/use_prefers_color_scheme";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";
import { type ComponentProps, useCallback, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import vs_light from "react-syntax-highlighter/dist/esm/styles/prism/vs";
import vs_dark from "react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus";
import { Button } from "./button";
import { toast } from "sonner";
import { cn } from "@/lib/utils/cn";

type Props = {
  language: "html" | "javascript" | "json";
  code: string | string[];
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  copyButtonPosition?: "top" | "bottom";
};

export function CodeBlock(
  {
    language = "javascript",
    code,
    showLineNumbers = false,
    showCopyButton = false,
    copyButtonPosition = "top",
  }: Props,
) {
  const scheme = usePrefersColorScheme();
  const style = scheme === "light" ? vs_light : vs_dark;

  return (
    <div className="relative">
      {showCopyButton && (
        <div
          className={cn(
            "absolute flex items-center justify-center right-0 mr-2",
            copyButtonPosition === "top" ? "top-0 mt-2" : "bottom-0 mb-2",
          )}
        >
          <CopyButton copyText={code} />
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        showLineNumbers={showLineNumbers}
        wrapLines
        style={style}
        PreTag={({ style, ...props }: ComponentProps<"pre">) => (
          <pre
            {...props}
            className="rounded-lg"
            style={{ ...style, fontSize: "inherit" }}
          />
        )}
        CodeTag={({ style, ...props }: ComponentProps<"code">) => (
          <code {...props} style={{ ...style, fontSize: "inherit" }} />
        )}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

function CopyButton(props: { copyText: string | string[] }) {
  const [done, setDone] = useState(false);
  const [_, copy] = useCopyToClipboard();

  const onClick = async () => {
    const text = Array.isArray(props.copyText)
      ? props.copyText.join("\n")
      : props.copyText;

    await copy(text);
    setDone(true);

    toast.success("Copied to clipboard");

    setTimeout(() => setDone(false), 4000);
  };

  return (
    <Button
      className="bg-white/90 dark:bg-[#1e1e1e]/70 [--spacing:4px] [--text-size: 14px]"
      variant="outline"
      onClick={onClick}
    >
      {done
        ? (
          <>
            <CheckIcon className="fill-green-600" /> Done
          </>
        )
        : (
          <>
            <ClipboardIcon />Copy
          </>
        )}
    </Button>
  );
}

type CopiedValue = string | null;

type CopyFn = (text: string) => Promise<boolean>;

export function useCopyToClipboard(): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const copy: CopyFn = useCallback(async (text) => {
    if (!navigator?.clipboard) {
      console.warn("Clipboard not supported");
      return false;
    }

    // Try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      console.warn("Copy failed", error);
      setCopiedText(null);
      return false;
    }
  }, []);

  return [copiedText, copy];
}
