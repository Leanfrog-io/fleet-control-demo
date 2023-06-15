import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  agvs: [
    {
      id: "AGV1",
      batteryLevel: 70,
      position: [4.5, 0, 4.5],
      line: 4.5, // the y-value on which AGV1 moves
      direction: 1, // initially moving right
    },
    {
      id: "AGV2",
      batteryLevel: 24,
      position: [4.5, 0, 2.5],
      line: 2.5,
      direction: 1,
    },
    {
      id: "AGV3",
      batteryLevel: 75,
      position: [4.5, 0, 0.5],
      line: 0.5,
      direction: 1,
    },
    {
      id: "AGV4",
      batteryLevel: 9,
      position: [4.5, 0, -1.5],
      line: -1.5,
      direction: 1,
    },
    {
      id: "AGV5",
      batteryLevel: 70,
      position: [4.5, 0, -3.5],
      line: -3.5,
      direction: 1,
    },
  ],
  selectedAGV: null,
};

export const agvsSlice = createSlice({
  name: "agvs",
  initialState,
  reducers: {
    updateAGV: (state, action) => {
      const { id, changes } = action.payload;
      const agv = state.agvs.find((agv) => agv.id === id);
      if (agv) {
        Object.assign(agv, changes);
      }
    },
    selectAGV: (state, action) => {
      state.selectedAGV = action.payload;
    },
    stopAGV: (state, action) => {
      const agv = state.agvs.find((agv) => agv.id === action.payload);
      if (agv) {
        agv.isMoving = false;
      }
    },
    startAGV: (state, action) => {
      const agv = state.agvs.find((agv) => agv.id === action.payload);
      if (agv && agv.batteryLevel > 0) {
        agv.isMoving = true;
      }
    },

    stopAllAGVs: (state) => {
      state.agvs.forEach((agv) => {
        agv.isMoving = false;
      });
    },
    startAllAGVs: (state) => {
      state.agvs.forEach((agv) => {
        agv.isMoving = true;
      });
    },
  },
});

export const {
  updateAGV,
  selectAGV,
  stopAGV,
  startAGV,
  stopAllAGVs,
  startAllAGVs,
} = agvsSlice.actions;

export const selectAllAGVs = (state) => state.agvs.agvs;
export const selectSelectedAGV = (state) => state.agvs.selectedAGV;
export const selectAGVById = (state, agvId) =>
  state.agvs.agvs.find((agv) => agv.id === agvId);

export default agvsSlice.reducer;
