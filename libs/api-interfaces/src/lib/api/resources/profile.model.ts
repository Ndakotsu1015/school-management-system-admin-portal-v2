export interface ProfilePhoto{
    key?: string;
    filename?: string;
    mimetype?: string;
    imageUrl?: string;
}

export interface UploadProfilePictureResponseDto {
    imageUrl: string | null;
}