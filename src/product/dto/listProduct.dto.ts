class ListCaracteristicProductDTO {
  name: string;
  description: string;
}

class ListImageProductDTO {
  url: string;
  description: string;
}

export class ListProductDTO {
  id: string;
  userId: string;
  name: string;
  cost: number;
  quantity: number;
  description: string;
  category: string;
  caracteristic: ListCaracteristicProductDTO[];
  images: ListImageProductDTO[];
}
