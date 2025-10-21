import type { ITableState } from "@/Features/Department/types";
import type { IDepartment } from "@/Features/Department/types/departments.type";

export interface IDivision {
  _id: string;
  name: string;
  department: string;
  departmentName: string;
}

export interface IDivisionState {
  departments: IDepartment[];
  divisions: IDivision[];
  tableState: ITableState;
  divisionEditId: string;
  divisionDeleteId: string;
}
