import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { validationSchema } from "../schema";

const Wikipedia = () => {
  const [searchResult, setSearchResult] = useState();
  const [loading, setLoading] = useState(false);
  const [URL, setURL] = useState("");
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
    setSearchResult(result);
    setLoading(false);
  };
  const formik = useFormik({
    initialValues: {
      searchTerm: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setLoading(true);
      setURL(values.searchTerm);
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

        {loading && (
          <div>
            <h1 className="text-2xl font-semibold mb-4 text-center">
              Loading ...
            </h1>
          </div>
        )}
        {!loading && searchResult && searchResult.status !== 200 && (
          <div>
            <h1 className="text-2xl font-semibold mb-4 text-center">
              {searchResult.message}
            </h1>
          </div>
        )}
        {!loading && searchResult && searchResult.status === 200 && (
          <div>
            <h1 className="text-2xl font-semibold mb-4 text-center">
              The number of requests required to reach the "Philosophy" page
              from this URL {"(" + URL + ") "}: {searchResult.data.count}
            </h1>

            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">#</th>
                  <th className="border border-gray-300 px-4 py-2">
                    Visited Page
                  </th>
                </tr>
              </thead>
              <tbody>
                {searchResult.data.visitedPages.map((link, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">
                      {index + 1}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <a href={link} target="_blank" rel="noopener noreferrer">
                        {link}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Wikipedia;
