export function formatSalary(n) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)}L`;
  return `₹${(n / 1000).toFixed(0)}K`;
}
