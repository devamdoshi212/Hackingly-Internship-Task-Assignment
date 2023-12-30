import * as Yup from "yup";
export const validationSchema = Yup.object({
  searchTerm: Yup.string()
    .required("Please enter a search term")
    .matches(
      /^https:\/\/en\.wikipedia\.org\/wiki\//,
      'Search term must start with "https://en.wikipedia.org/wiki/"'
    ),
});
