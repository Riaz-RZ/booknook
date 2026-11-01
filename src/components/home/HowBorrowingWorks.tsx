import { Search, BookOpen, RotateCcw } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Explore Books",
    description:
      "Browse our collection and discover books that match your interests.",
  },
  {
    icon: BookOpen,
    number: "02",
    title: "Borrow Your Book",
    description:
      "Choose your favorite book and submit a borrowing request.",
  },
  {
    icon: RotateCcw,
    number: "03",
    title: "Enjoy & Return",
    description:
      "Enjoy your reading journey and return the book on time.",
  },
];

const HowBorrowingWorks = () => {
  return (
    <section className="w-full  bg-navy px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Section Heading */}
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Simple Process
          </p>

          <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">
            How <span className="text-emerald-400">BookNook</span> Works
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-gray-400">
            Getting your favorite book has never been easier.
            Follow these three simple steps.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="group rounded-2xl border border-gray-700 bg-navy-card p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5"
              >
                {/* Icon */}
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 transition-all duration-300 group-hover:bg-emerald-500 group-hover:text-navy">
                  <Icon size={30} />
                </div>

                {/* Step Number */}
                <p className="mt-6 text-xs font-bold tracking-widest text-emerald-400">
                  STEP {step.number}
                </p>

                {/* Title */}
                <h3 className="mt-3 text-xl font-bold text-white">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-sm leading-7 text-gray-400">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowBorrowingWorks;