import "./ProjectCard.css";
const ProjectCard = (props) => {
  return (
    <div className="col">
      <div className="card border-info">
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text">{props.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
