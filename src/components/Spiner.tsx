import {  CSSProperties } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";

const override: CSSProperties = {
  display: "block",
  position:'absolute',
  top:'50%'
  ,left:"50%"
};



function Spiner( ) {
  return (
    <>
      <ScaleLoader
        color={`#03a9fc`}
        loading={true}
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </>
  );
}

export default Spiner;
