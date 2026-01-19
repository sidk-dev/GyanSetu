import { Button } from "@headlessui/react";
import { Link } from "react-router";
import HomeSvg from "../../assets/home.svg";

const FEATURES = [
  {
    title: "👤 User & Profile System",
    description:
      "Secure registration and login with personal details including first name, last name, gender, date of birth, bio, state, district, etc.",
  },
  {
    title: "🎯 Smart Matching",
    description:
      "Connect the right learners with the right teachers using tag-based skill matching, optionally boosted by location and availability.",
  },
  {
    title: "📅 Session Booking System",
    description:
      "Request learning sessions from teachers and get your slots booked seamlessly. Timezone-aware scheduling avoids scheduling confusion.",
  },
  {
    title: "💰 Skill Credit System",
    description:
      "Earn +3 credits for teaching a session and spend –3 credits for learning. Encourages fairness, contribution, and prevents freeloading.",
  },
  {
    title: "📧 Email Notifications",
    description:
      "Receive alerts for session requests and acceptances, as well as password recovery emails — no in-app messaging required.",
  },
  {
    title: "📝 Skill Management",
    description:
      "Add, view, and manage the skills you can teach and want to learn, keeping your profile up-to-date.",
  },
];

function Home() {
  return (
    <div className="flex-1 flex flex-col">
      <main className="flex-1 bg-[var(--color-bg)] text-[var(--color-neutral-light)]">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block mb-4 px-4 py-1 rounded-full bg-[var(--color-secondary)] text-[var(--color-accent)] text-sm font-medium">
                Money-Free Micro-Mentorship
              </span>

              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Learn & Teach Skills
                <br />
                <span className="text-[var(--color-accent)]">
                  Without Money
                </span>
              </h1>

              <p className="mt-6 text-[var(--color-neutral-medium)] max-w-xl">
                GyanSetu connects learners and mentors through a fair
                skill-exchange system. Teach what you know, earn Skill Credits,
                and spend them to learn something new.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link to={"/register"}>
                  <Button
                    as="button"
                    className="px-6 py-3 rounded-lg bg-[var(--color-accent)] text-[var(--color-neutral-dark)] font-semibold hover:bg-[var(--color-accent-light)] transition"
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative">
              <img
                src={HomeSvg}
                alt="Learn & Teach Skills"
                className="w-auto"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-12">
              Platform Features
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {FEATURES.map((feature) => (
                <div
                  key={feature.title}
                  className="p-6 rounded-xl bg-[var(--color-secondary)] border border-[var(--color-primary-dark)] shadow-md hover:shadow-lg transition"
                >
                  <h3 className="text-xl font-semibold text-[var(--color-accent)]">
                    {feature.title}
                  </h3>
                  <p className="mt-3 text-[var(--color-neutral-medium)]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-32 flex items-center justify-center">
          <div className="max-w-3xl px-6 text-center">
            <p className="text-3xl md:text-4xl italic text-[var(--color-accent)] font-serif leading-snug">
              “The beautiful thing about learning is that no one can take it
              away from you.”
            </p>
            <span className="mt-6 block text-[var(--color-neutral-medium)] text-lg md:text-xl">
              – B.B. King
            </span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
