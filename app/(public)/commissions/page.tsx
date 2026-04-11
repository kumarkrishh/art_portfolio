export default function CommissionsPage() {
  return (
    <div className="w-full max-w-3xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
      
      {/* Header & Guidelines */}
      <div className="mb-16">
        <h1 className="text-4xl lg:text-5xl font-serif text-zinc-900 mb-6">Request a Custom Painting</h1>
        <p className="text-lg text-zinc-500 mb-8 leading-relaxed">
          Commissions are currently open for a limited number of pieces per month. Share your vision and I will follow up with timelines and pricing.
        </p>
        
        <div className="bg-zinc-50 p-6 border border-zinc-100">
          <ul className="space-y-3 text-sm text-zinc-600 list-disc list-inside marker:text-zinc-400">
            <li>Sizes from 16x20in up to 40x60in</li>
            <li>Framing available on request</li>
            <li>50% deposit to begin, balance on approval</li>
            <li>Typical turnaround 4–8 weeks depending on scale</li>
          </ul>
        </div>
      </div>

      {/* Form */}
      <form className="space-y-8">
        
        {/* Row 1: Name & Email */}
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

        {/* Row 2: Size & Budget */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label htmlFor="size" className="text-xs font-semibold text-zinc-900 uppercase tracking-widest">Desired Size</label>
            <input type="text" id="size" className="w-full border-b border-zinc-200 py-3 bg-transparent focus:outline-none focus:border-zinc-900 transition-colors" placeholder="e.g. 30in x 40in" />
          </div>
          <div className="space-y-2">
            <label htmlFor="budget" className="text-xs font-semibold text-zinc-900 uppercase tracking-widest">Budget</label>
            <input type="text" id="budget" className="w-full border-b border-zinc-200 py-3 bg-transparent focus:outline-none focus:border-zinc-900 transition-colors" placeholder="e.g. $2,000" />
          </div>
        </div>

        {/* Row 3: Colors & Timeline */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-2">
            <label htmlFor="colors" className="text-xs font-semibold text-zinc-900 uppercase tracking-widest">Preferred Colors</label>
            <input type="text" id="colors" className="w-full border-b border-zinc-200 py-3 bg-transparent focus:outline-none focus:border-zinc-900 transition-colors" placeholder="Earth tones, ocean blues..." />
          </div>
          <div className="space-y-2">
            <label htmlFor="timeline" className="text-xs font-semibold text-zinc-900 uppercase tracking-widest">Timeline</label>
            <input type="text" id="timeline" className="w-full border-b border-zinc-200 py-3 bg-transparent focus:outline-none focus:border-zinc-900 transition-colors" placeholder="e.g. Need by October" />
          </div>
        </div>
        
        {/* Textareas */}
        <div className="space-y-2">
          <label htmlFor="subject" className="text-xs font-semibold text-zinc-900 uppercase tracking-widest">Subject / Style Notes</label>
          <textarea id="subject" rows={4} className="w-full border-b border-zinc-200 py-3 bg-transparent focus:outline-none focus:border-zinc-900 transition-colors resize-none" placeholder="Describe your vision or reference previous works..."></textarea>
        </div>

        <div className="space-y-2">
          <label htmlFor="details" className="text-xs font-semibold text-zinc-900 uppercase tracking-widest">Additional Details</label>
          <textarea id="details" rows={3} className="w-full border-b border-zinc-200 py-3 bg-transparent focus:outline-none focus:border-zinc-900 transition-colors resize-none" placeholder="Framing requests, shipping location, etc."></textarea>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button type="submit" className="bg-zinc-900 text-white rounded-full px-10 py-4 text-sm font-medium hover:bg-zinc-800 transition-all duration-200">
            Submit Inquiry
          </button>
        </div>

      </form>

    </div>
  );
}