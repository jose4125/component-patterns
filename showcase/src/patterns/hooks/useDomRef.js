import React, { useState, useCallback } from "react";

export const useDomRef = () => {
  const [DOMRef, setRefState] = useState({});

  const setRef = useCallback((node) => {
    if (node !== null) {
      setRefState((prevRefState) => ({
        ...prevRefState,
        [node.dataset.refkey]: node,
      }));
    }
  }, []);

  return [DOMRef, setRef]
}



