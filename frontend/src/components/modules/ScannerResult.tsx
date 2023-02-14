import type { FC } from "react";
import PropTypes from "prop-types";

export const ScannerResult: FC<{ result: any }> = ({ result }) => {
  console.log(result.codeResult.code);
  return (
    <li>
      {result.codeResult.code} [{result.codeResult.format}]
    </li>
  );
};

ScannerResult.propTypes = {
  result: PropTypes.object,
};
