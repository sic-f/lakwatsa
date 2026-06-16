export default async function SubmitPlace() {
  return (
    <form action="" className="flex justify-center items-center my-8">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Submit a place</legend>

        <label className="label">Name</label>
        <input type="text" className="input" placeholder="Name of place, establishment, store, etc." />

        <label className="label">Description</label>
        <input type="text" className="input" placeholder="Short description of the place" />

        <label className="label">Information</label>
        <textarea className="textarea h-24" placeholder="More info about the place..."></textarea>

        <label className="label">Address</label>
        <input type="text" className="input" placeholder="Address" />

        <label className="label">Mobile</label>
        <input type="text" className="input" placeholder="Mobile no." />

        <label className="label">Landline</label>
        <input type="text" className="input" placeholder="Landline no." />

        <label className="label">Email</label>
        <input type="email" className="input" placeholder="Email address" />

        <label className="label">Website</label>
        <input type="url" className="input" placeholder="Website" />

        <label className="label">Facebook</label>
        <input type="url" className="input" placeholder="Facebook page" />

        <label className="label">Instagram</label>
        <input type="text" className="input" placeholder="Instagram handle" />

        <button className="btn btn-neutral mt-4">Submit</button>
      </fieldset>
    </form>
  );
}