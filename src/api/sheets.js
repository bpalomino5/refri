// Libraries
import { google } from 'googleapis';

const getSheetItems = async ({ range, valueRenderOption }) => {
  try {
    const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    const jwt = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      null,
      (process.env.GOOGLE_SERVICE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
      target
    );

    const sheets = google.sheets({ version: 'v4', auth: jwt });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SPREADSHEET_ID,
      range,
      valueRenderOption,
    });

    const rows = response.data.values;

    return rows;
  } catch (err) {
    console.error(err);
  }
  return [];
};

export default getSheetItems;
