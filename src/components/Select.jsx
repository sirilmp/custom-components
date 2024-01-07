import React, { useState, useRef, useEffect } from "react";

/**
 * Select Component
 * @param {Array} options - The list of options to be displayed in the dropdown
 * @param {Function} onSelect - Callback function when an option is selected
 * @param {Boolean} [disabled=false] - Input filed is disabled status
 * @param {string} [placeholder=""] - Placeholder text for the input
 * @param {string} [notfound="notfound"] - Text to display when no matching options are found
 * @returns {JSX.Element} - Select component
 */
const Select = ({
  options = [],
  onSelect,
  disabled = false,
  placeholder = "",
  notfound = "notfound",
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [focusedOptionIndex, setFocusedOptionIndex] = useState(0);
  const inputRef = useRef(null);
  const dropdownRef = useRef(null);

  /**
   * Handles input change
   * @param {Object} event - Input change event
   */
  const handleInputChange = (event) => {
    !isOpen && handleToggleDropdown();
    setQuery(event.target.value);
    setFocusedOptionIndex(0); // Reset focused option when input value changes
  };

  /**
   * Handles option selection
   * @param {string} option - Selected option
   */
  const handleSelectOption = (option) => {
    setQuery(option);
    setIsOpen(false);
    onSelect(option);
  };

  /**
   * Toggles the dropdown visibility
   */
  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      inputRef.current.focus();
    } else {
      setFocusedOptionIndex(0); // Reset focused option when closing dropdown
    }
  };

  /**
   * Filters options based on the query
   */
  const filteredOptions =
    query === ""
      ? options
      : options?.filter((option) =>
          option
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  /**
   * Handles click outside the component to close the dropdown
   * @param {Object} e - Click event
   */
  const handleClickOutside = (e) => {
    if (
      inputRef.current &&
      !inputRef.current.contains(e.target) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target)
    ) {
      clearInput();
    }
  };

  /**
   * Handles escape key press to clear input
   * @param {Object} e - Keydown event
   */
  const handleEscapeKey = (e) => {
    if (e.key === "Escape") {
      clearInput();
    }
  };

  /**
   * Clears input and closes the dropdown
   */
  const clearInput = () => {
    setQuery("");
    setIsOpen(false);
    setFocusedOptionIndex(0);
  };

  /**
   * Handles keydown events for navigation within the dropdown
   * @param {Object} e - Keydown event
   */
  const handleKeyDown = (e) => {
    if (isOpen) {
      if (
        e.key === "ArrowDown" &&
        focusedOptionIndex < filteredOptions.length - 1
      ) {
        setFocusedOptionIndex((prevIndex) => prevIndex + 1);
      } else if (e.key === "ArrowUp" && focusedOptionIndex > 0) {
        setFocusedOptionIndex((prevIndex) => prevIndex - 1);
      } else if (e.key === "Enter" && focusedOptionIndex !== null) {
        handleSelectOption(filteredOptions[focusedOptionIndex]);
      }
    }
  };

  /**
   * Handles click on an option to select it
   * @param {number} index - Index of the clicked option
   */
  const handleOptionClick = (index) => {
    setFocusedOptionIndex(index);
    handleSelectOption(filteredOptions[index]);
  };

  useEffect(() => {
    if (isOpen && focusedOptionIndex !== null) {
      // Scroll to the selected index position
      const optionElement = dropdownRef.current.querySelector(
        `[data-index="${focusedOptionIndex}"]`
      );
      if (optionElement) {
        optionElement.scrollIntoView({ block: "nearest" });
      }
    }
  }, [isOpen, focusedOptionIndex]);

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    window.addEventListener("keydown", handleEscapeKey);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("click", handleClickOutside);
      window.removeEventListener("keydown", handleEscapeKey);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, focusedOptionIndex, filteredOptions]);

  return (
    <div className="relative inline-block text-left">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleInputChange}
        onClick={handleToggleDropdown}
        className={`w-full px-4 py-2 text-sm font-medium text-gray-700 border border-purple-400 rounded-md focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-purple-400 ${
          disabled && "bg-purple-100"
        }`}
        placeholder={placeholder}
        disabled={disabled}
      />
      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg
          className={`h-4 w-4 transition-transform transform text-purple-400 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </span>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute z-10 mt-2 w-full bg-white border border-purple-400 rounded-md shadow-lg overflow-y-scroll max-h-40 custom-select"
        >
          <ul className="py-1">
            {filteredOptions?.length === 0 && query !== "" ? (
              <div className="px-4 py-2 text-sm text-gray-700 cursor-not-allowed">
                {notfound}
              </div>
            ) : (
              filteredOptions.map((option, i) => (
                <li
                  key={i}
                  data-index={i}
                  className={`px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-purple-100 ${
                    focusedOptionIndex === i &&
                    "bg-purple-200 hover:bg-purple-200"
                  }`}
                  onClick={() => handleOptionClick(i)}
                >
                  {option}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Select;
