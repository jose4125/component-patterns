import React, { useState, useCallback, useRef } from "react";

import { generateRandomNumber } from "../../utils/generateRandomNumber";
import { usePrevious } from './usePrevious.js'

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

  const togglerProps = {
    onClick: updateClapState,
    "aria-pressed": clapState.isClicked,
  };

  const counterProps = {
    count,
    "aria-valuemax": MAXIMUM_USER_CLAP,
    "aria-valuemin": 0,
    "aria-valuenow": count,
  };

  return { clapState, updateClapState, togglerProps, counterProps };
};


/** ====================================
      *        🔰HOOK
      Getter props
  ==================================== **/
export const useClapStateGetProps = (initialState = INIT_STATE) => {
  const [clapState, setClapState] = useState(initialState);
  const { count, countTotal } = clapState;
  const userInitialState = useRef(initialState)

  const updateClapState = useCallback(() => {
    setClapState(({ count, countTotal }) => {
      return {
        count: Math.min(count + 1, MAXIMUM_USER_CLAP),
        countTotal: count < MAXIMUM_USER_CLAP ? countTotal + 1 : countTotal,
        isClicked: true,
      };
    });
  }, [count, countTotal]);

  const resetRef = useRef(0)
  const prevCount = usePrevious(count)
  const reset = useCallback(() => {
    if(prevCount !== count) {
      setClapState(userInitialState.current)
      resetRef.current++
    }
  }, [setClapState, prevCount, count])

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

  return { clapState, updateClapState, getTogglerProps, getCounterProps, reset, resetDep: resetRef.current };
};
