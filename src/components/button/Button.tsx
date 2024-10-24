import React from "react";
import { carter_one } from "@/utils/fonts";
import { motion } from 'framer-motion';

interface ButtonProps {
    buttonText: string;
    onClick?: () => void;
};

const Button: React.FC<ButtonProps> = ({ buttonText }) => {
    return (
        <motion.button whileHover={{
            scale: 1.1,
            textShadow: "0px 0px 8px rgb(255,255,255",
            boxShadow: "0px 0px 8px rgb(255,255,255",
        }}
            className="relative flex justify-center items-center">
                <div className="absolute h-20 w-40 bg-mainGreen rounded-xl z-10 top-3 right-3 flex justify-center items-center">
                    <span className={`${carter_one} text-lightCream text-lg`}>{buttonText}</span>
                </div>
                <div className="absolute h-20 w-40 bg-darkCream rounded-xl z-9 top-1 right-2">
                </div>
        </motion.button>
        
    )
};

export default Button;