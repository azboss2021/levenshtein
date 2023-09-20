import React from "react";

const Changes = ({ changes }) => {
  return (
    <section className="text-white text-xl">
      {changes.map((change, index) => (
        <h3 key={"change_" + index}>{change}</h3>
      ))}
    </section>
  );
};

export default Changes;
