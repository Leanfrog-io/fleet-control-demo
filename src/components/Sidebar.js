import AGVList from "./AGVList";
import AGVDetails from "./AGVDetails";
import { useSelector, useDispatch } from "react-redux";
import { selectSelectedAGV, selectAGV } from "../store/agvsSlice";

const Sidebar = () => {
  const selectedAgv = useSelector(selectSelectedAGV);
  const dispatch = useDispatch();

  const handleBackClick = () => {
    dispatch(selectAGV(null));
  };

  return (
    <div className="flex flex-col h-full w-1/5 min-w-[300px] bg-white border-r border-gray-200">
      <div className="flex flex-col h-full">
        {selectedAgv ? (
          <AGVDetails selectedAGV={selectedAgv} onBackClick={handleBackClick} />
        ) : (
          <AGVList />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
