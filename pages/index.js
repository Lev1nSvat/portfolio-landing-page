import { useEffect } from "react"
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/dist/scrolltrigger';
gsap.registerPlugin(ScrollTrigger)

export default function Home({el, q, scrollIsLoaded}) {
  useEffect(() => {
    if(scrollIsLoaded) {
      
    }
  }, [scrollIsLoaded])
  
  return (
    <>
      
    </>
  )
}
