import FeaturedBooks from "@/components/Featured";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import './globals.css'
export default function Home() {
  return (
    <>
      <Header/>
      <Hero/>
      <FeaturedBooks/>
      <Footer/>
    </>
  );
}
