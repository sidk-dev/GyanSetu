import { Button } from "@headlessui/react";
import { Link } from "react-router";
import HomeSvg from "../../assets/home.svg";

const CARDS = [
  {
    title: "Smart Skill Matching",
    description:
      "Find people who can teach you — and those you can teach — using location, and availability.",
  },
  {
    title: "Session Booking",
    description:
      "Request and accept learning sessions with a seamless, timezone-aware workflow.",
  },
  {
    title: "Skill Credit System",
    description:
      "Teach to earn credits, learn by spending them — ensuring fairness and community balance.",
  },
  {
    title: "Ratings & Reviews",
    description:
      "Transparent feedback builds trust and helps users choose reliable mentors.",
  },
  {
    title: "Email Notifications",
    description:
      "Stay informed with session requests — no in-app chat required.",
  },
  {
    title: "Personal Dashboard",
    description: "Track credits, sessions, and learning progress in one place.",
  },
];

function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1">
        <div className="min-h-screen bg-bg text-neutral-light font-sans">
          <section className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block mb-4 px-4 py-1 rounded-full bg-secondary text-accent text-sm">
                  Money-Free Micro-Mentorship
                </span>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Learn & Teach Skills
                  <br />
                  <span className="text-accent">Without Money</span>
                </h1>

                <p className="mt-6 text-neutral-medium max-w-xl">
                  GyanSetu connects learners and mentors through a fair
                  skill-exchange system. Teach what you know, earn Skill
                  Credits, and spend them to learn something new.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to={"/register"}>
                    <Button
                      as="button"
                      className="px-6 py-3 rounded-lg bg-accent text-neutral-dark font-semibold hover:bg-accent-light transition cursor-pointer"
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="relative">
                <img src={HomeSvg} className="w-auto" />
              </div>
            </div>
          </section>

          <section className="py-20">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-3xl font-bold text-center">
                Platform Features
              </h2>

              <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Feature cards */}
                {CARDS.map((feature) => (
                  <div
                    key={feature.title}
                    className="p-6 rounded-xl bg-secondary border border-neutral-dark/40"
                  >
                    <h3 className="text-xl font-semibold text-accent">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-neutral-medium">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="py-32 flex items-center justify-center">
            <div className="max-w-3xl px-6 text-center">
              <p className="text-3xl md:text-4xl italic text-accent font-serif leading-snug">
                “The beautiful thing about learning is that no one can take it
                away from you.”
              </p>
              <span className="mt-6 block text-neutral-medium text-lg md:text-xl">
                – B.B. King
              </span>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Home;
