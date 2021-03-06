import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Icon';
import ChargingStations from './ChargingStations';
import ChargingStationPopup from '../popups/ChargingStationPopup';

export default function SelectDynamicParkingLotsRow(props, context) {
  const { selectRow, properties } = props;
  const { intl } = context;
  return (
    <div className="no-margin">
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions,jsx-a11y/click-events-have-key-events */}
      <div className="cursor-pointer select-row" onClick={selectRow}>
        <div className="padding-vertical-normal select-row-icon">
          <Icon
            img={`icon-icon_${ChargingStations.getIcon(properties)}`}
            viewBox="0 0 18 18"
          />
        </div>
        <div className="padding-vertical-normal select-row-text">
          <span className="header-primary no-margin link-color">
            {ChargingStationPopup.getName(
              properties.name,
              properties.vehicleType,
              intl,
            )}
          </span>
        </div>
        <div className="clear" />
      </div>
      <hr className="no-margin gray" />
    </div>
  );
}

SelectDynamicParkingLotsRow.propTypes = {
  selectRow: PropTypes.func.isRequired,
  properties: PropTypes.object.isRequired,
};
