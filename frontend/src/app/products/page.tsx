import { Suspense } from 'react';
import PageContent from './PageContent';

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="p-4 text-gray-500">로딩 중...</div>}>
      <PageContent />
    </Suspense>
  );
}
