import React from "react";
import { bangers } from "@/utils/fonts";
import Link from "next/link";

const HeaderTop = () => {
    return <Link href="/">
    <div className="border-b border-gray-200">
      <div className="bg-mainGreen">
        <div className="container mx-auto py-5 text-center">
            <h1 className={`${bangers} text-lightCream`} style={{fontSize: "50px", textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
                TRUTH OR DARE
            </h1>
        </div>
      </div> 
    </div>
    </Link>
};

export default HeaderTop;