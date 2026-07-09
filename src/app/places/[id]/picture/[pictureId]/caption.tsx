'use client';

import { ReactNode, useState } from 'react';
import Body from './body';
import Form from './form';
import Actions from '@/components/common/place-picture/actions';
import { PlacePicture } from '@/interfaces/place-picture';

type Props = {
  picture: PlacePicture;
  broId: string;
};

export default function Caption({ picture: initialPicture, broId }: Props): ReactNode {
  const [picture, setPicture] = useState<PlacePicture>(initialPicture);
  const [isEditing, setIsEditing] = useState(false);

  function isNotAllowedToEdit(): boolean {
    return broId !== picture.uploaderId;
  }
  
  return (
    <div className="aura aura-rainbow mt-8">
      {!isEditing
        ? <Body caption={picture.caption} />
        : <Form picture={picture} setPicture={setPicture} setIsEditing={setIsEditing} />}
      <Actions 
        isNotAllowedToEdit={isNotAllowedToEdit()}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        classNames="mt-2"
      />
    </div>
  );
}