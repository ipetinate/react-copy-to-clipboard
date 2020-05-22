import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Tooltip from "@material-ui/core/Tooltip";
import Link from "@material-ui/core/Link";

const CopyToClipboard = props => {
  const [copySuccess, setCopySuccess] = useState(false);

  const copy = (event, text) => {
    event.preventDefault();
    event.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopySuccess(true);
  };

  useEffect(() => {
    setTimeout(() => setCopySuccess(false), 2000);
  }, [copySuccess]);

  return (
    <>
      {
        props.asLink &&
        <Link onClick={event => copy(event, props.text)}>
          <Tooltip
            title={
              copySuccess 
              ? props.onCopySuccessMessage 
              : props.tooltip
            }
            placement={props.tooltipPosition}
          >
            <span>{props.text}</span>
          </Tooltip>
        </Link>
      }
      {
        !props.asLink &&
        <Tooltip
          title={
              copySuccess 
              ? props.onCopySuccessMessage 
              : props.tooltip
            }
            placement={props.tooltipPosition}
        >
          <span onClick={event => copy(event, props.text)}>{props.text}</span>
        </Tooltip>
      }
    </>
  );
};

CopyToClipboard.defaultProps = {
  asLink: false,
  tooltip: "Clique para copiar",
  tooltipPosition: "top",
  onCopySuccessMessage: "Copiado com sucesso"
};

CopyToClipboard.propTypes = {
  asLink: PropTypes.bool,
  text: PropTypes.string,
  tooltip: PropTypes.string,
  tooltipPosition: PropTypes.string,
  onCopySuccessMessage: PropTypes.string
};

export default CopyToClipboard;
