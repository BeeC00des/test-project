"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from 'next/navigation';

import Card from "./components/Card";
import collectionCard from "./components/collectionCard";
import disbursementCard from "./components/disbursementCard";
import getMerchantData from "./api/page";
import MessageCard from "./components/MessageCard";
import Footer from "./components/Footer";
import BgHeader from './components/Bgheader';
import DisbursementCard from "./components/disbursementCard";

export default function Home() {

  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State to hold merchant data, loading state, and error message
  const [cardData, setCardData] = useState<any[]>([]); // Updated to an empty array
  const [merchantData, setMerchantData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // currency formatter function

  const formatCurrency = (value: number) => {
    return `₦${new Intl.NumberFormat('en-NG').format(value)}`;
  };

  // month converter

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Extract ID from the URL
  const extractMerchantId = () => {
    const id = searchParams.get('id');
    return id || ''; // Default to an empty string if not present
  };

  // Handle API call
  const handleApiCall = async () => {
    const merchantId = extractMerchantId();
    if (!merchantId) {
      setError('Merchant ID is missing in the URL.');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await getMerchantData(merchantId);
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

  useEffect(() => {

    const updatedCardData: any[] = [];

    // Check if collection_value exists and create the card
    if (merchantData && merchantData.data.collection_value) {

      //Get the month number from the response
      const collectionMonthNumber = parseInt(merchantData.data.best_collection_month, 10);
      const disbursementMonthNumber = parseInt(merchantData.data.best_disbursement_month, 10);

      // Convert month number to month name, if valid
      const collectionMonthName = collectionMonthNumber >= 1 && collectionMonthNumber <= 12
        ? monthNames[collectionMonthNumber - 1]
        : "Unknown Month";

      const disbursementMonthName = disbursementMonthNumber >= 1 && disbursementMonthNumber <= 12
        ? monthNames[disbursementMonthNumber - 1]
        : "Unknown Month";

      if (merchantData.data.collection_value) {
        updatedCardData.push({
          index: 1,
          id: 'card_1',
          numberTitle: formatCurrency(merchantData.data.collection_value),
          unit: "Million in collection value",
          text: `With count of ${merchantData.data.collection_volume}`,
          backgroundImage: "/images/collectionImg.svg",
          top: "50px",
          img: '',
        });
      }

      // Check if disbursement_value exists and create the card
      if (merchantData.data.disbursement_value) {
        updatedCardData.push({
          index: 2,
          id: 'card_2',
          numberTitle: formatCurrency(merchantData.data.disbursement_value),
          unit: "Million in disbursement value",
          text: `With count of ${merchantData.data.disbursement_volume}`,
          backgroundImage: "/images/disbursement.svg",
          top: "100px",
          img: '',
        });
      }
      if (merchantData.data.top_collection_customer_name) {
        updatedCardData.push({
          index: 3,
          id: 'card_3',
          img: "/images/crown.png",
          customerName: merchantData.data.top_collection_customer_name,
          backgroundImage: "/images/customer.svg",
          top: "150px",
          smallCardsData: [
            {
              id: 'small_card_1',
              text: `Was your Best customer`,
            },
            {
              id: 'small_card_2',
              text: `With ${formatCurrency(merchantData.data.top_collection_customer_value)} payment`,
            },
            {
              id: 'small_card_3',
              text: `Valued at ${formatCurrency(merchantData.data.top_collection_customer_value)}`,
            },
          ],
        });
      }

      // If best collection month exists, create the card
      if (merchantData.data.best_collection_month_value) {
        updatedCardData.push({
          index: 4,
          id: 'card_4',
          numberTitle: "Your best collection month for the year was",
          unit: `${collectionMonthName}`,
          text: `Collection value that month was ${formatCurrency(merchantData.data.best_collection_month_value)}`,
          backgroundImage: "/images/collectionImg.svg",
          top: "200px",
        });
      }

      // If best disbursement month exists, create the card
      if (merchantData.data.best_disbursement_month_value) {
        updatedCardData.push({
          index: 5,
          id: 'card_5',
          numberTitle: "Your best disbursement month for the year was",
          unit: `${disbursementMonthName}`, // Assuming disbursementMonthName is available
          text: `Disbursement value that month was ${formatCurrency(merchantData.data.best_disbursement_month_value)}`,
          backgroundImage: "/images/disbursement.svg",
          top: "250px",
        });
      }

      // Always show the settlement value card if available
      if (merchantData.data.total_settlement_value) {
        updatedCardData.push({
          index: 6,
          id: 'card_6',
          numberTitle: formatCurrency(merchantData.data.total_settlement_value),
          unit: "Million in settlement value",
          backgroundImage: "/images/settle.svg",
          img: '',
          top: "300px",
        });
      }

      // Only update if there's valid data to display
      if (updatedCardData.length > 0) {
        setCardData(updatedCardData);
      }
    }
  }, [merchantData]);

  return (
      <div className="h-auto w-full bg-main">
        <BgHeader  />

        <main className="mt-10 mb-2 md:mt-32 md:mb-2">

          {loading && <p className="py-10 text-2xl text-center ">Loading...</p>}

          {error && <p className="text-red-500 mt-2 py-10 text-2xl text-center">{error}</p>}

          {/* Dynamically display cards based on merchant data */}

          {merchantData && merchantData.data && (
            <ul id="cards">
              {/* Map over the cardData array and render the Card component */}
              {cardData.map((card, index) => (

                <Card
                  index={index}
                  key={index}
                  id={`card_${index}`}
                  numberTitle={card.numberTitle}
                  unit={card.unit}
                  text={card.text}
                  top={card.top}
                  backgroundImage={card.backgroundImage}
                  smallCardsData={card.smallCardsData}
                  customerName={card.customerName}
                  img={card.img}
                />
              ))}
            </ul>
          )}


          


        </main>


        <MessageCard
          subTitle="Your performance this year describe you as a"
          title=" Monni Maker"
          ratings="/images/star.svg"
          text="You have done an amazing job and we are happy to continue our partnership with you in 2025"
          img="/images/thumb.png"
        />
        <Footer />

      </div>
  );
}
