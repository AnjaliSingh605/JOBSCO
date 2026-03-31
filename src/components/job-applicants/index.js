"use client"
import { Drawer, DrawerContent } from "../ui/drawer";
import CandidateList from "../candidate-list";
import { ScrollArea } from "../ui/scroll-area";

export default function JobApplicants({showApplicantDrawer,
                                      setShowApplicantDrawer, 
                                      showCurrCandidateDetailModel, 
                                      setShowCurrCandidateDetailsModel, 
                                      currCandidateDetails,
                                      setCurrCandidateDetails,
                                      jobItem,
                                     jobApplications}){
    return (
       <Drawer open={showApplicantDrawer} onOpenChange={setShowApplicantDrawer}>
         <DrawerContent className="max-h-[50vh]">
           <ScrollArea className="h-auto overflow-y-auto ">
               <CandidateList 
                 currCandidateDetails={currCandidateDetails}
                 setCurrCandidateDetails={setCurrCandidateDetails}
                 jobApplications={jobApplications}
                 showCurrCandidateDetailModel={showCurrCandidateDetailModel}
                 setShowCurrCandidateDetailsModel={setShowCurrCandidateDetailsModel}
               />
           </ScrollArea>
         </DrawerContent>
       </Drawer>
    );
}