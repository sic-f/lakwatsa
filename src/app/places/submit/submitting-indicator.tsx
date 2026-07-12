import { ReactNode } from 'react';

export default function Loading(): ReactNode {
  return (
    <div>
      <span className="loading loading-spinner text-info h-screen"></span>
      <span className="loading loading-spinner text-accent h-screen"></span>
      <span className="loading loading-spinner text-secondary h-screen"></span>
      &nbsp;&nbsp;Submitting...
    </div>
  );
}
