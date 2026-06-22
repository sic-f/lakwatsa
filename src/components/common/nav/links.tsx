import { ReactNode } from 'react';
import Greeting from './greeting';
import SessionLinks from './session-links';
import AddPlace from './add-place';
import AccountLinks from './account-links';

export default async function Links(): Promise<ReactNode> {
  return (
    <div className="flex items-center mr-3">
      <Greeting />
      <SessionLinks />
      <AddPlace />
      <AccountLinks />
    </div>
  );
}