import { useEffect } from "react"
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/dist/scrolltrigger';
gsap.registerPlugin(ScrollTrigger)
import Head from "next/head";

export default function Home({el, q, scrollIsLoaded}) {
  useEffect(() => {
    if(scrollIsLoaded) {
      
    }
  }, [scrollIsLoaded])
  
  return (
    <>
      <Head>
        <title>Sviatoslav M. | Interactive Developer</title>
      </Head>
      
    </>
  )
}
