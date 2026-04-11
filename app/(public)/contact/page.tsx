export default function ContactPage() {
  return (
    <div className="w-full max-w-3xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
      
      <h1 className="text-4xl lg:text-5xl font-serif text-zinc-900 mb-6">Get in Touch</h1>
      <p className="text-lg text-zinc-500 mb-12">
        For gallery inquiries, studio visits, or just to say hello, please fill out the form below or email me directly at <a href="mailto:hello@sreeart.com" className="text-zinc-900 underline decoration-zinc-300 underline-offset-4 hover:decoration-zinc-900 transition-colors">hello@sreeart.com</a>.
      </p>

      <form className="space-y-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label htmlFor="name" className="text-xs font-semibold text-zinc-900 uppercase tracking-widest">Name</label>
            <input type="text" id="name" className="w-full border-b border-zinc-200 py-3 bg-transparent focus:outline-none focus:border-zinc-900 transition-colors" placeholder="Jane Doe" />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-xs font-semibold text-zinc-900 uppercase tracking-widest">Email</label>
            <input type="email" id="email" className="w-full border-b border-zinc-200 py-3 bg-transparent focus:outline-none focus:border-zinc-900 transition-colors" placeholder="jane@example.com" />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="message" className="text-xs font-semibold text-zinc-900 uppercase tracking-widest">Message</label>
          <textarea id="message" rows={6} className="w-full border-b border-zinc-200 py-3 bg-transparent focus:outline-none focus:border-zinc-900 transition-colors resize-none" placeholder="How can I help you?"></textarea>
        </div>

        <button type="submit" className="bg-zinc-900 text-white rounded-full px-10 py-4 text-sm font-medium hover:bg-zinc-800 transition-all duration-200">
          Send Message
        </button>
      </form>

    </div>
  );
}