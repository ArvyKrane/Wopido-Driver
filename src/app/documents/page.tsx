'use client';

import React from 'react';
import { DEMO_DOCUMENTS } from '@/lib/demo-data';
import { DocumentCard } from '@/components/documents/document-card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, AlertCircle, FileCheck2 } from 'lucide-react';

export default function DocumentsPage() {
  const approvedCount = DEMO_DOCUMENTS.filter((d) => d.status === 'approved').length;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-black text-foreground">Captain Verification Documents</h1>
          <p className="text-xs text-muted-foreground">
            Legal, identity, and transport regulatory compliance documents
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-600 text-white gap-1 text-xs">
            <ShieldCheck className="w-3.5 h-3.5" />
            {approvedCount}/{DEMO_DOCUMENTS.length} Documents Active
          </Badge>
        </div>
      </div>

      <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-start gap-3 text-xs text-amber-800 dark:text-amber-300">
        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Prototype Demonstration Notice</p>
          <p className="mt-0.5">
            Document upload and verification are simulated for this demonstration. No real government ID numbers or documents are stored or collected.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {DEMO_DOCUMENTS.map((doc) => (
          <DocumentCard key={doc.id} doc={doc} />
        ))}
      </div>
    </div>
  );
}
