
export interface ReferralData {
  count: number;
  earnings: number;
  referrals: string[];
}

export const trackReferral = (referrerCode: string, newUserEmail: string): boolean => {
  try {
    // Get existing referral data
    const existingData = localStorage.getItem(`referrals_${referrerCode}`);
    let referralData: ReferralData = existingData 
      ? JSON.parse(existingData) 
      : { count: 0, earnings: 0, referrals: [] };

    // Check if this user was already referred
    if (referralData.referrals.includes(newUserEmail)) {
      return false; // Already counted
    }

    // Add new referral
    referralData.count += 1;
    referralData.earnings += 10000; // ₦10,000 per referral
    referralData.referrals.push(newUserEmail);

    // Save updated data
    localStorage.setItem(`referrals_${referrerCode}`, JSON.stringify(referralData));

    // Credit the referrer's balance
    creditReferrerBalance(referrerCode, 10000);

    return true;
  } catch (error) {
    console.error('Error tracking referral:', error);
    return false;
  }
};

const creditReferrerBalance = (referrerCode: string, amount: number) => {
  // This would typically be done through an API call
  // For now, we'll store it locally and the Dashboard will pick it up
  const creditData = {
    referrerCode,
    amount,
    timestamp: Date.now()
  };
  
  const existingCredits = localStorage.getItem('pending_referral_credits');
  const credits = existingCredits ? JSON.parse(existingCredits) : [];
  credits.push(creditData);
  localStorage.setItem('pending_referral_credits', JSON.stringify(credits));
};

export const getReferralData = (referrerCode: string): ReferralData => {
  const data = localStorage.getItem(`referrals_${referrerCode}`);
  return data ? JSON.parse(data) : { count: 0, earnings: 0, referrals: [] };
};

export const processReferralCredits = (userEmail: string): number => {
  try {
    const userReferralCode = btoa(userEmail).slice(0, 8);
    const credits = localStorage.getItem('pending_referral_credits');
    
    if (!credits) return 0;
    
    const creditList = JSON.parse(credits);
    const userCredits = creditList.filter((credit: any) => credit.referrerCode === userReferralCode);
    
    if (userCredits.length === 0) return 0;
    
    const totalCredit = userCredits.reduce((sum: number, credit: any) => sum + credit.amount, 0);
    
    // Remove processed credits
    const remainingCredits = creditList.filter((credit: any) => credit.referrerCode !== userReferralCode);
    localStorage.setItem('pending_referral_credits', JSON.stringify(remainingCredits));
    
    return totalCredit;
  } catch (error) {
    console.error('Error processing referral credits:', error);
    return 0;
  }
};
