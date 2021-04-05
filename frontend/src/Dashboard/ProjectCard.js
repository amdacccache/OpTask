import "./ProjectCard.css";
import PropTypes from "prop-types";
const ProjectCard = (props) => {
  return (
    <div className="col">
      <div className="card border rounded shadow">
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
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
