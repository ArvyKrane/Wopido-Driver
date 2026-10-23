import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-4">
      <h2 className="text-2xl font-black text-foreground">Page Not Found</h2>
      <p className="text-xs text-muted-foreground max-w-sm">
        The driver portal page you are looking for does not exist or has been moved.
      </p>
      <Link href="/">
        <Button className="bg-primary hover:bg-primary/95 text-xs font-semibold">
          Return to Dashboard
        </Button>
      </Link>
    </div>
  );
}
