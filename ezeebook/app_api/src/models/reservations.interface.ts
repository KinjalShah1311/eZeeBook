export interface BaseReservation {
    startDate: string;
    endDate: string;
    price: string;
    total: string;
    bookingDate: string;
}

export interface Reservation extends BaseReservation {
    reservationID: string;
    uid: string;
    roomID: string;
}

export interface Reservations {
    [key: number]: Reservation;
}