'use client';

import { useActionState, useEffect, useState } from 'react';
import Image from 'next/image';
import { BlankAvatar } from '@/constants/blank-avatar';
import { deleteAvatar, updateAvatar } from '@/actions/account/update';

export default function Avatar({ avatar }: { avatar: string }) {
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null);
  const [account, action, _] = useActionState(updateAvatar, undefined);

  function isUpdatingAvatar() {
    return !selectedAvatar;
  }

  function isBlankAvatar() {
    return avatar === BlankAvatar.Account;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (files && files.length > 0) {
      setSelectedAvatar(files.item(0));
    }
  }

  async function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    await deleteAvatar();
  }

  useEffect(() => {
    setSelectedAvatar(null);
  }, [avatar]);

  return (
    <section>
      <form action={action}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          {account?.message && (
            <p className="text-green-400">{account?.message}</p>
          )}
          {account?.errors && <p className="text-red-400">{account?.errors}</p>}
          <figure className="mb-2">
            <Image
              src={avatar}
              width={304}
              height={171}
              loading="eager"
              alt="avatar"
            />
          </figure>
          <section className="flex">
            <input
              type="file"
              name="avatar"
              className="file-input file-input-success mr-2"
              onChange={handleChange}
            />
          </section>
          <button
            className="btn btn-primary mt-2"
            type="submit"
            disabled={isUpdatingAvatar()}
          >
            Update avatar
          </button>
          <button
            className="btn btn-warning"
            type="button"
            onClick={handleDelete}
            disabled={isBlankAvatar()}
          >
            Remove avatar
          </button>
        </fieldset>
      </form>
    </section>
  );
}
