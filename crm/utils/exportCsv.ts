/**
 * TRAVIA CRM — UTF-8 Excel Compatible CSV Exporter
 * Generates and downloads CSV files on client side without external libraries
 */

export function exportToCsv<T extends Record<string, any>>(
  filename: string,
  data: T[],
  columns: { header: string; key: keyof T }[]
) {
  if (!data || !data.length) {
    alert('Dışa aktarılacak veri bulunamadı.');
    return;
  }

  // Header row
  const headerLine = columns.map(c => `"${c.header}"`).join(',');

  // Data rows
  const dataLines = data.map(item => {
    return columns.map(c => {
      const val = item[c.key];
      if (val === null || val === undefined) return '""';
      if (Array.isArray(val)) return `"${val.join('; ')}"`;
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    }).join(',');
  });

  // UTF-8 BOM for Microsoft Excel compatibility (\uFEFF)
  const csvContent = '\uFEFF' + [headerLine, ...dataLines].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
