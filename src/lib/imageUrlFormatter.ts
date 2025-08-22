export default function imageUrlFormatter(imagePath: string) {
    return `https://firebasestorage.googleapis.com/v0/b/sky-mark-properties.firebasestorage.app/o/${encodeURIComponent(
        imagePath
    )}?alt=media`;
}



