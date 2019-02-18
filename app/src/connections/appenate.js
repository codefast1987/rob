const { Appenate } = require('appenate-easyforms');
const appenate = new Appenate({
  integrationKey: '7111243ffdff460f8f8959d3c2710c30',
  companyId: 40197
});

export async function addAppenateAppointment({
  StartTime,
  Duration,
  Customer,
  BuildingType,
  BuildingAge,
  ReportReason,
  DateCreated
}) {
  console.log(
    StartTime,
    Duration,
    Customer,
    BuildingType,
    BuildingAge,
    ReportReason,
    DateCreated
  );

  return appenate.putDatasource({
    id: '5d7515a2-436a-4683-9f7e-a9f50015d3ad',
    newRows: [
      {
        StartTime,
        Duration,
        Customer,
        BuildingType,
        BuildingAge,
        ReportReason,
        DateCreated
      }
    ]
  });
}

export async function addAppenateCustomer({ Name, Email, Mobile, Address }) {
  return appenate.putDatasource({
    id: '1b2fa8ca-1eb9-4bc3-ac95-a9f50029b225',
    newRows: [{ Name, Email, Mobile, Address }]
  });
}
