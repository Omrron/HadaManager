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
      <input type="text" {...register("name", { required: true })} />
      {errors.name && (
        <span className="error-message">
          <ErrorMessage errors={errors} name="name" />
        </span>
      )}
      <input type="number" {...register("capacity", { min: 1 })} />
      {errors.capacity && (
        <span className="error-message">
          <ErrorMessage errors={errors} name="chairCount" />
        </span>
      )}
      <button type="submit">submit</button>
      <button type="button" onClick={cancel}>
        cancel
      </button>
    </form>
  );
};
