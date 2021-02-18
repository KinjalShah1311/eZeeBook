export interface BaseImage {
    roomID: number;
    imageName: string;
    imageType: string;
    imageSource: string;
}

export interface Image extends BaseImage {
    imageID: number;
}

export interface Images {
    [key: number]: Image;
}