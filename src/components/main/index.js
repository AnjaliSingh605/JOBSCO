"use client"
import { chips } from "@/utils"
import { Button } from "../ui/button"
import { Briefcase, User } from "lucide-react"
import { useRouter } from "next/navigation"

export default function MainPage({ProfileInfo, user}) {
    
  const router = useRouter();
  return (
    <div className="flex flex-col items-center text-center pb-16 px-4 sm:px-8 min-h-screen justify-center">

      {/* Badge */}
      <div className="flex items-center gap-2 border border-black/5 rounded-full px-4 py-1.5 mb-6">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
        <span className="text-xs sm:text-sm text-gray-500">500,000+ active listings</span>
      </div>

      {/* Headline */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-gray-900 leading-tight tracking-tight mb-2">
        Find your next great
      </h1>

      <div className="flex items-center gap-2 sm:gap-4 mb-5 flex-wrap justify-center">
        <div className="h-0.5 w-8 sm:w-12 bg-blue-400 rounded-full" />
        <span className="text-3xl sm:text-5xl lg:text-6xl font-semibold text-blue-700 tracking-tight">
          opportunity
        </span>
        <div className="h-0.5 w-8 sm:w-12 bg-blue-400 rounded-full" />
      </div>

      {/* Subtext */}
      <p className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-xs sm:max-w-sm mb-10">
        Thousands of jobs across tech, design, finance, and more — updated daily.
      </p>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mb-10 w-full sm:w-auto max-w-xs sm:max-w-none">
        <Button className="w-full sm:w-auto gap-2 cursor-pointer px-8 py-6 rounded-xl text-sm"
        onClick={()=> router.push('/jobs')}>
          <Briefcase size={16} />
         {
             user ? ProfileInfo?.role === 'candidate' ? "Browse Jobs" : "Jobs Dashboard" : "Find Jobs"
         }
        </Button>

        <Button variant="outline" className="w-full cursor-pointer sm:w-auto gap-2 px-8 py-6 rounded-xl text-sm"
          onClick={()=> router.push(user ? ProfileInfo?.role === 'candidate' ? '/activity' : '/jobs' : '/jobs')}>
          <User size={16} />
          {
          user ? ProfileInfo?.role === 'candidate' ? "Your Activity" : "Post New Jobs" : "Post New Jobs"
          }
        </Button>
      </div>

      {/* Chips */}
      <div className="flex flex-wrap gap-2 justify-center max-w-xs sm:max-w-md lg:max-w-lg">
        {chips.map((chip) => (
          <span
            key={chip.label}
            className="text-xs font-medium rounded-full px-4 py-1.5 hover:opacity-75 transition-opacity"
            style={{ background: chip.bg, color: chip.color }}
          >
            {chip.label}
          </span>
        ))}
      </div>

    </div>
  )
}