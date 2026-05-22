/**
 * Extracts YouTube video ID and returns an embed URL
 */
export const getYoutubeEmbedUrl = (url: string | undefined): string | null => {
    if (!url) return null;

    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
        return `https://www.youtube.com/embed/${match[2]}`;
    }

    // Fallback for other platforms or if it's already an embed link
    if (url.includes('youtube.com/embed/')) return url;

    return null;
};
