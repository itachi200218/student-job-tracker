function hasDuplicateApplications(applications) {
  const seen = new Set();

  for (const app of applications) {
    const key = ${app.company.toLowerCase()}-${app.role.toLowerCase()};
    if (seen.has(key)) {
      return true;
    }
    seen.add(key);
  }

  return false;
}

// Example
const apps = [
  { company: "Google", role: "SDE Intern" },
  { company: "google", role: "SDE Intern" }, // duplicate
  { company: "Amazon", role: "Backend" }
];

console.log(hasDuplicateApplications(apps)); // true
