import type { ITableState } from "@/Features/Department/types";

export interface IDivision {
  _id: string;
  name: string;
}

export interface IDivisionState {
  divisions: IDivision[];
  tableState: ITableState;
  divisionEditId: string;
  divisionDeleteId: string;
}
