'use server';

export async function getFormData(formData: FormData) {
  if ((formData.get('picture') as File).size === 0) formData.delete('picture');

  return formData;
}