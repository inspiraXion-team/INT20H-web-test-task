import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ROUTES from "../lib/routes";

import { Container, Card, Row, Col, Button } from 'react-bootstrap';
import { ProfileService } from '../services/api/profile.service';

const MyQuests = () => {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const data = await ProfileService.getUserQuests();
        setQuests(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuests();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <h1>My Quests</h1>
      <Row>
        {quests.map((quest) => (
          <Col key={quest.id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={quest.posterURL} />
              <Card.Body>
                <Card.Title>{quest.title}</Card.Title>
                <Button variant="primary" href={`/quest/${quest.id}`}>
                  View Quest
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

// **Стилі**
const styles = {
  container: {
    textAlign: "center",
    color: "white",
    background: "radial-gradient(circle, #001f3f, #000814)",
    padding: "20px",
    minHeight: "100vh",
  },
  neonText: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#00e5ff",
    textShadow: "0 0 15px #00e5ff",
    marginBottom: "20px",
  },
  neonButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "transparent",
    color: "#00e5ff",
    cursor: "pointer",
    fontSize: "16px",
    transition: "0.3s ease-in-out",
    textShadow: "0 0 8px #00e5ff",
    margin: "10px",
    boxShadow: "0 0 10px rgba(0, 229, 255, 0.5)",
  },
  questsContainer: {
    display: "flex",
    gap: "20px",
    overflowX: "auto",
    padding: "20px",
    scrollbarWidth: "thin",
    scrollbarColor: "#00e5ff #000814",
  },
  questCard: {
    background: "rgba(0, 15, 40, 0.8)",
    padding: "15px",
    borderRadius: "10px",
    border: "2px solid #00e5ff",
    minWidth: "280px",
    textAlign: "center",
    boxShadow: "0 0 15px rgba(0, 229, 255, 0.6)",
    transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
  },
  questImage: {
    width: "100%",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  questTitle: {
    color: "#00e5ff",
    fontSize: "18px",
    textShadow: "0 0 10px #00e5ff",
  },
  questDetails: {
    color: "#00c8ff",
    fontSize: "14px",
  },
  hoveredCard: {
    transform: "scale(1.05)",
    boxShadow: "0 0 25px rgba(0, 229, 255, 1)",
  },
};

export default MyQuests;
