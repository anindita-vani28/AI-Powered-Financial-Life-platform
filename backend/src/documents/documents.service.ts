import { Injectable } from '@nestjs/common';

@Injectable()
export class DocumentsService {
  getDocuments(filter?: string) {
    const documents = [
      {
        id: 'doc-1',
        name: '2026 W-2.pdf',
        type: 'tax',
        size: '1.2 MB',
        uploadedAt: new Date().toISOString(),
      },
      {
        id: 'doc-2',
        name: 'Health Insurance Card.pdf',
        type: 'insurance',
        size: '820 KB',
        uploadedAt: new Date().toISOString(),
      },
      {
        id: 'doc-3',
        name: 'Bank Statement.pdf',
        type: 'banking',
        size: '1.5 MB',
        uploadedAt: new Date().toISOString(),
      },
    ];

    if (!filter) {
      return documents;
    }

    return documents.filter((document) => document.type === filter);
  }

  uploadDocument() {
    return {
      id: 'doc-new',
      name: 'Uploaded Document.pdf',
      type: 'general',
      size: '1.0 MB',
      uploadedAt: new Date().toISOString(),
    };
  }

  deleteDocument(documentId: string) {
    return {
      success: true,
      message: `Document ${documentId} deleted`,
    };
  }

  extractDocumentText(documentId: string) {
    return {
      text: `Extracted text for ${documentId}: Employer details, tax summary, and policy information captured successfully.`,
    };
  }
}
