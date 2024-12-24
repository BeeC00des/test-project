"use client";

import { useState } from "react";
import BgHeader from './components/Bgheader';
import getMerchantData from "./api/page";

export default function Home() {
  // State to hold merchant data, loading state, and error message
  const [merchantData, setMerchantData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleApiCall = async () => {
    const merchantId = "581b763d636c88ee8585e78cf490d063"; 

    setLoading(true);
    setError(null);
    try {
      const data = await getMerchantData(merchantId);
       // Ensure this is the correct structure
      setMerchantData(data);
    } catch (err) {
      setError('Failed to fetch merchant data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-auto w-full bg-main">
      <BgHeader />
       {/*<div className="p-4">
      <button
          onClick={handleApiCall}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {loading ? 'Loading...' : 'Make API Call'}
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}

        {merchantData && (
          <div className="mt-4 p-4 border rounded bg-white">
            
            Display merchant_id in a separate paragraph 
            <p><strong>Merchant ID:</strong> {merchantData.data.merchant_id}</p>

          
            <pre>{JSON.stringify(merchantData, null, 2)}</pre>

            
            <p><strong>Total Settlement Value:</strong> {merchantData.data.total_settlement_value}</p>
          </div>
        ) }
      </div> */}
    </div>
  );
}



