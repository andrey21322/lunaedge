import React from "react";

interface FormProps {
  handleSubmit: () => void;
}

const Signupbtn: React.FC<FormProps> = ({ handleSubmit }) => {
  return (
    <div className="flex items-center justify-center mt-4">
      <div>
        <button
          className="
          shadow 
          bg-purple-500 
          hover:bg-purple-400 
          focus:shadow-outline 
          focus:outline-none 
          text-white font-bold 
          py-2 px-4 
          rounded"
          type="button"
          onClick={() => handleSubmit()}
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default Signupbtn;
