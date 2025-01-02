"use client";
import { useState, useEffect } from "react";

// Define the props for each card
type CardProps = {
    cardTitle: string;
    cardVolume: string;
    cardText: string;
    backgroundImage: string;
    index: number;
};

// Define the props for the Cards component with a card list
type CardsProps = {
    cardList: {
        cardTitle: string;
        cardVolume: string;
        cardText: string;
        backgroundImage: string;
    }[];
};

function Cards({ cardList }: CardsProps) {
    return (
        <div className="mainCard " style={{
            // width: '80%',
            margin: 'auto'
        }}>
            {/* Render the list of cards from array */}
            <ul id="mainCards">
                {cardList.map((card, index) => (
                    <li 
                        key={index} 
                        className="cardi" 
                        style={{
                            position: 'relative',
                            marginBottom: '-50px', // Adjust this value for spacing between cards
                             width: '300px', 
                            height: '400px'
                        }}
                    >
                        {/* Card with background image */}
                        <div className="card-container" style={{ position: 'relative', width:"100%", height:"100%" }}>
                            <img
                                src={card.backgroundImage}
                                alt="Card Background"
                                className="card-background border border-green-500"
                                style={{ 
                                    width: '100%', 
                                    height: '100%', 
                                    borderRadius:"50px",
                                    objectFit:'cover',
                                    aspectRatio: '1260/907',
  
  
                                    //  objectFit:'contain'  
                                    // backgroundSize:"cover"
                                  }}/>
                            {/*  */}


                        {/* Card text-content*/}
                            <div
                                className="card-content"
                                style={{
                                    position: 'absolute',
                                    top: '20%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    color: 'white',
                                    zIndex: 1,
                                }}
                            >
                                <div className="text-left">
                                    <h1
                                        className="title"
                                        style={{ margin: 0, padding: '10px 0', zIndex: 2 }}
                                    >
                                        {card.cardTitle}
                                    </h1>
                                    <h2
                                        className="unit"
                                        style={{ margin: 0, padding: '10px 0', zIndex: 2 }}
                                    >
                                        {card.cardVolume}
                                    </h2>
                                    <p
                                        className="description"
                                        style={{ margin: 0, padding: '10px 0', zIndex: 2 }}
                                    >
                                        {card.cardText}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}



export default Cards;
