import { useEffect, useMemo, useRef, useState } from "react";
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

const menuItems = [
  { label: "Dashboard", to: "/student/dashboard", icon: GraduationCap },
  { label: "Alumni Network", to: "/student/alumni", icon: Users },
  { label: "Events", to: "/student/events", icon: CalendarDays },
  { label: "Internships", to: "/student/internships", icon: Briefcase },
  { label: "Find Mentor", to: "/student/findMentor", icon: UserSquare2 },
  { label: "View Profile", to: "/student/profile", icon: UserCircle2 },
];

const linkClassName = ({ isActive }) =>
  [
    "group flex w-full items-center gap-3 rounded-xl border px-3 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
    isActive
      ? "border-blue-300 bg-blue-50 text-blue-700 shadow-sm"
      : "border-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-100 hover:text-slate-900",
  ].join(" ");

function MobileSidebarItem({ item, onClick }) {
  const Icon = item.icon;

  return (
    <NavLink to={item.to} className={linkClassName} onClick={onClick}>
      <Icon size={18} className="shrink-0" aria-hidden="true" />
      <span>{item.label}</span>
    </NavLink>
  );
}

function ToggleButton({ onOpen }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label="Open admin sidebar"
      className="fixed left-4 top-20 z-40 inline-flex items-center justify-center rounded-lg border border-slate-200 bg-white p-2 text-slate-700 shadow-md transition hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 md:hidden"
    >
      <Menu size={20} aria-hidden="true" />
    </button>
  );
}

const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const drawerRef = useRef(null);

  const focusableSelector = useMemo(
    () =>
      [
        'a[href]',
        'button:not([disabled])',
        'textarea:not([disabled])',
        'input:not([disabled])',
        'select:not([disabled])',
        '[tabindex]:not([tabindex="-1"])',
      ].join(","),
    []
  );

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!isOpen) return;

    const drawer = drawerRef.current;
    if (!drawer) return;

    const focusable = drawer.querySelectorAll(focusableSelector);
    const firstElement = focusable[0];
    const lastElement = focusable[focusable.length - 1];

    firstElement?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab" || focusable.length === 0) {
        return;
      }

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement?.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement?.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [focusableSelector, isOpen]);

  return (
    <>
      <ToggleButton onOpen={() => setIsOpen(true)} />

      <button
        type="button"
        aria-hidden={!isOpen}
        tabIndex={isOpen ? 0 : -1}
        onClick={() => setIsOpen(false)}
        className={[
          "fixed inset-0 z-40 bg-slate-900/45 transition-opacity duration-300 md:hidden",
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        ].join(" ")}
      />

      <aside
        ref={drawerRef}
        aria-hidden={!isOpen}
        className={[
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-72 border-r border-slate-200 bg-white p-5 shadow-xl transition-transform duration-300 md:hidden",
          isOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight text-slate-900">
            Student Panel
          </h2>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close admin sidebar"
            className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Admin mobile navigation" className="space-y-2">
          {menuItems.map((item) => (
            <MobileSidebarItem
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

export default MobileSidebar;
