import Link from 'next/link';
import Image from 'next/image';
import { Workbook } from '@/lib/types';
import { formatPrice } from '@/lib/utils/format';
import { Card, CardContent, CardFooter } from '@/components/ui/Card';
import { Eye } from 'lucide-react';

interface WorkbookCardProps {
  workbook: Workbook;
}

export function WorkbookCard({ workbook }: WorkbookCardProps) {
  return (
    <Link href={`/workbooks/${workbook.slug}`}>
      <Card className="h-full cursor-pointer group">
        <div className="relative aspect-[3/4] overflow-hidden bg-grayblue/20">
          {workbook.coverUrl ? (
            <Image
              src={workbook.coverUrl}
              alt={workbook.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-lavender to-blue/20">
              <span className="font-heading font-extrabold text-4xl text-dark/20">
                {workbook.title.charAt(0)}
              </span>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-heading font-extrabold text-lg text-dark mb-2 line-clamp-2">
            {workbook.title}
          </h3>
          {workbook.niche && (
            <span className="inline-block px-3 py-1 bg-lavender rounded-full text-xs font-subheading font-medium text-dark mb-2">
              {workbook.niche}
            </span>
          )}
          {workbook.description && (
            <p className="font-body text-sm text-dark/70 line-clamp-2 mb-3">
              {workbook.description}
            </p>
          )}
          <div className="flex items-center text-xs text-dark/50 space-x-2">
            <Eye className="h-3 w-3" />
            <span>{workbook.viewCount} views</span>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <div className="w-full flex items-center justify-between">
            <span className="font-heading font-extrabold text-xl text-blue">
              {formatPrice(workbook.priceCents, workbook.currency)}
            </span>
            <span className="font-subheading font-medium text-sm text-dark/60">
              by {workbook.owner?.name || 'Anonymous'}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}