import { divisionsData } from "@/Features/Department/consts/manage-division.const";
import type { ITableState } from "@/Features/Department/types";
import type { IDivisionState } from "@/Features/Department/types/manage-division.type";
import type { RootState } from "@/Redux/store";
import { createSlice, current, type PayloadAction } from "@reduxjs/toolkit";
import type { Updater } from "@tanstack/react-table";
import { toast } from "sonner";

const initialState: IDivisionState = {
  divisions: divisionsData,
  tableState: {
    globalFilter: "",
    sorting: [],
    rowSelection: {},
    pagination: {
      pageIndex: 0,
      pageSize: 10,
    },
  },
  divisionEditId: "",
  divisionDeleteId: "",
};

export const divisionsSlice = createSlice({
  name: "divisions",
  initialState,
  reducers: {
    addDivision: (state, action) => {
      state.divisions = [...state.divisions, action.payload];
      toast.success("Division added succesfully");
      console.log(current(state));
    },
    selectDivisionEditId: (state, action) => {
      state.divisionEditId = action.payload;
    },
    removeDivisionEditId: (state) => {
      state.divisionEditId = "";
    },
    selectDivisionDeleteId: (state, action) => {
      state.divisionDeleteId = action.payload;
    },
    removeDivisionDeleteId: (state) => {
      state.divisionDeleteId = "";
    },
    editDivision: (state, action) => {
      const index = state.divisions.findIndex(
        (c) => c._id === state.divisionEditId
      );
      state.divisions[index] = {
        ...state.divisions[index],
        ...action.payload,
      };
      toast.success("Division updated succesfully");
      state.divisionEditId = "";
    },
    deleteDivision: (state) => {
      state.divisions = state.divisions.filter(
        (division) => division._id !== state.divisionDeleteId
      );
      toast.success("Division deleted succesfully");
      state.divisionDeleteId = "";
    },
    updateTableState: (
      state,
      action: PayloadAction<{
        key: keyof ITableState;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        updater: Updater<any>;
      }>
    ) => {
      const { key, updater } = action.payload;

      const currentValue = state.tableState[key];
      const newValue =
        typeof updater === "function" ? updater(currentValue) : updater;

      state.tableState[key] = newValue;
    },
  },
});

export const {
  addDivision,
  selectDivisionEditId,
  removeDivisionEditId,
  selectDivisionDeleteId,
  removeDivisionDeleteId,
  editDivision,
  deleteDivision,
  updateTableState,
} = divisionsSlice.actions;

export const selectDivisionData = (state: RootState) => state.divisions;

export default divisionsSlice.reducer;
