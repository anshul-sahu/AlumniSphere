import { Link } from "react-router-dom";

const QuickActionButton = ({ label, to, icon: Icon }) => {
  return (
    <Link
      to={to}
      className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-700"
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
};

export default QuickActionButton;
