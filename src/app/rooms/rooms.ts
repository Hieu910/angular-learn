export interface Rooms {
  total: number;
  availableRooms: number;
  bookedRooms: number;
}

export interface RoomsCollection {
  roomType: string;
  roomNumber: number;
  amenities: string;
  price: string;
  checkinTime: Date;
  checkoutTime: Date;
}

export interface Post {
  userId: number;
  id?: number;
  title: string;
  body: string;
}

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
