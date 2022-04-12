import React, { useState, useCallback } from "react";

import { generateRandomNumber } from "../../utils/generateRandomNumber";

const MAXIMUM_USER_CLAP = 10;
const INIT_STATE = {
  count: 0,
  countTotal: generateRandomNumber(500, 10000),
  isClicked: false,
};

const callFunctionsInSequence = (...fns) => {
  return (...args) => {
    fns.forEach(fns => {
      return fns && fns(...args)
    });
  }
}

export const useClapState = (initialState = INIT_STATE) => {
  const [clapState, setClapState] = useState(initialState);
  const { count, countTotal } = clapState;

  const updateClapState = useCallback(() => {
    setClapState(({ count, countTotal }) => {
      return {
        count: Math.min(count + 1, MAXIMUM_USER_CLAP),
        countTotal: count < MAXIMUM_USER_CLAP ? countTotal + 1 : countTotal,
        isClicked: true,
      };
    });
  }, [count, countTotal]);

  const getTogglerProps = ({onClick, ...otherProps}) => ({
    onClick: callFunctionsInSequence(updateClapState, onClick),
    "aria-pressed": clapState.isClicked,
    ...otherProps
  });

  const getCounterProps = ({...otherProps}) => ({
    count,
    "aria-valuemax": MAXIMUM_USER_CLAP,
    "aria-valuemin": 0,
    "aria-valuenow": count,
    ...otherProps
  });

  return { clapState, updateClapState, getTogglerProps, getCounterProps };
};
