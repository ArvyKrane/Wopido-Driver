'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Upload, CheckCircle, Clock, AlertTriangle, XCircle, FileText } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

type DocStatus = 'not_submitted' | 'pending_review' | 'approved' | 'rejected' | 'expired';

interface DocumentCardProps {
  doc: {
    id: string;
    label: string;
    status: DocStatus;
    expiryDate: string | null;
    uploadedAt?: string;
    hasExpiry: boolean;
    rejectionReason?: string;
    note?: string;
  };
}

const STATUS_CONFIG: Record<DocStatus, { label: string; variant: string; icon: React.ElementType; color: string }> = {
  not_submitted: { label: 'Not Submitted', variant: 'muted', icon: FileText, color: 'text-muted-foreground' },
  pending_review: { label: 'Pending Review', variant: 'pending', icon: Clock, color: 'text-blue-600' },
  approved: { label: 'Approved', variant: 'success', icon: CheckCircle, color: 'text-emerald-600' },
  rejected: { label: 'Rejected', variant: 'destructive', icon: XCircle, color: 'text-red-600' },
  expired: { label: 'Expired', variant: 'expired', icon: AlertTriangle, color: 'text-red-600' },
};

export function DocumentCard({ doc }: DocumentCardProps) {
  const config = STATUS_CONFIG[doc.status];
  const Icon = config.icon;

  return (
    <div className={cn(
      'rounded-xl border bg-card p-4 space-y-3',
      doc.status === 'rejected' || doc.status === 'expired'
        ? 'border-red-200 bg-red-50/30'
        : doc.status === 'approved'
        ? 'border-emerald-200'
        : 'border-border'
    )}>
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center', doc.status === 'approved' ? 'bg-emerald-100' : 'bg-muted')}>
            <Icon className={cn('h-4 w-4', config.color)} />
          </div>
          <div>
            <p className="font-medium text-sm">{doc.label}</p>
            {doc.uploadedAt && (
              <p className="text-xs text-muted-foreground">Uploaded {formatDate(doc.uploadedAt)}</p>
            )}
          </div>
        </div>
        <Badge variant={config.variant as any}>{config.label}</Badge>
      </div>

      {/* Expiry */}
      {doc.hasExpiry && doc.expiryDate && (
        <div className="text-xs text-muted-foreground">
          Expires: <span className={doc.status === 'expired' ? 'text-red-600 font-semibold' : 'font-medium'}>{formatDate(doc.expiryDate)}</span>
        </div>
      )}

      {/* Rejection reason */}
      {(doc.status === 'rejected' || doc.status === 'expired') && doc.rejectionReason && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-700">
          <p className="font-medium mb-1">Action needed:</p>
          <p>{doc.rejectionReason}</p>
        </div>
      )}

      {/* Note */}
      {doc.note && (
        <p className="text-xs text-muted-foreground italic">{doc.note}</p>
      )}

      {/* Upload button */}
      <Button variant="outline" size="sm" disabled className="w-full text-xs">
        <Upload className="h-3 w-3 mr-1" />
        {doc.status === 'not_submitted' ? 'Upload Document' : 'Replace Document'}
        <span className="ml-2 text-amber-600 font-semibold">[DEMO]</span>
      </Button>
    </div>
  );
}
