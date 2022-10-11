import { useEffect } from "react"
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/scrolltrigger';
import { CSSPlugin } from "gsap"
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(CSSPlugin)
import Head from "next/head";

export default function Home({el, q, scrollIsLoaded}) {
  useEffect(() => {
    if(scrollIsLoaded) {
      const tl = gsap.timeline()
      tl.fromTo(q('#gr1'), {attr:{offset: 0.7}}, {attr:{offset: 0.367}, duration: 3, ease: "power4"})
      tl.set("#scrollBlock", {display: "none", background: "red"}, ">-0.2")
      tl.set(q('#gr'), {attr:{y1:0.5, y2:0.5,x1:1,x2:0}})
      tl.from(q('#scroll'), {y: "+=4vh", opacity: 0, duration: 1.2}, "<1.8")
      
      const sc = gsap.timeline({scrollTrigger: {scrub:true, pin:q('#intro'), end: 20000,}});
      sc.set(q("#gr1"), {attr:{offset:0}})
      sc.from(q('#Sviatoslav'), {letterSpacing: "45vw", x:"7.5%", ease: "power4"} )
      sc.to(q("#intro"), {background: "linear-gradient(to right, #222222 0%, #FEE3EC 0%)"}, "<")
      sc.to(q("#gr1"), {attr:{offset: 1}}, "<")
      sc.to(q("#surname"), {x: "-100vw", duration: 1.5,ease:"none"})
      sc.set(q("#scroll"), {display: "none"}, "<")
      sc.to(q("#intro"), {background: "linear-gradient(to left, #222222 200%, #FEE3EC 200%)", ease:"none", duration: 1.5}, "<0.75")
      sc.set(q("#Sviatoslav"), {display: "none"}, ">")
      sc.set(q(".name"), {display: "block"}, ">")
      sc.to(q(".name"), { strokeDasharray: "0% 100%", strokeDashoffset: "50%", duration:2}, ">-1.2")
      sc.to(q("#dev"), { strokeDasharray: "100% 0%", strokeDashoffset: "50%", duration:2}, ">-1")
      sc.set(q(".dev"), { display: "block"}, "<")
      ScrollTrigger.refresh()
    }
  }, [scrollIsLoaded])
  
  return (
    <>
      <Head>
        <title>Sviatoslav M. | Interactive Developer</title>
      </Head>
      <div id="intro" className="font-regular min-h-[100vh] bg-shark-500 bg-gr flex justify-center items-center">
        <svg className="h-[100vh] w-[100vw] flex justify-center items-center" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask">
            <text id="Sviatoslav" className="text-[16vw] font-regular" fill="white" stroke="#FEE3EC">
              <tspan x="4%" y="63%" className="">Sviatoslav</tspan>
            </text>
          </mask>
          <rect width="100%" height="100%" fill="url(#gr)" mask="url(#mask)" ></rect>
          <text id="Sviatoslav" strokeDasharray="100% 0%" strokeDashoffset="0%" className="name text-[16vw]" fill="none"  stroke="#FEE3EC">
              <tspan x="4%" y="63%" className="">Sviatoslav</tspan>
          </text>
          <text id="dev" strokeDasharray="0% 100%" className=" text-[14vw]" fill="none"  stroke="#FEE3EC">
              <tspan x="6%" y="40%" className="dev hidden">Interactive</tspan>
              <tspan x="6%" y="70%" className="dev text-[15vw] hidden">Developer</tspan>
          </text>
          
          <defs>
            <linearGradient id="gr" x1="0.5" y1="0" x2="0.5" y2="1">
              <stop id="gr1" offset="0" stopColor="#222222"/>
              <stop  offset="0" stopColor="#FEE3EC"/>
            </linearGradient>
          </defs>
        </svg>
        <p id="surname" className="absolute text-[16vw] text-carousel-pink-500 translate-x-[100vw] translate-y-[2.5vh]">Monakhov</p>
        <p id="scroll" className="text-carousel-pink-500 text-[2vw] absolute translate-y-[40vh]">scroll</p>
      </div>
      

    </>
  )
}
