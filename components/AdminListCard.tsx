import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export default function AdminListCard({ title, subtitle, badge, image, children }: { title: string; subtitle?: string; badge?: ReactNode; image?: ReactNode; children: ReactNode }) {
  return <details className="group/list rounded-xl border border-ivory-300 bg-white shadow-sm overflow-hidden">
    <summary className="list-none cursor-pointer p-4 flex items-center gap-3 [&::-webkit-details-marker]:hidden">
      {image}
      <div className="flex-1 min-w-0"><div className="flex items-center gap-2"><span className="text-sm font-medium leading-snug line-clamp-2">{title}</span><ChevronDown className="w-4 h-4 shrink-0 text-gold transition-transform group-open/list:rotate-180" /></div>{subtitle && <p className="text-xs text-ink-muted mt-1 truncate">{subtitle}</p>}</div>
      {badge && <div className="shrink-0 rounded-full bg-ivory-200 px-2.5 py-1 text-[11px] font-medium text-crimson">{badge}</div>}
    </summary>
    <div className="border-t border-ivory-300 bg-ivory-50/60 p-4 space-y-4 text-sm">{children}</div>
  </details>;
}
