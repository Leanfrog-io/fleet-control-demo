import { useDispatch } from "react-redux";
import { selectAGV } from "../store/agvsSlice";
import { ChevronRightIcon } from "@heroicons/react/solid";

const statusColors = {
  online: "text-green-400 bg-green-400/10",
  warning: "text-yellow-400 bg-yellow-400/10",
  critical: "text-red-400 bg-red-400/10",
  offline: "text-gray-500 bg-gray-100/10",
};

const getBatteryStatus = (batteryLevel) => {
  if (batteryLevel === 0) {
    return "offline";
  } else if (batteryLevel <= 5) {
    return "critical";
  } else if (batteryLevel <= 20) {
    return "warning";
  } else {
    return "online";
  }
};

const AGVListItem = ({ agv }) => {
  const dispatch = useDispatch();

  return (
    <li
      className="relative flex items-center space-x-4 py-4 cursor-pointer hover:bg-gray-200 px-4 w-full"
      onClick={() => dispatch(selectAGV(agv.id))}
    >
      <div className="flex items-center gap-x-3 w-full">
        <div
          className={`${
            statusColors[getBatteryStatus(agv.batteryLevel)]
          } flex-none rounded-full p-1`}
        >
          <div className="h-2 w-2 rounded-full bg-current" />
        </div>
        <div className="min-w-0 flex-auto">
          <h2 className="min-w-0 text-sm font-semibold leading-6 text-gray-800">
            {agv.id}
          </h2>
          <p className="text-xs leading-5 text-gray-400">
            Battery Level: {agv.batteryLevel}%
          </p>
        </div>
      </div>
      <ChevronRightIcon
        className="h-5 w-5 flex-none text-gray-400"
        aria-hidden="true"
      />
    </li>
  );
};

export default AGVListItem;
