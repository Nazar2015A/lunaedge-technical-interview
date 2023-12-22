import React from "react";

type ButtonProps = {
  type: "text" | "outline" | "primary";
  size: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
};

const setSizeStyle = (size: ButtonProps['size']) => {
    switch (size) {
      case 'xs':
        return 'h-5';
      case 'sm':
        return 'h-6';
      case 'base':
        return 'h-8';
      case 'lg':
        return 'h-10';
      case 'xl':
        return 'h-12';
      default:
        return 'h-8';
    }
  };
  
  const setColorBtn = ({ type, size }: ButtonProps) => {
    const sizeStyle = setSizeStyle(size);
  
    if (type === "text") {
      return `${sizeStyle} flex gap-2 items-center group px-4 py-1 border-2 border-[white] rounded-md hover:bg-[#EEF2FF] hover:border-2 hover:border-[#EEF2FF] hover:text-[#6466f1] duration-300`;
    }
    if (type === "primary") {
      return `${sizeStyle} flex gap-2 items-center group px-4 py-1 border-2 border-[#4724C7] text-[#fff] bg-[#4724C7] rounded-md hover:bg-[#6466F1] hover:border-2 hover:border-[#6466F1] hover:text-[#fff] duration-300`;
    }
    if (type === "outline") {
      return `${sizeStyle} flex gap-2 items-center group px-4 py-1 border-2 border-[#b6abea] text-[#4724C7] rounded-md hover:bg-[#eef2ff] hover:border-2 hover:border-[#B2B5F8] hover:text-[#6466f1] duration-300`;
    }
  };

const Button: React.FC<ButtonProps> = ({ type, size }) => {
  return (
    <>
      <button type="submit" className={setColorBtn({ type, size })}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          data-slot="icon"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>
        Button
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-4 h-4 ml-auto"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m19.5 8.25-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
    </>
  );
};

export default Button;
