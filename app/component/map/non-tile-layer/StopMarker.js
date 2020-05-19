import PropTypes from 'prop-types';
import React from 'react';
import Relay from 'react-relay/classic';
import cx from 'classnames';

import StopRoute from '../../../route/StopRoute';
import StopMarkerPopup from '../popups/StopMarkerPopup';
import GenericMarker from '../GenericMarker';
import Icon from '../../Icon';
import {
  getCaseRadius,
  getStopRadius,
  getHubRadius,
} from '../../../util/mapIconUtils';
import { isBrowser } from '../../../util/browser';
import Loading from '../../Loading';
import { addAnalyticsEvent } from '../../../util/analyticsUtils';

let L;

/* eslint-disable global-require */
// TODO When server side rendering is re-enabled,
//      these need to be loaded only when isBrowser is true.
//      Perhaps still using the require from webpack?
if (isBrowser) {
  L = require('leaflet');
}
/* eslint-enable global-require */

class StopMarker extends React.Component {
  static propTypes = {
    stop: PropTypes.object.isRequired,
    mode: PropTypes.string.isRequired,
    renderName: PropTypes.bool,
    disableModeIcons: PropTypes.bool,
    selected: PropTypes.bool,
    icon: PropTypes.string,
  };

  static defaultProps = {
    renderName: false,
    disableModeIcons: false,
    selected: false,
    icon: null,
  };

  static contextTypes = {
    getStore: PropTypes.func.isRequired,
    config: PropTypes.object.isRequired,
  };

  getModeIcon = zoom => {
    const iconId = `icon-icon_${this.props.mode}`;
    const icon = Icon.asString({ img: iconId, className: 'mode-icon' });
    let size;
    if (zoom <= this.context.config.stopsSmallMaxZoom) {
      size = this.context.config.stopsIconSize.small;
    } else if (this.props.selected) {
      size = this.context.config.stopsIconSize.selected;
    } else {
      size = this.context.config.stopsIconSize.default;
    }

    return L.divIcon({
      html: icon,
      iconSize: [size, size],
      className: cx('cursor-pointer', this.props.mode, {
        small: size === this.context.config.stopsIconSize.small,
        selected: this.props.selected,
      }),
    });
  };

  getIcon = zoom => {
    const scale = this.props.stop.transfer || this.props.selected ? 1.5 : 1;
    const calcZoom =
      this.props.stop.transfer || this.props.selected
        ? Math.max(zoom, 15)
        : zoom;

    const radius = getCaseRadius(calcZoom) * scale;
    const stopRadius = getStopRadius(calcZoom) * scale;
    const hubRadius = getHubRadius(calcZoom) * scale;

    const inner = (stopRadius + hubRadius) / 2;
    const stroke = stopRadius - hubRadius;

    // see app/util/mapIconUtils.js for the canvas version
    let iconSvg =
      this.props.icon === this.props.mode
        ? `<svg viewBox="0 0 32.53 32.53">
    <g transform="matrix(0.06561676,0,0,0.0756361,-0.02376853,-0.01456643)">
    <polygon
            points="442.98,281.66 437.76,290.66 427.5,290.66 422.28,281.66 427.5,272.84 437.76,272.84 "
            transform="matrix(23.961353,0,0,24.112152,-10116.4,-6576.4381)"
            style="fill:#ec2b26;fill-rule:nonzero;stroke:none;stroke-width:2.16000009;stroke-linecap:butt;stroke-linejoin:bevel"
            id="4" />
    <path
            d="m 71.65255,155.18221 c 21.772755,0.11098 43.55282,-0.25475 65.31971,0.25301 11.10978,0.10288 23.11516,2.69486 30.70466,11.46829 11.14381,11.3375 11.56045,31.00992 0.8971,42.80115 -2.16455,3.60182 -9.13798,6.63508 -10.13934,8.30881 12.86299,3.48896 23.45133,14.91653 24.26272,28.48876 1.75641,17.4539 -9.4634,36.37114 -27.18111,40.23335 -12.17833,2.50624 -24.73084,1.62025 -37.09252,2.02686 -15.59032,0.0275 -31.180828,0.004 -46.77122,0.0119 0,-44.53071 0,-89.06143 0,-133.59214 z m 26.804893,22.23498 c 0,10.29735 0,20.5947 0,30.89204 12.901537,-0.18468 25.860497,0.51944 38.712407,-0.70976 7.31718,-0.89452 13.57491,-7.41312 13.08623,-14.96407 0.47239,-7.0359 -4.80818,-13.68522 -11.86936,-14.5098 -13.24427,-1.20257 -26.6294,-0.54392 -39.929277,-0.70841 z m 0,53.12705 c 0,11.90725 0,23.8145 0,35.72175 14.018007,-0.17077 28.070707,0.46297 42.056657,-0.6279 8.06457,-0.65242 14.93798,-7.77466 14.61737,-15.99119 0.85677,-8.42723 -5.323,-16.63837 -13.7647,-17.83933 -14.18217,-2.04941 -28.62038,-1.00512 -42.909327,-1.26333 z"
            style="fill:#ffffff"
            id="5" />
    <path
            d="m 206.45918,155.18221 c 8.93497,0 17.86994,0 26.8049,0 0.0933,28.36802 -0.20656,56.74049 0.19064,85.10516 -0.18421,8.34843 1.74665,17.63529 9.00091,22.74362 8.50283,6.038 20.11775,6.04154 29.77341,3.13322 7.63102,-2.63846 12.56429,-10.42425 12.62423,-18.36849 1.16353,-16.88656 0.47432,-33.83194 0.66224,-50.74656 0,-13.95565 -1e-5,-27.9113 -1e-5,-41.86695 8.93497,0 17.86994,0 26.8049,0 -0.0854,27.52733 0.18818,55.05821 -0.17199,82.58288 -0.47444,13.53652 -0.92109,28.69588 -10.7612,39.18608 -10.46439,11.46998 -26.73702,14.45937 -41.59225,14.09704 -13.40929,0.002 -27.83336,-1.78027 -38.33515,-10.97219 -8.67098,-7.0423 -13.17516,-17.95162 -13.86963,-28.91928 -1.82026,-18.97542 -0.90618,-38.06211 -1.13099,-57.09475 0,-12.95993 -1e-5,-25.91986 -1e-5,-38.87978 z"
            style="fill:#ffffff"
            id="6" />
    <path
            d="m 336.49188,245.30679 c 8.69348,-0.85052 17.38697,-1.70104 26.08045,-2.55156 1.5306,10.30027 7.30544,21.11403 18.0095,24.05755 9.69562,2.55512 21.04833,2.41251 29.63818,-3.29643 7.14795,-4.65493 10.41779,-15.92752 3.89412,-22.44481 -7.36547,-6.20701 -17.4344,-7.07197 -26.3514,-9.79259 -14.26423,-3.67316 -30.38816,-7.46105 -39.59465,-20.03652 -11.13578,-14.23997 -8.35219,-36.83732 5.89187,-47.984 13.25908,-10.46829 31.25449,-11.39035 47.40377,-9.66518 13.97224,1.34491 28.21573,8.39208 34.65909,21.39813 2.76344,5.54256 4.82656,12.70408 4.15927,18.38852 -8.81815,0.38972 -17.6363,0.77944 -26.45444,1.16916 -0.94643,-8.1101 -5.89789,-16.52895 -14.45524,-18.19114 -9.69232,-2.01672 -21.09039,-1.91066 -29.19471,4.50931 -6.10567,5.15389 -2.93628,15.31249 4.16702,17.75982 17.58014,8.0151 38.18939,8.17746 54.55495,19.09109 10.9888,7.27066 16.2364,20.72108 15.51148,33.57456 -0.36443,15.90849 -11.30122,30.89414 -26.46804,35.84694 -14.45932,4.85333 -30.32104,5.10585 -45.19082,2.07145 -14.57916,-2.87006 -27.31519,-13.39642 -32.33319,-27.45741 -2.05264,-5.2706 -3.26904,-10.83829 -3.92721,-16.44689 z"
            style="fill:#ffffff"
            id="7" />
    </g>
    </svg>`
        : `
      <svg viewBox="0 0 ${radius * 2} ${radius * 2}">
        <circle class="stop-halo" cx="${radius}" cy="${radius}" r="${radius}"/>
        <circle class="stop" cx="${radius}" cy="${radius}" r="${inner}" stroke-width="${stroke}"/>
        ${
          inner > 7 && this.props.stop.platformCode
            ? `<text x="${radius}" y="${radius}" text-anchor="middle" dominant-baseline="central"
            fill="#333" font-size="${1.2 * inner}px"
            font-family="Gotham XNarrow SSm A, Gotham XNarrow SSm B, Arial, sans-serif"
            >${this.props.stop.platformCode}</text>`
            : ''
        }
      </svg>
    `;

    if (radius === 0) {
      iconSvg = '';
    }

    return L.divIcon({
      html: iconSvg,
      iconSize: [radius * 2, radius * 2],
      className: `${this.props.mode} cursor-pointer`,
    });
  };

  render() {
    if (!isBrowser) {
      return '';
    }

    return (
      <GenericMarker
        position={{
          lat: this.props.stop.lat,
          lon: this.props.stop.lon,
        }}
        getIcon={
          this.context.config.map.useModeIconsInNonTileLayer &&
          !this.props.disableModeIcons
            ? this.getModeIcon
            : this.getIcon
        }
        id={this.props.stop.gtfsId}
        renderName={this.props.renderName}
        name={this.props.stop.name}
      >
        <Relay.RootContainer
          Component={StopMarkerPopup}
          route={
            new StopRoute({
              stopId: this.props.stop.gtfsId,
              date: this.context
                .getStore('TimeStore')
                .getCurrentTime()
                .format('YYYYMMDD'),
              currentTime: this.context
                .getStore('TimeStore')
                .getCurrentTime()
                .unix(),
            })
          }
          renderLoading={() => (
            <div className="card" style={{ height: '12rem' }}>
              <Loading />
            </div>
          )}
          renderFetched={data => {
            const pathPrefixMatch = window.location.pathname.match(
              /^\/([a-z]{2,})\//,
            );
            const context = pathPrefixMatch ? pathPrefixMatch[1] : 'index';
            addAnalyticsEvent({
              action: 'SelectMapPoint',
              category: 'Map',
              name: 'stop',
              type: this.props.mode.toUpperCase(),
              context,
            });
            return <StopMarkerPopup {...data} />;
          }}
        />
      </GenericMarker>
    );
  }
}

export default StopMarker;
