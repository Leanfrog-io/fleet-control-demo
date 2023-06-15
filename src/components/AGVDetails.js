import { ChevronLeftIcon } from "@heroicons/react/solid";
import { useDispatch, useSelector } from "react-redux";
import { stopAGV, startAGV, selectAGVById } from "../store/agvsSlice";
import Button from "./Button";

const AGVDetails = ({ selectedAGV, onBackClick }) => {
  const dispatch = useDispatch();
  const agv = useSelector((state) => selectAGVById(state, selectedAGV));

  if (!agv) {
    throw new Error(`AGV with id ${selectedAGV} not found.`);
  }

  const agvId = agv.id || "AGV";

  return (
    <div className="flex flex-col space-y-4 p-6 h-full">
      <div className="flex items-center space-x-2 mb-4">
        <button
          onClick={onBackClick}
          className="flex items-center text-gray-500 hover:text-gray-700"
          aria-label="Back to fleet"
        >
          <ChevronLeftIcon
            className="h-5 w-5 flex-shrink-0"
            aria-hidden="true"
          />
          <span className="ml-1">Back to fleet</span>
        </button>
      </div>
      <div className="w-full overflow-auto space-y-4 flex-grow">
        {agv ? (
          <>
            <h1 className="text-xl font-semibold mb-4">{agvId}</h1>
            <p>Battery Level: {agv.batteryLevel}%</p>
          </>
        ) : (
          <p>AGV not found.</p>
        )}
      </div>
      {agv && (
        <div className="mt-auto space-y-4">
          <Button onClick={() => dispatch(startAGV(agv.id))} color="green">
            Start {agvId}
          </Button>
          <Button onClick={() => dispatch(stopAGV(agv.id))} color="red">
            Stop {agvId}
          </Button>
        </div>
      )}
    </div>
  );
};

export default AGVDetails;
