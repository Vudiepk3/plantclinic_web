export const SOCIAL_LINKS = {
  youtube: 'https://www.youtube.com/@gardening_problems_solved',
  facebook: 'https://www.facebook.com/profile.php?id=61575387878909',
};

/**
 * Safely handles external navigation with error checking
 */
export const openExternalLink = (url: string | undefined) => {
  if (!url) {
    console.warn('Attempted to open an undefined URL');
    return;
  }

  try {
    // Validate if it looks like a URL
    const validUrl = url.startsWith('http') ? url : `https://${url}`;
    new URL(validUrl); // This throws if the URL is invalid
    
    window.open(validUrl, '_blank', 'noopener,noreferrer');
  } catch (error) {
    console.error('Invalid external link:', url, error);
    alert('This external resource link is currently invalid or unavailable.');
  }
};
