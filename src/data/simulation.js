import { updateAGV, selectAGVById, stopAGV } from "../store/agvsSlice";

const MAX_POSITION = 4.5;
const MIN_POSITION = -4.5;
const SPEED = 0.1;
const BATTERY_DRAIN_RATE = 1;
const DRAIN_BATTERY_CYCLE = 6;

const updateAGVState = (dispatch, id, changes) => {
  dispatch(updateAGV({ id, changes }));
};

const moveAGV = (dispatch, id, position, direction) => {
  let newPosition = [...position];
  newPosition[0] += direction * SPEED;

  if (newPosition[0] > MAX_POSITION || newPosition[0] < MIN_POSITION) {
    newPosition[0] = Math.sign(newPosition[0]) * MAX_POSITION;
    direction *= -1;
  }

  updateAGVState(dispatch, id, { position: newPosition, direction });
};

const drainBattery = (dispatch, id, batteryLevel) => {
  batteryLevel =
    batteryLevel - BATTERY_DRAIN_RATE > 0
      ? batteryLevel - BATTERY_DRAIN_RATE
      : 0;

  updateAGVState(dispatch, id, { batteryLevel });

  if (batteryLevel === 0) {
    dispatch(stopAGV(id));
  }
};

export const simulateAGVData = (dispatch, getState) => {
  const agvIds = ["AGV1", "AGV2", "AGV3", "AGV4", "AGV5"];

  let batteryDrainCycleCounter = {};
  agvIds.forEach((id) => (batteryDrainCycleCounter[id] = 0));

  const intervalId = setInterval(() => {
    agvIds.forEach((id) => {
      const agv = selectAGVById(getState(), id);
      if (agv && agv.isMoving && agv.batteryLevel > 0) {
        moveAGV(dispatch, id, agv.position, agv.direction);
        if (batteryDrainCycleCounter[id] >= DRAIN_BATTERY_CYCLE) {
          drainBattery(dispatch, id, agv.batteryLevel);
          batteryDrainCycleCounter[id] = 0; // Reset the counter
        } else {
          batteryDrainCycleCounter[id] += 1; // Increment the counter
        }
      }
    });
  }, 250);

  return intervalId;
};
