import { ErrorMessage } from "@hookform/error-message";
import { useForm } from "react-hook-form";
import type { YapperDialogContentProps } from "yapperjs";
import type { RoomType } from "../Types";

export const AddRoom: React.FC<YapperDialogContentProps<RoomType>> = ({
  resolve,
  cancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomType>({
    reValidateMode: "onChange",
    defaultValues: { capacity: 10, name: 'חד"א חדש' },
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        resolve(data);
      })}
    >
      <div className="form-container">
        <span style={{color:"black", fontSize:"large", margin:"5px"}}>שם</span>
        <input type="text" {...register("name", {required:{ value: true, message:"חובה להכניס שם" }})} />
        {errors.name && (
          <span style={{color:"black", fontSize:"large", margin:"20px"}}>
            <ErrorMessage errors={errors} name="name" />
          </span>
        )}
        <span style={{color:"black", fontSize:"large", margin:"5px"}} >קיבולת</span>
        <input type="number" {...register("capacity", {min: {value:1, message:"חובה קיבולת של לפחות אדם אחד" }})} />
        {errors.capacity && (
          <div style={{color:"black", fontSize:"large", margin:"20px"}}>
            <ErrorMessage errors={errors} name="capacity"/>
          </div>
        )}
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
