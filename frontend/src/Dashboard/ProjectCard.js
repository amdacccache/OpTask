import "./ProjectCard.css";
import PropTypes from "prop-types";
const ProjectCard = (props) => {
  return (
    <div className="col">
      <div className="card border rounded shadow">
        <div className="card-body">
          <p className="card-title project-card-title">{props.name}</p>
          <p className="card-text">{props.description}</p>
        </div>
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default ProjectCard;
