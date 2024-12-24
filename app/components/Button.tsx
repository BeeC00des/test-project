"use client";
import Image from "next/image";


type ButtonProps = {
  label: string;
  type?: "button" | "submit" | "reset"; 
  onClick?: () => void; 
  className?: string; 
  img:string
  // isloading: boolean
 
};

function Button({ label, type = "button", onClick, img, className}: ButtonProps) {
  // , isloading 

  // const router = useRouter();

  // const handleRedirect = () => {
  //   router.push('/dashboard'); 
  // onClick={handleRedirect}
  // }

  return (
    <div className="flex justify-center items-center">
      <button
        type={type}
        
        className={`my-8 rounded-full flex font-light text-white border border-white bg-transparent transition-all duration-300 ${className}`}
        >
        <Image src={img} alt="downarrow" width={30} height={30}/>
        <strong className="pl-1 pt-1 text-base">{label}</strong>
      </button>
    </div>
  );
}

export default Button;
