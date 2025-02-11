import React, { useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

import { getConstructorOfQuestRoute, isConstructorOfQuestRoute } from '../lib/routes';

import 'bootstrap/dist/css/bootstrap.min.css';

const ConstructorOfQuest = () => {
 const location = useLocation();


 useEffect(() => {
 if (isConstructorOfQuestRoute(location.pathname)) {
 console.log('This is the completed quests route');
 console.log('Completed quests route:', getConstructorOfQuestRoute());
 }
 }, [location]);


 const [questName, setQuestName] = useState('');
 const [legend, setLegend] = useState('');
 const [levels, setLevels] = useState([]);
 const [selectedLevel, setSelectedLevel] = useState(null);
 const [hasTimeLimit, setHasTimeLimit] = useState(false);
 const [timeLimit, setTimeLimit] = useState('00:00');
 const [maxParticipants, setMaxParticipants] = useState('');
 const [showQuestionModal, setShowQuestionModal] = useState(false);
 const [questions, setQuestions] = useState({});


 // State for question forms
 const [openQuestion, setOpenQuestion] = useState({ question: '', answer: '' });
 const [testQuestion, setTestQuestion] = useState({
 question: '',
 options: ['', '', '', ''],
 correctOption: null
 });
 const [imageQuestion, setImageQuestion] = useState({
 image: null,
 area: { x1: 0, y1: 0, x2: 100, y2: 100 }, // Store as x1, y1, x2, y2
 isDrawing: false, // Track if user is currently drawing the area
 startX: 0,
 startY: 0
 });


 const imageRef = useRef(null); // Reference to the image element


 const customStyles = {
 header: {
 backgroundColor: 'rgba(255, 255, 255, 0.1)',
 color: 'white',
 padding: '2rem 0',
 marginBottom: '2rem',
 },
 mainContainer: {
 backgroundColor: 'linear-gradient(rgba(4, 0, 112, 0.7), rgba(107, 0, 184, 0.7))',
 minHeight: '100vh',
 padding: '2rem 0',
 },
 editorContainer: {
 padding: '20px',
 border: '1px solid #ddd',
 borderRadius: '5px',
 backgroundColor: '#fff',
 marginBottom: '20px',
 },
 levelButton: {
 backgroundColor: '#ED8936',
 border: 'none',
 marginBottom: '0.5rem',
 },
 addButton: {
 backgroundColor: '#4299E1',
 border: 'none',
 },
 publishButton: {
 backgroundColor: '#28a745',
 border: 'none',
 width: '100%',
 marginTop: '1rem',
 },
 saveButton: {
 backgroundColor: '#6c757d',
 border: 'none',
 width: '100%',
 marginTop: '0.5rem',
 },
 questionCard: {
 marginBottom: '1rem',
 border: '1px solid #eee',
 borderRadius: '5px',
 padding: '10px',
 },
 modalContent: {
 backgroundColor: '#fff',
 padding: '20px',
 borderRadius: '5px',
 maxWidth: '500px',
 width: '100%',
 },
 };


 const addLevel = () => {
 const newLevel = {
 id: levels.length + 1,
 questions: []
 };
 setLevels([...levels, newLevel]);
 };


 const handleQuestionAdd = (type) => {
 let newQuestion;
 switch (type) {
 case 'open':
 newQuestion = { ...openQuestion, type: 'open' };
 break;
 case 'test':
 newQuestion = { ...testQuestion, type: 'test' };
 break;
 case 'image':
 newQuestion = { ...imageQuestion, type: 'image' };
 break;
 default:
 return;
 }


 setQuestions({
 ...questions,
 [selectedLevel]: [...(questions[selectedLevel] || []), newQuestion]
 });
 setShowQuestionModal(false);
 };


 const handleImageUpload = (e) => {
 const file = e.target.files[0];
 if (file) {
 const reader = new FileReader();
 reader.onloadend = () => {
 setImageQuestion({
 ...imageQuestion,
 image: reader.result,
 area: { x1: 0, y1: 0, x2: 100, y2: 100 }, // Reset area on new image
 });
 };
 reader.readAsDataURL(file);
 }
 };


 const handleTestOptionChange = (index, value) => {
 const newOptions = [...testQuestion.options];
 newOptions[index] = value;
 setTestQuestion({ ...testQuestion, options: newOptions });
 };


 const handlePublishQuest = () => {
 // Implement your publish quest logic here
 console.log('Publishing quest:', {
 questName,
 legend,
 levels,
 hasTimeLimit,
 timeLimit,
 maxParticipants,
 questions,
 });
 alert('Quest published!'); // Replace with actual publishing logic
 };


 const handleSaveDraft = () => {
 // Implement your save draft logic here
 console.log('Saving quest draft:', {
 questName,
 legend,
 levels,
 hasTimeLimit,
 timeLimit,
 maxParticipants,
 questions,
 });
 alert('Quest draft saved!'); // Replace with actual saving logic
 };


 // Image selection functions
 const handleImageMouseDown = (e) => {
 if (!imageRef.current) return;
 const rect = imageRef.current.getBoundingClientRect();
 const x = e.clientX - rect.left;
 const y = e.clientY - rect.top;


 setImageQuestion({
 ...imageQuestion,
 isDrawing: true,
 startX: x,
 startY: y,
 area: { x1: x, y1: y, x2: x, y2: y } // Initialize area
 });
 };


 const handleImageMouseMove = (e) => {
 if (!imageQuestion.isDrawing || !imageRef.current) return;
 const rect = imageRef.current.getBoundingClientRect();
 const x = e.clientX - rect.left;
 const y = e.clientY - rect.top;


 setImageQuestion({
 ...imageQuestion,
 area: {
 ...imageQuestion.area,
 x2: x,
 y2: y
 }
 });
 };


 const handleImageMouseUp = () => {
 setImageQuestion({
 ...imageQuestion,
 isDrawing: false
 });
 };


 return (
 <div style={customStyles.mainContainer}>
 <div style={customStyles.header}>
 <Container>
 <h1 className="text-center">Constructor of Quests</h1>
 <p className="text-center mb-0">Сконструюйте ваш квест</p>
 </Container>
 </div>


 <Container>
 <div style={customStyles.editorContainer}>
 <Form.Group className="mb-3 w-100">
  <Form.Label>Quest Name</Form.Label>
  <Form.Control
    type="text"
    placeholder="Enter quest name"
    value={questName}
    onChange={(e) => setQuestName(e.target.value)}
    className="w-100" // Додаємо клас для ширини 100%
  />


 <Form.Group className="mb-3">
 <Form.Label>Quest Legend</Form.Label>
 <Form.Control
 as="textarea"
 rows={4}
 placeholder="Enter quest legend"
 value={legend}
 onChange={(e) => setLegend(e.target.value)}
 />
 </Form.Group>


 <Row className="mb-3">
 <Col md={3}>
 <Button
 style={customStyles.addButton}
 onClick={addLevel}
 className="mb-2 w-100"
 >
 + Add Level
 </Button>
 {levels.map((level) => (
 <Button
 key={level.id}
 style={customStyles.levelButton}
 onClick={() => setSelectedLevel(level.id)}
 className="w-100"
 >
 Level {level.id}
 </Button>
 ))}
 </Col>
 <Col md={9}>
 {selectedLevel && (
 <Card className="p-3">
 <h4>Level {selectedLevel}</h4>
 <Button
 variant="success"
 onClick={() => setShowQuestionModal(true)}
 className="mb-3"
 >
 Insert Question
 </Button>
 {questions[selectedLevel]?.map((q, idx) => (
 <Card key={idx} style={customStyles.questionCard}>
 {q.type === 'open' && (
 <>
 <Form.Group>
 <Form.Label>Question:</Form.Label>
 <Form.Control value={q.question} readOnly />
 </Form.Group>
 <Form.Group>
 <Form.Label>Answer:</Form.Label>
 <Form.Control value={q.answer} readOnly />
 </Form.Group>
 </>
 )}
 {q.type === 'test' && (
 <>
 <Form.Group>
 <Form.Label>Question:</Form.Label>
 <Form.Control value={q.question} readOnly />
 </Form.Group>
 {q.options.map((option, optIdx) => (
 <Form.Check
 key={optIdx}
 type="radio"
 label={option}
 checked={q.correctOption === optIdx}
 readOnly
 />
 ))}
 </>
 )}
 {q.type === 'image' && (
 <div>
 {q.image && (
 <div
 style={{ position: 'relative', display: 'inline-block' }}
 onMouseDown={handleImageMouseDown}
 onMouseMove={handleImageMouseMove}
 onMouseUp={handleImageMouseUp}
 onMouseLeave={handleImageMouseUp} // Important for when the mouse leaves the image
 >
 <img
 src={q.image}
 alt="Question"
 style={{ maxWidth: '100%', marginTop: '10px' }}
 ref={imageRef}
 />
 {imageQuestion.isDrawing || (q.area.x1 !== q.area.x2 && q.area.y1 !== q.area.y2) ? (
 <div
 style={{
 position: 'absolute',
 left: Math.min(q.area.x1, q.area.x2),
 top: Math.min(q.area.y1, q.area.y2),
 width: Math.abs(q.area.x2 - q.area.x1),
 height: Math.abs(q.area.y2 - q.area.y1),
 border: '2px solid red',
 pointerEvents: 'none' // Make sure the div doesn't block mouse events
 }}
 ></div>
 ) : null}
 </div>
 )}
 <div>
 Answer Area: x1: {q.area.x1}, y1: {q.area.y1}, x2: {q.area.x2}, y2: {q.area.y2}
 </div>
 </div>
 )}
 </Card>
 ))}
 </Card>
 )}
 </Col>
 </Row>


 <Form.Group className="mb-3">
 <Form.Check
 type="checkbox"
 label="Time Limit?"
 checked={hasTimeLimit}
 onChange={(e) => setHasTimeLimit(e.target.checked)}
 />
 {hasTimeLimit && (
 <Form.Control
 type="time"
 value={timeLimit}
 onChange={(e) => setTimeLimit(e.target.value)}
 className="mt-2"
 />
 )}
 </Form.Group>


 <Form.Group className="mb-3">
 <Form.Label>Max Participants</Form.Label>
 <Form.Control
 type="number"
 placeholder="Enter max participants"
 value={maxParticipants}
 onChange={(e) => setMaxParticipants(e.target.value)}
 />
 </Form.Group>


 <Button style={customStyles.publishButton} onClick={handlePublishQuest}>
 Publish Quest
 </Button>
 <Button style={customStyles.saveButton} onClick={handleSaveDraft}>
 Save Draft
 </Button>
 </Form.Group>
 </div>
 </Container>


 {/* Question Modal */}
 <Modal show={showQuestionModal} onHide={() => setShowQuestionModal(false)}>
 <Modal.Header closeButton>
 <Modal.Title>Select Question Type</Modal.Title>
 </Modal.Header>
 <Modal.Body>
 <Button
 variant="primary"
 className="w-100 mb-2"
 onClick={() => {
 setOpenQuestion({ question: '', answer: '' }); // Reset open question state
 handleQuestionAdd('open');
 }}
 >
 Open Answer
 </Button>
 <Button
 variant="primary"
 className="w-100 mb-2"
 onClick={() => {
 setTestQuestion({ question: '', options: ['', '', '', ''], correctOption: null }); // Reset test question state
 handleQuestionAdd('test');
 }}
 >
 Test Question
 </Button>
 <Button
 variant="primary"
 className="w-100"
 onClick={() => {
 setImageQuestion({
 image: null,
 area: { x1: 0, y1: 0, x2: 100, y2: 100 },
 isDrawing: false,
 startX: 0,
 startY: 0
 }); // Reset image question state
 handleQuestionAdd('image');
 }}
 >
 Image Search
 </Button>
 </Modal.Body>
 </Modal>


 {/* Open Question Modal */}
 <Modal
 show={!!questions[selectedLevel]?.find(q => q.type === 'open' && !q.question)}
 onHide={() => {
 const updatedQuestions = { ...questions };
 updatedQuestions[selectedLevel] = updatedQuestions[selectedLevel].filter(
 (q) => !(q.type === 'open' && !q.question)
 );
 setQuestions(updatedQuestions);
 }}
 >
 <Modal.Header closeButton>
 <Modal.Title>Create Open Question</Modal.Title>
 </Modal.Header>
 <Modal.Body>
 <Form.Group className="mb-3">
 <Form.Label>Question</Form.Label>
 <Form.Control
 type="text"
 value={openQuestion.question}
 onChange={(e) => setOpenQuestion({ ...openQuestion, question: e.target.value })}
 />
 </Form.Group>
 <Form.Group>
 <Form.Label>Correct Answer</Form.Label>
 <Form.Control
 type="text"
 value={openQuestion.answer}
 onChange={(e) => setOpenQuestion({ ...openQuestion, answer: e.target.value })}
 />
 </Form.Group>
 </Modal.Body>
 <Modal.Footer>
 <Button variant="primary" onClick={() => handleQuestionAdd('open')}>
 Save
 </Button>
 </Modal.Footer>
 </Modal>


 {/* Test Question Modal */}
 <Modal
 show={!!questions[selectedLevel]?.find((q) => q.type === 'test' && !q.question)}
 onHide={() => {
 const updatedQuestions = { ...questions };
 updatedQuestions[selectedLevel] = updatedQuestions[selectedLevel].filter(
 (q) => !(q.type === 'test' && !q.question)
 );
 setQuestions(updatedQuestions);
 }}
 >
 <Modal.Header closeButton>
 <Modal.Title>Create Test Question</Modal.Title>
 </Modal.Header>
 <Modal.Body>
 <Form.Group className="mb-3">
 <Form.Label>Question</Form.Label>
 <Form.Control
 type="text"
 value={testQuestion.question}
 onChange={(e) => setTestQuestion({ ...testQuestion, question: e.target.value })}
 />
 </Form.Group>
 {testQuestion.options.map((option, idx) => (
 <Form.Group key={idx} className="mb-2">
 <Form.Label>Option {idx + 1}</Form.Label>
 <div className="d-flex">
 <Form.Control
 type="text"
 value={option}
 onChange={(e) => handleTestOptionChange(idx, e.target.value)}
 />
 <Form.Check
 type="radio"
 className="ms-2"
 checked={testQuestion.correctOption === idx}
 onChange={() => setTestQuestion({ ...testQuestion, correctOption: idx })}
 />
 </div>
 </Form.Group>
 ))}
 </Modal.Body>
 <Modal.Footer>
 <Button variant="primary" onClick={() => handleQuestionAdd('test')}>
 Save
 </Button>
 </Modal.Footer>
 </Modal>


 {/* Image Question Modal */}
 <Modal
 show={!!questions[selectedLevel]?.find((q) => q.type === 'image' && !q.image)}
 onHide={() => {
 const updatedQuestions = { ...questions };
 updatedQuestions[selectedLevel] = updatedQuestions[selectedLevel].filter(
 (q) => !(q.type === 'image' && !q.image)
 );
 setQuestions(updatedQuestions);
 }}
 >
 <Modal.Header closeButton>
 <Modal.Title>Create Image Search Question</Modal.Title>
 </Modal.Header>
 <Modal.Body>
 <Form.Group>
 <Form.Label>Upload Image</Form.Label>
 <Form.Control
 type="file"
 accept="image/*"
 onChange={handleImageUpload}
 />
 </Form.Group>
 {imageQuestion.image && (
 <div className="mt-3">
 <div
 style={{ position: 'relative', display: 'inline-block' }}
 onMouseDown={handleImageMouseDown}
 onMouseMove={handleImageMouseMove}
 onMouseUp={handleImageMouseUp}
 onMouseLeave={handleImageMouseUp}
 >
 <img
 src={imageQuestion.image}
 alt="Question"
 style={{ maxWidth: '100%' }}
 ref={imageRef}
 />
 {imageQuestion.isDrawing || (imageQuestion.area.x1 !== imageQuestion.area.x2 && imageQuestion.area.y1 !== imageQuestion.area.y2) ? (
 <div
 style={{
 position: 'absolute',
 left: Math.min(imageQuestion.area.x1, imageQuestion.area.x2),
 top: Math.min(imageQuestion.area.y1, imageQuestion.area.y2),
 width: Math.abs(imageQuestion.area.x2 - imageQuestion.area.x1),
 height: Math.abs(imageQuestion.area.y2 - imageQuestion.area.y1),
 border: '2px solid red',
 pointerEvents: 'none'
 }}
 ></div>
 ) : null}
 </div>
 <div className="mt-2">
 Answer Area: x1: {imageQuestion.area.x1}, y1: {imageQuestion.area.y1}, x2:{' '}
 {imageQuestion.area.x2}, y2: {imageQuestion.area.y2}
 </div>
 </div>
 )}
 </Modal.Body>
 <Modal.Footer>
 <Button variant="primary" onClick={() => handleQuestionAdd('image')}>
 Save
 </Button>
 </Modal.Footer>
 </Modal>
 </div>
 );
};


export default ConstructorOfQuest;
