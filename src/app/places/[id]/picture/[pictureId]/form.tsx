import { ReactNode, useActionState, useEffect } from 'react';
import FieldError from '@/components/common/field-error';
import { PlacePicture as Field } from '@/constants/field-errors';
import { PlacePicture } from '@/interfaces/place-picture';
import { updatePicture } from '@/actions/picture/update';
import { isEmpty } from 'lodash';

type Props = {
  picture: PlacePicture;
  setPicture: Function;
  setIsEditing: Function;
};

export default function Form({ picture, setPicture, setIsEditing }: Props): ReactNode {
  const [form, action, pending] = useActionState(updatePicture, picture);

  useEffect(() => {
    if ((picture.caption !== form.caption) && isEmpty(form.errors)) {
      setIsEditing(false);
      setPicture(form);
    }
  }, [pending, form.message])
  
  return (
    <form action={action} id="updatePicture" className="w-96">
      <FieldError errors={form.errors} field={Field.Caption} />
      <textarea className="textarea textarea-accent w-full" cols={100} name="caption" defaultValue={form.caption} />
    </form>
  );
}