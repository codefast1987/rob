import React from 'react';
// import Popover from '../popover';
// import { MoonLoader, BarLoader } from 'react-spinners';
// import Drawer from '../drawer';

export default function() {
  const { buildingAge, reportReason } = this.state;

  const { onChange, buildingType, idealDate, idealTime } = this.props;

  return (
    <div className="appointment form-main">
      <div className="input-group">
        <label>Date *</label>
        <input
          type="date"
          value={idealDate}
          onChange={(event) => onChange({ idealDate: event.target.value })}
        />
        <label>Time *</label>
        <input
          type="time"
          value={idealTime}
          onChange={(event) => onChange({ idealTime: event.target.value })}
        />
        <label>Building Type *</label>
        <input
          value={buildingType}
          placeholder="Building Type"
          onChange={(event) => onChange({ buildingType: event.target.value })}
        />
        <label>Building Age *</label>
        <input
          value={buildingAge}
          placeholder="Building Age"
          onChange={(event) => onChange({ buildingAge: event.target.value })}
        />
        <label>Report Reason *</label>
        <textarea
          value={reportReason}
          placeholder="Report Reason"
          onChange={(event) => onChange({ reportReason: event.target.value })}
        />
        {this.props.children}
      </div>
      <div id="calendar" />
    </div>
  );
}
