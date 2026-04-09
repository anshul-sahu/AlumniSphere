const StatCard = ({ label, value, icon: Icon }) => {
  return (
    <article className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 transition hover:shadow-md dark:bg-slate-900 dark:ring-slate-800">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {label}
          </p>
          <p className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">
            {value}
          </p>
        </div>
        <span className="rounded-lg bg-slate-100 p-2 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          <Icon className="h-4 w-4" />
        </span>
      </div>
    </article>
  );
};

export default StatCard;
