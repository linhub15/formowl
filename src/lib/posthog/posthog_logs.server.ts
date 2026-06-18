import { env } from "@/env.server";
import { logs } from "@opentelemetry/api-logs";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { BatchLogRecordProcessor } from "@opentelemetry/sdk-logs";
import { NodeSDK } from "@opentelemetry/sdk-node";

type PostHogLogSeverity = "debug" | "info" | "warn" | "error";
type PostHogLogAttribute =
  | string
  | number
  | boolean
  | Array<string | number | boolean>;
type PostHogLogAttributes = Record<string, PostHogLogAttribute | undefined>;

type PostHogLog = {
  severityText?: PostHogLogSeverity;
  body: string;
  attributes?: PostHogLogAttributes;
};

type PostHogLogState = {
  sdk?: NodeSDK;
  processor?: BatchLogRecordProcessor;
  hasStarted: boolean;
};

const postHogGlobal = globalThis as typeof globalThis & {
  __formowlPostHogLogState?: PostHogLogState;
};
const state = (postHogGlobal.__formowlPostHogLogState ??= {
  hasStarted: false,
});

const MAX_ATTRIBUTE_LENGTH = 8_000;

function getPostHogLogsUrl() {
  const host = (
    env.POSTHOG_HOST ||
    env.VITE_POSTHOG_HOST ||
    "https://us.i.posthog.com"
  ).replace(/\/$/, "");

  if (host.endsWith("/i/v1/logs")) {
    return host;
  }

  if (host === "https://us.posthog.com") {
    return "https://us.i.posthog.com/i/v1/logs";
  }

  if (host === "https://eu.posthog.com") {
    return "https://eu.i.posthog.com/i/v1/logs";
  }

  return `${host}/i/v1/logs`;
}

function getPostHogProjectToken() {
  return env.POSTHOG_PROJECT_TOKEN || env.VITE_POSTHOG_PUBLIC_KEY;
}

function startPostHogLogs() {
  const token = getPostHogProjectToken();

  if (!token || state.hasStarted) {
    return Boolean(token);
  }

  state.processor = new BatchLogRecordProcessor(
    new OTLPLogExporter({
      url: getPostHogLogsUrl(),
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  );

  state.sdk = new NodeSDK({
    resource: resourceFromAttributes({
      "service.name": "formowl",
    }),
    logRecordProcessors: [state.processor],
  });

  state.sdk.start();
  state.hasStarted = true;

  return true;
}

export function emitPostHogLog({
  severityText = "info",
  body,
  attributes,
}: PostHogLog) {
  if (!startPostHogLogs()) {
    writeFallbackLog(severityText, body, attributes);
    return;
  }

  logs.getLogger("formowl").emit({
    severityText,
    body,
    attributes: {
      app_name: "formowl",
      ...normalizeAttributes(attributes),
    },
  });
}

export function emitPostHogErrorLog(
  error: unknown,
  {
    body = "server error",
    attributes,
  }: {
    body?: string;
    attributes?: PostHogLogAttributes;
  } = {},
) {
  emitPostHogLog({
    severityText: "error",
    body,
    attributes: {
      ...serializeError(error),
      ...attributes,
    },
  });
}

export async function flushPostHogLogs() {
  await state.processor?.forceFlush();
}

export async function shutdownPostHogLogs() {
  if (!state.sdk) {
    return;
  }

  try {
    await state.sdk.shutdown();
  } finally {
    state.sdk = undefined;
    state.processor = undefined;
    state.hasStarted = false;
  }
}

function writeFallbackLog(
  severity: PostHogLogSeverity,
  body: string,
  attributes?: PostHogLogAttributes,
) {
  const method = severity === "debug" ? console.debug : console[severity];
  method(`[posthog] ${body}`, normalizeAttributes(attributes));
}

function normalizeAttributes(attributes?: PostHogLogAttributes) {
  const normalized: Record<string, PostHogLogAttribute> = {};

  for (const [key, value] of Object.entries(attributes ?? {})) {
    if (value === undefined) {
      continue;
    }

    normalized[key] = normalizeAttributeValue(value);
  }

  return normalized;
}

function normalizeAttributeValue(value: PostHogLogAttribute): PostHogLogAttribute {
  if (typeof value === "string") {
    return truncateAttribute(value);
  }

  if (Array.isArray(value)) {
    return value.map((entry) =>
      typeof entry === "string" ? truncateAttribute(entry) : entry,
    );
  }

  return value;
}

function serializeError(error: unknown): PostHogLogAttributes {
  if (error instanceof Error) {
    return {
      error_name: error.name,
      error_message: error.message,
      error_stack: error.stack,
    };
  }

  return {
    error_name: typeof error,
    error_message: stringifyUnknownError(error),
  };
}

function stringifyUnknownError(error: unknown) {
  if (typeof error === "string") {
    return error;
  }

  try {
    return JSON.stringify(error);
  } catch {
    return String(error);
  }
}

function truncateAttribute(value: string) {
  if (value.length <= MAX_ATTRIBUTE_LENGTH) {
    return value;
  }

  return `${value.slice(0, MAX_ATTRIBUTE_LENGTH)}...`;
}
