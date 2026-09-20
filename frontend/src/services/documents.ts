import api from './api';
import { Document } from '@/types';

export const documentService = {
  async getDocuments(filter?: string): Promise<Document[]> {
    const params = filter ? { type: filter } : {};
    const { data } = await api.get('/documents', { params });
    return data;
  },

  async uploadDocument(file: File, type: string): Promise<Document> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);

    const { data } = await api.post('/documents', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data;
  },

  async deleteDocument(documentId: string): Promise<void> {
    await api.delete(`/documents/${documentId}`);
  },

  async extractDocumentText(documentId: string): Promise<string> {
    const { data } = await api.post(`/documents/${documentId}/extract`);
    return data.text;
  },
};
