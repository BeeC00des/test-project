'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

// Data structure for MerchantData
interface MerchantData {
  data: {
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
  };
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
      // Make the real API call
      const data: MerchantData = await getMerchantData(merchantId);
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

  // Real API function
  const getMerchantData = async (merchantId: string): Promise<MerchantData> => {
    const apiUrl = `http://localhost:3000/merchant/${merchantId}`; // Dynamic URL
    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization if needed, for example:
          // 'Authorization': `Bearer ${yourToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      return { data }; // Return the data structure from the API response
    } catch (err) {
      throw new Error('Failed to fetch merchant data');
    }
  };

  // Render loading, error, or merchant data
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {merchantData && merchantData.data && (
        <div style={{ padding: '16px' }}>
          <h2>Merchant Data</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li><strong>ID:</strong> {merchantData.data.id}</li>
            <li><strong>Collection Value:</strong> {merchantData.data.collection_value}</li>
            <li><strong>Disbursement Value:</strong> {merchantData.data.disbursement_value}</li>
            <li><strong>Collection Volume:</strong> {merchantData.data.collection_volume}</li>
            <li><strong>Disbursement Volume:</strong> {merchantData.data.disbursement_volume}</li>
            <li><strong>Top Collection Customer Name:</strong> {merchantData.data.top_collection_customer_name}</li>
            <li><strong>Top Collection Customer Value:</strong> {merchantData.data.top_collection_customer_value}</li>
            <li><strong>Best Collection Month:</strong> {merchantData.data.best_collection_month}</li>
            <li><strong>Best Collection Month Value:</strong> {merchantData.data.best_collection_month_value}</li>
            <li><strong>Best Disbursement Month:</strong> {merchantData.data.best_disbursement_month}</li>
            <li><strong>Best Disbursement Month Value:</strong> {merchantData.data.best_disbursement_month_value}</li>
            <li><strong>Total Settlement Value:</strong> {merchantData.data.total_settlement_value}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default TestRoute;
