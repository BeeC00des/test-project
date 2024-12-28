"use client";

import { useState, useEffect } from "react";

import Card from "./components/Card";
import CardStack from "./components/cardStack";
import getMerchantData from "./api/page";
import MessageCard from "./components/MessageCard";
import Footer from "./components/Footer";
import BgHeader from './components/Bgheader';

export default function Home() {
  
  // State to hold merchant data, loading state, and error message
  const [cardData, setCardData] = useState<any[]>([]); // Updated to an empty array
  const [merchantData, setMerchantData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // currency formatter function

  const formatCurrency = (value: number) => {
    return `₦${new Intl.NumberFormat('en-NG').format(value)}`;
  };

  // Handle API call
  const handleApiCall = async () => {
    const merchantId = "581b763d636c88ee8585e78cf490d063";

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
  }, []);

  // Dynamically update the cardData array when merchantData is loaded
  useEffect(() => {
    if (merchantData && merchantData.data) {
      // Dynamically populate the cardData array with merchant data
      const updatedCardData = [
        {
          index: 1,
          id: 'card_1',
          numberTitle: formatCurrency(merchantData.data.collection_value),
          unit: "Million in collection value",
          text: `With count of  ${merchantData.data.best_collection_month}`,
          backgroundImage: "/images/collectionImg.svg",
          top: "50px"
        },
        {
          index: 2,
          id: 'card_2',
          numberTitle: formatCurrency(merchantData.data.disbursement_value),
          unit: "Million in disbursement value",
          text: `With count of ${merchantData.data.top_collection_customer_name}`,
          backgroundImage: "/images/disbursement.svg",
          top: "100px",
          // height:""
        },
        {
          index: 3,
          id: 'card_3',
          numberTitle: formatCurrency(merchantData.data.best_collection_month_value),
          unit: "Best Collection Month Value",
          text: `Best Collection Month:${merchantData.data.business_name}`,
          backgroundImage: "/images/customer.svg",
          top: "150px",
         

          // Add smallCardsData for card 3
          smallCardsData: [
            {
              id: 'small_card_1',
              text: `Was your Best customer`,
              
            },
            {
              id: 'small_card_2',
              text: `With ${formatCurrency(merchantData.data.disbursement_value)} payment`,
              
            },
            {
              id: 'small_card_3',
              text: `Valued at ${merchantData.data.best_collection_month_value}`,
            
            },
          ],
        },

        {
          index: 4,
          id: 'card_4',
          numberTitle: formatCurrency(merchantData.data.best_disbursement_month_value),
          unit: "Best Disbursement Month Value",
          text: `Best Disbursement Month: ${merchantData.data.best_disbursement_month}`,
          backgroundImage: "/images/disbursement.svg",
          top: "200px"
        },
        {
          index: 5,
          id: 'card_5',
          numberTitle: formatCurrency(merchantData.data.top_collection_customer_value),
          unit: "Top Collection Customer Value",
          text: `Top Collection Customer: ${merchantData.data.top_collection_customer_name}`,
          backgroundImage: "/images/collectionImg.svg",
          top: "250px"
        },
        {
          index: 6,
          id: 'card_6',
          numberTitle: formatCurrency(merchantData.data.total_settlement_value),
          unit: "Million in settlement value",
          // text: "Total Settlement",
          backgroundImage: "/images/settle.svg",
          // top: "300px"
        },

      ];
      console.log('Updated card data:', updatedCardData);
      console.log('Small cards data for index 3:', updatedCardData.find(card => card.index === 3)?.smallCardsData);
      setCardData(updatedCardData);  // Update card data with new information
    }
  }, [merchantData]);  // Run this effect when merchantData changes

  return (
    <div className="h-auto w-full bg-main">
      <BgHeader />



      <main className=" mt-2 md:mt-32">
        {/* loading state */}
        {loading && <p  className="py-10 text-2xl text-center ">Loading...</p>}

        {/* error message */}
        {error && <p className="text-red-500 mt-2 py-10 text-2xl text-center">{error}</p>}

        {/* Dynamically display cards based on merchant data */}
        {merchantData && merchantData.data && (
          <ul id="cards" style={{}}>
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
                // height={card.height}
              />
            ))}
          </ul>
        )}
      </main>

      

      {/* MessageCard and Footer */}
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
