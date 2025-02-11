import { Star } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

// Функція для генерації випадкових координат з урахуванням мінімальної відстані
const generateLevelPositions = (count, minDistance) => {
    const positions = [];
    const width = 100; // Ширина карти (у відсотках)
    const height = 100; // Висота карти (у відсотках)

    for (let i = 0; i < count; i++) {
        let x, y, valid;
        let attempts = 0;

        do {
            x = Math.random() * width;
            y = Math.random() * height;
            valid = true;

            for (const pos of positions) {
                const distance = Math.sqrt((x - pos.x) ** 2 + (y - pos.y) ** 2);
                if (distance < minDistance) {
                    valid = false;
                    break;
                }
            }

            attempts++;
            if (attempts > 1000) {
                console.warn("Can't generate non-overlapping positions in 1000 attempts. Consider reducing the number of levels or the minimum distance.");
                return positions; // Повертаємо те, що згенерували, якщо не вдалося знайти позиції після багатьох спроб
            }

        } while (!valid);

        positions.push({ x, y });
    }

    return positions;
};

const Quest = ({ questData, questAuthor }) => {
    const { questName, timeLimit, backgroundImage, levels } = questData;
    const [timeLeft, setTimeLeft] = useState(timeLimit);
    const [score, setScore] = useState(0);
    const [currentLevel, setCurrentLevel] = useState(null);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [comments, setComments] = useState([]);
    const [showLevelModal, setShowLevelModal] = useState(false);
    const [userAnswer, setUserAnswer] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);
    const [imageClickPosition, setImageClickPosition] = useState(null);
    const [levelPositions, setLevelPositions] = useState([]);
    const [completedLevels, setCompletedLevels] = useState(new Set()); // Set для зберігання id завершених рівнів

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [timeLeft]);

    useEffect(() => {
        const numberOfLevels = levels.length;
        const minDistanceBetweenLevels = 25;
        const generatedPositions = generateLevelPositions(numberOfLevels, minDistanceBetweenLevels);
        setLevelPositions(generatedPositions);
    }, [levels]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleLevelClick = (level) => {
        if (!completedLevels.has(level.id)) {
            setCurrentLevel(level);
            setUserAnswer('');
            setSelectedOption(null);
            setImageClickPosition(null);
            setShowLevelModal(true);
        }
    };

    const isPointInRectangle = (x, y, rect) => {
        return x >= rect.x1 && x <= rect.x2 && y >= rect.y1 && y <= rect.y2;
    };

    const handleAnswerSubmit = () => {
        if (!currentLevel) return;

        const currentQuestion = currentLevel.question;
        let isCorrect = false;

        switch (currentQuestion.type) {
            case 'open':
                isCorrect = userAnswer.trim().toLowerCase() === currentQuestion.answer.trim().toLowerCase();
                break;
            case 'test':
                isCorrect = selectedOption === currentQuestion.correctOption;
                break;
            case 'image':
                if (imageClickPosition) {
                    isCorrect = isPointInRectangle(
                        imageClickPosition.x,
                        imageClickPosition.y,
                        currentQuestion.targetArea
                    );
                }
                break;
            default:
                break;
        }

        if (isCorrect) {
            const scoreIncrement = 100 / levels.length;
            setScore(prevScore => prevScore + scoreIncrement);
        }

        setCompletedLevels(prevCompletedLevels => new Set(prevCompletedLevels.add(currentLevel.id))); // Додаємо рівень до завершених
        setShowLevelModal(false); // Автоматично закриваємо модальне вікно
    };

    const handleImageClick = (event) => {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setImageClickPosition({ x, y });
    };

    const renderQuestionContent = () => {
        if (!currentLevel) {
            return <div>Loading...</div>;
        }

        const currentQuestion = currentLevel.question;

        if (!currentQuestion) {
            return <div>No questions for this level.</div>;
        }

        switch (currentQuestion.type) {
            case 'open':
                return (
                    <Form.Group className="mb-3">
                        <Form.Label>{currentQuestion.question}</Form.Label>
                        <Form.Control
                            type="text"
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                        />
                    </Form.Group>
                );
            case 'test':
                return (
                    <Form.Group>
                        <Form.Label>{currentQuestion.question}</Form.Label>
                        {currentQuestion.options.map((option, index) => (
                            <Form.Check
                                key={index}
                                type="radio"
                                label={option}
                                name="testQuestionOptions"
                                value={index}
                                checked={selectedOption === index}
                                onChange={() => setSelectedOption(index)}
                            />
                        ))}
                    </Form.Group>
                );
            case 'image':
                return (
                    <div>
                        <img
                            src={currentQuestion.image}
                            alt="Question"
                            style={{ maxWidth: '100%', cursor: 'pointer' }}
                            onClick={handleImageClick}
                        />
                        {imageClickPosition && (
                            <div
                                style={{
                                    position: 'absolute',
                                    top: imageClickPosition.y - 5,
                                    left: imageClickPosition.x - 5,
                                    width: '10px',
                                    height: '10px',
                                    backgroundColor: 'red',
                                    borderRadius: '50%',
                                    pointerEvents: 'none'
                                }}
                            ></div>
                        )}
                        <div>Click on the object in the image</div>
                    </div>
                );
            default:
                return <div>Unknown question type</div>;
        }
    };

    const handleCommentSubmit = () => {
        if (comment.trim()) {
            const newComment = {
                id: Date.now(),
                author: 'Current User',
                avatar: 'src/assets/avatar-placeholder.png',
                text: comment,
                rating
            };
            setComments(prev => [newComment, ...prev]);
            setComment('');
            setRating(0);
        }
    };

    return (
        <div className="container py-4">
            {/* Header */}
            <div className="card mb-4">
                <div className="card-body text-center">
                    <h1 className="card-title">{questName || 'Name of quest...'}</h1>
                    <div className="mb-2">Time left: {formatTime(timeLeft)}</div>
                    <div>Score: {score.toFixed(2)}</div> {/* score відображається з двома знаками після коми */}
                </div>
            </div>
            <div className="card mb-4">
                <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                        <img
                            src={questAuthor.avatar}
                            alt={questAuthor.name}
                            className="rounded-circle me-3"
                            style={{ width: '50px', height: '50px' }}
                        />
                        <div>
                            <div>{questAuthor.name}</div>
                            <small className="text-muted">Quest Author</small>
                        </div>
                    </div>
                    <p className="mb-4">Find the hidden treasures at each location...</p>
                    <div
                        className="position-relative"
                        style={{
                            height: '500px',
                            backgroundImage: `url(${backgroundImage || '/api/placeholder/800/400'})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: '8px'
                        }}
                    >
                        {levelPositions.map((pos, index) => {
                            const level = levels[index];
                            const isCompleted = completedLevels.has(level.id);

                            return (
                                <button
                                    key={index}
                                    className="btn rounded-circle position-absolute"
                                    style={{
                                        left: `${pos.x}%`,
                                        top: `${pos.y}%`,
                                        transform: 'translate(-50%, -50%)',
                                        width: '40px',
                                        height: '40px',
                                        padding: '0',
                                        backgroundColor: isCompleted ? 'gray' : 'navy',
                                        color: 'white',
                                        border: 'none',
                                        cursor: isCompleted ? 'default' : 'pointer',
                                        opacity: isCompleted ? 0.7 : 1,
                                    }}
                                    onClick={() => handleLevelClick(level)}
                                    disabled={isCompleted}
                                >
                                    {level.id}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Level Modal */}
            <Modal show={showLevelModal} onHide={() => setShowLevelModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Level {currentLevel?.id}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {renderQuestionContent()}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowLevelModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAnswerSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Add Comment */}
            <div className="card mb-4">
                <div className="card-body">
                    <h5 className="card-title">Add comment</h5>
                    <div className="mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                className="me-1"
                                style={{
                                    cursor: 'pointer',
                                    color: star <= rating ? '#ffc107' : '#e4e5e9',
                                    fill: star <= rating ? '#ffc107' : 'none'
                                }}
                                onClick={() => setRating(star)}
                            />
                        ))}
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Add your comment..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={handleCommentSubmit}
                    >
                        Publish
                    </button>
                </div>
            </div>

            {/* Comments */}
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Comments</h5>
                    {comments.map(comment => (
                        <div key={comment.id} className="d-flex gap-3 mb-3">
                            <img
                                src={'src/assets/avatar-placeholder.png'}
                                alt={comment.author}
                                className="rounded-circle"
                                style={{ width: '40px', height: '40px' }}
                            />
                            <div>
                                <div className="fw-bold">{comment.author}</div>
                                <div className="mb-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            style={{
                                                width: '16px',
                                                height: '16px',
                                                color: star <= comment.rating ? '#ffc107' : '#e4e5e9',
                                                fill: star <= comment.rating ? '#ffc107' : 'none'
                                            }}
                                        />
                                    ))}
                                </div>
                                <p className="text-muted">{comment.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Quest;
