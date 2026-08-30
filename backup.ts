export function exportBackup(data: Record<string, unknown>) {
  const payload = { app: 'CA Final Command Center', version: 1, exportedAt: new Date().toISOString(), data };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `CA-Final-Backup-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export async function importBackup(file: File): Promise<Record<string, any> | null> {
  const parsed = JSON.parse(await file.text());
  if (parsed?.app !== 'CA Final Command Center' || !parsed?.data) throw new Error('Invalid CA Final backup file');
  return parsed.data;
}
