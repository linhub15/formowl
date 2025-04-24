export const formKeys = {
  all: ["forms"] as const,
  lists: () => [...formKeys.all, "list"] as const,
  single: (formId: string) => [...formKeys.all, "single", formId] as const,
  submissions: {
    all: (formId: string) =>
      [...formKeys.single(formId), "submissions"] as const,
    lists: (formId: string) =>
      [...formKeys.submissions.all(formId), "list"] as const,
    single: (args: { formId: string; submissionId: string }) =>
      [
        ...formKeys.submissions.all(args.formId),
        args.submissionId,
      ] as const,
  },
};
