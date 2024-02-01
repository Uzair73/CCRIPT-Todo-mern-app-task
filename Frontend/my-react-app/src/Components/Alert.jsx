import React from "react";

export default function Alert(props) {
  const capitalize = (word) => {
    if (word === "danger") {
      word = "error";
    }
    const lowerchar = word.toLowerCase();
    return lowerchar.charAt(0).toUpperCase() + lowerchar.slice(1);
  };
  return (
    <div className="sticky-top" style={{ height: "55px" }}>
      {props.alert && (
        <div>
          <div
            className={`alert alert-${props.alert.type} alert-dismissible fade show`}
            role="alert"
          >
            <strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg}
          </div>
        </div>
      )}
    </div>
  );
}
