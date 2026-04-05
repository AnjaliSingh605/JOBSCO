"use client"
import { AlignJustify } from "lucide-react"
import { SheetTrigger, SheetContent, Sheet , SheetTitle} from "../ui/sheet"
import { Button } from "../ui/button"
import Link from "next/link"
import { UserButton } from "@clerk/nextjs"


function Header({profileInfo, user}) {

    const menuItems = [
        {
            label: 'Home',
            path: '/',
            show: true
        },
        {
            label: 'Login',
            path: '/sign-in',
            show: !user,
        },
        {
            label: 'Register',
            path: '/sign-up',
            show: !user,
        },
        {
            label: 'Jobs',
            path: '/jobs',
            show: user,
        },
        {
            label: 'Activity',
            path: '/activity',
            show: profileInfo?.role === 'candidate',
        },
        {
            label: 'Membership',
            path: '/membership',
            show: user,
        },
        {
            label: 'Account',
            path: '/account',
            show: user,
        },
    ]

    return (
       <header className="w-full border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="text-lg font-bold tracking-widest text-gray-900 hover:text-blue-600 transition-colors">
          JOBSCO
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1">
          {menuItems.map((item, id) =>
            item.show ? (
              <Link
                key={id}
                href={item.path}
                onClick={() => sessionStorage.removeItem("filterParams")}
                className="px-4 py-2 text-sm font-medium text-gray-600 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-all"
              >
                {item.label}
              </Link>
            ) : null
          )}
          <div className="ml-2 pl-3 border-l border-gray-200">
            <UserButton afterSignOutUrl="/" />
          </div>
        </nav>

        {/* Mobile Trigger */}
        <div className="lg:hidden flex items-center gap-3">
          <UserButton afterSignOutUrl="/" />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-lg">
                <AlignJustify className="h-5 w-5 text-gray-700" />
                <span className="sr-only">Toggle Navigation Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72">
              <SheetTitle className="text-left text-lg font-bold tracking-widest text-gray-900">
                JOBSCO
              </SheetTitle>
              <div className="flex flex-col gap-1 mt-6">
                {menuItems.map((item, id) =>
                  item.show ? (
                    <Link
                      key={id}
                      href={item.path}
                      onClick={() => sessionStorage.removeItem("filterParams")}
                      className="px-4 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:text-blue-600 hover:bg-blue-50 transition-all"
                    >
                      {item.label}
                    </Link>
                  ) : null
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  )
}

export default Header