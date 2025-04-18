import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  resendEmailVerificationFn,
  type ResendEmailVerificationRequest,
} from "../functions/resend_email_verification.fn";
import { toast } from "sonner";

export function useResendVerification() {
  const resendVerification = useServerFn(resendEmailVerificationFn);
  return useMutation({
    mutationFn: async (args: ResendEmailVerificationRequest) => {
      await resendVerification({ data: args });
    },
    onSuccess: () => {
      toast.success("Verification email sent");
    },
  });
}
