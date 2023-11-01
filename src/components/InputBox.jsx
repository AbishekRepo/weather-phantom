import React from "react";
import { useWeatherAppContext } from "../context/context";

function InputBox({ location, handleChange }) {
  const { isError } = useWeatherAppContext();

  function handleSumbit(e) {
    e.preventDefault();
  }
  return (
    <div>
      <form
        className="flex items-center justify-center"
        onSubmit={handleSumbit}
      >
        <input
          type="text"
          placeholder="Enter location here"
          value={location}
          onChange={handleChange}
          required
          className="rounded-xl bg-transparent text-white my-2 py-1 px-5 sm:px-20"
          style={{
            border: "1px solid white",
          }}
        />
      </form>
      {isError && (
        <p className="text-red-400 text-center">please enter valid city</p>
      )}
    </div>
  );
}

export default InputBox;
