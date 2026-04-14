"use client";

import { useState } from "react";
import { FAQ } from "@/data/faqs";

interface FaqAccordionProps {
  faqs: FAQ[];
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <dl className="divide-y divide-stone-200">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} className="py-5">
            <dt>
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="flex w-full items-start justify-between gap-4 rounded-md py-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
                aria-expanded={isOpen}
              >
                <span className="font-medium text-stone-900 text-base leading-snug">
                  {faq.question}
                </span>
                <span
                  className={`shrink-0 mt-0.5 text-brand-600 transition-transform duration-200 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </span>
              </button>
            </dt>
            {isOpen && (
              <dd className="mt-3 pr-8">
                <p className="text-stone-600 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </dd>
            )}
          </div>
        );
      })}
    </dl>
  );
}
