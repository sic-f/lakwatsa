import { ReactNode } from 'react';

interface Props {
  id: string;
  pathname: string;
  modalRef: any;
  onDelete: (
    id: string,
    pathname: string,
    modalRef: HTMLDialogElement,
  ) => Promise<void>;
  headline: string;
  prompt: string;
}

export default function DeleteConfirmation({
  id,
  pathname,
  modalRef,
  onDelete,
  headline,
  prompt,
}: Props): ReactNode {
  return (
    <dialog id="my_modal_2" className="modal" ref={modalRef}>
      <div className="modal-box">
        <h3 className="text-lg font-bold">{headline}</h3>
        <p className="py-4">{prompt}</p>
        <section className="modal-action flex justify-end">
          <form method="dialog">
            <button className="btn btn-accent">Cancel</button>
          </form>
          <button
            className="btn btn-error"
            onClick={async () => await onDelete(id, pathname, modalRef)}
          >
            Delete
          </button>
        </section>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
