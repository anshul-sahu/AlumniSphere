import Sidebar from "./Sidebar";
import { useAuth } from "../../../context/AuthContext";
import Navbar from "../../shared/Navbar";
import MobileSidebar from "./MobileSidebar";
import {
  Users,
  GraduationCap,
  CalendarDays,
  CheckCircle2,
  UserPlus,
  CalendarPlus,
  ClipboardCheck,
} from "lucide-react";
import StatCard from "./StatCard";
import QuickActionButton from "./QuickActionButton";

const AdminDashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: "Alumni", value: "1,248", icon: Users },
    { label: "Students", value: "3,906", icon: GraduationCap },
    { label: "Events", value: "18", icon: CalendarDays },
    { label: "Approvals", value: "12", icon: CheckCircle2 },
  ];

  const actions = [
    { label: "Add Alumni", to: "/admin/alumni/new", icon: UserPlus },
    { label: "Create Event", to: "/admin/events/new", icon: CalendarPlus },
    { label: "Approve Requests", to: "/admin/approvals", icon: ClipboardCheck },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <MobileSidebar />
      <Sidebar />

      <main className="px-4 pb-6 pt-24 md:pl-[20rem] md:pr-8">
        <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
          <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
            Welcome {user?.name || "Admin"}
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Manage your platform from one place.
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

export default AdminDashboard;
