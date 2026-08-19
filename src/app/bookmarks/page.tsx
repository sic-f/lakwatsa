import { ReactNode } from 'react';
import Tab from './tab';
import {
  faBorderAll,
  faLandmark,
  faStarHalfStroke,
} from '@fortawesome/free-solid-svg-icons';

export default async function BookmarksIndex(): Promise<ReactNode> {
  return (
    <main className="flex flex-col items-center">
      <h1 className="my-6 text-4xl">Saves</h1>
      <section className="flex gap-2 max-sm:flex-col sm:flex-wrap sm:justify-center md:gap-4">
        <div className="tabs tabs-lift w-96">
          <Tab section="All" icon={faBorderAll} selected={true} />
          <Tab section="Places" icon={faLandmark} />
          <Tab section="Reviews" icon={faStarHalfStroke} />
        </div>
      </section>
    </main>
  );
}
