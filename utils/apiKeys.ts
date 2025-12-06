

export async function allApiKeys() {
  return {
    IMGBB_API_KEY: process.env.IMGBB_API_KEY || '',
    RAZORPAY_KEY_ID: process.env.RAZORPAY_KEY_ID || '',
    LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID || '',
    LINKEDIN_CLIENT_SECRET: process.env.LINKEDIN_CLIENT_SECRET || '',
  };
}