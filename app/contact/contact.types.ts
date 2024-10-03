import { types } from "util";
import * as yup from "yup";

const contactFormSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last Name is required"),
  email: yup
    .string()
    .email("Email must be a valid email")
    .required("Email Address is required"),
  subject: yup.string().required("Subject is required"),
  content: yup.string().required("Type your message here"),
});

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  content: string;
};
export type { FormValues };
export default contactFormSchema;
