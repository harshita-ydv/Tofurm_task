import React, { useState } from "react";

const FormComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [normal1, setNormal1] = useState(""); // State for the first normal input
  const [normal2, setNormal2] = useState(""); // State for the second normal input
  const [autocompleteInput, setAutocompleteInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [count, setCount] = useState(0); // State to track the count
  const [textArea, setTextArea] = useState("");
  const [errors, setErrors] = useState({}); // To hold the error messages

  const suggestions = ["UI design", "UI design practice", "UI pattern", "Daily UI"];

  // Functions to handle increment and decrement
  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const validateForm = () => {
    const newErrors = {};

    // Normal Input Validation
    if (!normal1) {
      newErrors.normal1 = " please fill the information";
    }

    if (!normal2) {
      newErrors.normal2 = " please fill the information";
    }

    // Email Validation
    if (!email) {
      newErrors.email = "Please provide valid email";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
    }

    // Password Validation
    if (!password) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Autocomplete Validation
    if (!autocompleteInput) {
      newErrors.autocomplete = "Autocomplete input is required";
    }

    // Textarea Validation
    if (!textArea) {
      newErrors.textArea = "Text area cannot be empty";
    }

    // Count Validation (for this example, I will assume a range between 0-10)
    if (count < 0 || count > 10) {
      newErrors.count = "Count must be between 0 and 10";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      console.log("Form submitted successfully");
      // Add your submit logic here
    }
  };

  return (
    <div className="h-[600px] flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          {/* First row (Normal 1, Normal 2, Password) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-left">Normal 1</label>
              <input
                type="text"
                placeholder="Normal 1"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={normal1}
                onChange={(e) => setNormal1(e.target.value)}
              />
              {errors.normal1 && <p className= "text-left text-red-500 text-sm">{errors.normal1}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-left">Normal 2</label>
              <input
                type="text"
                placeholder="Normal 2"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={normal2}
                onChange={(e) => setNormal2(e.target.value)}
              />
              {errors.normal2 && <p className="text-left text-red-500 text-sm">{errors.normal2}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-left">Password</label>
              <input
                type="password"
                placeholder="********"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="text-left text-red-500 text-sm">{errors.password}</p>}
            </div>
          </div>

          {/* Second Row (Email, Autocomplete, Error) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-left">Email</label>
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className=" text-left text-red-500 text-sm">{errors.email}</p>}
            </div> 
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-left">Error</label>
              <input
                type="text"
                placeholder="Error"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={normal2}
                onChange={(e) => setNormal2(e.target.value)}
              />
              {errors.normal2 && <p className=" text-left text-red-500 text-sm">{errors.normal2}</p>}
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2 text-left">Autocomplete</label>
              <input
                type="text"
                placeholder="Search..."
                
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={autocompleteInput}
                onChange={(e) => setAutocompleteInput(e.target.value)}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)} // Delay to handle click on suggestion
              />
              {showSuggestions && autocompleteInput && (
                <ul className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full max-h-40 overflow-y-auto shadow-lg">
                  {suggestions
                    .filter((item) => item.toLowerCase().includes(autocompleteInput.toLowerCase()))
                    .map((item, index) => (
                      <li
                        key={index}
                        onClick={() => setAutocompleteInput(item)}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {item}
                      </li>
                    ))}
                </ul>
              )}
              {errors.autocomplete && <p className=" text-left text-red-500 text-sm">{errors.autocomplete}</p>}
            </div>
           
          </div>

          {/* Third Row (Active, Date) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-left">Active</label>
              <input
                type="text"
                placeholder="UI"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 text-left">Date</label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* Last Row (Text Area, Count Value) */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col">
              <label className="block text-sm font-medium text-gray-700 mb-1 text-left">Text Area</label>
              <textarea
                value={textArea}
                onChange={(e) => setTextArea(e.target.value)}
                placeholder="Enter text here"
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.textArea && <p className=" text-left text-red-500 text-sm">{errors.textArea}</p>}
            </div>




             {/* Number Input (With Increment/Decrement Buttons) */}
  <div className="flex flex-col">
    <label className="block text-sm font-medium text-gray-700 mb-2 text-left">Value</label>
<div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <button
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-l-md"
                  onClick={handleDecrement}
                  type="button"
                >
                  -
                </button>
                <span className="w-full p-2 text-center">{count}</span>
                <button
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-r-md"
                  onClick={handleIncrement}
                  type="button"
                >
                  +
                </button>
              </div>
              {errors.count && <p className=" text-red-500 text-sm">{errors.count}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6 text-center">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormComponent;
