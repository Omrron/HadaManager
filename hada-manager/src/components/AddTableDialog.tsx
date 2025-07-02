import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import type { TableType } from "../Types";
import type { YapperDialogContentProps } from "yapperjs";

export const AddTable: React.FC<YapperDialogContentProps<TableType>> = ({resolve,cancel,}) => {
  const {register,handleSubmit,formState: { errors }} = useForm<TableType>({
    reValidateMode: "onChange",
    defaultValues: { capacity:10, name:"שולחן של המגניבים" },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        resolve(data);
      })}
    >
      <div className="form-container">
        <span className="form-input-title">שם</span>
        <input type="text" className="form-input" style={{borderColor:`${errors.name ===  undefined ? "" : "red"}`}} {...register("name", {required:{ value: true, message:"חובה להכניס שם" }})} />
          <span className="form-error" style={{visibility:`${errors.capacity === null ? "hidden" : "visible"}`}}>
            <ErrorMessage errors={errors} name="name" />
          </span>
        <span className="form-input-title" >קיבולת</span>
        <input type="number" className="form-input" style={{borderColor:`${errors.capacity ===  undefined ? "" : "red"}`}} {...register("capacity", {required:{value: true, message:"חובה קיבולת של לפחות אדם אחד"}, min: {value:1, message:"חובה קיבולת של לפחות אדם אחד" }})} />
       
          <div className="form-error" style={{visibility:`${errors.capacity === null ? "hidden" : "visible"}`}}>
            <ErrorMessage errors={errors} name="capacity"/>
          </div>
        
        <div className="flex-container even-flex">
          <button type="submit" className="form-button good">סיים</button>
          <button type="button" className="form-button bad" onClick={cancel}>
            בטל
          </button>
        </div>
      </div>
    </form>
  );
};
