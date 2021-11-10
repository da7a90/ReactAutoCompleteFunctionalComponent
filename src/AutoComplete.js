import { useState, useEffect, useRef } from "react";

const AutoComplete = ({ data }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const [suggestionsVisible, setSuggestionsVisible] = useState(false);
  const [input, setInput] = useState("");
  let ref = useRef(null);

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setSuggestionsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });


  const onChange = (e) => {
    const userInput = e.target.value;

    //we filter the data returned from the API to show only the suggestions that have a certain match with the input 
    const filteredSuggestions = data.filter(
            (suggestion) =>
              suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1
          );
    

       setInput(e.target.value);
       setSuggestions(filteredSuggestions);
       setCurrentSuggestionIndex(0);
       setSuggestionsVisible(true);
 


  };

  const onClick = (e) => {
    setSuggestions([]);
    setInput(e.target.innerText);
    setCurrentSuggestionIndex(0);
    setSuggestionsVisible(false);
  };

  const onKeyDown = (e) => {
    // when the key pressed is the Enter key
    if (e.keyCode === 13) {
      setInput(suggestions[currentSuggestionIndex]);
      setCurrentSuggestionIndex(0);
      setSuggestionsVisible(false);
    }
    // when the key pressed is the UP key
    else if (e.keyCode === 38) {
      if (currentSuggestionIndex === 0) {
        return;
      }

      setCurrentSuggestionIndex(currentSuggestionIndex - 1);
    }
    // when the key pressed is the DOWN key
    else if (e.keyCode === 40) {
      if (currentSuggestionIndex - 1 === suggestions.length) {
        return;
      }

      setCurrentSuggestionIndex(currentSuggestionIndex + 1);
    }
  };

  const SuggestionsListComponent = () => {
    return suggestions.length ? (
      <ul className="suggestions">
        {suggestions.map((suggestion, index) => {
          //set the base styling class for suggestions
          let className = "suggestion";

          // give the current suggestion a different bg-color
          if (index === currentSuggestionIndex) {
            className += " current-suggestion";
          }
          //find out where exactly does the suggestion match the input
          let matchIndex = suggestion.toLowerCase().indexOf(input.toLowerCase());
          //split the suggestion string into 3 parts to be able to highlight the part matching the user input
          let firstPart = suggestion.substring(0,matchIndex);
          let secondPart = suggestion.substring(matchIndex+input.length);
          
          return (
            <li className={className} key={suggestion} onClick={onClick}>
              {firstPart}<b className="highlighted">{input}</b>{secondPart}
            </li>
          );
        })}
      </ul>
    ) : (
      <div className="empty">
        <span role="img" aria-label="empty emoji">
        🗅
        </span>{" "}
        <em>sorry no suggestions</em>
      </div>
    );
  };

  return (
    <div ref={ref}>
      <input
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={input}
      />
      {suggestionsVisible && input && <SuggestionsListComponent />}
    </div>
  );
};

export default AutoComplete;
