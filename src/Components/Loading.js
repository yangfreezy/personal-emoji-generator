import React from "react";

const Loading = () => {
  return (
    <div className="loading">
      <div className="circle">
        <div className="circle__el"></div>
      </div>
      <div className="circle">
        <div className="circle__el circle__el_two"></div>
      </div>
      <div className="circle">
        <div className="circle__el circle__el_three"></div>
      </div>
    </div>
  );
};

export default Loading;
