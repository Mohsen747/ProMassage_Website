"use client";

import { useState } from "react";

type AccordionSection = {
  title: string;
  items?: string[];
  content?: string;
};

type ProgramDetailAccordionProps = {
  sections: AccordionSection[];
};

export default function ProgramDetailAccordion({ sections }: ProgramDetailAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <div className="divide-y divide-stone-200 rounded-lg border border-stone-200 bg-white">
      {sections.map((section, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={section.title}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start transition-colors hover:bg-brand-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-500/40"
              aria-expanded={isOpen}
            >
              <span className="font-medium text-brand-forest">{section.title}</span>
              <span
                className="shrink-0 text-lg leading-none text-brand-forest"
                aria-hidden
              >
                {isOpen ? "−" : "+"}
              </span>
            </button>

            {isOpen && (
              <div className="border-t border-stone-100 bg-white px-5 py-4">
                {section.items ? (
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2 text-sm text-stone-600"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
                          aria-hidden
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm leading-relaxed text-stone-600">{section.content}</p>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
