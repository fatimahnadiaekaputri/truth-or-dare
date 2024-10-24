"use client";

import { useState } from "react";
import { motion } from 'framer-motion';
import TruthCard from "@/assets/TruthCard.png";
import DareCard from "@/assets/DareCard.png";
import Image from "next/image";

const CardFlip = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    function handleMouseEnter () {
        if(!isAnimating) {
            setIsFlipped(!isFlipped);
            setIsAnimating(true);
        }
    }

    function handleMouseLeave () {
        if(!isAnimating) {
            setIsFlipped(false);
            setIsAnimating(true);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <div className="flip-card w-[210.7px] h-[316.4px] rounded-md shadow-black">
                <motion.div className="flip-card-inner w-[100%] h-[100%]"
                initial={false}
                animate={{rotateY: isFlipped ? 180 : 360}}
                transition={{duration: 0.6}}
                onAnimationComplete={() => setIsAnimating(false)}>
                    <div className="flip-card-front w-[100%] h-[100%] bg-background">
                        <Image src={TruthCard} alt="Truth Card" fill style={{ objectPosition: "center" }} />
                    </div>
                    <div className="flip-card-back w-[100%] h-[100%]">
                        <Image src={DareCard} alt="Dare Card" fill style={{ objectPosition: "center" }} />
                    </div>
                </motion.div>
            </div>
            <div className="mt-6 relative w-16 h-2 bg bg-gray-300 rounded-full">
                <motion.div className="absolute w-8 h-2 bg-mainGreen rounded-full" 
                            initial={false}
                            animate={{ x: isFlipped ? '2rem' : 0 }}
                            transition={{ duration: 0.6 }}>
                </motion.div>
            </div>
        </div>
    )
};

export default CardFlip;