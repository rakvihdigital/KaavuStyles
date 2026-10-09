import type { ReactNode } from "react";
export default function AdminResponsive({ children }: { children: ReactNode }) {
  return <div className="admin-responsive min-w-0 w-full">{children}</div>;
}
