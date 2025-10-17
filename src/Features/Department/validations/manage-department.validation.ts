import z from "zod";

export const divisionZodSchema = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Division name is required"
          : "Division name must be a string",
    })
    .nonempty("Division name can't be blank"),
});

export const divisionUpdateZodSchema = z.object({
  name: z
    .string("Division name must be a string")
    .nonempty("Division name can't be blank")
    .optional(),
});
