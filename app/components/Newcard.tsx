"use client";

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
                            //  width: '300px', 
                            // height: '400px'
                            
                        }}
                    >
                       {/* border:'3px solid black',
                       borderRadius:'40px' */}
                        <div className="card-container" style={{ position: 'relative', width:"100%", height:"100%",}}>
                             {/* Card with background image */}
                            <img
                                src={card.backgroundImage}
                                alt="Card Background"
                                // border border-green-500
                                className="card-background  border border-green-500 rounded-3xl w-full h-full object-cover"
                                  />


                        {/* Card text-content*/}
                            <div
                                className="card-content top-0 bottom-0 left-5 right-0" //set all to 0
                                style={{
                                    position: 'absolute',
                                    width:'100%',
                                    height:"100%",
                                    // border:"3px solid red",
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
