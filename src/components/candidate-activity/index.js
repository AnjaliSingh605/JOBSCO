"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { JobIcon } from "../job-icon";

const statusStyles = {
  Applied:      "bg-blue-50 text-blue-700 border border-blue-200",
  Selected:     "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Rejected:     "bg-red-50 text-red-700 border border-red-200",
};

export default function CandidateActivity({ jobList, jobApplicants }) {
  const uniqueStatus = [...new Set(jobApplicants.flatMap((item) => item?.status))];

  return (
    <div className="mx-auto max-w-4xl px-4">
      <Tabs defaultValue={uniqueStatus[0]} className="w-full">

        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4 pt-24 pb-6 border-b border-gray-200">
          <div>
            <p className="text-sm text-gray-500 mb-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
              500,000+ active listings
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-gray-950">
              Your Activity
            </h1>
          </div>

          {/* TabsList styled as homepage category pills */}
          <TabsList className="flex gap-2 flex-wrap bg-transparent p-0 h-auto">
            {uniqueStatus.map((status, i) => (
              <TabsTrigger
                key={i}
                value={status}
                className="
                  px-4 py-1.5 rounded-full text-sm font-medium border border-gray-300
                  bg-white text-gray-600 transition-all
                  data-[state=active]:bg-gray-950 data-[state=active]:text-white
                  data-[state=active]:border-gray-950 data-[state=active]:shadow-none
                  hover:bg-gray-50
                "
              >
                {status}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {/* Tab panels */}
        <div className="pt-6 pb-24">
          {uniqueStatus.map((status, i) => {
            const filteredJobs = jobList.filter((jobItem) =>
              jobApplicants
                .filter((app) => app.status.includes(status))
                .findIndex(
                  (app) => app.jobID?.toString() === jobItem._id?.toString()
                ) > -1
            );

            return (
              <TabsContent key={i} value={status} className="mt-0 flex flex-col gap-4">
                {filteredJobs.length === 0 ? (
                  <p className="text-sm text-gray-400 py-6">
                    No applications with status "{status}".
                  </p>
                ) : (
                  filteredJobs.map((job, ind) => (
                    <div
                      key={ind}
                      className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl px-5 py-4 hover:border-gray-300 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <JobIcon />
                      </div>

                      <div className="flex-1 min-w-0">
                        <p className="text-[15px] font-semibold text-gray-950 truncate">
                          {job?.title}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {job?.companyName}
                        </p>
                      </div>

                      <span
                        className={`ml-auto flex-shrink-0 text-xs font-medium px-3 py-1 rounded-full ${
                          statusStyles[status] ?? "bg-gray-100 text-gray-600 border border-gray-200"
                        }`}
                      >
                        {status}
                      </span>
                    </div>
                  ))
                )}
              </TabsContent>
            );
          })}
        </div>

      </Tabs>
    </div>
  );
}