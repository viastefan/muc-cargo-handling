function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
}

export function Assignee({ name }: { name: string }) {
  return (
    <span className="admin-assignee">
      <span className="admin-assignee__avatar">{initials(name)}</span>
      <span className="admin-assignee__name">{name}</span>
    </span>
  );
}
