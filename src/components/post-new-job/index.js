"use client"
import { Button } from "../ui/button";
import { Dialog, DialogContent , DialogHeader, DialogTitle} from "../ui/dialog";
import { initialpostNewJobFormData, postNewJobFormControls } from "@/utils";
import { useState } from "react";
import CommonForm from "../common-form";

 function PostNewJob({profileInfo}){

    const [showJobDialog, setShowJobDialog] = useState(false);
    const [jobFormData, setJobFormData] = useState({
        ...initialpostNewJobFormData,
        companyName : profileInfo?.recruiterInfo?.companyName
    });

    console.log(profileInfo);

    function handlePostNewButtonValid(){
        return Object.keys(jobFormData).every(control => jobFormData[control]?.trim() !== "");
    }

    return <div>
        <Button onClick={()=> setShowJobDialog(true)}  className="diabled-opacty-60 flex h-11 item-center justify-center px-5">
            Post New Job
        </Button>
        <Dialog open={showJobDialog} onOpenChange={() => {
            setShowJobDialog(false);
            setJobFormData({
                ...initialpostNewJobFormData,
                companyName : profileInfo?.recruiterInfo?.companyName
            })
         }}>
          <DialogContent className="sm:max-w-screen-md h-[600px] overflow-auto">
            <DialogHeader>
                <DialogTitle>Post New Job</DialogTitle>
                <div className="grid gap-4 py-4">
                    <CommonForm
                    buttonText={'Add'}
                    formData={jobFormData}
                    setFormData={setJobFormData}
                    formControls ={postNewJobFormControls}
                    isBtnDisabled = {!handlePostNewButtonValid()}
                    />
                </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
    </div>
}

export default PostNewJob;