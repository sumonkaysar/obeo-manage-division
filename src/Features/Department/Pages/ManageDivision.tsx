import { Button } from "@/components/ui/button";
import AddDivisionForm from "@/Features/Department/Components/ManageDivision/AddDivisionForm";
import DivisionTable from "@/Features/Department/Components/ManageDivision/DivisionTable";

const ManageDivision = () => {
  return (
    <div className="px-3 py-2 bg-[#F4F4F5] min-h-screen">
      <div className="bg-white shadow-md rounded-xs mx-auto border">
        <div className="flex justify-between items-center border-b py-3 px-4">
          <h2 className="text-xl font-semibold">Division List</h2>
          <div className="flex items-center gap-3">
            <AddDivisionForm />
            <Button>Manage Division</Button>
          </div>
        </div>
        <div className="px-4 py-3">
          <DivisionTable />
        </div>
      </div>
    </div>
  );
};

export default ManageDivision;
