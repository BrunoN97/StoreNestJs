class CaracteristicProduct {
  name: string;
  description: string;
}

class ImageProduct {
  url: string;
  description: string;
}

export class ProductEntity {
  id: string;
  userId: string;
  name: string;
  cost: number;
  quantity: number;
  description: string;
  category: string;
  caracteristics: CaracteristicProduct[];
  images: ImageProduct[];
}
