import React, { useEffect, useState, useRef } from "react";
import "./Table.css";

const Table = ({ users }) => {
  const [tableData, setTableData] = useState([]);
  const tableRef = useRef();

  useEffect(() => {
    const rowPositions = {};
    users.forEach((user, index) => {
      rowPositions[user.name] = { ...user, position: index };
    });
    const finalData = [];
    for (const t of tableData) {
      const updatedUser = rowPositions[t.name];
      if (updatedUser === undefined) {
        finalData.push({ ...t, style: { display: "none" } });
      } else {
        let move = (updatedUser.position - t.position) * 35;
        rowPositions[t.name] = undefined;
        finalData.push({
          ...updatedUser,
          style: { transform: `translateY(${move}px)` },
          class: updatedUser.position % 2 === 0 ? "even-row" : "odd-row",
          lastScore: t.score,
        });
      }
    }
    let nextPosition = finalData.length;
    for (let key in rowPositions) {
      if (rowPositions[key]) {
        finalData.push({
          ...rowPositions[key],
          class: nextPosition % 2 === 0 ? "even-row" : "odd-row",
          position: nextPosition++,
        });
      }
    }
    setTableData(finalData);

    setTimeout(() => {
      setTableData(
        users.map((user, index) => ({
          ...user,
          position: index,
          style: { transition: "none" },
          class: index % 2 === 0 ? "even-row" : "odd-row",
        }))
      );
    }, 100);
  }, [users]);
  return (
    <table id="table" ref={tableRef}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Score</th>
        </tr>
      </thead>

      <tbody>
        {tableData.map((user) => (
          <Row user={user} key={user.name} />
        ))}
      </tbody>
    </table>
  );
};

export default Table;

const Row = ({ user }) => {
  const [score, setScore] = useState(user.lastScore || user.score);
  useEffect(() => {
    if (user.lastScore === undefined) return;
    if (user.lastScore === user.score) return;
    let interval = setInterval(() => {
      if (score === user.score) {
        clearInterval(interval);
        return
      }
      setScore(score + 1);
    }, 10);

    return () => clearInterval(interval);
  }, [user, score]);

  return (
    <tr id={user.name} className={user.class} style={user.style}>
      <td>{user.name}</td>
      <td>{score}</td>
    </tr>
  );
};
