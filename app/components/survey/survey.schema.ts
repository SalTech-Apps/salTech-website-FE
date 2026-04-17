import { flattenError, z } from "zod";

export const formSchema = z
  .object({
    email: z
      .string()
      .trim()
      .email("Please enter a valid email address.")
      .max(200, "Email is too long."),
    firstImpression: z.enum(["crystal_clear", "somewhat_clear", "not_clear"]),
    navigationEaseRating: z
      .number({ error: "Please rate navigation ease." })
      .int()
      .min(1, "Please rate navigation ease.")
      .max(5, "Please select a valid navigation rating."),
    contentDepth: z.enum(["very_informative", "good_start_need_more", "not_enough"], {
      error: "Please tell us how informative the content was.",
    }),
    technicalPerformance: z.enum(["perfect", "minor_glitches", "significant_issues"]),
    technicalPerformanceDetails: z
      .string()
      .max(2000, "Please keep details under 2000 characters.")
      .optional()
      .or(z.literal("")),
    investorLensText: z
      .string()
      .min(10, "Please write at least 10 characters.")
      .max(2000, "Please keep your response under 2000 characters."),
    futureInterest: z.boolean({
      error: "Please tell us if you'd revisit for future opportunities.",
    }),
    sectionsVisited: z
      .array(z.enum(["property_listings", "investment_intelligence", "insights_blog"]))
      .min(1, "Please select at least one section you visited."),
    likelihoodToInvest: z
      .number({ error: "Please rate your likelihood to invest." })
      .int()
      .min(1, "Please rate your likelihood to invest.")
      .max(10, "Please select a valid investment likelihood rating."),
    missingMostText: z
      .string()
      .min(10, "Please share at least a couple of sentences.")
      .max(2000, "Please keep your response under 2000 characters."),
    weekKey: z.number().int().min(0),
    deviceInfo: z.string().min(10, "Device info missing.").max(600, "Device info is too long."),
  })
  .superRefine((data, ctx) => {
    if (data.technicalPerformance === "significant_issues") {
      const raw = (data.technicalPerformanceDetails ?? "").trim();
      if (!raw) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Please describe what went wrong.",
          path: ["technicalPerformanceDetails"],
        });
      }
    }
  });

export type FormValues = z.infer<typeof formSchema>;
export type SurveyFormInput = FormValues & { company: string };

export function applySchemaErrors(
  error: z.ZodError,
  setError: (field: keyof FormValues, message: string) => void,
): string | undefined {
  const flattened = flattenError(error);
  const fieldErrors = flattened.fieldErrors as Partial<Record<keyof FormValues, string[] | undefined>>;
  const firstFieldMessage = Object.values(fieldErrors).find(
    (messages) => messages?.[0],
  )?.[0];

  Object.entries(fieldErrors).forEach(([field, messages]) => {
    const msg = messages?.[0];
    if (msg) setError(field as keyof FormValues, msg);
  });

  return firstFieldMessage;
}
