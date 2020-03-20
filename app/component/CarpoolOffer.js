import React from 'react';
import PropTypes from 'prop-types';
import { intlShape, FormattedMessage } from 'react-intl';
import Moment from 'moment';
import { routerShape } from 'react-router';
import Icon from './Icon';
import Checkbox from './Checkbox';
import logo from '../../static/img/fahrgemeinschaft-de-rund.png';
import Loading from './Loading';

export default class CarpoolOffer extends React.Component {
  static contextTypes = {
    intl: intlShape.isRequired,
    config: PropTypes.object.isRequired,
    router: routerShape,
  };

  static propTypes = {
    onToggleClick: PropTypes.func.isRequired,
    from: PropTypes.object.isRequired,
    to: PropTypes.object.isRequired,
    start: PropTypes.number.isRequired,
  };

  allWeekdays = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ];

  allWeekdaysFalse = this.allWeekdays.reduce((accumulator, curr) => {
    accumulator[curr] = false;
    return accumulator;
  }, {});

  constructor(props) {
    super(props);
    this.state = {
      isRegularly: false,
      selectedDays: [],
      days: this.allWeekdaysFalse,
      GDPR: false,
      formState: 'initial',
    };
    this.setRegular = this.setRegular.bind(this);
    this.setOnce = this.setOnce.bind(this);
    this.finishForm = this.finishForm.bind(this);
    this.close = this.close.bind(this);
  }

  setRegular = () => {
    this.setState({ isRegularly: true });
  };

  setOnce = () => {
    this.setState({
      isRegularly: false,
      days: this.allWeekdaysFalse,
    });
  };

  updateSelectedDays = day => {
    if (this.state.selectedDays.includes(day)) {
      this.state.selectedDays.splice(this.state.selectedDays.indexOf(day), 1);
    } else {
      this.state.selectedDays.push(day);
    }
  };

  updatePhoneNumber = event => {
    this.setState({ phoneNumber: event.target.value });
  };

  finishForm = e => {
    e.preventDefault();

    const carpoolOffer = {
      origin: {
        label: this.props.from.name,
        lat: this.props.from.lat,
        lon: this.props.from.lon,
      },
      destination: {
        label: this.props.to.name,
        lat: this.props.to.lat,
        lon: this.props.to.lon,
      },
      phoneNumber: this.state.phoneNumber,
      time: {
        type: this.isRegularly ? 'recurring' : 'one-off',
        departureTime: new Moment(this.props.start).format('HH:mm'),
      },
    };

    if (this.isRegularly) {
      carpoolOffer.time.weekdays = this.days;
    } else {
      carpoolOffer.time.date = new Moment(this.props.start).format(
        'YYYY-MM-DD',
      );
    }

    this.setState({ formState: 'sending' });
    fetch('/carpool-offers', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      body: JSON.stringify(carpoolOffer),
      // eslint-disable-next-line func-names
    }).then(response => {
      if (response.status === 200) {
        this.setState({ formState: 'success' });
      }
      return response.json();
    });
  };

  getOfferedTimes = () => {
    let departureDay = '';
    const departureTime = new Moment(this.props.start).format('HH:mm');
    if (this.state.isRegularly) {
      // If the offer is recurring, return all the selected days as a string.
      for (let i = 0; i < this.state.selectedDays.length; i++) {
        departureDay = departureDay
          .concat(this.state.selectedDays[i])
          .concat('s, ');
      }
      departureDay = departureDay.toLowerCase();
      departureDay =
        departureDay.charAt(0).toUpperCase() + departureDay.slice(1);
      departureDay = departureDay.replace(/,(?=[^,]*$)/, '');
    } else {
      // If the offer is one-off, get the date from the epoch time.
      departureDay = new Moment(this.props.start).format('YYYY-MM-DD');
    }
    return departureDay
      .concat(' ')
      .concat('um') // TODO: translate
      .concat(' ')
      .concat(departureTime)
      .concat('.');
  };

  close() {
    this.context.router.goBack();
    this.setState({
      formState: 'initial',
      days: this.allWeekdaysFalse,
      isRegularly: false,
      GDPR: false,
    });
  }

  renderCheckbox(weekday, isRegularly) {
    return (
      <Checkbox
        disabled={!isRegularly}
        checked={isRegularly && this.state.days[weekday]}
        onChange={e => {
          this.updateSelectedDays(e.currentTarget.getAttribute('aria-label'));
          this.setState(prevState => {
            // eslint-disable-next-line no-param-reassign
            prevState.days[weekday] = !prevState.days[weekday];
            return prevState;
          });
        }}
        labelId={weekday}
      />
    );
  }

  renderSuccessMessage() {
    const origin = this.props.from.name;
    const destination = this.props.to.name;
    const offeredTimes = this.getOfferedTimes();
    const { isRegularly } = this.state;

    return (
      <div className="sidePanelText">
        <h2>
          <FormattedMessage id="thank-you" defaultMessage="Thank you" />
        </h2>
        <p>
          <FormattedMessage
            id="carpool-offer-success"
            values={{ origin, destination }}
            defaultMessage="Your offer from {origin} to {destination} was added."
          />
          <br />
          {isRegularly ? (
            <FormattedMessage
              id="chosen-times-recurring"
              defaultMessage="You've set the following times and days:"
            />
          ) : (
            <FormattedMessage
              id="chosen-times-once"
              defaultMessage="You've set the following time:"
            />
          )}
          <br />
          {offeredTimes}
        </p>
        <button type="submit" className="sidePanel-btn" onClick={this.close}>
          <FormattedMessage id="close" defaultMessage="Close" />
        </button>
      </div>
    );
  }

  renderForm() {
    const origin = this.props.from.name;
    const destination = this.props.to.name;
    const departure = new Moment(this.props.start).format('HH:mm');
    const { GDPR, isRegularly } = this.state;

    return (
      <form onSubmit={this.finishForm} className="sidePanelText">
        <h2>
          <FormattedMessage id="your-carpool-trip" defaultMessage="Your trip" />
        </h2>
        <p>
          <b>
            <FormattedMessage id="origin" defaultMessage="Origin" />
          </b>
          : {origin} <FormattedMessage id="at-time" defaultMessage="at" />{' '}
          {departure}
          <br />
          <b>
            <FormattedMessage id="destination" defaultMessage="Destination" />
          </b>
          : {destination}
        </p>
        <p>
          <FormattedMessage
            id="add-carpool-offer-frequency"
            defaultMessage="How often do you want to add the offer?"
          />
          <div>
            <label className="radio-label" htmlFor="once">
              <input
                onChange={this.setOnce}
                type="radio"
                id="once"
                value="once"
                name="times"
                defaultChecked
              />
              <FormattedMessage id="once" defaultMessage="once" />
            </label>
          </div>
          <div>
            <label className="radio-label" htmlFor="regularly">
              <input
                onChange={this.setRegular}
                type="radio"
                id="regularly"
                value="regularly"
                name="times"
              />
              <FormattedMessage id="recurring" defaultMessage="recurring" />
            </label>
          </div>
        </p>
        <div className="carpool-checkbox">
          {this.allWeekdays.map(day => this.renderCheckbox(day, isRegularly))}
        </div>
        <label className="phone-label" htmlFor="phone">
          <FormattedMessage
            id="add-phone-number"
            defaultMessage="Add your phone number"
          />
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="123-456-78901"
            pattern="\+?[0-9,\-,(,), ]+"
            required
            onChange={this.updatePhoneNumber}
          />
        </label>
        <div className="carpool-checkbox">
          <Checkbox
            checked={GDPR}
            onChange={() => {
              this.setState({ GDPR: !GDPR });
            }}
            labelId="accept-carpool-policy"
          />
        </div>
        <button disabled={!GDPR} className="standalone-btn" type="submit">
          <FormattedMessage id="offer-ride" defaultMessage="Offer carpool" />
        </button>
      </form>
    );
  }

  renderBody() {
    const { formState } = this.state;
    if (formState === 'initial') {
      return this.renderForm();
    }
    if (formState === 'sending') {
      return <Loading />;
    }
    if (formState === 'success') {
      return this.renderSuccessMessage();
    }
    return null;
  }

  render() {
    const { onToggleClick } = this.props;

    return (
      <div className="customize-search carpool-offer">
        <button className="close-offcanvas" onClick={onToggleClick}>
          <Icon className="close-icon" img="icon-icon_close" />
        </button>
        <img alt="Fahrgemeinschaft.de" className="fg_icon" src={logo} />
        {this.renderBody()}
      </div>
    );
  }
}
