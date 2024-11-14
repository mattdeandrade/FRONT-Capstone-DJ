import { useDeleteTrackMutation } from "./trackSlice";
import { useNavigate } from "react-router-dom";

export function DeleteTrack({ id }) {
  const navigate = useNavigate();
  const [deleteTrack] = useDeleteTrackMutation();
  const removemark = "\u232B";
  const handleClick = async () => {
    try {
      await deleteTrack(id).unwrap();
      navigate("/tracks");
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
