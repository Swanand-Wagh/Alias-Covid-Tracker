import React from "react";
import "./Table.css";

function Table({ states }) {
  return (
    <div className="table">
      {states.map((st) => (
        <tr>
          <td>{st.state_name}</td>
          <td>
            <strong>{st.active}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
