import { ReactNode, useRef } from 'react';

interface Props {
  id: string;
  pathname: string;
  modalRef: any;
  onDelete: (id: string, pathname: string) => Promise<void>;
}

export default function DeleteConfirmation({
  id,
  pathname,
  modalRef,
  onDelete,
}: Props) {
  const modal = useRef(null);

  return (
    <dialog id="my_modal_2" className="modal" ref={modalRef}>
      <div className="modal-box">
        <h3 className="text-lg font-bold">Delete Place Picture</h3>
        <p className="py-4">Are you sure you want to delete this picture?</p>
        <section className="modal-action flex justify-end">
          <form method="dialog">
            <button className="btn btn-secondary">Cancel</button>
          </form>
          <button
            className="btn btn-error"
            onClick={() => onDelete(id, pathname)}
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
