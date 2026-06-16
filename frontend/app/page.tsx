import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-indigo-600">TaskFlow</h1>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-700"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700">
              🚀 Simplify Your Workflow
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-tight text-gray-900">
              Organize Tasks.
              <br />
              Track Progress.
              <br />
              Get More Done.
            </h1>

            <p className="mt-6 max-w-xl text-lg text-gray-600">
              Manage projects, collaborate with your team, and stay productive
              with a powerful task management platform built for modern teams.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
              >
                Start Free
              </Link>

              {/* <a
                href="#features"
                className="rounded-xl border px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Learn More
              </a> */}
            </div>

            <div className="mt-10 flex gap-8">
              <div>
                <h3 className="text-2xl font-bold">10K+</h3>
                <p className="text-gray-500">Active Users</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold">1M+</h3>
                <p className="text-gray-500">Tasks Completed</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold">99.9%</h3>
                <p className="text-gray-500">Uptime</p>
              </div>
            </div>
          </div>

          {/* Hero Illustration */}
          <div className="rounded-3xl border bg-gradient-to-br from-indigo-50 to-purple-50 p-8 shadow-xl">
            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-bold text-gray-800">
                  Product Launch Sprint
                </h3>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  On Track
                </span>
              </div>

              <div className="space-y-4">
                {[
                  "Design Dashboard UI",
                  "Implement Authentication",
                  "Build Task API",
                  "Deploy Application",
                ].map((task, index) => (
                  <div
                    key={task}
                    className="flex items-center gap-3 rounded-lg border p-3"
                  >
                    <input
                      type="checkbox"
                      checked={index < 3}
                      readOnly
                      className="h-4 w-4"
                    />
                    <span
                      className={
                        index < 3
                          ? "text-gray-500 line-through"
                          : "font-medium"
                      }
                    >
                      {task}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <div className="mb-2 flex justify-between text-sm">
                  <span>Progress</span>
                  <span>75%</span>
                </div>

                <div className="h-3 rounded-full bg-gray-200">
                  <div className="h-3 w-3/4 rounded-full bg-indigo-600"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section
        id="features"
        className="bg-gray-50 py-24"
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-bold">
              Everything You Need To Stay Productive
            </h2>

            <p className="mt-4 text-lg text-gray-600">
              Powerful features designed for individuals and teams.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Task Tracking",
                desc: "Create, organize, and manage tasks effortlessly.",
              },
              {
                title: "Team Collaboration",
                desc: "Work together with comments, assignments, and updates.",
              },
              {
                title: "Project Boards",
                desc: "Visualize workflows with Kanban-style boards.",
              },
              {
                title: "Due Dates",
                desc: "Never miss a deadline with reminders and schedules.",
              },
              {
                title: "Analytics",
                desc: "Track productivity and project progress in real-time.",
              },
              {
                title: "Cloud Sync",
                desc: "Access your tasks from anywhere, anytime.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-lg"
              >
                <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl rounded-3xl bg-indigo-600 px-8 py-16 text-center text-white">
          <h2 className="text-4xl font-bold">
            Ready to boost your productivity?
          </h2>

          <p className="mt-4 text-lg text-indigo-100">
            Join thousands of teams already managing their work with TaskFlow.
          </p>

          <a
            href="/signup"
            className="mt-8 inline-block rounded-xl bg-white px-8 py-4 font-semibold text-indigo-600 transition hover:bg-gray-100"
          >
            Get Started For Free
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="mx-auto max-w-7xl px-6 text-center text-gray-500">
          © 2026 TaskFlow. All rights reserved.
        </div>
      </footer>
    </main>
  );
}