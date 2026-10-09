import AdminResponsive from "@/components/AdminResponsive";
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminResponsive>{children}</AdminResponsive>;
}
