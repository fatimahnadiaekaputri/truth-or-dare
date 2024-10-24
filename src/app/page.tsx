"use client"
import { carter_one } from "@/utils/fonts";
import CardFlip from "@/components/others/CardFlip";
import Button from "@/components/button/Button";
import Link from "next/link";

export default function Home() {
  return (
    // <RootLayout>
    <div className="flex flex-col md:flex-row min-h-screen">
        <div className="w-full md:w-1/2 flex justify-center items-center md:pt-0 pt-20"> 
            <CardFlip /> 
        </div>
        <div className="w-full md:w-1/2 text-center flex flex-col justify-center items-center md:justify-center md:items-center pt-10 px-10 mb:10">
            <h2 className={`${carter_one} text-mainGreen`} style={{fontSize: "25px"}}>
                Dare to Reveal the Truth!
            </h2>
            <h3 className="pt-10">
            "Gather your squad of 2 to 10 players and get ready to reveal the truth or take on daring challenges! It’s time to create unforgettable moments with your friends!"
            </h3>
            <div style={{paddingTop: "120px", paddingLeft:"175px", marginBottom:"200px"}}>
                {/* <Button buttonText="Let's Try!" onClick={() => navigate('/page2')}/> */}
                {/* <Link to="page2"> */}
                <Link href="/fill-your-name">
                <Button buttonText="Let's Try!"/>
                </Link>
                    
                {/* </Link> */}
            </div>
        </div>
    </div>
    // </RootLayout>
    );
}

