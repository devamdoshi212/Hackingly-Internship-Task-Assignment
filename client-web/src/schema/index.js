import * as Yup from "yup";
export const validationSchema = Yup.object({
  searchTerm: Yup.string().required("Please enter a search term"),
});
