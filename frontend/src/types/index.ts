export type Song = {
    _id: string,
    title: string,
    imageUrl: string,
    audioUrl: string,
    artist: string,
    duration: number,
    albumId: string | null,
    createdAt: Date,
    updatedAt: Date
}

export type Album = {
    _id: string,
    title: string,
    imageUrl: string,
    artist: string,
    songs: Song[],
    createdAt: Date,
    updatedAt: Date
}

export type User = {
    _id: string;
    fullName: string;
    email: string;
    imageUrl: string;
}