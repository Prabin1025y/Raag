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
    releaseYear: number,
    songs: Song[],
    createdAt: Date,
    updatedAt: Date
}