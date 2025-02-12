import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Card } from 'react-bootstrap';
import ROUTES from '../lib/routes';


import news1 from '../assets/news1.png';
import news2 from '../assets/news2.png';
import news3 from '../assets/news3.png';
import news4 from '../assets/news4.png';
import news5 from '../assets/news5.png';
import quest1 from '../assets/quest-1.jpg';
import quest2 from '../assets/quest-2.jpg';
import quest3 from '../assets/quest-3.jpg';
import quest4 from '../assets/quest-4.jpg';
import quest5 from '../assets/quest-5.jpg';
import heroImage from '../assets/hero.png';

function HomePage() {
    const [searchTerm, setSearchTerm] = useState('');

    const bestQuests = [
        { title: 'Cyber Quest', image: quest1, rating: 4.8, votes: 1200 },
        { title: 'Future Maze', image: quest2, rating: 4.5, votes: 980 },
        { title: 'Neon Shadows', image: quest3, rating: 4.7, votes: 1120 },
        { title: 'Virtual Escape', image: quest4, rating: 4.9, votes: 1500 },
        { title: 'Holo Run', image: quest5, rating: 4.6, votes: 875 },
    ];

    const newQuests = [
       { title: '🔵 AI takes over the world!', image: news1 },
        { title: '🌌 Cyber City expands!', image: news2 },
        { title: '🕵️ Hacker infiltrates mainframe', image: news3 },
        { title: '🚀 Space travel now available!', image: news4 },
        { title: '🦾 Neural implants 2.0 released!', image: news5 },
    ];

    return (
        <div style={styles.homePage}>
            {/* 🔎 Пошук */}
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search for quests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={styles.searchInput}
                />
            </div>

            <section style={styles.heroSection}>
                <div style={styles.heroTextContainer}>
                    <h1 style={styles.heroTitle}>Build your own quest!</h1>
                    <p style={styles.heroText}>
                        With Quespiration, you can create quests for education, teambuilding, and for fun!
                    </p>
                    <Link to={ROUTES.AUTH}>
                        <button style={styles.createQuestButton}>Create a Quest</button>
                    </Link>
                </div>
                <img src={heroImage} alt="Hero" style={styles.heroImage} />
            </section>


            <section style={styles.section}>
                <h2 style={styles.sectionTitle}> Best Quests</h2>
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    style={styles.questSwiper}
                >
                    {bestQuests.map((quest, index) => (
                        <SwiperSlide key={index}>
                            <Card style={styles.questCard}>
                                <Card.Img variant="top" src={quest.image} style={styles.questImage} />
                                <Card.Body style={styles.questInfo}>
                                    <Card.Title style={styles.questTitle}>{quest.title}</Card.Title>
                                    <div style={styles.ratingContainer}>
                                        <span style={styles.ratingStars}>⭐ {quest.rating}</span>
                                        <span style={styles.votes}>({quest.votes} votes)</span>
                                    </div>
                                </Card.Body>
                            </Card>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>

            <section style={styles.newsSection}>
                <h2 style={styles.sectionTitle}>🚀 What's New?</h2>
                <Swiper
                    modules={[Navigation, Autoplay, EffectCoverflow]}
                    effect="coverflow"
                    grabCursor
                    centeredSlides
                    slidesPerView={3}
                    coverflowEffect={{
                        rotate: 30,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    navigation
                    autoplay={{ delay: 4000, disableOnInteraction: false }}
                >
                    {newQuests.map((quest, index) => (
                        <SwiperSlide key={index}>
                            <div style={styles.newsCard}>
                                <img src={quest.image} alt={quest.title} style={styles.newsImage} />
                                <h3 style={styles.newsTitle}>{quest.title}</h3>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </section>
        </div>
    );
}

const styles = {
    homePage: {
        background: 'linear-gradient(135deg, #0f0c29,rgb(9, 8, 24),rgb(19, 79, 83))',
        color: 'white',
        minHeight: '100vh',
        padding: '0 20px',
    },
    searchContainer: {
        textAlign: 'center',
        padding: '20px',
    },
    searchInput: {
        width: '60%',
        padding: '12px 20px',
        fontSize: '1.2rem',
        borderRadius: '25px',
        border: '2px solid cyan',
        textAlign: 'center',
        background: 'rgba(255,255,255,0.1)',
        color: 'white',
    },
    heroSection: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '60px 0',
    },
    heroTextContainer: { maxWidth: '50%' },
    heroTitle: { fontSize: '4rem', color: 'cyan' },
    heroText: { fontSize: '1.5rem' },
    createQuestButton: { background: 'cyan',
    padding: '15px 30px',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '50px',
    fontSize: '1.2rem',
    transition: 'background-color 0.3s, transform 0.3s',
    boxShadow: '0 4px 10px rgba(0, 255, 255, 0.5)',
        background: 'cyan', padding: '15px 20px', border: 'none', cursor: 'pointer' },
    section: { padding: '60px 0', textAlign: 'center' },
    sectionTitle: { fontSize: '2.5rem', color: 'white', textShadow: '0 0 10px' },

    questSwiper: { padding: '20px' },
    questCard: {
        background: 'rgba(0, 0, 0, 0.5)',
        border: '2px solid cyan',
        borderRadius: '10px',
        overflow: 'hidden',
        transition: 'transform 0.3s, box-shadow 0.3s',
        boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)',
        cursor: 'pointer',
    },
    questImage: {
        width: '100%',
        height: '300px',
        objectFit: 'cover',
        borderBottom: '2px solid cyan',
    },
    questInfo: { padding: '15px', textAlign: 'center' },
    questTitle: { fontSize: '1.5rem', color: 'white', textShadow: '0 0 5px cyan' },
    ratingContainer: { marginTop: '10px', fontSize: '1.1rem', color: '#0ff' },

    newsCard: { padding: '20px', textAlign: 'center', boxShadow: '0 0 15px rgba(0, 255, 255, 0.5)' },
    newsImage: { width: '100%', borderRadius: '10px' },
    newsTitle: { marginTop: '10px', color: 'white' },
};

export default HomePage;
