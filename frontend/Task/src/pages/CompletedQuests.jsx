import React from 'react';
import { useNavigate } from "react-router-dom";

const CompletedQuests = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/completed-quests">Completed Quests</Link>
        </li>
      </ul>
    </nav>
  );
};

export default CompletedQuests;