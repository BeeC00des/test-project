"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import Card from "./components/Card";
import DisbursementCard from "./components/disbursementCard";
import CollectionCard from "./components/collectionCard";


import getMerchantData from "./api/page";
import MessageCard from "./components/MessageCard";
import Footer from "./components/Footer";
import BgHeader from "./components/Bgheader";

import TransactionCard from "./components/TransactionCard";


export default function Home() {
  const params = useParams();

  const merchantId = params.id;
  // State to hold merchant data, loading state, and error message
  const [cardData, setCardData] = useState<any[]>([]); // Updated to an empty array
  const [disburseData, setDisburseData] = useState<any[]>([]);
  const [collectData, setCollectData] = useState<any[]>([]);
  const [merchantData, setMerchantData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  // console.log(merchantData.data.best_collection_month);
  // console.log(merchantData)

  // currency formatter function

  const formatCurrency = (value: number) => {
    return `₦${new Intl.NumberFormat("en-NG").format(value)}`;
  };

  // Handle API call
  const handleApiCall = async () => {
    if (merchantId === "" || merchantId?.length !== 32) {
      //show 404 instead of error message
      setError("Invalid URL.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const data = await getMerchantData(merchantId as string);
      console.log(data.data);
      setMerchantData(data);
    } catch (err) {
      setError("Failed to fetch merchant data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // UseEffect to handle API call on mount
  useEffect(() => {
    handleApiCall();
  }, [merchantId]);

  useEffect(() => {


    const updatedCardData: any[] = [];
    const disburseCardData: any[] = [];
    const collectCardData: any[] = [];
    const topValue = 50;


    if (merchantData?.data?.collection_value) {

      console.log(`card 1 `, merchantData);
      
      updatedCardData.push({
        index: 1,
        id: "card_1",
        numberTitle: formatCurrency(merchantData.data?.collection_value),
        headerText: "Collected",
        backgroundImage: "../images/collectionImg.svg",
        top: `${topValue}px`,
        uppertext: "In 2024, you had",
        numberValue:formatCurrency(
          merchantData.data.collection_value)
        ,
        numberVolume: `${formatCurrency(
          merchantData.data.collection_volume
        )}`,
        cardSupText: "You've been raking in the Naira with",
        cardText: "🤑 Keep the bell ringing!",
        cardUpperText: "total paid transaction",
      });
    }

    // Check if disbursement_value exists and create the card
    if (merchantData?.data?.disbursement_value) {
      updatedCardData.push({
        index: 2,
        id: "card_2",
        numberTitle: formatCurrency(merchantData.data.disbursement_value),
        unit: "Million in disbursement value",
        text: `With count of ${merchantData.data.disbursement_volume}`,
        backgroundImage: "/images/disbursement.svg",
        top: "100px",
        img: "",
      });
    }

    if (merchantData?.data?.top_collection_customer_name) {
      updatedCardData.push({
        index: 3,
        id: "card_3",
        img: "/images/crown.png",
        customerName: merchantData.data.top_collection_customer_name,
        backgroundImage: "/images/customer.svg",
        top: "150px",
        smallCardsData: [
          {
            id: "small_card_1",
            text: `Was your Best customer`,
          },
          {
            id: "small_card_2",
            text: `With ${formatCurrency(
              merchantData.data.top_collection_customer_value
            )} payment`,
          },
          {
            id: "small_card_3",
            text: `Valued at ${formatCurrency(
              merchantData.data.top_collection_customer_value
            )}`,
          },
        ],
      });
    }

    // If best collection month exists, create the card
    if (merchantData?.data?.best_collection_month_value) {
      updatedCardData.push({
        index: 4,
        id: "card_4",
        numberTitle: formatCurrency(merchantData.data?.collection_value),
        headerText: "Collected",
        backgroundImage: "../images/collectionImg.svg",
        top: `${topValue}px`,
        uppertext: "In 2024, you had",
        numberValue:formatCurrency(
          merchantData.data.disbursement_value)
        ,
        numberVolume: `${formatCurrency(
          merchantData.data.disbursement_volume
        )}`,
        cardSupText: "You've been raking in the Naira with",
        cardText: "🤑 Keep the bell ringing!",
        cardUpperText: "total paid transaction",
    
      });
    }

    // If best disbursement month exists, create the card
    if (merchantData?.data?.best_disbursement_month_value) {
      updatedCardData.push({
        index: 5,
        id: "card_5",
        numberTitle: "Your best disbursement month for the year was",
        unit: `${merchantData.data.best_disbursement_month}`, // Assuming disbursementMonthName is available
        text: `Disbursement value that month was ${formatCurrency(
          merchantData.data.best_disbursement_month_value
        )}`,
        backgroundImage: "/images/disbursement.svg",
        top: "250px",
      });
    }

    

    // Always show the settlement value card if available
    // if (merchantData?.data?.total_settlement_value) {
    //   updatedCardData.push({
    //     index: 6,
    //     id: "card_6",
    //     numberTitle: formatCurrency(merchantData.data.total_settlement_value),
    //     unit: "Million in settlement value",
    //     backgroundImage: "/images/settle.svg",
    //     img: "",
    //     top: "700px",
    //   });
    // }

    if (merchantData?.data?.top_collection_customer_name) {
      updatedCardData.push({
        index: 6,
        id: "card_6",
        img: "/images/crown.png",
        customerName: merchantData.data.top_collection_customer_name,
        backgroundImage: "/images/customer.svg",
        top: "150px",
        smallCardsData: [
          {
            id: "small_card_1",
            text: `Was your Best customer`,
          },
          {
            id: "small_card_2",
            text: `With ${formatCurrency(
              merchantData.data.top_collection_customer_value
            )} payment`,
          },
          {
            id: "small_card_3",
            text: `Valued at ${formatCurrency(
              merchantData.data.top_collection_customer_value
            )}`,
          },
        ],
      });
    }

    // Only update if there's valid data to display
    if (updatedCardData.length > 0) {
      setCardData(updatedCardData);
    }


    //disurbement  card 

    if (merchantData?.data?.disbursement_value) {
      disburseCardData.push({
        index: 1,
        numberTitle: formatCurrency(merchantData.data.disbursement_value),
        unit: "Million in disbursement value",
        text: `With count of ${merchantData.data.disbursement_volume}`,
        backgroundImage: "/images/collectionImg.svg",
        top: `${topValue}px`,
      });
    }

    if (merchantData?.data?.best_disbursement_month_value) {
      disburseCardData.push({
        index: 2,
        numberTitle: "Your best disbursement month for the year was",
        unit: `${merchantData.data.best_disbursement_month}`,
        text: `Disbursement value that month was ${formatCurrency(
          merchantData.data.best_disbursement_month_value
        )}`,
        backgroundImage: "/images/disbursement.svg",
        top: "100px"
      });
    }


    //only disbursement data

    // Only update if there's valid data to display
    if (disburseCardData.length > 0) {
      setDisburseData(disburseCardData);
    }

    //Collection card

    if (merchantData?.data?.collection_value) {
      collectCardData.push({
        index: 1,
        id: "card_1",
        numberTitle: formatCurrency(merchantData.data?.collection_value),
        unit: "Million in collection value",
        text: `with count of ${merchantData.data.collection_volume}`,
        backgroundImage: "../images/collectionImg.svg",
        top: `${topValue}px`,
        img: "",

      });
    }

    if (merchantData?.data?.top_collection_customer_name) {
      collectCardData.push({
        index: 2,
        id: "card_2",
        img: "/images/crown.png",

        customerName: merchantData.data.top_collection_customer_name,
        backgroundImage: "/images/customer.svg",
        top: "100px",
        smallCardsData: [
          {
            id: "small_card_1",
            text: `Was your Best customer`,
          },
          {
            id: "small_card_2",
            text: `With ${formatCurrency(
              merchantData.data.top_collection_customer_value
            )} payment`,
          },
          {
            id: "small_card_3",
            text: `Valued at ${formatCurrency(
              merchantData.data.top_collection_customer_value
            )}`,
          },
        ],
      });
    }

    if (merchantData?.data?.best_collection_month_value) {
      collectCardData.push({
        index: 3,
        id: "card_3",
        numberTitle: "Your best collection month for the year was",
        unit: `${merchantData.data.best_collection_month}`, // Assuming best_collection_month is available
        text: `Collection value that month was ${formatCurrency(
          merchantData.data.best_collection_month_value
        )}`,
        backgroundImage: "/images/collectionImg.svg",
        top: "150px",

      });
    }

    if (merchantData?.data?.total_settlement_value) {
      collectCardData.push({
        index: 4,
        id: "card_4",
        numberTitle: formatCurrency(merchantData.data.total_settlement_value),
        unit: "Million in settlement value",
        backgroundImage: "/images/settle.svg",
        top: "450px",
      });
    }

    if (collectCardData.length > 0) {
      setCollectData(collectCardData);
    }


  }, [merchantData]);

  return (
    <div className="h-auto w-full bg-main">

      <BgHeader merchantData={merchantData} />


      {/* start of old card */}
      <div className="h-auto border border-red-500">
        {/* 6 cards display on screen */}
        {merchantData?.data?.collection_value && merchantData?.data?.disbursement_value ? (
          <main className="mt-10 mb-2 md:mt-32 md:mb-2 relative ">
            {loading && <p className="py-10 text-2xl text-center ">Loading...</p>}

            {error && (
              <p className="text-red-500 mt-2 py-10 text-2xl text-center">
                {error}
              </p>
            )}

            {/* Dynamically display cards based on merchant data */}


            <ul id="cards">
              {/* Map over the cardData array and render the Card component */}
              {cardData.map((card, index) => (
                <Card
                  index={index}
                  key={index}
                  id={`card_${index}`}
                  numberTitle={card.numberTitle}
                  unit={card.unit}
                  headerText={card.headerText}
                  top={card.top}
                  backgroundImage={card.backgroundImage}
                  smallCardsData={card.smallCardsData}
                  customerName={card.customerName}
                  img={card.img}
                  cardUpperText={card.cardUpperText}
                  cardText={card.cardText}
                  uppertext={card.uppertext}
                  numberValue={card.numberValue}
                  numberVolume={card.numberVolume}
                  cardSupText={card.cardSupText}
                />
              ))}
            </ul>

          </main>

        ) : merchantData?.data?.disbursement_value ? (
          <main className="mt-10 mb-2 md:mt-32 md:mb-2">
            {loading && <p className="py-10 text-2xl text-center ">Loading...</p>}

            {error && (
              <p className="text-red-500 mt-2 py-10 text-2xl text-center">
                {error}
              </p>
            )}


            {/* 2 cards display disbursement on screen  */}
            <ul id="cards">
              {disburseData.map((card, index) => (
                <DisbursementCard
                  index={index}
                  numberTitle={card.numberTitle}
                  backgroundImage={card.backgroundImage}
                  text={card.text}
                  unit={card.unit}
                  top={card.top}
                />
              ))}
            </ul>

          </main>

        ) : (
          <main className="mt-10 mb-2 md:mt-32 md:mb-2">
            {loading && <p className="py-10 text-2xl text-center ">Loading...</p>}

            {error && (
              <p className="text-red-500 mt-2 py-10 text-2xl text-center">
                {error}
              </p>
            )}


            {/* 4 cards display collection screen  */}
            <ul id="cards">
              {collectData.map((card, index) => (
                <CollectionCard
                  index={index}
                  id={`card_${index}`}
                  numberTitle={card.numberTitle}
                  backgroundImage={card.backgroundImage}
                  text={card.text}
                  unit={card.unit}
                  top={card.top}
                  smallCardsData={card.smallCardsData}
                  customerName={card.customerName}
                  img={card.img}
                />
              ))}
            </ul>



          </main>

        )



        }
      </div>


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
