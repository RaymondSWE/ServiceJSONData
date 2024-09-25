import React from "react";
import { DNA } from "react-loader-spinner";

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <DNA
        visible={true}
        height="200"
        width="200"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClass="dna-wrapper"
      />
    </div>
  );
};

export default Loader;
