import React from 'react';
import { Link } from "react-router-dom";

const CompletedQuests = () => {
  const completedQuests = [
    {
      id: 1,
      title: 'First Quest',
      description: 'Complete your first quest and earn the Explorer badge.',
      completedOn: '2023-10-01',
    },
    // Додайте інші квести...
  ];

  return (
    <div>
      <h2>Completed Quests</h2>
      <ul>
        {completedQuests.map(quest => (
          <li key={quest.id}>
            <h3>{quest.title}</h3>
            <p>{quest.description}</p>
            <p><strong>Completed on:</strong> {quest.completedOn}</p>
          </li>
        ))}
      </ul>
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
    </div>
  );
};

export default CompletedQuests;