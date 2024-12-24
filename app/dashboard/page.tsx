"use client"

import Navbar from "../components/Navbar";
import Card from "../components/Card"
import Footer from "../components/Footer";
import User from "../components/UserData"
import ShortCard from "../components/Shortcard";
import InvertCard from "../components/Shortcard2"
import SettleCard from "../components/SettleCard";
import MessageCard from "../components/MessageCard";
import getMerchantData from "../api/page";

import { useEffect, useState } from "react";
import CardCarousel from "../components/CardCarousel";


// function dashboard() {
//     console.log('dashboard shouting here');


type CardData = {
    id: number;
    transparentText: string;
    numberTitle: string;
    unit: string;
    subTitle: string;
    text: string;
    img: string;
};

const dashboard: React.FC = () => {
    const [cardData, setCardData] = useState<CardData[]>([]);

    useEffect(() => {
        const fetchedData: CardData[] = [
            {
                id: 1,
                transparentText: "Collections",
                numberTitle: "158,899,900",
                unit: "Million",
                subTitle: "IN COLLECTION VALUE",
                text: "With a count of 893,239",
                img: "/images/cost.png",
            },
            {
                id: 2,
                transparentText: "Disbursement",
                numberTitle: "00000ß",
                unit: "thousands",
                subTitle: "with 15 counts",
                text: "You transaction matters to us",
                img: "/images/cost.png",
            },
            // {
            //     id: 3,
            //     transparentText: "T3",
            //     numberTitle: "300",
            //     unit: "Products",
            //     subTitle: "Card 3",
            //     text: "This is card 3 description.",
            //     img: "/images/card3.jpg",
            // },
            // {
            //     id: 4,
            //     transparentText: "T4",
            //     numberTitle: "400",
            //     unit: "Products",
            //     subTitle: "Card 4",
            //     text: "This is card 4 description.",
            //     img: "/images/card4.jpg",
            // },
        ];
        setCardData(fetchedData);
    }, []);



    return (
        <>
            <div className="w-full h-auto bg-page pt-12">
                <Navbar />
                <div id="main-section">
                    {cardData.length > 0 ? (
                        <CardCarousel cardsData={cardData} />
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
                <div id="user-section" >
                    <User
                        merchantName="Kelechi Obinna Micheal"
                        text="Best merchant for the year"
                        subtext=" You're the best merchant for the year"
                        undertext="Your valuation was impressive"
                    />
                </div>

                <div id="card-section" >
                    <ShortCard
                        supText="your best"
                        title="COLLECTION MONTH"
                        subText="for the year was"
                        icon="/images/calend.svg"
                        text="August"
                        img="/images/number.svg"
                        bigImg="/images/wallet.png"
                    />


                    <InvertCard
                        supText="your best"
                        title="DISBURSEMENT MONTH"
                        subText="for the year was"
                        icon="/images/calend.svg"
                        text="September"
                        img="/images/number.svg"
                        bigImg="/images/coins.png"
                    />
                </div>

                <div id="settle-section" >
                    <SettleCard
                        numberTitle=" 148,899,900"
                        unit="Millions"
                        text="Was settled with you this yea9"
                        img="/images/money.svg"
                    /></div>

                <div id="message-section" >

                    <MessageCard
                        subTitle="Your performance this year describe you as a"
                        title=" Monni Maker"
                        ratings="/images/star.svg"
                        text="You have done an amazing job and we happy to continue our partnership with you in 2025"
                        img="/images/thumb.png" />
                </div>

                <Footer />

            </div>
        </>
    )

}

export default dashboard;