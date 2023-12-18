import PropTypes from 'prop-types';
import {useEffect, useRef} from 'react';

export const Svg = ({src}) => {
  const svgRef = useRef(null);

  useEffect(() => {
    fetch(src)
      .then(response => response.text())
      .then(svg => new DOMParser()
        .parseFromString(svg, 'image/svg+xml')
        .querySelector('svg'))
      .then(icon => {
        if (svgRef.current) {
          svgRef.current.replaceWith(icon);
        }
      })
      .catch((error) => {
        console.error('Error loading icon:', error);
      });
  }, []);

  return (
    <>
      <svg ref={svgRef} />
    </>
  );
};

Svg.propTypes = {
  src: PropTypes.string,
};

