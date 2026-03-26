import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

function CommonForm({action, isBtnDisabled, formControls, buttonText, btnType, formData, setFormData, handleFileChange}){
   
    // componentType -> Input, Select, Textare , CheckBox, radiobtn

    function RenderInputByComponentType({getcurrControl, id}){
       let content = null;
       switch(getcurrControl.componentType){
          case 'input':
            content = <div key={id} className="relative flex items-center mt-8">
                           <Input type="text" 
                           disabled={getcurrControl.disabled}
                           placeholder={getcurrControl.placeholder}
                           name={getcurrControl.name}
                           id={getcurrControl.name}
                           value={formData[getcurrControl.name]}
                           onChange={(event)=>setFormData({
                            ...formData,
                            [event.target.name] : event.target.value
                           })}
                           className="w-full rounded-md h-[60px px-4 border bg-gray-100 text-lg outline-none drop-shadow-sn transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                      </div>

          break;

          case "file":
            content = <Label key={id}
                         htmlFor={getcurrControl.name}
                         className="flex bg-gray-100 items-center px-3 py-3 mx-auto mt-6 text-center border-2 border-dashed rounded-lg cursor-pointer"
                      >
                <h2>{getcurrControl.label}</h2>
                <Input onChange={handleFileChange}
                id={getcurrControl.name}
                type="file"
                />
            </Label>
            break;

          default:
          content = <div key={id} className="relative flex item-center mt-8">
                           <Input type="text" 
                           disabled={getcurrControl.disabled}
                           placeholder={getcurrControl.placeholder}
                           name={getcurrControl.name}
                           id={getcurrControl.name}
                           value={formData[getcurrControl.name]}
                           onChange={(event)=>setFormData({
                            ...formData,
                            [event.target.name] : event.target.value
                           })}
                           className="w-full rounded-md h-[60px px-4 border bg-gray-100 text-lg outline-none drop-shadow-sn transition-all duration-200 ease-in-out focus:bg-white focus:drop-shadow-lg focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                      </div>
            break;
       }

       return content;
    }

    return (
        <form action={action}>
          {
            formControls.map((control,id) => 
  RenderInputByComponentType({ getcurrControl: control, id })
)
          }
          <div className="mt-6 w-full">
            <Button type={btnType || 'submit'}
            className="diabled-opacty-60 flex h-11 item-center justify-center px-5" disabled={isBtnDisabled}>{buttonText}</Button>
          </div>
        </form>
    )
}

export default CommonForm;