import React from "react";
import "./Table.css";
import numeral from "numeral";

function Table({ states }) {
  return (
    <div className="table">
      {states.map((st) => (
        <tr>
          <td>{st.state_name}</td>
          <td>
            <strong>{numeral(st.active).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
