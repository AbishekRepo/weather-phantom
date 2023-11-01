import React from "react";

function InputBox({ location, handleChange }) {
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
          className="rounded-xl bg-transparent text-white my-5 py-1 px-20"
          style={{
            border: "1px solid white",
          }}
        />
      </form>
    </div>
  );
}

export default InputBox;
