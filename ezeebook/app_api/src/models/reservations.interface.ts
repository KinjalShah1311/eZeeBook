export interface BaseReservation {
    uid: number;
    roomID: number;
    startDate: Date;
    endDate: Date;
    price: string;
    total: string;
    bookingDate: Date;
    bookingUpdatedOn: Date;
}

export interface Reservation extends BaseReservation {
    reservationID: number;
}

export interface Reservations {
    [key: number]: Reservation;
}