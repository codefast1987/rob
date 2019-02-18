import React, { Component } from 'react';
import View from './view';
import moment from 'moment-timezone';
// import moment from 'moment';

import './index.css';
import 'fullcalendar/dist/fullcalendar.css';
import 'fullcalendar-scheduler/dist/scheduler.css';

import $ from 'jquery';
import 'fullcalendar-scheduler';
// import { Knack } from 'easyforms-knack';
import './index.css';
import Knack from '../../connections/knack';

// moment.tz.setDefault('UTC');

class Appointment extends Component {
  constructor(props) {
    super(props);

    this.editable = true;
    this.calendar = null;
    this.height = 800;

    this.state = {
      userEvent: this.props.userEvent,
      resources: [],
      events: [],
      popoverEvent: null,
      loading: false,
      isOpen: false,
      url: ''
    };

    this.knack = new Knack();

    this._eventResize = this._eventResize.bind(this);
    this._eventDrop = this._eventDrop.bind(this);
    this._refetchEvents = this._refetchEvents.bind(this);
    this._updateUserEvent = this._updateUserEvent.bind(this);
    this._getEvents = this._getEvents.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.refetching === false && this.props.refetching === true) {
      this._refetchEvents();
    }

    if (prevProps.userEvent.start !== this.props.userEvent.start)
      this._updateUserEvent();
  }

  _updateUserEvent() {
    let { userEvent } = this.props;
    console.log('userEvent', userEvent);

    let events = this.calendar.fullCalendar('clientEvents');
    let event = events.find(({ title }) => title === userEvent.title);

    if (event) {
      event.start = userEvent.start;
      console.log('updateUserEvent', event);
      this.calendar.fullCalendar('changeView', 'agendaWeek', userEvent.start);
      this.calendar.fullCalendar('updateEvent', event);
      this.setState({ userEvent });
    } else {
      console.log('User Event not found', events);
    }
  }

  async _getEvents(start, end) {
    let events = [
      ...(await this.props.getEvents(start, end)),
      this.state.userEvent
    ];
    return events;
  }

  async componentDidMount() {
    let { getEvents } = this.props;
    let { userEvent } = this.state;

    this.calendar = $('#calendar').fullCalendar({
      schedulerLicenseKey: this.props.schedulerLicenseKey,
      defaultView: 'agendaWeek',
      events: async (start, end, timezone, callback) =>
        callback(await this._getEvents(start, end)),
      loading: (loading) => this.setState({ loading }),
      eventLimit: 5,
      titleFormat: 'MMM D',
      allDaySlot: false,
      minTime: '07:00:00',
      maxTime: '19:00:00',
      editable: false,
      eventDurationEditable: false,
      defaultTimedEventDuration: '02:00:00',
      height: this.height,
      eventDrop: this._eventDrop,
      eventResize: this._eventResize
    });
  }

  _refetchEvents() {
    this.calendar.fullCalendar('refetchEvents');
  }

  _rerenderEvents() {
    this.calendar.fullCalendar('rerenderEvents');
  }

  async _eventDrop(event, delta, revertFunc, jsEvent, ui, view) {
    const { start, end, dateField, objectNo, knackId, knack } = event;
    const { onChange } = this.props;

    onChange({
      idealDate: start.format('YYYY-MM-DD'),
      idealTime: start.format('HH:mm:ss')
    });
  }

  _eventResize(event, delta, revertFunc, jsEvent, ui, view) {
    const { start, end, dateField, objectNo, knackId } = event;
    console.log(start, end);

    this.knack.update(objectNo, knackId, {
      [dateField]: {
        date: start.format('DD/MM/YYYY'),
        hours: start.hours(),
        minutes: start.minutes(),
        am_pm: start.format('a')
      }
    });
  }

  _formatPostDate(date) {
    date = moment(date);
    // return date.toISOString();
    return {
      date: date.format('DD/MM/YYYY'),
      hours: date.hours(),
      minutes: date.minutes(),
      am_pm: date.format('a')
    };
  }

  render() {
    return View.call(this);
  }
}

export default Appointment;
