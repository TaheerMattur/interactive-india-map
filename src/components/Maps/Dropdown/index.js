import React from "react";
import styles from "./dropdown.module.css";

const Dropdown = ({ options, selectedOption, handleChange }) => {
  return (
    <div className={styles["dropdown-container"]}>
      <select
        className={styles.dropdown}
        value={selectedOption ? selectedOption.value : ""}
        onChange={(event) => handleChange(event)}
      >
        <option value="" disabled>
          Select a State
        </option>
        {options.map((option) => (
          <option key={`${option.id}${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
