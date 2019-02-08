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

    this.state = {
      updateUserEvent: false,
      refetching: false,
      customer: {
        name: 'asdf',
        estateAgent: 'asdf',
        email: 'asdf',
        mobile: 'asdf',
        street: 'asdf',
        street2: 'asdf',
        city: 'asdf',
        state: 'asdf',
        zip: 'asdf'
      },
      appointment: {
        idealDate: new moment().format('YYYY-MM-DD'),
        idealTime: new moment().format('HH:mm:ss'),
        buildingAge: '',
        buildingType: '',
        reportReason: ''
      }
    };

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

  _verifyCustomer({
    name,
    estateAgent,
    email,
    mobile,
    street,
    street2,
    city,
    state,
    zip
  }) {
    return !(
      name === '' ||
      estateAgent === '' ||
      email === '' ||
      mobile === '' ||
      street === '' ||
      street2 === '' ||
      city === '' ||
      state === '' ||
      zip === ''
    );
  }

  async _submit() {
    await this.knack.bookAppointment(this.state);
    this.setState({ refetching: true });
    this.setState({ refetching: false });
  }

  render() {
    console.log(this.state);

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
                title: 'User Event',
                editable: true
              }}
              {...this.state.appointment}
              onChange={this._updateAppointment}
            />
            <Button className="booking-submit-button" onClick={this._submit}>
              Submit
            </Button>
          </CollapseSection>
        </div>
      </div>
    );
  }
}
