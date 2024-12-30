'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

// Data structure for MerchantData
interface MerchantData {
  id: string;
  collection_value: number;
  disbursement_value: number;
  collection_volume: number;
  disbursement_volume: number;
  top_collection_customer_name: string;
  top_collection_customer_value: number;
  best_collection_month: string;
  best_collection_month_value: number;
  best_disbursement_month: string;
  best_disbursement_month_value: number;
  total_settlement_value: number;
}

function TestRoute() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [merchantData, setMerchantData] = useState<MerchantData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Extract ID from the URL
  const extractMerchantId = () => {
    const id = searchParams.get('id');
    return id || ''; // Default to an empty string if not present
  };

  // API call handler
  const handleApiCall = async () => {
    const merchantId = extractMerchantId();
    if (!merchantId) {
      setError('Merchant ID is missing in the URL.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Replace with your actual API fetching logic
      const data: MerchantData = await getMerchantData(merchantId); // Mock API function
      setMerchantData(data);
      
    } catch (err) {
      setError('Failed to fetch merchant data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  

  // UseEffect to handle API call on mount
  useEffect(() => {
    handleApiCall();
  }, [pathname, searchParams]);

//   Mock API function
  const getMerchantData = async (merchantId: string): Promise<MerchantData> => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: merchantId,
          collection_value: 10000,
          disbursement_value: 8000,
          collection_volume: 150,
          disbursement_volume: 120,
          top_collection_customer_name: 'John Doe',
          top_collection_customer_value: 5000,
          best_collection_month: 'January',
          best_collection_month_value: 7000,
          best_disbursement_month: 'February',
          best_disbursement_month_value: 6000,
          total_settlement_value: 18000,
        });
      }, 1000);
    });
  };



  // Render loading, error, or merchant data
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {merchantData && (
        <div style={{ padding: '16px' }}>
          <h2>Merchant Data</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><strong>ID:</strong> {merchantData.id}</li>
            <li><strong>Collection Value:</strong> {merchantData.collection_value}</li>
            <li><strong>Disbursement Value:</strong> {merchantData.disbursement_value}</li>
            <li><strong>Collection Volume:</strong> {merchantData.collection_volume}</li>
            <li><strong>Disbursement Volume:</strong> {merchantData.disbursement_volume}</li>
            <li><strong>Top Collection Customer Name:</strong> {merchantData.top_collection_customer_name}</li>
            <li><strong>Top Collection Customer Value:</strong> {merchantData.top_collection_customer_value}</li>
            <li><strong>Best Collection Month:</strong> {merchantData.best_collection_month}</li>
            <li><strong>Best Collection Month Value:</strong> {merchantData.best_collection_month_value}</li>
            <li><strong>Best Disbursement Month:</strong> {merchantData.best_disbursement_month}</li>
            <li><strong>Best Disbursement Month Value:</strong> {merchantData.best_disbursement_month_value}</li>
            <li><strong>Total Settlement Value:</strong> {merchantData.total_settlement_value}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default TestRoute;
