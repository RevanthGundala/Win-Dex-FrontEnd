import Header from "../components/Header";
import { FaArrowCircleDown } from "react-icons/fa";

export default function SwapTokens() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div className="bg-blue-500 h-screen flex justify-center py-32">
        <div className="bg-sky-400 text-gray-50 text-center text-2xl h-80 w-1/2 rounded-full flex flex-col items-center">
          Swap
          <input
            className="shadow appearance-none border rounded-full mt-2 mb-2 h-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex items-center justify-center"
            type="text"
            placeholder="0.0"
          />
          <FaArrowCircleDown />
          <input
            className="shadow appearance-none border rounded-full mt-2 h-16 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex items-center justify-center"
            type="text"
            placeholder="0.0"
          />
          <input
            className="shadow appearance-none border rounded-full mt-6 h-16 text-gray-700 text-center leading-tight focus:outline-none focus:shadow-outline flex items-center justify-center"
            type="text"
            placeholder="Select a Token"
          />
        </div>
      </div>
    </div>
  );
}
