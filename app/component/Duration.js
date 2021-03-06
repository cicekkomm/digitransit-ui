import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';

import Icon from './Icon';
import { durationToString } from '../util/timeUtils';

function Duration(props) {
  const duration = durationToString(props.duration * 1000);

  return (
    <span className={cx(props.className)}>
      <Icon img="icon-icon_time" />
      <span className="duration">{duration}</span>
    </span>
  );
}

Duration.description = () =>
  "Displays itinerary's duration in minutes, and a time icon next to it." +
  'Takes duration in seconds as props';

Duration.propTypes = {
  duration: PropTypes.number.isRequired,
  className: PropTypes.string,
};

Duration.defaultProps = {
  className: '',
};

export default Duration;
