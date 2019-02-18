import React, { Component } from 'react';
import Appointment from '../../components/appointment';
import ContactForm from '../../components/contactForm';
import moment from 'moment-timezone';
import Button from '../../components/button';
import Knack from '../../connections/knack';
import Transition from 'react-transition-group/Transition';
import './index.css';
import CollapseSection from '../../components/collapseSection';

export default class BookingContainer extends Component {
  constructor(props) {
    super(props);

    this.knack = new Knack();

    this.defaultState = {
      updateUserEvent: false,
      refetching: false,
      customer: {
        name: '',
        estateAgent: '',
        email: '',
        mobile: '',
        street: '',
        street2: '',
        city: ''
      },
      appointment: {
        idealDate: new moment().format('YYYY-MM-DD') || '',
        idealTime: new moment().format('HH:mm:ss') || '',
        buildingAge: '',
        buildingType: '',
        reportReason: ''
      }
    };

    this.state = { ...this.defaultState };

    this._updateAppointment = this._updateAppointment.bind(this);
    this._updateCustomer = this._updateCustomer.bind(this);
    this._getEvents = this._getEvents.bind(this);
    this._submit = this._submit.bind(this);
  }

  _updateAppointment(update) {
    this.setState({
      appointment: {
        ...this.state.appointment,
        ...update
      }
    });
  }

  _updateCustomer(update) {
    this.setState({ customer: { ...this.state.customer, ...update } });
  }

  _getEvents(start, end) {
    let events = this.knack.getCalendarData(start, end);
    return events;
  }

  _verifyCustomer({ name, estateAgent, email, mobile, street, street2, city }) {
    return !(
      name === '' ||
      estateAgent === '' ||
      email === '' ||
      mobile === '' ||
      street === '' ||
      street2 === '' ||
      city === ''
    );
  }

  _verifyAppointment({ date, time, buildingType, buildingAge, reportReason }) {
    return !(
      date === '' ||
      time === '' ||
      buildingType === '' ||
      buildingAge === '' ||
      reportReason === ''
    );
  }

  async _submit() {
    await this.knack.bookAppointment(this.state);
    this.setState({ refetching: true });
    this.setState({ ...this.defaultState });
  }

  render() {
    let { refetching, updateUserEvent } = this.state;
    let { idealDate, idealTime } = this.state.appointment;
    return (
      <div>
        <div className="booking-container">
          <CollapseSection header="Enter your details:" isOpened={true}>
            <ContactForm
              onChange={this._updateCustomer}
              {...this.state.appointment}
            />
          </CollapseSection>
          <CollapseSection
            header="Book your appointment"
            disabled={!this._verifyCustomer(this.state.customer)}
            disabledText="Please enter your details before arranging a booking"
            isOpened={this._verifyCustomer(this.state.customer)}
          >
            <Appointment
              refetching={refetching}
              getEvents={this._getEvents}
              userEvent={{
                start: `${idealDate}T${idealTime}`,
                title: 'Your Appointment',
                editable: true,
                color: 'var(--main-fg-color)'
              }}
              {...this.state.appointment}
              onChange={this._updateAppointment}
            >
              <Button
                className="booking-submit-button"
                disabled={!this._verifyAppointment(this.state.appointment)}
                onClick={this._submit}
              >
                Book
              </Button>
            </Appointment>
          </CollapseSection>
        </div>
      </div>
    );
  }
}
