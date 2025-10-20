import TableActions from "@/Features/Department/Components/ManageDivision/TableActions";
import TableColumnHeader from "@/Features/Department/Components/ManageDivision/TableColumnHeader";
import type { IDivision } from "@/Features/Department/types/manage-division.type";
import type { ColumnDef } from "@tanstack/react-table";

export const tableColumns: ColumnDef<IDivision>[] = [
  {
    accessorKey: "sl",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="SL" />
    ),
    cell: ({ row }) => <div className="px-3">{row.index + 1}</div>,
    enableHiding: false,
    sortingFn: (rowA, rowB) => {
      return rowA.index + 1 - (rowB.index + 1);
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <TableColumnHeader column={column} columnName="Division Name" />
    ),
    cell: ({ row }) => <div className="px-3">{row.getValue("name")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const { _id } = row.original;
      return <TableActions id={_id} />;
    },
  },
];
