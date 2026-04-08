"use client"
import { memberShipPlans } from "@/utils"
import { JobIcon } from "../job-icon"
import { Button } from "../ui/button"

const FEATURED_INDEX = 1 // Tier-2 is the featured plan

export default function MemberShip() {
  return (
    <div className="mx-auto max-w-7xl px-4">
      <div className="flex flex-col gap-1 border-b pb-6 pt-24">
        <h1 className="text-4xl font-medium tracking-tight text-gray-900">
          Choose your best plan
        </h1>
        <p className="text-sm text-gray-500">
          Simple, transparent pricing for every team size
        </p>
      </div>

      <div className="py-12">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {memberShipPlans.map((plan, i) => {
            const isFeatured = i === FEATURED_INDEX
            return (
              <div
                key={i}
                className={`flex flex-col gap-4 rounded-xl p-6 transition-all hover:shadow-md ${
                  isFeatured
                    ? "border-2 border-blue-500 bg-white shadow-sm"
                    : "border border-gray-300 bg-white hover:border-gray-400"
                }`}
              >
                {/* Badge */}
                {isFeatured && (
                  <span className="w-fit rounded-md bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                    Most popular
                  </span>
                )}

                {/* Icon + Tier label */}
                <div className="flex flex-col gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                    <JobIcon className="h-5 w-5 text-gray-700" />
                  </div>
                  <p className="text-sm font-medium text-gray-500">{plan.heading}</p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-semibold text-gray-900">
                    ${plan.price.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-400">/ yr</span>
                </div>

                {/* Type pill */}
                <span className="w-fit rounded-md bg-gray-100 px-3 py-1 text-xs text-gray-500">
                  {plan.type}
                </span>

                {/* Divider */}
                <hr className="border-gray-100" />

                {/* Feature list */}
                <ul className="flex flex-col gap-2">
                  {plan.features?.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-blue-50 text-blue-600 text-xs">
                        ✓
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Spacer pushes button to bottom */}
                <div className="flex-1" />

                {/* CTA Button */}
                <Button
                  className={`w-full rounded-lg py-2.5 text-sm font-medium transition-colors ${
                    isFeatured
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "border border-gray-300 bg-white text-gray-800 hover:bg-blue-600 hover:text-white"
                  }`}
                >
                  {plan.type === "enterprise" ? "Contact sales" : "Get premium"}
                </Button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}