"use client";
import { useRouter } from 'next/navigation'
type ButtonProps = {
  label: string;
  type?: "button" | "submit" | "reset"; 
  onClick?: () => void; 
  className?: string; 
 
};

function Button({ label, type = "button", onClick, className, }: ButtonProps) {

  const router = useRouter();


  // if (!router) {
  //   // If the router is not available, throw an error or handle it gracefully
  //   throw new Error('NextRouter is not available');
  // }

  const handleRedirect = () => {
    router.push('/dashboard'); 
  }

  return (
    <div>

      {/* fix scroll redirection */}
      <button
        type={type}
        onClick={handleRedirect}
        className={`px-10 py-2 my-7 rounded-3xl font-medium text-base text-white border border-white bg-transparent hover:bg-black transition-all duration-300 ${className}`}
        >
        {label}
      </button>
    </div>
  );
}

export default Button;
