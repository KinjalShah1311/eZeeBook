export interface BaseImage {
    imagePath:string;
}

export interface Image extends BaseImage {
    imageID: string;
    roomID: string;
}

export interface Images {
    [key: number]: Image;
}