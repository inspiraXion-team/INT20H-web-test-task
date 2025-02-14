import React from 'react';
import { Link } from 'react-router-dom';
import ROUTES from "../../lib/routes";
import './QuestPreview.css';

const QuestPreview = () => {
  return (
    <div className="quest-preview-container">
      <div className="quest-header">
        <h1>Name Quest</h1>
      </div>
      
      <div className="quest-content">
        <div className="quest-image-container">
          {/* Placeholder for quest image */}
          <div className="quest-image-placeholder"></div>
        </div>
        
        <div className="quest-legend">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do 
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut 
            enim ad minim veniam, quis nostrud exercitation ullamco laboris 
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor 
            in reprehenderit in voluptate velit esse cillum dolore eu fugiat 
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </div>
      
      <div className="quest-actions">
        <button className="btn btn-primary btn-pass"><Link to={ROUTES.QUEST} className="text-black text-decoration-none">Go on a quest!</Link></button>
        <button className="btn btn-secondary btn-invite"><Link to={ROUTES.HOME} className="text-dark text-decoration-none">Other quests</Link></button>
      </div>
    </div>
  );
};

export default QuestPreview;