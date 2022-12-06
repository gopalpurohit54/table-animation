import { useState, useEffect } from "react";
import "./App.css";
import Table from "./components/Table";

function randomIncreaseScore(value) {
  return value + Math.ceil(Math.random() * 10);
}

const useUsers = () => {
  const [users, setUsers] = useState([
    {
      name: "Mark",
      score: 0,
    },
    {
      name: "Tim",
      score: 0,
    },
    {
      name: "Harry",
      score: 0,
    },
    {
      name: "Ron",
      score: 0,
    },
    {
      name: "Jim",
      score: 0,
    },
  ]);

  useEffect(() => {
    const scoreInterval = setInterval(() => {
      setUsers(
        users
          .map((user) => ({
            ...user,
            score: randomIncreaseScore(user.score),
          }))
          .sort(function (a, b) {
            return b.score - a.score;
          })
      );
    }, 1000);
    return () => clearInterval(scoreInterval);
  }, [users]);

  return users;
};

function App() {
  const users = useUsers();
  return (
    <div className="App">
      <Table users={users} />
    </div>
  );
}

export default App;
