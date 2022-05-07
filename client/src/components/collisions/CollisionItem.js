import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const CollisionItem = ({ collision: { errormsg } }) => {
  return (
    <div className=' bg-light collision'>
      <p>{errormsg}</p>
    </div>
  );
};

CollisionItem.propTypes = {
  collision: PropTypes.object.isRequired,
};

export default CollisionItem;
//CPSC 4360 Computer Security, on T,TR: 10:55 - 11:55 clashes with CPSC 4366 Interactive Computer and Graphics& Animations, on T,TR: 10:55 - 11:55
