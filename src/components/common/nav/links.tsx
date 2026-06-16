import { ReactNode } from "react";
import SessionLinks from "./session-links";
import AddPlace from "./add-place";
import AccountLinks from "./account-links";

export default function Links(): ReactNode {
  return (
    <div className="flex items-center mr-3">
      <SessionLinks />
      <AddPlace />
      <AccountLinks />
    </div>
  );
}