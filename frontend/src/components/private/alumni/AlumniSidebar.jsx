import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BadgeCheck,
  Briefcase,
  CalendarDays,
  GraduationCap,
  Menu,
  ShieldCheck,
  UserCircle2,
  Users,
  UserSquare2,
  X,
} from "lucide-react";

const sidebarItems = [
  { label: "Dashboard", to: "/alumni/dashboard", icon: GraduationCap },
  { label: "Students", to: "/alumni/students", icon: Users },
  { label: "Events", to: "/alumni/events", icon: CalendarDays },
  { label: "Internships", to: "/alumni/internships", icon: Briefcase },
  { label: "Uploaded Intern", to: "/alumni/uploadedIntern", icon: Briefcase },
  { label: "Mentorship", to: "/alumni/mentorship", icon: UserSquare2 },
  { label: "View Profile", to: "/alumni/profile", icon: UserCircle2 },
];

const linkClassName = ({ isActive }) =>
  [
    "group flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
    isActive
      ? "border-blue-300 bg-blue-50 text-blue-700 shadow-sm dark:border-blue-500/40 dark:bg-blue-500/10 dark:text-blue-300"
      : "border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-100",
  ].join(" ");

function SidebarItem({ item, onClick }) {
  const Icon = item.icon;

  return (
    <NavLink to={item.to} className={linkClassName} onClick={onClick}>
      <Icon size={18} className="shrink-0" aria-hidden="true" />
      <span>{item.label}</span>
    </NavLink>
  );
}

function MobileToggleButton({ onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Open admin sidebar"
      className="fixed left-4 top-4 z-40 inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-700 shadow-sm transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
    >
      <Menu size={20} />
    </button>
  );
}

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <>
      <MobileToggleButton onOpen={() => setIsOpen(true)} />

      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-40 bg-slate-900/45 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={[
          "fixed left-0 top-20 z-50 h-[calc(100vh-5rem)] w-72 border-r border-slate-200 bg-white/95 p-5 shadow-xl backdrop-blur-sm transition-transform duration-300 md:translate-x-0 dark:border-slate-800 dark:bg-slate-950/95",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-slate-100">
            Alumni Panel
          </h2>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close admin sidebar"
            className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:hidden dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        <nav aria-label="Admin navigation" className="space-y-2">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.to}
              item={item}
              onClick={() => setIsOpen(false)}
            />
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
