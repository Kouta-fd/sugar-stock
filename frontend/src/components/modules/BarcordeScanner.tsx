import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import Scanner from "../../utils/Scanner";

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
      <div>
        <Link className="ml-5" to="/">戻る</Link>
      </div>
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
      <div className="absolute bottom-10 text-center w-full">
        <button
          className="bg-orange-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          onClick={() => setScanning(!scanning)}
        >
          {scanning ? "スキャン終了" : "スキャン開始"}
        </button>
      </div>
    </div>
  );
};
