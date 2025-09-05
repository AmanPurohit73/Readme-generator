import { FileText } from "lucide-react";
import React from "react";

const Title = () => {
  return (
    <header className="w-full px-6 pt-8">
      <div className="w-full bg-[#0d1117] border border-[#1f2937] rounded-xl shadow-lg py-6 px-8 flex items-center justify-center gap-4 text-center">
        <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-blue-600/20">
          <FileText className="w-8 h-8 text-blue-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">
            README Generator
          </h1>
          <p className="text-gray-300">
            Generate professional README files for your GitHub repositories
          </p>
        </div>
      </div>
    </header>
  );
};

export default Title;