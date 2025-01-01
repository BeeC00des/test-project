// KARAN

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import Card from "../components/Card";
import DisbursementCard from "../components/disbursementCard";
import CollectionCard from "../components/collectionCard";


import getMerchantData from "../api/page";
import MessageCard from "../components/MessageCard";
import Footer from "../components/Footer";
import BgHeader from "../components/Bgheader";




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

  // Check if collection_value and disbursement_value exists and create the card
    if (merchantData?.data?.collection_value) {
      console.log(`card 1 `, merchantData);
      updatedCardData.push({
        index: 1,
        id: "card_1",
        numberTitle: formatCurrency(merchantData.data?.collection_value),
        headerText: "Collected",
        backgroundImage: "../images/collectionImg.svg",
        top: `${topValue}px`,
        marginTop:"0px",
        uppertext: "In 2024, you had",
        numberValue: formatCurrency(
          merchantData.data.collection_value)
        ,
        numberVolume:
          merchantData.data.collection_volume
        ,
        cardSupText: "You've been raking in the Naira with",
        cardText: "🤑 Keep the bell ringing!",
        cardUpperText: "total paid transaction",
      });
    }


    if (merchantData?.data?.collection_value) {
      console.log('------------- ', merchantData.data.best_collection_month);
      updatedCardData.push({
        index: 2,
        id: "card_2",
        numberTitle: merchantData.data.best_collection_month_volume,
        headerText: "Collected",
        backgroundImage: "../images/disbursement.svg",
        // top: `${topValue * 2}px`,
        top: "100px",
        marginTop:'-50px',
        uppertext: "bagging",
        specialUppertext: "",
        numberValue:
          merchantData.data.best_collection_month,
        numberVolume: `${formatCurrency(
          merchantData.data.best_collection_month_value
        )}`,
        cardSupText: "",
        cardText: "was your peak performance month,",
        cardUpperText: "total paid transaction",
         beforeBtnText:'And you racked',
        afterBtnText: "transactions in this month, wow! 💵"
  
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
        marginTop:"-100px",
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
            text: `Valued at ${
              merchantData.data.top_collection_customer_volume
            }`,
          },
        ],
      });
    }

   
    if (merchantData?.data?.disbursement_value) {
      updatedCardData.push({
        index: 4,
        id: "card_4",
        numberTitle: formatCurrency(merchantData.data?.disbursement_value),
        headerText: "total paid out amount",
        backgroundImage: "../images/collectionImg.svg",
        top: "200px",
        marginTop:"-150px",
        uppertext: "",
        numberValue: formatCurrency(
          merchantData.data.disbursement_value)
        ,
        numberVolume:
          merchantData.data.disbursement_volume,
        cardSupText: "You were spreading the wealth like a pro generously completing 🔥",
        cardText: "",
        cardUpperText: "transaction",

      });
    }

   
    if (merchantData?.data?.disbursement_value) {
      updatedCardData.push({
        index: 5,
        id: "card_5",
        numberTitle: merchantData.data?.best_disbursement_month_volume,
        headerText: "Collected",
        backgroundImage: "../images/disbursement.svg",
        top: "250px",
        marginTop:"-200px",
        uppertext: "", //no content,
        specialUppertext: "🥂Cheers to",
        numberValue:
          merchantData.data.best_disbursement_month,
        numberVolume: `${formatCurrency(
          merchantData.data.best_disbursement_month_value
        )}`,

        cardSupText: "When you paid out the most,",
        cardText: "", //no content
        cardUpperText: "", //no content
        beforeBtnText:'This day you paid out',
        afterBtnText: "what a day!👍🏽"

      });
    }
//waiting for disbursement
    if (merchantData?.data?.top_collection_customer_name) {
      updatedCardData.push({
        index: 6,
        id: "card_6",
        img: "/images/crown.png",
        customerName: merchantData.data.top_collection_customer_name,
        backgroundImage: "/images/settle.svg",
        top: "300px",
        marginTop:"-250px", // there sth going on here (reduce pixel to see the effect)
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
            text: `Valued at ${
              merchantData.data.top_collection_customer_volume
            }`,
          },
        ],
      });
    }

    // caller : Only update if there's valid data to display
    if (updatedCardData.length > 0) {
      setCardData(updatedCardData);
    }


    // only disbursement value present  fill the cards only

    if (merchantData?.data?.disbursement_value) {
      disburseCardData.push({
        index: 1,
        id: "card_1",
        numberTitle: formatCurrency(merchantData.data?.disbursement_value),
        headerText: "total paid out amount",
        backgroundImage: "../images/collectionImg.svg",
        top: `${topValue}`,
        marginTop:"0px", // set up right value
        uppertext: "",
        numberValue: formatCurrency(
          merchantData.data.disbursement_value)
        ,
        numberVolume:
          merchantData.data.disbursement_volume,
        cardSupText: "You were spreading the wealth like a pro generously completing 🔥",
        cardText: "",
        cardUpperText: "transaction",
      });
    }

    if (merchantData?.data?.best_disbursement_month_value) {
      disburseCardData.push({
        index: 2,
        id: "card_2",
        numberTitle: merchantData.data?.best_disbursement_month_volume,
        headerText: "Collected",
        backgroundImage: "../images/disbursement.svg",
        top: "50px",
        marginTop:"-100px", // set up right value
        uppertext: "", //no content,
        specialUppertext: "🥂Cheers to",
        numberValue:
          merchantData.data.best_disbursement_month,
        numberVolume: `${formatCurrency(
          merchantData.data.best_disbursement_month_value
        )}`,

        cardSupText: "When you paid out the most,",
        cardText: "", //no content
        cardUpperText: "", //no content
        beforeBtnText:'This day you paid out',
        afterBtnText: "what a day!👍🏽"
      });
    }
//waiting for disbursement
    if (merchantData?.data?.top_collection_customer_name) {
      disburseCardData.push({
        index: 3,
        id: "card_3",
        img: "/images/crown.png",
        customerName: merchantData.data.top_collection_customer_name,
        backgroundImage: "/images/settle.svg",
        top: "100px",
        marginTop:"-150px", // there sth going on here (reduce pixel to see the effect)
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
            text: `Valued at ${
              merchantData.data.top_collection_customer_volume
            }`,
          },
        ],
      });
    }

    if (disburseCardData.length > 0) {
      setDisburseData(disburseCardData);
    }

    //only collection value present, fill the cards only

    if (merchantData?.data?.collection_value) {
      console.log(`card 1 `, merchantData);
      collectCardData.push({
        index: 1,
        id: "card_1",
        numberTitle: formatCurrency(merchantData.data?.collection_value),
        headerText: "Collected",
        backgroundImage: "../images/collectionImg.svg",
        top: `${topValue}px`,
        marginTop:"0px",
        uppertext: "In 2024, you had",
        numberValue: formatCurrency(
          merchantData.data.collection_value)
        ,
        numberVolume:
          merchantData.data.collection_volume
        ,
        cardSupText: "You've been raking in the Naira with",
        cardText: "🤑 Keep the bell ringing!",
        cardUpperText: "total paid transaction",
      });
    }


    if (merchantData?.data?.collection_value) {
      console.log('------------- ', merchantData.data.best_collection_month);
      collectCardData.push({
        index: 2,
        id: "card_2",
        numberTitle: merchantData.data.best_collection_month_volume,
        headerText: "Collected",
        backgroundImage: "../images/disbursement.svg",
        // top: `${topValue * 2}px`,
        top: "100px",
        marginTop:'-50px',
        uppertext: "bagging",
        specialUppertext: "",
        numberValue:
          merchantData.data.best_collection_month,
        numberVolume: `${formatCurrency(
          merchantData.data.best_collection_month_value
        )}`,
        cardSupText: "",
        cardText: "was your peak performance month,",
        cardUpperText: "total paid transaction",
         beforeBtnText:'And you racked',
        afterBtnText: "transactions in this month, wow! 💵"
  
      });
    }

    if (merchantData?.data?.top_collection_customer_name) {
      collectCardData.push({
        index: 3,
        id: "card_3",
        img: "/images/crown.png",
        customerName: merchantData.data.top_collection_customer_name,
        backgroundImage: "/images/customer.svg",
        top: "150px",
        marginTop:"-100px",
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
            text: `Valued at ${
              merchantData.data.top_collection_customer_volume
            }`,
          },
        ],
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
      <div className="h-auto">
        {/* 6 cards display on screen */}
        {merchantData?.data?.collection_value && merchantData?.data?.disbursement_value ? (
          <main className="mt-10 mb-2 md:mt-24 md:mb-2 relative ">
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
                  specialUppertext={card.specialUppertext}
                  cardUpperText={card.cardUpperText}
                  cardText={card.cardText}
                  uppertext={card.uppertext}
                  numberValue={card.numberValue}
                  numberVolume={card.numberVolume}
                  cardSupText={card.cardSupText}
                  afterBtnText={card.afterBtnText}
                  beforeBtnText={card.beforeBtnText}
                  marginTop ={card.marginTop}
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
                specialUppertext={card.specialUppertext}
                cardUpperText={card.cardUpperText}
                cardText={card.cardText}
                uppertext={card.uppertext}
                numberValue={card.numberValue}
                numberVolume={card.numberVolume}
                cardSupText={card.cardSupText}
                afterBtnText={card.afterBtnText}
                beforeBtnText={card.beforeBtnText}
                marginTop ={card.marginTop}
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
                specialUppertext={card.specialUppertext}
                cardUpperText={card.cardUpperText}
                cardText={card.cardText}
                uppertext={card.uppertext}
                numberValue={card.numberValue}
                numberVolume={card.numberVolume}
                cardSupText={card.cardSupText}
                afterBtnText={card.afterBtnText}
                beforeBtnText={card.beforeBtnText}
                marginTop ={card.marginTop}
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
