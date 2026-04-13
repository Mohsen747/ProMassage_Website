import { siteContent } from "@/data/siteContent";

const { whyChoose } = siteContent.home;

const icons = ["✦", "◈", "◉", "◎"];

export default function WhyChoose() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl text-stone-900 mb-4">
            {whyChoose.title}
          </h2>
          <p className="text-stone-600 leading-relaxed">{whyChoose.intro}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChoose.items.map((item, i) => (
            <div key={item.title} className="flex flex-col">
              <span className="text-brand-500 text-xl mb-4 select-none">
                {icons[i]}
              </span>
              <h3 className="font-serif text-lg text-stone-900 mb-2">
                {item.title}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
