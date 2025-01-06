// KARAN

"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import CardStack from "../components/CardStack";


import getMerchantData from "../helper/api";
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


    const updatedCardData: any[] = []; // general

    
    const disburseCardData: any[] = []; // disbursement
    const collectCardData: any[] = []; // collection 

   

    const topValue = 50;

    // Check if collection_value and disbursement_value exists and create the card
    if (merchantData?.data?.collection_value) {
      console.log(`card 1 `, merchantData);
      updatedCardData.push({
        index: 1,
        id: "card_1",
        numberTitle: formatCurrency(merchantData.data?.collection_value),
        headerText: "Collected",
        backgroundImage: "../images/mainCollection.svg",
        top: `${topValue}px`,
        marginTop: "0px",
        uppertext: "In 2024, you had",
        numberValue: formatCurrency(
          merchantData.data.collection_value)
        ,
        numberVolume:
        new Intl.NumberFormat("en-NG").format(merchantData.data.collection_volume)
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
        numberTitle: new Intl.NumberFormat("en-NG").format(merchantData.data.best_collection_month_volume),
        headerText: "Collected",
        backgroundImage: "../images/mainDisbursement.svg",
        // top: `${topValue * 2}px`,
        top: "100px",
        marginTop: '-50px',
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
        beforeBtnText: 'And you racked',
        afterBtnText: "transactions in this month, wow! 💵"

      });
    }

    if (merchantData?.data?.top_collection_customer_name) {
      updatedCardData.push({
        index: 3,
        id: "card_3",
        img: "/images/crown.png",
        customerName: merchantData.data.top_collection_customer_name,
        backgroundImage: "/images/mainCustomer.svg",
        top: "150px",
        marginTop: "-50px",
        smallCardsData: [
          {
            id: "small_card_1",
            text: `Was your Best customer`,
          },
          {
            id: "small_card_2",
            text: `With ${
              new Intl.NumberFormat("en-NG").format(merchantData.data.top_collection_customer_volume)
            } payments`,
          },
          {
            id: "small_card_3",
            text: `Valued at ${formatCurrency(merchantData.data.top_collection_customer_value)
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
        backgroundImage: "../images/mainCollection.svg",
        top: "200px",
        marginTop: "-50px",
        uppertext: "",
        numberValue: formatCurrency(
          merchantData.data.disbursement_value)
        ,
        numberVolume:
        new Intl.NumberFormat("en-NG").format(merchantData.data.disbursement_volume),
        cardSupText: "You were spreading the wealth like a pro generously completing 🔥",
        cardText: "",
        cardUpperText: "transactions",

      });
    }


    if (merchantData?.data?.disbursement_value) {
      updatedCardData.push({
        index: 5,
        id: "card_5",
        numberTitle: new Intl.NumberFormat("en-NG").format(merchantData.data?.best_disbursement_month_volume),
        headerText: "Collected",
        backgroundImage: "../images/mainDisbursement.svg",
        top: "250px",
        marginTop: "-50px",
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
        beforeBtnText: 'This month you paid out',
        afterBtnText: "transactions what a month!👍🏽"

      });
    }
    //waiting for disbursement
    if (merchantData?.data?.disbursement_value) {
      updatedCardData.push({
        index: 6,
        id: "card_6",
        img: "/images/crown.png",
        customerName: merchantData.data.top_disbursement_customer,
        backgroundImage: "/images/mainCustomer.svg",
        top: "300px",
        marginTop: "-50px", // there sth going on here (reduce pixel to see the effect)
        smallCardsData: [
          {
            id: "small_card_1",
            text: `Was your Best customer`,
          },
          {
            id: "small_card_2",
            text: `With ${
              new Intl.NumberFormat("en-NG").format(merchantData.data.top_disbursement_customer_volume)
            } payouts`,
          },
          {
            id: "small_card_3",
            text: `Valued at ${formatCurrency(merchantData.data.top_disbursement_customer_value)
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
        backgroundImage: "../images/mainCollection.svg",
        top: `${topValue}`,
        marginTop: "0px", // set up right value
        uppertext: "",
        numberValue: formatCurrency(
          merchantData.data.disbursement_value)
        ,
        numberVolume:
        new Intl.NumberFormat("en-NG").format(merchantData.data.disbursement_volume),
        cardSupText: "You were spreading the wealth like a pro generously completing 🔥",
        cardText: "",
        cardUpperText: "transaction",
      });
    }

    if (merchantData?.data?.best_disbursement_month_value) {
      disburseCardData.push({
        index: 2,
        id: "card_2",
        numberTitle: new Intl.NumberFormat("en-NG").format(merchantData.data?.best_disbursement_month_volume),
        headerText: "Collected",
        backgroundImage: "../images/mainDisbursement.svg",
        top: "50px",
        marginTop: "-100px", // set up right value
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
        beforeBtnText: 'This month you paid out',
        afterBtnText: "transactions what a month!👍🏽"
      });
    }
    //waiting for disbursement
    if (merchantData?.data?.top_disbursement_customer) {
      disburseCardData.push({
        index: 3,
        id: "card_3",
        img: "/images/crown.png",
        customerName: merchantData.data.top_disbursement_customer,
        backgroundImage: "/images/mainCustomer.svg",
        top: "100px",
        marginTop: "-150px", // there sth going on here (reduce pixel to see the effect)
        smallCardsData: [
          {
            id: "small_card_1",
            text: `Was your Best customer`,
          },
          {
            id: "small_card_2",
            text: `With ${
              new Intl.NumberFormat("en-NG").format(merchantData.data.top_disbursement_customer_volume)
            } payouts`,
          },
          {
            id: "small_card_3",
            text: `Valued at ${formatCurrency(merchantData.data.top_disbursement_customer_value)
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
        backgroundImage: "../images/mainCollection.svg",
        top: `${topValue}px`,
        marginTop: "0px",
        uppertext: "In 2024, you had",
        numberValue: formatCurrency(
          merchantData.data.collection_value)
        ,
        numberVolume:
        new Intl.NumberFormat("en-NG").format(merchantData.data.collection_volume)
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
        numberTitle: new Intl.NumberFormat("en-NG").format(merchantData.data.best_collection_month_volume),
        headerText: "Collected",
        backgroundImage: "../images/mainDisbursement.svg",
        // top: `${topValue * 2}px`,
        top: "100px",
        marginTop: '-50px',
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
        beforeBtnText: 'And you racked',
        afterBtnText: "transactions in this month, wow! 💵"

      });
    }

    if (merchantData?.data?.top_collection_customer_name) {
      collectCardData.push({
        index: 3,
        id: "card_3",
        img: "/images/crown.png",
        customerName: merchantData.data.top_collection_customer_name,
        backgroundImage: "/images/mainCustomer.svg",
        top: "150px",
        marginTop: "-100px",
        smallCardsData: [
          {
            id: "small_card_1",
            text: `Was your Best customer`,
          },
          {
            id: "small_card_2",
            text: `With ${
              new Intl.NumberFormat("en-NG").format(merchantData.data.top_collection_customer_volume)
            } payments`,
          },
          {
            id: "small_card_3",
            text: `Valued at ${formatCurrency(merchantData.data.top_collection_customer_value)
              }`,
          },
        ],
      });
    }

    if (collectCardData.length > 0) {
      setCollectData(collectCardData);
    }




  }, [merchantData]);


  // const card = [
  //   {
  //     cardTitle: "Card 1 - List 1",
  //     cardVolume: "Volume 1",
  //     cardText: "This is card number 1 from List 1",
  //     backgroundImage: "https://via.placeholder.com/600x400",
  //   },
  //   {
  //     cardTitle: "Card 2 - List 1",
  //     cardVolume: "Volume 2",
  //     cardText: "This is card number 2 from List 1",
  //      backgroundImage: "../images/mainCollection.svg"
  //   },
  //   {
  //     cardTitle: "Card 3 - List 1",
  //     cardVolume: "Volume 3",
  //     cardText: "This is card number 3 from List 1",
  //     backgroundImage: "https://via.placeholder.com/600x400",
  //     // backgroundImage: "../images/collection.svg"
  //   },
  // ];
  return (
    <div className="h-auto w-full bg-main">

      <BgHeader merchantData={merchantData} />


      <div className="flex justify-center items-center">
        {cardData.length > 0 ? <CardStack cardList={
          merchantData?.data?.collection_value && merchantData?.data?.disbursement_value ? cardData :
            merchantData?.data?.collection_value ? collectData: disburseData
        } /> : null}
      </div>

      <MessageCard
        subTitle="Your performance this year describe you as a"
        title= {merchantData?.data?.performance_category ?? "Monnie Maker"}
        ratings="/images/star.svg"
        text="You have done an amazing job and we are happy to continue our partnership with you in 2025"
        img="/images/thumb.png"
      />
      <Footer />
    </div>
  );
}
