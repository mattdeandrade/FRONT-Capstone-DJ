import { useDeleteEditMutation } from "./editSlice";
import { useNavigate } from "react-router-dom";

export function DeleteEdit({ id }) {
  const navigate = useNavigate();
  const [deleteEdit] = useDeleteEditMutation();
  const removemark = "\u232B";
  const handleClick = async () => {
    try {
      await deleteEdit(id).unwrap();
      navigate("/edits");
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <button className="delete-button" onClick={handleClick}>
      {removemark}
    </button>
  );
}
