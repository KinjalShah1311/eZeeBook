export interface BaseImage {
    roomID: string;
    imageName: string;
    imageType: string;
    imageSource: string;
}

export interface Image extends BaseImage {
    imageID: string;
}

export interface Images {
    [key: number]: Image;
}