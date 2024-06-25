import { Injectable } from '@nestjs/common';
import { PrinterService } from 'src/printer/printer.service';
import { billReport } from './documents/bill.reports';

@Injectable()
export class ReportsService {
  constructor(private readonly printerService: PrinterService) {}
  async getBillReport(): Promise<PDFKit.PDFDocument> {
    const docDefinition = billReport();

    return this.printerService.createPdf(docDefinition);
  }
}
