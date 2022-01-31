import PropTypes from "prop-types";

export default function Image({ imageSrc, caption }) {
  return (
    <div className="flex items-center">
      <img className="w-full shrink-0 md:h-full" src={imageSrc} alt={caption} />
    </div>
  );
}

Image.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
};
