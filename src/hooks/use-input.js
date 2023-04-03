import { useReducer } from "react";

const initalInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  } else if (action.type === "BLUR") {
    return { value: state.value, isTouched: true };
  } else if (action.type === "RESET") {
    return { value: "", isTouched: false };
  } else {
    return initalInputState;
  }
};
const useInput = (validateValue) => {
  const [inputState, dispatch] = useReducer(
    inputStateReducer,
    initalInputState
  );
  // const [enteredValue, setEnteredValue] = useState("");
  // const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: "INPUT", value: event.target.value });
    // setEnteredValue(event.target.value);
  };

  const valueBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
    // setIsTouched(true);
  };

  const reset = () => {
    dispatch({ type: "RESET" });
    // setEnteredValue("");
    // setIsTouched(false);
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};

export default useInput;
