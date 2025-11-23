import { Workbook } from '@/lib/types';
import { WorkbookCard } from './WorkbookCard';

interface WorkbookGridProps {
  workbooks: Workbook[];
}

export function WorkbookGrid({ workbooks }: WorkbookGridProps) {
  if (workbooks.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="font-body text-body-lg text-dark/60">No workbooks found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {workbooks.map((workbook) => (
        <WorkbookCard key={workbook.id} workbook={workbook} />
      ))}
    </div>
  );
}