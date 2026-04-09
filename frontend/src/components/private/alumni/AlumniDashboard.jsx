import AlumniSidebar from "./AlumniSidebar";
import { useAuth } from "../../../context/AuthContext";
import Navbar from "../../shared/Navbar";
import AlumniMobileSidebar from "./AlumniMobileSidebar";
import {
  Users,
  GraduationCap,
  CalendarDays,
  CheckCircle2,
  UserPlus,
  CalendarPlus,
  ClipboardCheck,
} from "lucide-react";
import StatCard from "../admin/StatCard";
import QuickActionButton from "../admin/QuickActionButton";

const AlumniDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: "Connections", value: "128", icon: Users },
    { label: "Mentorships", value: "24", icon: GraduationCap },
    { label: "Upcoming Events", value: "6", icon: CalendarDays },
    { label: "Completed Goals", value: "14", icon: CheckCircle2 },
  ];

  const actions = [
    { label: "Find Alumni", to: "/alumni/network", icon: UserPlus },
    { label: "Join Event", to: "/alumni/events", icon: CalendarPlus },
    { label: "Track Progress", to: "/alumni/goals", icon: ClipboardCheck },
  ];

return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <AlumniMobileSidebar />
      <AlumniSidebar />

      <main className="px-4 pb-6 pt-24 md:pl-[20rem] md:pr-8">
        <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Welcome {user?.name || "Alumni"}
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Stay connected with your alumni network from one place.
          </p>
        </section>

        <section className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((item) => (
            <StatCard
              key={item.label}
              label={item.label}
              value={item.value}
              icon={item.icon}
            />
          ))}
        </section>

        <section className="mt-6 rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
          <h2 className="text-base font-semibold text-slate-900 dark:text-slate-100">
            Quick Actions
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {actions.map((action) => (
              <QuickActionButton
                key={action.label}
                label={action.label}
                to={action.to}
                icon={action.icon}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AlumniDashboard;
