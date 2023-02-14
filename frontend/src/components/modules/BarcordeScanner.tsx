import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Scanner from "../../utils/Scanner";
// import { ScannerResult } from "../modules/ScannerResult";

export const BarcordeScanner = () => {
  const navigate = useNavigate();
  const [scanning, setScanning] = useState(false);
  const [janCode, setJanCode] = useState(null);
  const scannerRef = useRef(null);
  if (janCode !== null && janCode !== undefined) {
    navigate(`/register-form/${janCode}`);
  }
  console.log(janCode);

  return (
    <div>
      <button onClick={() => setScanning(!scanning)}>
        {scanning ? "Stop" : "Start"}
      </button>
      <div>{janCode}</div>
      <div
        className="video-wrap"
        ref={scannerRef}
        style={{ position: "relative" }}
      >
        {scanning ? (
          <>
            <canvas
              className="drawingBuffer"
              style={{
                position: "absolute",
                top: "0px",
                left: "0px",
                height: "100%",
                width: "100%",
                border: "3px solid green",
              }}
              width="640"
              height="480"
            />
            <Scanner
              scannerRef={scannerRef}
              onDetected={(result) => setJanCode(result)}
            />
          </>
        ) : null}
      </div>
    </div>
  );
};
