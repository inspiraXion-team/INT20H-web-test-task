import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';


// Стилі для автопрокрутки
import news1 from '../assets/news1.png';
import news2 from '../assets/news2.png';
import news3 from '../assets/news3.png';
import news4 from '../assets/news4.png';
import news5 from '../assets/news5.png';
import quest1 from '../assets/quest-1.jpg';
// Ensure you have these images
import quest2 from '../assets/quest-2.jpg';
import quest3 from '../assets/quest-3.jpg';
import quest4 from '../assets/quest-4.jpg';
import quest5 from '../assets/quest-5.jpg';
import quest6 from '../assets/quest-6.jpg';
import quest7 from '../assets/quest-7.jpg';
import QuestCard from '../components/QuestCard.jsx';
import ROUTES from '../lib/routes';
import { isHomeRoute } from '../lib/routes';

// Імпорт модулів Swiper
import 'swiper/css';
// Стилі для кнопок навігації
import 'swiper/css/autoplay';
// Основні стилі Swiper
import 'swiper/css/navigation';

function HomePage() {
    const location = useLocation();

    const bestQuests = [
        { title: 'Quest1', image: quest1 },
        { title: 'Quest2', image: quest2 },
        { title: 'Quest3', image: quest3 },
        { title: 'Quest4', image: quest4 },
        { title: 'Quest5', image: quest5 },
        { title: 'Quest6', image: quest6 },
        { title: 'Quest7', image: quest7 },
    ];

    const newQuests = [
        { title: 'News', image: news1 },
        { title: 'News', image: news2 },
        { title: 'News', image: news3 },
        { title: 'News', image: news4 },
        { title: 'News', image: news5 },
    ];

    return (
        <>
            <div style={styles.homePage}>
                <section style={styles.heroSection}>
                    <div style={styles.container}>
                        <h1 style={styles.heroTitle}>Build your own quest!</h1>
                        <p style={styles.heroText}>
                            With Quespiration, you can create quests for education, teambuilding, and for fun!
                        </p>
                        <Link to={ROUTES.CONSTRUCTOR_OF_QUEST}><button style={styles.createQuestButton}>Create a Quest</button></Link>
                    </div>
                </section>

                <section style={styles.section}>
                    <div style={styles.container}>
                        <h2 style={styles.sectionTitle}>Best Quests</h2>
                        <div style={styles.row}>
                            {bestQuests.map((quest, index) => (
                                <div style={styles.questCardContainer} key={index}>
                                    <QuestCard {...quest} />
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section style={{ ...styles.section, ...styles.customBgColor }}>
                    <div style={styles.container}>
                        <h2 style={styles.sectionTitle}>What's new?</h2>
                        <Swiper
                            modules={[Navigation, Autoplay]} // Підключення модулів навігації та автопрокрутки
                            spaceBetween={20}
                            slidesPerView={3}
                            navigation={{ nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' }}
                            autoplay={{
                                delay: 5000, // Інтервал автопрокрутки (5 секунд)
                                disableOnInteraction: false, // Продовжувати автопрокрутку після взаємодії користувача
                            }}
                            breakpoints={{
                                320: { slidesPerView: 1 },
                                768: { slidesPerView: 2 },
                                1024: { slidesPerView: 3 },
                            }}
                        >
                            {newQuests.map((quest, index) => (
                                <SwiperSlide key={index}>
                                    <QuestCard {...quest} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <div style={styles.navigationButtons}>
                            <button style={styles.navButton}>←</button>
                            <button style={styles.navButton}>→</button>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

const styles = {
    homePage: {
        backgroundColor: 'rgba(4, 0, 112, 0.7)',
        color: 'white',
        minHeight: '100vh',
    },
    heroSection: {
        background: 'linear-gradient(rgba(4, 0, 112, 0.7), rgba(107, 0, 184, 0.7)), url("./path/to/hero-background.jpg")', // Додайте фоновий зображення
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '150px 0',
        textAlign: 'center',
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
    },
    heroTitle: {
        fontSize: '3.5rem',
        fontWeight: 'bold',
        color: 'white',
        marginBottom: '20px',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    },
    heroText: {
        fontSize: '1.25rem',
        color: 'white',
        marginBottom: '40px',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
    },
    createQuestButton: {
        backgroundColor: '#17a2b8',
        border: 'none',
        padding: '15px 30px',
        fontSize: '1.25rem',
        transition: 'background-color 0.3s, transform 0.2s',
        color: 'white',
        cursor: 'pointer',
        borderRadius: '5px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    },
    section: {
        padding: '60px 0',
    },
    sectionTitle: {
        color: 'white',
        marginBottom: '40px',
        fontSize: '2.5rem',
        textAlign: 'center',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    },
    navigationButtons: {
        textAlign: 'center',
        marginTop: '20px',
    },
    navButton: {
        backgroundColor: 'transparent',
        border: 'none',
        color: 'white',
        fontSize: '1.5rem',
        cursor: 'pointer',
        margin: '0 10px',
        transition: 'color 0.3s',
    },
    customBgColor: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Напівпрозорий білий фон
        borderRadius: '10px',
        padding: '40px 20px',
    },
    row: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        justifyContent: 'center',
    },
    questCardContainer: {
        flex: '1 1 calc(25% - 20px)', // 4 cards per row
        maxWidth: 'calc(25% - 20px)',
        minWidth: '250px', // Мінімальна ширина картки
    },
};

export default HomePage;