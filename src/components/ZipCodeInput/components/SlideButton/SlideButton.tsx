import React, { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SlideButtonProps } from "../../types";

const SlideButton = ({ onClick, icon }: SlideButtonProps) => {
  return (
    <button
      className="calendar__button"
      type="button"
      onClick={() => onClick()}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export default memo(SlideButton);
