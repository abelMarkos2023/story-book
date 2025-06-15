// import FeaturedBooks from "@/components/Featured";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import './globals.css'
import Chapters from "@/components/Chapters";
export default function Home() {
  return (
    <>
      <Hero/>
      {/* <FeaturedBooks/> */}
      <Chapters />
      <Footer/>
    </>
  );
}
