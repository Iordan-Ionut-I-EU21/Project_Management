import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { Injectable } from '@angular/core';
import * as ExcelJS from 'exceljs';

@Injectable({
  providedIn: 'root',
})
export class ExcelExportService {
  async exportToExcel(
    column: string[],
    data: any[],
    fileName: string
  ): Promise<void> {
    const workbook = new ExcelJS.Workbook();
    const safeSheetName = fileName.replace(/[*?:\\/[\]]/g, '-');
    const worksheet = workbook.addWorksheet(safeSheetName);

    const headerRow = worksheet.addRow(column);
    headerRow.height = 24;

    headerRow.eachCell((cell) => {
      cell.font = {
        bold: true,
        color: { argb: 'FFFFFFFF' },
        size: 14,
      };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF111827' },
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });

    data.forEach((rowData) => {
      const row = worksheet.addRow(rowData);

      row.eachCell((cell) => {
        cell.border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' },
        };
      });
    });

    const now = new Date().toLocaleString();
    const footerRow = worksheet.addRow([null, null, `Created at: ${now}`]);
    footerRow.getCell(3).font = { italic: true };
    footerRow.getCell(3).alignment = { horizontal: 'right' };

    worksheet.columns.forEach((column) => {
      if (!column) return;
      let maxLength = 10;
      column?.eachCell?.({ includeEmpty: true }, (cell) => {
        const columnLength = cell.value ? cell.value.toString().length : 0;
        if (columnLength > maxLength) {
          maxLength = columnLength;
        }
      });
      column.width = maxLength + 2;
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });

    FileSaver.saveAs(blob, `${fileName}.xlsx`);
  }
}
