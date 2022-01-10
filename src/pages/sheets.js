// Libraries
import { google } from 'googleapis';

async function getItems() {
  try {
    const target = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
    const jwt = new google.auth.JWT(
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL,
      null,
      (process.env.NEXT_PUBLIC_GOOGLE_SERVICE_PRIVATE_KEY || '').replace(
        /\\n/g,
        '\n'
      ),
      target
    );

    const sheets = google.sheets({ version: 'v4', auth: jwt });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.NEXT_PUBLIC_SPREADSHEET_ID,
      range: 'Sheet1',
    });

    const rows = response.data.values;
    return rows;
  } catch (err) {
    console.error(err);
  }
  return [];
}

export default function Sheets({ rows }) {
  return (
    <div>
      <pre>{JSON.stringify(rows, null, 2)}</pre>
    </div>
  );
}

export async function getStaticProps() {
  const rows = await getItems();
  return {
    props: { rows },
  };
}
