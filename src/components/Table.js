import React from "react";
import "./Table.css";

function Table({ states }) {
  return (
    <div className="table">
      {states.map((st) => (
        <tr key={st.sno}>
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
