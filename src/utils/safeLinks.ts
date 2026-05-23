export const SOCIAL_LINKS = {
  youtube: 'https://www.youtube.com/@gardening_problems_solved',
  facebook: 'https://www.facebook.com/profile.php?id=61575387878909',
};

const PAYPAL_PAYMENT_EMAIL = 'vulq2k31@gmail.com';

export const getPaypalDonationLink = (amount?: number) => {
  const params = new URLSearchParams({
    cmd: '_xclick',
    business: PAYPAL_PAYMENT_EMAIL,
    item_name: 'PlantClinic Support',
    currency_code: 'USD',
    no_shipping: '1',
  });

  if (amount) {
    params.set('amount', amount.toFixed(2));
  }

  return `https://www.paypal.com/cgi-bin/webscr?${params.toString()}`;
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
