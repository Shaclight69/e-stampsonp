import "./EventCard.css";

const EventCard = ({ event }) => {
  return (
    <div className="card-container">
      <div className="image-container">
        <img src={event.images[0].url} alt={event.title} />
      </div>
      <div className="card-content">
        <div className="card-title">
          <h3>
            {event.category} - {event.title}
          </h3>
        </div>
        &nbsp;
        <h6>{event.Address}</h6>
        &nbsp;
        <p>{event.description}</p>
        &nbsp;
        <span>{event.Date}</span>
      </div>
    </div>
  );
};

export default EventCard;
