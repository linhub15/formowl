import { Card, CardBody, CardFooter } from "@/components/layout/card";
import { Button } from "@/components/ui/button";
import {
  ErrorMessage,
  Field,
  FieldGroup,
  Label,
} from "@/components/ui/fieldset";
import { Heading } from "@/components/ui/heading";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input_password";
import { LoadingSpinner } from "@/components/ui/loading_spinner";
import { findUserFn } from "@/features/app_shell/functions/find_user.fn";
import { authClient } from "@/lib/auth/auth.client";
import { BETTERAUTH_PASSWORD } from "@/lib/auth/better_auth.const";
import {
  GithubOAuthButton,
  GoogleOAuthButton,
} from "@/lib/auth/components/oauth_buttons";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";

export const Route = createFileRoute("/_site/login/$email")({
  component: RouteComponent,
  loader: async ({ params }) => {
    const result = await findUserFn({ data: { email: params.email } });
    return result;
  },
});

const loginSchema = z.object({
  email: z.string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .max(32, "Password can't exceed 32 characters"),
});

const signupSchema = z.object({
  ...loginSchema.shape,
  name: z.string()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Sorry, I didn't expect a name to be this long."),
});

function RouteComponent() {
  const { email } = Route.useParams();
  const { redirect } = Route.useSearch();
  const [status, setStatus] = useState<"pending" | "idle">("idle");
  const { found, usesCredential } = Route.useLoaderData();

  const isLogin = found && usesCredential;

  if (found && !usesCredential) {
    return (
      <Card>
        <CardBody>
          <Heading className="text-center pb-8">
            You've logged in with a provider before
          </Heading>
          <div className="flex flex-col gap-6">
            <Field>
              <Label htmlFor="email">Email</Label>
              <Input
                value={email}
                disabled
              />
            </Field>

            <GoogleOAuthButton
              redirect={redirect}
              onStatusChange={setStatus}
              disabled={status === "pending"}
            />
            <GithubOAuthButton
              redirect={redirect}
              onStatusChange={setStatus}
              disabled={status === "pending"}
            />
          </div>
        </CardBody>

        <CardFooter>
          <Button to=".." variant="outline">Go back</Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardBody>
        <Heading className="text-center pb-8">
          {isLogin ? "Login" : "Create an account"}
        </Heading>
        {isLogin ? <LoginForm email={email} /> : <SignupForm email={email} />}
      </CardBody>

      <CardFooter>
        <Button to=".." variant="outline">Go back</Button>
      </CardFooter>
    </Card>
  );
}

function LoginForm({ email }: { email: string }) {
  const [formError, setFormError] = useState<string>("");
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      email: email,
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      const result = await authClient.signIn.email({
        email: value.email,
        password: value.password,
      });

      if (result.error?.message) {
        setFormError(result.error.message);
        return;
      }

      await navigate({
        to: "/dashboard",
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field name="email">
          {(field) => (
            <Field>
              <Label htmlFor={field.name}>Email</Label>
              <div className="flex gap-3" data-slot="control">
                <Input
                  type="email"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.currentTarget.value)}
                  disabled
                />
                <Button variant="outline" color="white" to="..">
                  <PencilSquareIcon data-slot="icon" />
                </Button>
              </div>
            </Field>
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <Field>
              <Label htmlFor={field.name}>Password</Label>
              <InputPassword
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  setFormError("");
                  field.handleChange(e.currentTarget.value);
                }}
                maxLength={BETTERAUTH_PASSWORD.maxLength}
              />
              {field.state.meta.errors?.length > 0 && (
                <ErrorMessage>
                  {field.state.meta.errors.map((e) => e?.message).join(
                    "; ",
                  )}
                </ErrorMessage>
              )}
              {formError && (
                <ErrorMessage>
                  {formError}
                </ErrorMessage>
              )}
            </Field>
          )}
        </form.Field>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <Button
              className="w-full"
              color="white"
              type="submit"
              params={{ email: email }}
              disabled={!canSubmit || Boolean(formError)}
            >
              {isSubmitting ? <LoadingSpinner /> : "Login"}
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
}

function SignupForm({ email }: { email: string }) {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      email: email,
      name: "",
      password: "",
    },
    validators: {
      onSubmit: signupSchema,
    },
    onSubmit: async ({ value }) => {
      await authClient.signUp.email({
        name: value.name,
        email: value.email,
        password: value.password,
      });
      await navigate({
        to: "/dashboard",
      });
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field name="email">
          {(field) => (
            <Field>
              <Label htmlFor={field.name}>Email</Label>
              <Input
                type="email"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.currentTarget.value)}
              />
              {field.state.meta.errors?.length > 0 && (
                <ErrorMessage>
                  {field.state.meta.errors.map((e) => e?.message).join(
                    "; ",
                  )}
                </ErrorMessage>
              )}
            </Field>
          )}
        </form.Field>

        <form.Field name="name">
          {(field) => (
            <Field>
              <Label htmlFor={field.name}>Name</Label>
              <Input
                type="text"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.currentTarget.value)}
                maxLength={100}
              />
              {field.state.meta.errors?.length > 0 && (
                <ErrorMessage>
                  {field.state.meta.errors.map((e) => e?.message).join(
                    "; ",
                  )}
                </ErrorMessage>
              )}
            </Field>
          )}
        </form.Field>

        <form.Field name="password">
          {(field) => (
            <Field>
              <Label htmlFor={field.name}>Password</Label>
              <InputPassword
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  field.handleChange(e.currentTarget.value);
                }}
                maxLength={BETTERAUTH_PASSWORD.maxLength}
              />
              {field.state.meta.errors?.length > 0 && (
                <ErrorMessage>
                  {field.state.meta.errors.map((e) => e?.message).join(
                    "; ",
                  )}
                </ErrorMessage>
              )}
            </Field>
          )}
        </form.Field>
        <form.Subscribe selector={(state) => [state.isSubmitting]}>
          {([isSubmitting]) => (
            <Button
              className="w-full"
              type="submit"
              color="white"
              params={{ email: email }}
              pending={isSubmitting}
            >
              Create account
            </Button>
          )}
        </form.Subscribe>
      </FieldGroup>
    </form>
  );
}
