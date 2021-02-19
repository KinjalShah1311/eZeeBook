export interface BaseReservation {
    uid: string;
    roomID: string;
    startDate: Date;
    endDate: Date;
    price: string;
    total: string;
    bookingDate: Date;
    bookingUpdatedOn: Date;
}

export interface Reservation extends BaseReservation {
    reservationID: string;
}

export interface Reservations {
    [key: number]: Reservation;
}