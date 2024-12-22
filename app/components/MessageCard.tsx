"use client";
import Image from "next/image"
import { useRouter } from 'next/navigation'

type CardProps = {
    title: string
    ratings: string
    subTitle: string
    text: string
    img: string
};


function MessageCard({ title, subTitle, text, ratings, img }: CardProps) {
    const router = useRouter();
    

  const handleRedirect = () => {
    router.push('/dashboard'); 


  }

    console.log("from card compontent");

    return (
        <div className="lg:w-5/12 lg:h-[550px] h-auto sm:w-full mx-10 lg:mx-auto lg:mt-40 md:mt-44 lg:mb-44 flex justify-center items-center">
            <div className="flex justify-center items-center lg:w-full ">
                <div className="text-white text-center ">
                    <Image src={img} alt="items" width={200} height={200} className="thumb" />
                    <h3 className="text-lg md:text-2xl font-medium py-3">{subTitle}</h3>
                    <h1 className="text-[35px] md:text-[60px] capitalize font-[asgard]  font-bold pb-3 ">{title}</h1>
                    <div className="relative h-10">
                        <Image src={ratings} alt="star" width={90} height={32} className="absolute top-0 lg:left-[240px] 
                        md:left-[320px] left-[70px]" />
                    </div>

                    <p className=" text-base md:text-lg font-medium md:py-7 font-[inter]">{text}</p>
                </div>
            </div>
        </div>
    );
}

export default MessageCard;
