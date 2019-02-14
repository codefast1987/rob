import React, { Component } from 'react';
import './index.css';

export default class ContactForm extends Component {
  constructor(props) {
    super(props);
    
  }

  render() {
    const {
      name,
      estateAgent,
      mobile,
      street,
      street2,
      email,
      state,
      city,
      zip,
      onChange
    } = this.props;

    return (
      <div className="form-main">
        <div className="input-group">
          <label>Name *</label>
          <input
            onChange={(event) => onChange({ name: event.target.value })}
            value={name}
            placeholder="Name"
          />
          <label>Estate Agent</label>
          <input
            onChange={(event) => onChange({ estateAgent: event.target.value })}
            value={estateAgent}
            placeholder="Estate Agent"
          />
          <label>Mobile *</label>
          <input
            onChange={(event) => onChange({ mobile: event.target.value })}
            value={mobile}
            placeholder="Mobile"
          />
          <label>Email *</label>
          <input
            type="email"
            onChange={(event) => onChange({ email: event.target.value })}
            value={email}
            placeholder="Email"
          />
        </div>
        <div className="input-group">
          <label>Street *</label>
          <input
            onChange={(event) => onChange({ street: event.target.value })}
            value={street}
            placeholder="Street"
          />
          <label>Street 2 *</label>
          <input
            onChange={(event) => onChange({ street2: event.target.value })}
            value={street2}
            placeholder="Street 2"
          />

          <label>City *</label>
          <input
            onChange={(event) => onChange({ city: event.target.value })}
            value={city}
            placeholder="City"
          />
          {/* <label>State</label>
          <input
            onChange={(event) => onChange({ state: event.target.value })}
            value={state}
            placeholder="State"
          />
          <label>ZIP</label>
          <input
            onChange={(event) => onChange({ zip: event.target.value })}
            value={zip}
            placeholder="ZIP"
          /> */}
        </div>
      </div>
    );
  }
}
