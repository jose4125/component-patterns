import React, { useState, useCallback } from "react";

import { generateRandomNumber } from "../../utils/generateRandomNumber";

const MAXIMUM_USER_CLAP = 10;
const INIT_STATE = {
  count: 0,
  countTotal: generateRandomNumber(500, 10000),
  isClicked: false,
};

export const useClapState = (initialState = INIT_STATE) => {
  const [clapState, setClapState] = useState(initialState);
  const {count, countTotal} = clapState

  const updateClapState = useCallback(() => {
    setClapState(({count, countTotal}) => {
      return {
        count: Math.min(count + 1, MAXIMUM_USER_CLAP),
        countTotal: count < MAXIMUM_USER_CLAP ? countTotal + 1 : countTotal,
        isClicked: true,
      }
    });
  }, [count, countTotal]);

  return [clapState, updateClapState]
}
