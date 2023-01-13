import React, { useState, useRef } from "react";
import Scanner from "../../utils/Scanner";
import { ScannerResult } from "../modules/ScannerResult";

export const ScannerPage = () => {
  const [scanning, setScanning] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const scannerRef = useRef(null);

  return (
    <div>
      <button onClick={() => setScanning(!scanning)}>
        {scanning ? "Stop" : "Start"}
      </button>
      <ul className="results">
        {results.map(
          (result) =>
            result.codeResult && (
              <ScannerResult key={result.codeResult.code} result={result} />
            )
        )}
      </ul>
      <div
        className="video-wrap"
        ref={scannerRef}
        style={{ position: "relative", border: "3px solid red" }}
      >
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
        {scanning ? (
          <Scanner
            scannerRef={scannerRef}
            onDetected={(result) => setResults([...results, result])}
          />
        ) : null}
      </div>
    </div>
  );
};
