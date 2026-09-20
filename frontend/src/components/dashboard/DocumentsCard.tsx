'use client';

import { useEffect, useState } from 'react';
import { FileText, Upload, Eye } from 'lucide-react';
import { Document } from '@/types';
import { documentService } from '@/services/documents';
import Link from 'next/link';

const DocumentsCard = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const data = await documentService.getDocuments();
        setDocuments(data.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch documents', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const getDocTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
      insurance: '🏥',
      tax: '📊',
      claim: '📋',
      credit: '💳',
      other: '📄',
    };
    return icons[type] || '📄';
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-10 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Recent Documents</h3>
        <Link href="/documents" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </Link>
      </div>

      {documents.length > 0 ? (
        <div className="space-y-2">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors group"
            >
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-lg">{getDocTypeIcon(doc.type)}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm text-gray-900 truncate">
                    {doc.fileName}
                  </p>
                  <p className="text-xs text-gray-500 capitalize">{doc.type}</p>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-all">
                <Eye size={16} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <FileText className="mx-auto text-gray-400 mb-2" size={32} />
          <p className="text-gray-600 text-sm mb-4">No documents uploaded yet</p>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            <Upload size={16} />
            Upload Document
          </button>
        </div>
      )}
    </div>
  );
};

export default DocumentsCard;
