import moment from 'moment';

export default class Knack {
  constructor() {
    this.applicationId = '5c5ca2484b63b428b2f48193';
    this.apiKey = 'e9d10140-2b1f-11e9-8d98-9dfab9f4a9ef';
    this.url = 'https://api.knack.com/v1/objects';

    this.appointmentObj = 'object_1';
    this.customerObj = 'object_2';
  }

  async bookAppointment({ customer, appointment }) {
    console.log('submitting', customer, appointment);

    let customerId = (await this.createCustomer(customer)).id;

    if (!customerId) throw new Error('No customerId, customer not made/found!');

    await this.createAppointment({ ...appointment, customerId });
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

    console.log('search result', response);
    if (response.records.length > 0) return response.records[0];

    response = await (await fetch(`${this.url}/${this.customerObj}/records`, {
      method: 'POST',
      headers: {
        'X-Knack-Application-Id': this.applicationId,
        'X-Knack-REST-API-KEY': this.apiKey,
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
    })).json();

    if (response.errors)
      throw new Error(
        response.errors.reduce((string, err) => (string += err.message), '')
      );

    return response;
  }

  async createAppointment({
    idealTime,
    idealDate,
    buildingAge,
    buildingType,
    reportReason,
    customerId
  }) {
    let start = moment(`${idealDate}T${idealTime}`, 'YYYY-MM-DDTHH:mm:ss');

    let response = await (await fetch(
      `${this.url}/${this.appointmentObj}/records`,
      {
        method: 'POST',
        headers: {
          'X-Knack-Application-Id': this.applicationId,
          'X-Knack-REST-API-KEY': this.apiKey,
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

    return response;
  }
}
