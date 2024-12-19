"use client"

import Navbar from "../components/Navbar";
import Card from "../components/Card"
// import Halfcard from "../components/Halfcard"
import Footer from "../components/Footer";
import User from "../components/UserData"
import ShortCard from "../components/Shortcard";
import InvertCard from "../components/Shortcard2"
import SettleCard from "../components/settleCard";
import MessageCard from "../components/messageCard";

function dashboard() {
    console.log('dashboard shouting here');


    return (
        <>
            <div className="w-full h-auto bg-page pt-12">
                <Navbar />
                <Card
                    transparentText=""
                    numberTitle=" 158,899,900"
                    unit="Millions"
                    subTitle="IN COLLECTION VALUE"
                    text="With a count of 893,239"
                    img="/images/cost.png"
                />

                <User
                    merchantName="Kelechi Obinna Micheal"
                    text="Best merchant for the year"
                    subtext=" You're the best merchant for the year"
                    undertext="your valuation was impressive"
                />

                <ShortCard
                    supText="your best"
                    title="COLLECTION MONTH"
                    subText="for the year was"
                    icon="/images/calender.png"
                    text="August"
                    img="/images/calender.png"
                    bigImg="/images/wallet.png"
                />


                <InvertCard
                    supText="your best"
                    title="Disbursement"
                    subText="for the year was"
                    icon=""
                    text="September"
                    img="/hello"
                    bigImg="/images/coins.png"
                />

                <SettleCard
                    numberTitle=" 148,899,900"
                    unit="Millions"
                    text="Was settled with you this yea9"
                    img="/images/money.png"
                />


                {/* <MessageCard
                    title=" 158,899,900"
                    message="Millions"
                    subTitle="IN COLLECTION VALUE"
                    text="Was settled with you this year"
                    img="/value"/> */}

                <Footer />
            </div>
        </>)

}

export default dashboard