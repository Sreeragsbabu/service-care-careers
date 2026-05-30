export function Header() {
  return (
    <div className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-16">
        <p className="text-xs font-semibold uppercase tracking-widest text-cyan-500 mb-3">
          We're hiring
        </p>
        <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
          Build your career with{" "}
          <span className="text-cyan-600">ServiceCare</span>
        </h1>
        <p className="text-slate-500 text-base max-w-xl mb-8">
          Join a team that values impact, growth, and people. Explore open roles
          across workforce, workspace, and technology.
        </p>
        {/* Search removed from hero; moved above filters */}
      </div>
    </div>
  );
}
