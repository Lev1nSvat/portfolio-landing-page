import { useEffect, useRef } from "react"
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/scrolltrigger';
import { CSSPlugin } from "gsap"
gsap.registerPlugin(ScrollTrigger)
gsap.registerPlugin(CSSPlugin)
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import ram from '/./public/ram.jpg';

export default function Home({el, q, scrollIsLoaded, locoScroll}) {
  const scroll = useRef({
    cache: 0,
    current: 0,
  });
  useEffect(() => {
    if(scrollIsLoaded) {
      const loading = gsap.timeline()
      loading.fromTo(q('#gr1'), {attr:{offset: 0.7}}, {attr:{offset: 0.367}, duration: 3, ease: "power4"})
      loading.set("#scrollBlock", {display: "none", background: "red"}, ">-0.2")
      loading.set(q('#gr'), {attr:{y1:0.5, y2:0.5,x1:1,x2:0}})
      loading.from(q('#scroll'), {y: "+=4vh", opacity: 0, duration: 1.2}, "<1.8")
      
      const intro = gsap.timeline({scrollTrigger: {scrub:true, pin:q('#intro'), end: 4000,}});
      intro.set(q("#gr1"), {attr:{offset:0}})
      intro.from(q('#Sviatoslav'), {letterSpacing: "47vw", x:"7.5%", ease: "power4"} )
      intro.to(q("#intro"), {background: "linear-gradient(to right, #222222 0%, #FEE3EC 0%)"}, "<")
      intro.to(q("#gr1"), {attr:{offset: 1}}, "<")
      intro.fromTo(q("#surname"), {x: "100vw"}, {x: "-100vw", duration: 1.5,ease:"none"})
      intro.set(q("#scroll"), {display: "none"}, "<")
      intro.to(q("#intro"), {background: "linear-gradient(to left, #222222 200%, #FEE3EC 200%)", ease:"none", duration: 1.5}, "<0.75")
      intro.set(q("#Sviatoslav"), {display: "none"}, ">")
      intro.set(q(".name"), {display: "block"}, ">")
      intro.to(q(".name"), { strokeDasharray: "0% 100%", strokeDashoffset: "50%", duration:2}, ">-1.2")
      intro.to(q("#dev"), { strokeDasharray: "100% 0%", strokeDashoffset: "50%", duration:2}, ">-1")
      intro.set(q(".dev"), { display: "block"}, "<")
      
      const paralax = gsap.timeline({scrollTrigger: {scrub: true, start: "top bottom", end: "bottom top", trigger: q('#main')}});
      paralax.to(q('#dev'), {y: "+=1100", ease: "none"})
      
      const main = gsap.timeline({scrollTrigger: {scrub:true, start:"top bottom", end:"bottom top", trigger:q('#main')}})
      main.to(q('#image'), {y:"+=250vh", ease:"none"})

      const main2 = gsap.timeline({scrollTrigger: {scrub:true, start:"top bottom", end:"bottom bottom", trigger:q('#main2')}})
      main2.to(q('#about'), {y: "+=102vw",ease:"none"})

      gsap.to(q('#link1'), {backgroundImage: "linear-gradient(to right, #222222 0%, #FEE3EC 0%)"})
      gsap.utils.toArray(q('.projects')).forEach(a => {
        let hover = gsap.to(a, {backgroundImage: "linear-gradient(to right, #222222 100%, #FEE3EC 100%)", paused: true, ease: "power2"});
        a.addEventListener("mouseenter", () => hover.play());
        a.addEventListener("mouseleave", () => hover.reverse());
      });
      gsap.utils.toArray(q('.skewElem')).forEach(el => {
        gsap.set(el, {transformOrigin: "left center"})
      })  
      gsap.utils.toArray(q('.reveal')).forEach(el => {
        let reveal = gsap.from(el, {y: "+=400", scrollTrigger:{start:"-=400 bottom",end:"0", trigger:el, toggleActions:"play none none reset"}, duration:1.2})
      })  
      locoScroll.on("scroll", (obj) => {
        scroll.current.current = obj.scroll.y;
        let distance = scroll.current.current - scroll.current.cache;
        scroll.current.cache = scroll.current.current;
        gsap.utils.toArray(q('.skewElem')).forEach(el => {
          gsap.to(el, {skewY: distance*0.3})
        })      
      });
      gsap.set("body", {backgroundColor:"#222222"})
      ScrollTrigger.refresh()    
    }
  }, [scrollIsLoaded])
  
  return (
    <>
      <Head>
        <title>Sviatoslav M. | Interactive Developer</title>
      </Head>
      <div id="intro" className=" font-regular min-h-[100vh] bg-shark-500 bg-gr flex justify-center items-center">
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
        <p id="surname" className="absolute text-[16vw] text-carousel-pink-500 ">Monakhov</p>
        <p id="scroll" className="text-carousel-pink-500 text-[2vw] absolute translate-y-[40vh]">scroll</p>
      </div>
      <div id="main" className="bg-carousel-pink-500 font-regular -z-10 relative min-h-[250vh] flex justify-between items-center">
        <div className="skewElem z-20 absolute pl-32 mt-16 text-8xl">
          
          <p className=" my-56  h-32 projects text-gr w-fit">
            <Link href={"/"}>
              <a className="">Project1</a>
            </Link>
          </p>
          <p className=" my-56 h-32 projects text-gr w-fit ">
            <Link href={"/"}><a className="">Project1</a></Link>
          </p>
          <p className=" my-56 h-32 projects text-gr w-fit ">
            <Link href={"/"}><a className="">Project1</a></Link>
          </p>
        </div>
        <div className="skewElemSlow opacity-20 pl-32 mt-16 text-8xl">
          
          <p className=" my-56  h-32 projects text-gr w-fit">
            <Link href={"/"}>
              <a className="">Project1</a>
            </Link>
          </p>
          <p className=" my-56 h-32 projects text-gr w-fit ">
            <Link href={"/"}><a className="">Project1</a></Link>
          </p>
          <p className=" my-56 h-32 projects text-gr w-fit ">
            <Link href={"/"}><a className="">Project1</a></Link>
          </p>
        </div>
        <div id="image" className="self-start -translate-y-[50vh] my-[10%] mx-[10%] w-[80%]">
          <Image 
            src={ram}  
          />
        </div>
      </div>
      <div id="main2" className="relative z-30 h-[150vh] bg-shark-500 overflow-hidden">
        <p id="about" className="text-[30vw] origin-top-left -rotate-90 w-fit absolute   font-regular text-carousel-pink-500">About</p>
        <div className="w-[75vw] ml-[30vw] text-5xl py-[30vh] skewElem px-[10vw] text-carousel-pink-500">
          <p className="reveal py-12" >Hi, I'm Sviatoslav Monakhov, Interactive UI/UX developer.</p>
          <p className="reveal py-12" >I'm currently offerring my expertise to agencies and creative teams.</p>
          <p className="reveal py-12" >My love for challenge, makes me seek it in my work every day. Achieving today what wasn't possible for me yestarday is my passion. I hope I will find a team which will provide great oportunity to do so.</p>
        </div>
      </div>
      

    </>
  )
}
