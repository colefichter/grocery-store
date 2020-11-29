export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

export function fromFormValue(formValue: any): Product {
  return {
    id: +formValue.id || null,
    name: formValue.name,
    price: +formValue.price,
    quantity: +formValue.quantity,
    imageUrl: formValue.imageUrl,
  } as Product;
}
