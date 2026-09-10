import React, { useState } from 'react';
import { Award, CheckCircle2, Search } from 'lucide-react';
import { CERTIFICATIONS, FIELD_NOTES } from '../data/portfolioData';

export const CredentialsAndNotes: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const allTags = Array.from(
    new Set(FIELD_NOTES.flatMap((note) => note.tags))
  ).sort();

  const filteredNotes = FIELD_NOTES.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.lesson.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = activeTag ? note.tags.includes(activeTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <section
      className="w-full bg-[#fbf9f4] py-24 px-6 sm:px-12 lg:px-24 border-t border-[#c6c6cb]/30"
      id="notes"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Certifications */}
        <div className="lg:col-span-5">
          <span className="font-mono-sm text-[#2563eb] block mb-2 tracking-wider">
            // 07. CREDENTIALS
          </span>
          <h2 className="font-headline-lg text-[32px] sm:text-[40px] tracking-tight mb-8 font-medium text-[#1b1c19]">
            Certifications.
          </h2>

          <div className="space-y-4 font-mono-sm">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert.name}
                className="p-4 bg-[#f5f3ee] rounded border border-[#c6c6cb]/30 flex justify-between items-center hover:border-[#2563eb]/40 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <Award size={18} className="text-[#2563eb] shrink-0" />
                  <span className="text-[#1b1c19] text-[13px] font-medium">
                    {cert.name}
                  </span>
                </div>
                <span className="text-[#2563eb] font-bold text-[11px] flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  {cert.status}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 bg-[#f5f3ee] rounded-xl border border-[#c6c6cb]/40 font-mono-sm text-[12px] text-[#46464b]">
            <span className="text-[#1b1c19] font-bold block mb-1">
              CONTINUOUS LEARNING PIPELINE
            </span>
            <p className="text-[#76777b] text-[11px] leading-relaxed">
              Currently preparing for AWS Certified Solutions Architect -
              Associate (SAA-C03). Practical labs prioritized over theoretical
              memorization.
            </p>
          </div>
        </div>

        {/* Right Column: Engineer's Field Notes */}
        <div className="lg:col-span-7">
          <span className="font-mono-sm text-[#2563eb] block mb-2 tracking-wider">
            // 08. FIELD NOTES
          </span>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="font-headline-lg text-[32px] sm:text-[40px] tracking-tight font-medium text-[#1b1c19]">
              Things I learned the hard way.
            </h2>

            {/* Quick Search input */}
            <div className="relative max-w-xs w-full">
              <Search
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#76777b]"
              />
              <input
                type="text"
                placeholder="Filter notes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-[#f5f3ee] border border-[#c6c6cb]/40 rounded font-mono-sm text-[12px] text-[#1b1c19] focus:outline-none focus:border-[#2563eb]"
              />
            </div>
          </div>

          {/* Tag filter pills */}
          <div className="flex flex-wrap items-center gap-1.5 mb-6 font-mono-sm">
            <button
              type="button"
              onClick={() => setActiveTag(null)}
              className={`px-2.5 py-1 text-[11px] rounded-xs border transition-colors cursor-pointer ${
                activeTag === null
                  ? 'bg-[#000000] text-white border-[#000000]'
                  : 'bg-[#f5f3ee] text-[#46464b] border-[#c6c6cb]/30 hover:border-[#c6c6cb]'
              }`}
            >
              ALL ({FIELD_NOTES.length})
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`px-2.5 py-1 text-[11px] rounded-xs border transition-colors cursor-pointer ${
                  activeTag === tag
                    ? 'bg-[#2563eb] text-white border-[#2563eb]'
                    : 'bg-[#f5f3ee] text-[#46464b] border-[#c6c6cb]/30 hover:border-[#c6c6cb]'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>

          {/* Notes list */}
          <div className="space-y-6 font-body-md text-[#46464b]">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="p-6 bg-[#f5f3ee] rounded-xl border border-[#c6c6cb]/30 hover:border-[#c6c6cb] transition-colors"
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-mono-sm font-bold text-[#1b1c19] text-[13px]">
                    # NOTE_{note.number}: {note.title}
                  </h3>
                  <span className="font-mono-sm text-[10px] text-[#76777b]">
                    LOGGED
                  </span>
                </div>
                <p className="leading-relaxed mb-3 text-[14px] text-[#46464b]">
                  {note.lesson}
                </p>
                <div className="flex flex-wrap gap-1.5 font-mono-sm">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-[#fbf9f4] border border-[#c6c6cb]/30 text-[#76777b] text-[10px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}

            {filteredNotes.length === 0 && (
              <div className="p-8 text-center font-mono-sm text-[#76777b] bg-[#f5f3ee] rounded-xl border border-dashed border-[#c6c6cb]">
                No notes match "{searchTerm}".
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
