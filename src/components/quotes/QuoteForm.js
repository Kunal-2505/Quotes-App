import { useRef, useState } from "react";
import { Prompt } from "react-router-dom";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  const authorInputRef = useRef();
  const textInputRef = useRef();
  const [isEntered, setIsEntered] = useState(false);

  function submitFormHandler(event) {
    event.preventDefault();
    const isEmpty = (value) => value.trim() === "";
    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;
    const validAuthor = !isEmpty(enteredAuthor);
    const validText = !isEmpty(enteredText);
    if (!validAuthor) {
      alert("Please enter a valid Author");
    } else if (!validText) {
      alert("Please enter valid Text");
    } else {
      props.onAddQuote({ author: enteredAuthor, text: enteredText });
    }
  }
  const formFocusHandler = () => {
    setIsEntered(true);
  };
  const leaveFormHandler = () => {
    setIsEntered(false);
  };
  return (
    <>
      <Prompt
        when={isEntered}
        message={(location) => {
          console.log(location);
          return `Are you sure you want to leave to ${location.pathname} ?`;
        }}
      />
      <Card>
        <form
          onFocus={formFocusHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button onClick={leaveFormHandler} className="btn">
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default QuoteForm;
