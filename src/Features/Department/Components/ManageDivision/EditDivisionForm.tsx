import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  editDivision,
  removeDivisionEditId,
  selectDivisionData,
} from "@/Features/Department/departmentSlices/manage-divison.slice";
import { divisionUpdateZodSchema } from "@/Features/Department/validations/manage-division.validation";
import { useAppDispatch, useAppSelector } from "@/Redux/hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type z from "zod";

const EditDivisionForm = () => {
  const { divisions, divisionEditId, departments } =
    useAppSelector(selectDivisionData);
  const dispatch = useAppDispatch();
  const prevData = divisions.find((d) => d._id === divisionEditId);
  const form = useForm({
    resolver: zodResolver(divisionUpdateZodSchema),
    values: {
      name: prevData?.name || "",
      department: prevData?.department || "",
    },
  });

  const handleSubmit = async (
    data: z.infer<typeof divisionUpdateZodSchema>
  ) => {
    try {
      const updatedData = {
        name: data.name,
        department: data.department,
        departmentName: departments.find((dept) => dept._id === data.department)
          ?.name,
      };

      dispatch(editDivision(updatedData));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog
      open={!!divisionEditId}
      onOpenChange={(open: boolean) => {
        if (!open) {
          dispatch(removeDivisionEditId());
        }
      }}
    >
      <DialogContent
        className="p-0 overflow-hidden min-w-11/12"
        aria-describedby="EditDivision"
      >
        <DialogHeader className="sr-only">
          <DialogTitle className="text-xl">Edit Division</DialogTitle>
          <DialogDescription>Here you will Edit Division</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="border">
            <h2 className="text-xl font-semibold border-b pt-1 pb-3 px-4">
              Edit Division
            </h2>
            <Form {...form}>
              <form
                id="editDivision"
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6 px-6 py-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                      <FormLabel className="justify-end text-[#212529]">
                        Division Name <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Division Name" {...field} />
                      </FormControl>
                      <FormDescription className="sr-only">
                        Enter Division Name.
                      </FormDescription>
                      <div />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="department"
                  render={({ field }) => (
                    <FormItem className="grid grid-cols-[1fr_3fr] gap-4">
                      <FormLabel className="justify-end text-[#212529]">
                        Department Name<span className="text-red-500">*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a department" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {departments.map((dept) => (
                            <SelectItem key={dept._id} value={dept._id}>
                              {dept.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription className="sr-only">
                        Select a Department
                      </FormDescription>
                      <div />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
        </div>
        <DialogFooter className="p-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" form="editDivision">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditDivisionForm;
