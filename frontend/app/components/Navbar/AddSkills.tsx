import React from "react";

export default function AddSkills() {
  return (
    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto  sm:pr-0">
      <div className="hidden lg:block">
        <button
          className="text-Blueviolet text-lg font-medium ml-9 py-5 px-16 transition duration-150 ease-in-out rounded-full bg-semiblueviolet hover:text-white hover:bg-Blueviolet"
          onClick={(e) => {
            e.preventDefault();
            console.log("Add Skills")
          }}
        >
          Add Skills
        </button>
      </div>
    </div>
  );
}
