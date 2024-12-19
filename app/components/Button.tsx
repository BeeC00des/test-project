"use client";

type ButtonProps = {
  label: string;
  type?: "button" | "submit" | "reset"; 
  onClick?: () => void; 
  className?: string; 
 
};

function Button({ label, type = "button", onClick, className, }: ButtonProps) {

  console.log("I am a client component from component family");

  return (
    <div>
      <button
        type={type}
        onClick={onClick}
        className={`px-10 py-2 mt-7 rounded-3xl font-medium text-sm text-white border border-white bg-transparent hover:bg-black transition-all duration-300 ${className}`}
        >
        {label}
      </button>
    </div>
  );
}

export default Button;
