'use server';

export async function getFormData(formData: FormData) {
  if ((formData.get('picture') as File).size === 0) formData.delete('picture');
  if ((formData.get('pictures') as File).size === 0) formData.delete('pictures');

  return formData;
}