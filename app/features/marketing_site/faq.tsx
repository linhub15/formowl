import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export function Faq() {
  const faqs = [
    {
      question: "How does Form Owl work?",
      answer:
        "Form Owl provides you with a unique form endpoint URL. You simply add this URL to your form's action attribute, and we handle the rest. When a user submits your form, the data is sent to our servers, validated, stored, and forwarded to you via email.",
    },
    {
      question: "Do I need any backend code to use Form Owl?",
      answer:
        "Not at all! Form Owl is designed specifically for static websites and requires zero backend code. Just add our endpoint to your HTML form and you're ready to go.",
    },
    {
      question: "Can I use Form Owl with any static site generator?",
      answer:
        "Yes, Form Owl works with any static site generator or plain HTML website. This includes sites built with React, Vue, Jekyll, Hugo, Gatsby, Next.js, and many others.",
    },
    {
      question: "How does spam protection work?",
      answer:
        "Form Owl uses multiple layers of spam protection including honeypot fields, rate limiting, and advanced filtering algorithms to keep your inbox free from spam submissions.",
    },
    {
      question: "Can I customize the email notifications?",
      answer:
        "Yes, we're working on a feature to customize your email templates, through your Form Owl dashboard.",
    },
    {
      question: "Is there an API available?",
      answer:
        "Yes, this is on the roadmap. We will provide a comprehensive API that allows you to programmatically create forms, access submissions, and integrate Form Owl with your own applications.",
    },
  ];

  return (
    <div className="mx-auto max-w-3xl space-y-4 py-12">
      <div className="mx-auto w-full max-w-lg divide-y divide-white/5 rounded-xl bg-white/5">
        {faqs.map((faq) => (
          <Disclosure
            className="p-6"
            as="div"
            key={faq.question.toLowerCase().replaceAll(" ", "_")}
          >
            <DisclosureButton className="group flex w-full items-center justify-between">
              <span className="text-sm/6 font-medium text-white group-data-[hover]:text-white/80">
                {faq.question}
              </span>
              <ChevronDownIcon className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
            </DisclosureButton>
            <DisclosurePanel className="mt-2 text-sm/5 text-white/50">
              <p>{faq.answer}</p>
            </DisclosurePanel>
          </Disclosure>
        ))}
      </div>
    </div>
  );
}
