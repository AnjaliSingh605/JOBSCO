import {
  Card,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"

export default function CommonCard({ icon, title, description, footercontent }) {
  return (
    <Card className="flex flex-col justify-between rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-[0_4px_20px_rgba(59,130,246,0.08)] transition-all duration-200 cursor-pointer overflow-hidden group">

      <CardHeader className="p-6 pb-4 space-y-4">
        {icon && (
          <div className="w-11 h-11 rounded-xl bg-blue-100 border border-blue-150 flex items-center justify-center text-blue-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors duration-200">
            {icon}
          </div>
        )}
        <div className="space-y-1.5">
          {title && (
            <CardTitle className="text-sm font-semibold text-[#1a1f36] leading-snug tracking-tight">
              {title}
            </CardTitle>
          )}
          {description && (
            <CardDescription className="text-xs text-slate-400 leading-relaxed line-clamp-2">
              {description}
            </CardDescription>
          )}
        </div>
      </CardHeader>

      {footercontent && (
        <CardFooter className="px-6 py-3 border-t border-blue-50 bg-blue-50/40 group-hover:bg-blue-50/70 transition-colors duration-200">
          {footercontent}
        </CardFooter>
      )}
    </Card>
  )
}