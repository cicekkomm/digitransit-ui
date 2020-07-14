import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connectToStores } from 'fluxible-addons-react';
import { createFragmentContainer, graphql } from 'react-relay';
import { matchShape, routerShape } from 'found';
import withBreakpoint from '../util/withBreakpoint';
import { getNearYouPath } from '../util/path';
import { addressToItinerarySearch } from '../util/otpStrings';
import DesktopView from './DesktopView';
import { startLocationWatch } from '../action/PositionActions';
import StopsNearYouContainer from './StopsNearYouContainer';
import Loading from './Loading';

class StopsNearYouPage extends React.Component { // eslint-disable-line
  static contextTypes = {
    config: PropTypes.object,
    executeAction: PropTypes.func.isRequired,
    headers: PropTypes.object.isRequired,
    getStore: PropTypes.func,
    router: routerShape.isRequired,
    match: matchShape.isRequired,
  };

  static propTypes = {
    stopPatterns: PropTypes.any.isRequired,
    loadingPosition: PropTypes.bool,
  };

  constructor(props, context) {
    super(props, context);
    context.executeAction(startLocationWatch);
  }

  render() {
    let content;
    if (this.props.loadingPosition) {
      content = <Loading />;
    } else {
      content = (
        <StopsNearYouContainer stopPatterns={this.props.stopPatterns} />
      );
    }

    return (
      <DesktopView
        title={
          <FormattedMessage
            id="nearest-stops"
            defaultMessage="Stops near you"
          />
        }
        bckBtnColor={this.context.config.colors.primary}
        content={content}
      />
    );
  }
}

const StopsNearYouPageWithBreakpoint = withBreakpoint(StopsNearYouPage);

const PositioningWrapper = connectToStores(
  StopsNearYouPageWithBreakpoint,
  ['PositionStore'],
  (context, props) => {
    const { place, mode } = props.match.params;
    if (place !== 'POS') {
      return props;
    }
    const locationState = context.getStore('PositionStore').getLocationState();
    if (locationState.locationingFailed) {
      // props.router.replace(getNearYouPath(context.config.defaultEndPoint))
      return { ...props, loadingPosition: false };
    }

    if (
      locationState.isLocationingInProgress ||
      locationState.isReverseGeocodingInProgress
    ) {
      return { ...props, loadingPosition: true };
    }

    if (locationState.hasLocation) {
      const locationForUrl = addressToItinerarySearch(locationState);
      const newPlace = locationForUrl;
      props.router.replace(getNearYouPath(newPlace, mode));
      return { ...props, loadingPosition: false };
    }

    context.executeAction(startLocationWatch);
    return { ...props, loadingPosition: true };
  },
);

PositioningWrapper.contextTypes = {
  ...PositioningWrapper.contextTypes,
  executeAction: PropTypes.func.isRequired,
};

const containerComponent = createFragmentContainer(PositioningWrapper, {
  stopPatterns: graphql`
    fragment StopsNearYouPage_stopPatterns on placeAtDistanceConnection
      @argumentDefinitions(
        omitNonPickups: { type: "Boolean!", defaultValue: false }
      ) {
      ...StopsNearYouContainer_stopPatterns
        @arguments(omitNonPickups: $omitNonPickups)
    }
  `,
});

export {
  containerComponent as default,
  StopsNearYouPageWithBreakpoint as Component,
};