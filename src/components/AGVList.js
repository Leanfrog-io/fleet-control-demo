import { useDispatch, useSelector } from "react-redux";
import { stopAllAGVs, startAllAGVs, selectAllAGVs } from "../store/agvsSlice";
import AGVListItem from "./AGVListItem";
import Button from "./Button";

const AGVList = () => {
  const dispatch = useDispatch();
  const agvs = useSelector(selectAllAGVs);

  return (
    <div className="flex flex-col h-full">
      <ul role="list" className="w-full overflow-auto divide-y divide-solid">
        {agvs.map((agv) => (
          <AGVListItem key={agv.id} agv={agv} />
        ))}
      </ul>

      <div className="mt-auto space-y-4 p-6">
        <Button onClick={() => dispatch(startAllAGVs())} color="green">
          Start All
        </Button>
        <Button onClick={() => dispatch(stopAllAGVs())} color="red">
          Stop All
        </Button>
      </div>
    </div>
  );
};

export default AGVList;
