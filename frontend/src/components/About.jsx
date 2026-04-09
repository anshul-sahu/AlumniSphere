import Navbar from "./shared/navbar";

const audiences = [
  { title: "Alumni", icon: "A" },
  { title: "Students", icon: "S" },
  { title: "Institutions", icon: "I" },
  { title: "Faculty", icon: "F" },
  { title: "Recruiters", icon: "R" },
];

const About = () => {
  return (<>
    <Navbar/>
    <main className="relative overflow-hidden bg-slate-50 text-slate-800">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(56,189,248,0.2),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.18),transparent_35%),linear-gradient(to_bottom,#f8fafc,#eff6ff)]" />

      <section className="mx-auto max-w-6xl px-6 pb-10 pt-20 md:pt-24">
        <div className="rounded-3xl border border-white/60 bg-white/65 p-8 shadow-xl shadow-sky-100/60 backdrop-blur md:p-12">
          <p className="mb-4 inline-block rounded-full border border-sky-100 bg-sky-50 px-4 py-1 text-xs font-semibold tracking-wide text-sky-700">
            ABOUT
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-5xl">
            About AlumniSphere
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
            Building lifelong connections between alumni, students, and
            institutions.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-6 py-6 md:grid-cols-2 md:items-center">
        <div className="space-y-5">
          <h2 className="text-2xl font-semibold text-slate-900 md:text-3xl">
            One ecosystem for lasting engagement
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Our platform is a centralized alumni management system designed to
            connect graduates with their institutions and each other. We help
            colleges and universities build strong alumni networks that enable
            mentorship, career opportunities, events, collaborations, and
            lifelong relationships.
          </p>
          <p className="text-slate-600 leading-relaxed">
            By bringing alumni, students, faculty, and administrators into one
            digital ecosystem, we create meaningful engagement, trust, and
            long-term growth for institutions and communities.
          </p>
        </div>

        <div className="relative rounded-3xl border border-white/70 bg-white/70 p-8 shadow-lg shadow-sky-100/70 backdrop-blur">
          <div className="grid grid-cols-3 gap-4">
            {[...Array(9)].map((_, index) => (
              <div
                key={index}
                className="aspect-square rounded-2xl bg-gradient-to-br from-sky-100 to-cyan-50 shadow-sm"
              />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="rounded-full border border-sky-200 bg-white/80 px-5 py-2 text-sm font-semibold text-sky-700 shadow">
              Connected Alumni Network
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-5 md:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Mission</h3>
            <p className="mt-2 text-slate-600">
              To create a trusted digital platform that strengthens alumni
              relationships and institutional growth.
            </p>
          </article>
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Vision</h3>
            <p className="mt-2 text-slate-600">
              A future where every institution has a connected, engaged, and
              empowered alumni community.
            </p>
          </article>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-4">
        <h3 className="text-xl font-semibold text-slate-900 md:text-2xl">
          Who We Serve
        </h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {audiences.map((group) => (
            <article
              key={group.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-sky-50 text-sm font-semibold text-sky-700">
                {group.icon}
              </div>
              <p className="mt-2 font-medium text-slate-700">{group.title}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20 pt-12">
        <div className="rounded-3xl bg-gradient-to-r from-sky-600 to-cyan-600 p-8 text-center text-white shadow-lg md:p-10">
          <h3 className="text-2xl font-semibold md:text-3xl">
            Join the network. Build the future.
          </h3>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <button className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-sky-700 transition hover:bg-sky-50">
              Join as Alumni
            </button>
            <button className="rounded-xl border border-white/70 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
              Explore Platform
            </button>
          </div>
        </div>
      </section>
    </main>
    </>
  );
};

export default About;
