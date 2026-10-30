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
    <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <p className="font-semibold text-emerald-600">
            SIMPLE PROCESS
          </p>
          <h2 className="mt-2 text-3xl font-bold text-slate-900 md:text-4xl">
            How BookNook Works
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-500">
            Getting your favorite book has never been easier.
            Follow these three simple steps.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-8 text-center transition hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
                  <Icon size={30} />
                </div>

                <p className="mt-5 text-sm font-bold text-emerald-600">
                  STEP {step.number}
                </p>

                <h3 className="mt-2 text-xl font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
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