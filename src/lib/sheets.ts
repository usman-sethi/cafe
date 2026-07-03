import { getAccessToken, googleSignIn } from './auth';

const SPREADSHEET_ID_KEY = 'luna_cafe_spreadsheet_id';

export async function getSpreadsheetId(): Promise<string | null> {
  let spreadsheetId = localStorage.getItem(SPREADSHEET_ID_KEY);
  
  if (!spreadsheetId) {
    let token = await getAccessToken();
    if (!token) {
      try {
        const authResult = await googleSignIn();
        if (authResult) token = authResult.accessToken;
      } catch (e) {
        console.error("Failed to sign in", e);
        return null;
      }
    }
    if (!token) return null;
    
    try {
      // Create a new spreadsheet
      const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          properties: {
            title: 'Luna Cafe Database',
          },
          sheets: [
            {
              properties: {
                title: 'Reservations',
                gridProperties: {
                  frozenRowCount: 1,
                }
              }
            },
            {
              properties: {
                title: 'Newsletter',
                gridProperties: {
                  frozenRowCount: 1,
                }
              }
            },
            {
              properties: {
                title: 'Contact',
                gridProperties: {
                  frozenRowCount: 1,
                }
              }
            }
          ]
        })
      });
      
      const data = await response.json();
      if (data.spreadsheetId) {
        spreadsheetId = data.spreadsheetId;
        localStorage.setItem(SPREADSHEET_ID_KEY, spreadsheetId!);
        
        // Add headers
        await appendRow(spreadsheetId!, 'Reservations', ['Date', 'Time', 'Name', 'Email', 'Phone', 'Guests', 'Requests', 'Created At']);
        await appendRow(spreadsheetId!, 'Newsletter', ['Email', 'Subscribed At']);
        await appendRow(spreadsheetId!, 'Contact', ['Name', 'Email', 'Message', 'Submitted At']);
      }
    } catch (e) {
      console.error('Failed to create spreadsheet', e);
      return null;
    }
  }
  
  return spreadsheetId;
}

export async function appendRow(spreadsheetId: string, range: string, values: any[]) {
  let token = await getAccessToken();
  if (!token) {
    try {
      const authResult = await googleSignIn();
      if (authResult) token = authResult.accessToken;
    } catch (e) {
      console.error("Failed to sign in", e);
      throw new Error('No access token');
    }
  }
  if (!token) throw new Error('No access token');
  
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      values: [values]
    })
  });
  
  if (!response.ok) {
    throw new Error('Failed to append row');
  }
  
  return await response.json();
}
