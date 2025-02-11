function QuestCard({ title, image }) {
    return (
      <div className="card h-100 rounded-4 bg-light">
        <h5 className="card-title p-3 mb-0">{title}</h5>
        <img src={image} className="card-img" alt={title} />
        <div className="card-body">
          <div className="d-flex justify-content-between mb-3">
            <div className="text-warning">★★★★★</div>
            <div className="text-warning">★★★★★</div>
          </div>
          <button className="btn btn-primary w-100 rounded-pill">Start</button>
        </div>
      </div>
    )
  }
  
  export default QuestCard