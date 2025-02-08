import QuestCard from '../components/QuestCard';

function HomePage() {
    return (
        <>
            <section className="py-5">
                <div className="container-fluid">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <h1 className="display-4 text-white mb-4">Build your own quest!</h1>
                            <p className="text-white mb-4">
                                With Quespiration, you can create quests for education,
                                teambuilding, and for fun!
                            </p>
                            <button className="btn btn-info btn-lg">Create a Quest</button>
                        </div>
                        <div className="col-lg-6 pe-0">
                            <img
                                src="/cards-preview.png"
                                alt="Quest cards"
                                className="img-fluid w-100"  // Зберігаємо ширину 100% для адаптивності
                                style={{ maxWidth: '100%', height: 'auto' }} // Забезпечуємо адаптивність по висоті
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container">
                    <h2 className="text-white mb-4">Best Quests</h2>
                    <div className="row g-4">
                        {[
                            { title: 'Heaven island quest', image: '/heaven-island.jpg' },
                            { title: 'Space explorers', image: '/space.jpg' },
                            { title: 'Heaven island quest', image: '/heaven-island.jpg' },
                            { title: 'Space explorers', image: '/space.jpg' }
                        ].map((quest, index) => (
                            <div className="col-lg-3 col-md-6" key={index}>
                                <QuestCard {...quest} />
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-4">
                        <button className="btn btn-link text-white mx-2">←</button>
                        <button className="btn btn-link text-white mx-2">→</button>
                    </div>
                </div>
            </section>

            <section className="py-5 custom-bg-color bg-opacity-25">
                <div className="container">
                    <h2 className="text-white mb-4">What's new?</h2>
                    <div className="row g-4">
                        <div className="col-lg-8">
                            <div className="position-relative">
                                <img src="/seasonal-quest.jpg" alt="Seasonal quest"
                                     className="img-fluid rounded-3" style={{ width: '100%', height: 'auto' }} />
                                <h3 className="position-absolute bottom-0 start-0 p-4 text-white m-0">
                                    Hurry up to try a seasonal quest!
                                </h3>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <img src="/new-icon.jpg" alt="New icon"
                                 className="img-fluid rounded-3 mb-2" style={{ width: '100%', height: 'auto' }} />
                            <p className="text-white mb-0">New icon is available!</p>
                        </div>
                    </div>
                    <div className="text-center mt-4">
                        <button className="btn btn-link text-white mx-2">←</button>
                        <button className="btn btn-link text-white mx-2">→</button>
                    </div>
                </div>
            </section>
        </>
    );
}

export default HomePage;
