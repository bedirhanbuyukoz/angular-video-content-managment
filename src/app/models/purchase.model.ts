export class Purchase {
  id: number | undefined;
  userId: number | undefined;
  videoId: number | undefined;
  price: number | undefined;
  purchaseTime: Date = new Date();

  constructor(userId?: number, videoId?: number, price?: number) {
    this.userId = userId;
    this.videoId = videoId;
    this.price = price;
  }
}
