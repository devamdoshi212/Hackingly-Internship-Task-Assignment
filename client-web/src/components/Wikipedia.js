import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { validationSchema } from "../schema";

const Wikipedia = () => {
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState(false);

  const SumbitHandler = async (searchTerm) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      searchTerm: searchTerm,
      auth: 0,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    const response = await fetch(
      "http://localhost:9999/search",
      requestOptions
    );
    const result = await response.json();
    setSearchResult(result.data);
    setLoading(false);
  };
  const formik = useFormik({
    initialValues: {
      searchTerm: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      SumbitHandler(values.searchTerm);
    },
  });
  useEffect(() => {
    formik.values.searchTerm = "";
    setLoading(false);
    setSearchResult();
  }, []);
  return (
    <div className="min-h-screen mx-8 px-56 items-center justify-center bg-gray-100">
      <div className="max-w-screen-lg w-full p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Wikipedia Search
        </h1>

        <form onSubmit={formik.handleSubmit}>
          <div className="flex">
            <input
              type="text"
              id="searchTerm"
              name="searchTerm"
              placeholder="Enter your search term"
              className={`w-full px-4 py-2 border ${
                formik.errors.searchTerm ? "border-red-500" : "border-gray-300"
              } rounded-l-md focus:outline-none focus:ring focus:border-blue-300`}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.searchTerm}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Search
            </button>
          </div>

          {formik.touched.searchTerm && formik.errors.searchTerm ? (
            <div className="text-red-500 mt-2">{formik.errors.searchTerm}</div>
          ) : null}
        </form>
      </div>
      {loading && (
        <div>
          <h1 className="text-2xl font-semibold mb-4 text-center">
            Loading ...
          </h1>
        </div>
      )}
      {searchResult && (
        <div>
          <h1 className="text-2xl font-semibold mb-4 text-center">
            The number of requests required to reach the "Philosophy" page:
            {searchResult.count}
          </h1>
          <ul>
            {searchResult.visitedPages.map((link, index) => (
              <li key={index}>
                <a href={link} target="_blank" rel="noopener noreferrer">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Wikipedia;
