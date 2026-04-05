"use client"
import { memberShipPlans } from "@/utils"
import { JobIcon } from "../job-icon"
import CommonCard from "../commonCard"

export default function memberShip(){
    return(
        <div className="mx-auto max-w-7xl ">
            <div className="flex items-baseline justify-btween border-b pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-950">
                    Choose Your Best Plan
                </h1>
            </div>
            <div className="py-20 pb-24 pt-6">
               <div className="container mx-auto p-0 space-y-8">
                <div className="grid grid-cols-1gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                    {
                        memberShipPlans.map((plan) => <CommonCard
                                 icon={
                                    <div className="flex justify-between">
                                        <div><JobIcon/></div>
                                        <h1 className="font-bold text-2xl">{plan.heading}</h1>
                                    </div>
                                 }
                                 title={`$ ${plan.price} /yr`}
                                 description={plan.type}
                                 footerContent={
                                    <Button className="diabled-opacty-60 flex h-11 item-center justify-center px-5">Get Premium</Button>
                                 }
                            />
                        )
                    }
                </div>
               </div>
            </div>

        </div>
    )
}