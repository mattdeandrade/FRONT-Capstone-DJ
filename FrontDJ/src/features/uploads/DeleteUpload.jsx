import { useDeleteUploadMutation } from "./uploadsSlice";
import { useNavigate } from "react-router-dom";

export function DeleteUpload({ id }) {
  const navigate = useNavigate();
  const [deleteUpload] = useDeleteUploadMutation();
  const removemark = "\u232B";
  const handleClick = async () => {
    try {
      await deleteUpload(id).unwrap();
      navigate("/uploads");
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
