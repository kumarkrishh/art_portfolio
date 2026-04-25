import { ContactForm } from "@/components/contact/contact-form";

export default function ContactPage() {
  return (
    <div className="w-full max-w-3xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
      
      <h1 className="text-4xl lg:text-5xl font-serif text-zinc-900 mb-6">Get in Touch</h1>
      <p className="text-lg text-zinc-500 mb-12">
        For gallery inquiries, studio visits, or just to say hello, please fill out the form below or email me directly at <a href="mailto:info@sree.art" className="text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900 transition-colors">info@sree.art</a>.
      </p>

      <ContactForm />

    </div>
  );
}
