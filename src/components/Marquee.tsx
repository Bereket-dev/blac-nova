import { marqueeItems } from "@/lib/data";

export function Marquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <section className="relative bg-bone-50 border-y border-ink-900/8 overflow-hidden z-10">
      <div className="flex marquee-track py-5 whitespace-nowrap">
        {items.map((item, i) => (
          <div key={`${item}-${i}`} className="flex items-center gap-10 px-10">
            <span className="font-serif-display italic text-2xl md:text-3xl text-ink-900 tracking-tight">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-terracotta-500" />
          </div>
        ))}
      </div>
    </section>
  );
}
