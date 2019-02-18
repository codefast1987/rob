import moment from 'moment';

export default class Knack {
  constructor() {
    this.applicationId = '5c5ca2484b63b428b2f48193';
    this.apiKey = 'e9d10140-2b1f-11e9-8d98-9dfab9f4a9ef';
    this.url = 'https://api.knack.com/v1/objects';

    this.appointmentObj = 'object_1';
    this.appointmentView = 'view_3';
    this.appointmentScene = 'scene_2';

    this.customerObj = 'object_2';
    this.customerView = 'view_7';
    this.customerScene = 'scene_5';
  }

  async getUserToken() {
    let { session } = await (await fetch(
      `https://api.knack.com/v1/applications/${this.applicationId}/session`,
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email: 'keith@easyforms.co.nz',
          password: 'easyforms'
        })
      }
    )).json();
    return session.user.token;
  }

  async bookAppointment({ customer, appointment }) {
    let knackCustomer = await this.createCustomer(customer);

    if (!knackCustomer.id)
      throw new Error('No customerId, customer not made/found!');

    let knackAppointment = await this.createAppointment({
      ...appointment,
      customerId: knackCustomer.id
    });

    if (!knackAppointment.id)
      throw new Error('No appointment id, appointment not made/found!');

    return { knackAppointment, knackCustomer };
  }

  async getCalendarData(startDate, endDate) {
    let { records } = await (await fetch(
      `${this.url}/${this.appointmentObj}/records`,
      {
        headers: {
          'X-Knack-Application-Id': this.applicationId,
          'X-Knack-REST-API-KEY': this.apiKey
        }
      }
    )).json();
    return records.map((record) => ({
      start: new moment(record.field_2, 'DD/MM/YYYY h:mma').format(
        'YYYY-MM-DDTHH:mm:ss'
      ),
      title: 'Booked',
      color: 'grey'
    }));
  }

  async createCustomer({
    name,
    email,
    mobile,
    street,
    street2,
    city,
    state,
    zip
  }) {
    let [first = '', last = ''] = name.trim(' ').split(' ');

    let filters = {
      match: 'and',
      rules: [
        {
          field: 'field_5',
          operator: 'is',
          value: name
        },
        { field: 'field_6', operator: 'is', value: email }
      ]
    };
    let response = await (await fetch(
      `https://api.knack.com/v1/objects/${
        this.customerObj
      }/records?filters=${encodeURIComponent(
        JSON.stringify(filters)
      )}&rows_per_page=1000`,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Knack-Application-Id': this.applicationId,
          'X-Knack-REST-API-KEY': this.apiKey
        }
      }
    )).json();

    if (response.records.length > 0) return response.records[0];

    let token = await this.getUserToken();
    response = await (await fetch(
      `https://api.knack.com/v1/pages/${this.customerScene}/views/${
        this.customerView
      }/records`,
      {
        method: 'POST',
        headers: {
          'X-Knack-Application-Id': this.applicationId,
          'X-Knack-REST-API-KEY': 'knack',
          Authorization: token,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          field_5: { first, last },
          field_6: { email },
          field_7: mobile,
          field_8: {
            street,
            street2,
            city,
            state,
            zip
          }
        })
      }
    )).json();

    if (response.errors)
      throw new Error(
        response.errors.reduce((string, err) => (string += err.message), '')
      );

    return response.record;
  }

  async createAppointment({
    idealTime,
    idealDate,
    buildingAge,
    buildingType,
    reportReason,
    customerId
  }) {
    let token = await this.getUserToken();
    let start = moment(`${idealDate}T${idealTime}`, 'YYYY-MM-DDTHH:mm:ss');

    let response = await (await fetch(
      `https://api.knack.com/v1/pages/${this.appointmentScene}/views/${
        this.appointmentView
      }/records`,
      {
        method: 'POST',
        headers: {
          'X-Knack-Application-Id': this.applicationId,
          'X-Knack-REST-API-KEY': 'knack',
          Authorization: token,
          'content-type': 'application/json'
        },
        body: JSON.stringify({
          field_2: {
            date: start.format('DD/MM/YYYY'),
            hours: start.hours(),
            minutes: start.minutes(),
            am_pm: start.format('a')
          },
          field_9: customerId,
          field_11: buildingType,
          field_12: buildingAge,
          field_13: reportReason
        })
      }
    )).json();

    if (response.errors)
      throw new Error(
        response.errors.reduce((string, err) => (string += err.message), '')
      );

    return response.record;
  }
}
