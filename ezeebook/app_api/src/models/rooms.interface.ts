export interface BaseRoom {
    roomType: string;
    rating: number;
    totalOccupancy: number;
    totalBathrooms: number;
    totalBedrooms: number;
    summary: string;
    address: string;
    hasTV: boolean;
    hasKitchen: boolean;
    hasAirConditioner: boolean;
    hasInternet: boolean;
    price: number;
    longitude: number;
    latitude: number;
}

export interface Room extends BaseRoom {
    roomID: string;
}

export interface Rooms {
    [key: number]: Room;
}