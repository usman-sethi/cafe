export async function appendRow(range: string, values: any[]) {
  const response = await fetch('/api/sheets/append', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ range, values }),
  });
  
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to append row');
  }
  
  return await response.json();
}
