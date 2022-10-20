import '../styles/locomotive-scroll.css'
import React, { useEffect, useRef, useState } from 'react';
import { useRouter} from 'next/router';
import Head from 'next/head';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/dist/scrolltrigger';
import '../styles/globals.css'
gsap.registerPlugin(ScrollTrigger)



function MyApp({ Component, pageProps }) {
  const el = useRef();
  const q = gsap.utils.selector(el);
  const router = useRouter()
  const [scrollIsLoaded, setScrollIsLoaded] = useState();
  const [locoScroll, setLocoScroll] = useState()
  useEffect(() => {
        
      import("locomotive-scroll").then((locomotiveModule) => {
          const locoScroll = new locomotiveModule.default({
            el: document.querySelector("[data-scroll-container]"),
            smooth: true,
            smartphone:{
              smooth:true
            },
            tablet:{
              smooth:true
            }
          });
          setLocoScroll(locoScroll)
          locoScroll.on("scroll", ScrollTrigger.update);
          ScrollTrigger.scrollerProxy("[data-scroll-container]", {
            scrollTop(value) {
              return arguments.length ? locoScroll.scrollTo(value, {duration: 0, disableLerp: true}) : locoScroll.scroll.instance.scroll.y;
            }, 
            getBoundingClientRect() {
              return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
            },
            pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
          });
          ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
          window.addEventListener("resize", () => {locoScroll.scrollTo("top", {duration:0, disableLerp:true})})
          ScrollTrigger.defaults({ scroller: "[data-scroll-container]" });
          setScrollIsLoaded(true);
          gsap.set(el.current, {visibility: "inherit"})
      


      });
      const handleRouteChange = () => locoScroll.destroy();
      router.events.on('routeChangeStart', handleRouteChange)
      
  }, []);

  return (
    <>
      <div id='scrollBlock' className='w-full h-[100vw] absolute z-10'></div>
      <div className='invisible overflow-x-hidden' ref={el} data-scroll-container>
        <Component {...pageProps} el={el} q={q} scrollIsLoaded={scrollIsLoaded} locoScroll={locoScroll}/>
      </div>
    </>
  )
}

export default MyApp
