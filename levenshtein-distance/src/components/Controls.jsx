import { AiFillForward } from "react-icons/ai";
import { IoCaretForwardSharp } from "react-icons/io5";
// import { FaExpandArrows } from "react-icons/fa";
import { FaExpandArrowsAlt, FaArrowRight } from "react-icons/fa";

const Controls = ({ solveNextDiagonal, solveMatrix, completeMatrix }) => {
  return (
    <section className="flex gap-4">
      <button
        onClick={() => {
          if (!completeMatrix) solveNextDiagonal();
        }}
        className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
      >
        Next Step
        <FaArrowRight className="ml-1 text-xl" />
      </button>
      <button
        onClick={() => {
          if (!completeMatrix) solveMatrix();
        }}
        className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800"
      >
        Fill Matrix
        <FaExpandArrowsAlt className="ml-1 text-xl" />
      </button>
    </section>
  );
};

export default Controls;
