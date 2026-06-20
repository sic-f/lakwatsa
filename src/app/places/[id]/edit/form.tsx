'use client';

import { ReactNode, useActionState } from 'react';
import { PlaceError } from '@/constants/field-errors';
import { PlaceForm } from '@/interfaces/place';
import FieldError from '@/components/common/field-error';
import { update } from '@/actions/place/update';

export default function Form({ placeDetails }: { placeDetails: PlaceForm }): ReactNode {
  const [place, action] = useActionState(update, placeDetails);

  return (
    <form action={action} className="flex flex-col justify-center items-center md:my-8">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Submit a place</legend>
        <p className="text-success">{place.message}</p>
        <label className="label">Name</label>
        <input type="text" className="input validator" name="name" defaultValue={place.name} placeholder="Name of place, establishment, store, etc." />
        <FieldError errors={place.errors} field={PlaceError.Name} />

        <label className="label">Description</label>
        <input type="text" className="input" name="description" defaultValue={place.description} placeholder="Short description of the place" />
        <FieldError errors={place.errors} field={PlaceError.Description} />

        <label className="label">Information</label>
        <textarea className="textarea h-24" name="information" defaultValue={place.information} placeholder="More info about the place..."></textarea>
        <FieldError errors={place.errors} field={PlaceError.Information} />

        <label className="label">Address</label>
        <input type="text" className="input validator" name="address" defaultValue={place.address} placeholder="Address" />
        <FieldError errors={place.errors} field={PlaceError.Address} />

        <label className="label">Mobile</label>
        <input type="text" className="input" name="mobile" defaultValue={place.mobile} placeholder="Mobile no." />
        <FieldError errors={place.errors} field={PlaceError.Mobile} />

        <label className="label">Landline</label>
        <input type="text" className="input" name="landline" defaultValue={place.landline} placeholder="Landline no." />
        <FieldError errors={place.errors} field={PlaceError.Landline} />

        <label className="label">Email</label>
        <input type="email" className="input" name="email" defaultValue={place.email} placeholder="e.g. mail@site.com" />
        <FieldError errors={place.errors} field={PlaceError.Email} />

        <label className="label">Website</label>
        <input type="url" className="input" name="website" defaultValue={place.website} placeholder="Website" />
        <FieldError errors={place.errors} field={PlaceError.Website} />

        <label className="label">Facebook</label>
        <input type="url" className="input" name="facebook" defaultValue={place.facebook} placeholder="Facebook page" />
        <FieldError errors={place.errors} field={PlaceError.Facebook} />

        <label className="label">Instagram</label>
        <input type="text" className="input" name="instagram" defaultValue={place.instagram} placeholder="Instagram handle e.g. @yourock" />
        <FieldError errors={place.errors} field={PlaceError.Instagram} />

        <button className="btn btn-neutral mt-4">Submit</button>
      </fieldset>
    </form>
  );
}