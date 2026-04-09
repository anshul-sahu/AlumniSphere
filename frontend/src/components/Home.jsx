import {
  ArrowRight,
  Briefcase,
  Building2,
  CalendarCheck,
  Database,
  DollarSign,
  GraduationCap,
  Handshake,
  LayoutDashboard,
  Lock,
  Mail,
  MessageSquare,
  Network,
  School,
  Search,
  ShieldCheck,
  Sparkles,
  UserCheck,
  Users,
} from "lucide-react";
import Navbar from "./shared/navbar";

const problemItems = [
  {
    title: "Scattered Alumni Data",
    description: "Records are spread across files, spreadsheets, and disconnected tools.",
    icon: Database,
  },
  {
    title: "No Centralized Communication",
    description: "Institutions and alumni struggle to stay connected at scale.",
    icon: MessageSquare,
  },
  {
    title: "Weak Long-Term Engagement",
    description: "Post-graduation engagement drops without structured digital channels.",
    icon: Users,
  },
  {
    title: "Outdated Informal Systems",
    description: "Ad hoc groups and manual follow-ups limit institutional visibility.",
    icon: Search,
  },
];

const impactItems = [
  { title: "Stronger Alumni Engagement", icon: Handshake },
  { title: "Mentorship & Internship Pipelines", icon: Briefcase },
  { title: "Fundraising Opportunities", icon: DollarSign },
  { title: "Institutional Growth", icon: Building2 },
  { title: "Community Building", icon: Sparkles },
];

const featureItems = [
  { title: "Centralized Alumni Database", icon: Database },
  { title: "Secure Authentication", icon: Lock },
  { title: "Mentorship System", icon: UserCheck },
  { title: "Event Management", icon: CalendarCheck },
  { title: "Networking System", icon: Network },
  { title: "Donation & Fundraising", icon: DollarSign },
  
];

const stakeholderItems = [
  { title: "Alumni", icon: GraduationCap },
  { title: "Students", icon: Users },
  { title: "Faculty", icon: School },
  { title: "Administrators", icon: ShieldCheck },
  { title: "Institutions", icon: Building2 },
  { title: "Recruiters", icon: Briefcase },
];

const SectionHeading = ({ title, subtitle }) => (
  <div className="mx-auto mb-10 max-w-3xl text-center">
    <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">{title}</h2>
    {subtitle ? <p className="mt-3 text-slate-600">{subtitle}</p> : null}
  </div>
);

const GlassCard = ({ icon: Icon, title, description }) => (
  <article className="group rounded-2xl border border-white/60 bg-white/70 p-6 shadow-lg shadow-slate-900/5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:shadow-xl">
    <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 p-3 text-blue-700 transition group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white">
      <Icon className="h-5 w-5" />
    </div>
    <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
    {description ? <p className="mt-2 text-sm text-slate-600">{description}</p> : null}
  </article>
);

const Home = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50 to-indigo-50 text-slate-900">
        <section className="relative overflow-hidden px-4 pb-16 pt-20 sm:px-6 lg:px-8 lg:pt-24">
          <div className="absolute -left-24 top-0 h-64 w-64 rounded-full bg-blue-300/30 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl" />

          <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
            <div className="animate-in fade-in slide-in-from-left-4 duration-700">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm text-blue-700 shadow-sm backdrop-blur">
                <Sparkles className="h-4 w-4" /> Alumni Management Platform
              </p>
              <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-6xl">
                Connecting Alumni. Empowering Futures.
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-slate-600">
                A centralized alumni management platform for networking, mentorship, career growth, and lifelong
                institutional relationships.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 font-medium text-white shadow-lg shadow-blue-500/30 transition hover:scale-[1.02] hover:shadow-xl">
                  Join as Alumni
                </button>
                <button className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 transition hover:border-blue-300 hover:text-blue-700">
                  Student Access
                </button>
                <button className="rounded-xl border border-slate-200 bg-white px-5 py-3 font-medium text-slate-700 transition hover:border-indigo-300 hover:text-indigo-700">
                  Admin Login
                </button>
              </div>
            </div>

            <div className="animate-in fade-in slide-in-from-right-4 duration-700">
              <div className="rounded-3xl border border-white/60 bg-white/70 p-8 shadow-2xl shadow-slate-900/10 backdrop-blur-xl">
                <div className="mb-8 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Alumni Network Snapshot</h3>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-700">
                    Live Ecosystem
                  </span>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {["Growing Alumni Network", "Active Mentorship Program", "Strong Industry Connect", "Career Opportunities Hub"].map((item) => (
                    <div key={item} className="rounded-2xl bg-slate-50 p-4 transition hover:bg-blue-50">
                      <p className="font-semibold text-slate-900">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-5 text-white">
                  <p className="text-sm text-blue-100">Unified communication and growth</p>
                  <p className="mt-1 text-lg font-semibold">Mentorship, events, internships, and giving in one place.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              title="The Problem"
              subtitle="Institutions need a modern system to maintain meaningful, long-term alumni relationships."
            />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {problemItems.map((item) => (
                <GlassCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading title="Why This Matters" />
            <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-5">
              {impactItems.map((item) => (
                <GlassCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              title="Platform Features"
              subtitle="Built for scalable alumni operations, engagement, and measurable institutional outcomes."
            />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featureItems.map((item) => (
                <GlassCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading title="Who Benefits" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {stakeholderItems.map((item) => (
                <GlassCard key={item.title} {...item} />
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-16 pt-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl rounded-3xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-600 p-8 text-white shadow-2xl md:p-12">
            <p className="text-sm uppercase tracking-widest text-blue-100">Ready to launch</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight md:text-5xl">Build lifelong connections beyond graduation.</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <button className="rounded-xl bg-white px-5 py-3 font-medium text-blue-700 transition hover:bg-blue-50">
                Get Started
              </button>
              <button className="rounded-xl border border-white/40 bg-white/10 px-5 py-3 font-medium text-white transition hover:bg-white/20">
                Create Alumni Account
              </button>
              <button className="inline-flex items-center gap-2 rounded-xl border border-white/40 bg-transparent px-5 py-3 font-medium text-white transition hover:bg-white/10">
                Explore Platform <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
          <div>
            <h3 className="text-xl font-bold text-slate-900">AlumniConnect</h3>
            <p className="mt-3 text-sm text-slate-600">Professional alumni engagement platform for institutions, students, and graduates.</p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><a className="hover:text-blue-700" href="#">About</a></li>
              <li><a className="hover:text-blue-700" href="#">Features</a></li>
              <li><a className="hover:text-blue-700" href="#">Events</a></li>
              <li><a className="hover:text-blue-700" href="#">Careers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>support@alumniconnect.edu</li>
              <li>+91 9876543210</li>
              <li>Jabalpur, Madhya Pradesh(M.P)</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900">Follow</h4>
            <div className="mt-3 flex gap-3 text-slate-600">
              {["in", "x"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 transition hover:border-blue-300 hover:text-blue-700"
                  aria-label={`social-${item}`}
                >
                  {item}
                </a>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-600">
              <Mail className="mr-1 inline h-4 w-4" /> hello@alumniconnect.edu
            </p>
          </div>
        </div>
        <div className="mx-auto mt-8 max-w-7xl border-t border-slate-200 pt-6 text-sm text-slate-500">
          Copyright {new Date().getFullYear()} AlumniConnect. All rights reserved.
        </div>
      </footer>
    </>
  );
};

export default Home;
