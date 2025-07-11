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
    defaultValues: { name: 'חד"א חדש' },
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
          <span className="form-error" style={{visibility:`${errors.name === null ? "hidden" : "visible"}`}}>
            <ErrorMessage errors={errors} name="name" />
          </span>
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
