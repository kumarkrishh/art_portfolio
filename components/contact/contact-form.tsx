"use client";

import { useActionState, useEffect, useRef } from "react";
import { AlertCircle, CheckCircle2, LoaderCircle, MailCheck } from "lucide-react";
import { useFormStatus } from "react-dom";

import { submitContactForm, type ContactFormState } from "@/app/(public)/contact/actions";

const initialContactFormState: ContactFormState = {
  status: "idle",
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex min-w-44 items-center justify-center gap-3 rounded-full bg-zinc-900 px-10 py-4 text-sm font-medium text-white shadow-[0_14px_34px_-18px_rgba(24,24,27,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-[0_18px_40px_-20px_rgba(24,24,27,0.8)] disabled:translate-y-0 disabled:cursor-not-allowed disabled:bg-zinc-500 disabled:shadow-none"
    >
      {pending ? (
        <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
      ) : (
        <MailCheck className="size-4" aria-hidden="true" />
      )}
      <span className={`transition-all duration-200 ${pending ? "opacity-90" : "opacity-100"}`}>
        {pending ? "Sending..." : "Send Message"}
      </span>
    </button>
  );
}

function StatusMessage({ state }: { state: ContactFormState }) {
  if (state.status === "idle") {
    return null;
  }

  const isSuccess = state.status === "success";

  return (
    <div
      aria-live="polite"
      className={`w-full max-w-xl rounded-3xl border px-5 py-4 shadow-sm transition-all duration-300 ${
        isSuccess
          ? "border-emerald-200 bg-emerald-50/80 text-emerald-900"
          : "border-rose-200 bg-rose-50/80 text-rose-900"
      }`}
    >
      <div className="flex items-start gap-3">
        {isSuccess ? (
          <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-700" aria-hidden="true" />
        ) : (
          <AlertCircle className="mt-0.5 size-5 shrink-0 text-rose-700" aria-hidden="true" />
        )}
        <div className="space-y-1">
          <p className="text-sm font-semibold tracking-[0.08em] uppercase">
            {isSuccess ? "Message Delivered" : "Unable To Send"}
          </p>
          <p className="text-sm leading-relaxed opacity-90">{state.message}</p>
        </div>
      </div>
    </div>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(
    submitContactForm,
    initialContactFormState,
  );
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  return (
    <form ref={formRef} action={formAction} className="space-y-8">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="text-xs font-semibold uppercase tracking-widest text-zinc-900"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full border-b border-zinc-200 bg-transparent py-3 transition-colors focus:border-zinc-900 focus:outline-none"
            placeholder="Jane Doe"
            required
          />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="text-xs font-semibold uppercase tracking-widest text-zinc-900"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full border-b border-zinc-200 bg-transparent py-3 transition-colors focus:border-zinc-900 focus:outline-none"
            placeholder="jane@example.com"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <label
          htmlFor="message"
          className="text-xs font-semibold uppercase tracking-widest text-zinc-900"
        >
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className="w-full resize-none border-b border-zinc-200 bg-transparent py-3 transition-colors focus:border-zinc-900 focus:outline-none"
          placeholder="How can I help you?"
          required
        />
      </div>

      <div className="flex flex-col items-start gap-4">
        <SubmitButton />
        <StatusMessage state={state} />
      </div>
    </form>
  );
}
