import PropTypes from 'prop-types';
import './Figure.css';

const Figure = ({ image, altText }) => {
  return (
    <div className="figure">
      <img className="figure__image" src={image} alt={altText} />
    </div>
  );
};

Figure.propTypes = {
  image: PropTypes.string.isRequired,
  altText: PropTypes.string.isRequired
};
export default Figure;
