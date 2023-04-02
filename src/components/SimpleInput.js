import { useEffect, useRef, useState } from "react";

const SimpleInput = (props) => {
  const nameInputRef = useRef();
  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsValid, setEnteredNamaIsValid] = useState(false);
  const [enterdNameTouched, setEnteredNameTouched] = useState(false);

  useEffect(() => {
    if (enteredNameIsValid) {
      console.log("Name Input is valid!");
    }
  }, [enteredNameIsValid]);

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);

    if (event.target.value.trim() !== "" || null) {
      setEnteredNamaIsValid(true);
    }
    console.log("enteredNameIsValid : ", enteredNameIsValid);
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);

    if (enteredName.trim() === "" || null) {
      setEnteredNamaIsValid(false);
    }
    console.log("enteredNameIsValid : ", enteredNameIsValid);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    setEnteredNameTouched(true);

    if (enteredName.trim() === "" || null) {
      setEnteredNamaIsValid(false);
      return;
    }

    setEnteredNamaIsValid(true);

    console.log(enteredName);

    setEnteredName("");
    // setEnteredNameTouched(false);
  };

  const nameInputIsInvalid = !enteredNameIsValid && enterdNameTouched;

  const nameInputCllasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputCllasses}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={nameInputRef}
          type="text"
          id="name"
          onChange={nameInputChangeHandler}
          onBlur={nameInputBlurHandler}
          value={enteredName}
        />
        {nameInputIsInvalid && <p className="error-text">Name is not empty.</p>}
      </div>
      <div className="form-actions">
        <button>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
