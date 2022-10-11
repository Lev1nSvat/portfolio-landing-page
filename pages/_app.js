import '../styles/globals.css'
import '../styles/locomotive-scroll.css'
import React, { useEffect, useRef, useState } from 'react';
import { useRouter} from 'next/router';
import Head from 'next/head';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/dist/scrolltrigger';
gsap.registerPlugin(ScrollTrigger)



function MyApp({ Component, pageProps }) {
  const el = useRef();
  const q = gsap.utils.selector(el);
  const router = useRouter()
  const [scrollIsLoaded, setScrollIsLoaded] = useState();
  useEffect(() => {

      let locoScroll;
      import("locomotive-scroll").then((locomotiveModule) => {
          locoScroll = new locomotiveModule.default({
            el: document.querySelector("[data-scroll-container]"),
            smooth: true,
            smoothMobile: false,
            resetNativeScroll: true
          });
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
          ScrollTrigger.defaults({ scroller: "[data-scroll-container]" });
          setScrollIsLoaded(true);
          gsap.set(el.current, {visibility: "inherit"})

      });
      const handleRouteChange = () => scroll.destroy();
      router.events.on('routeChangeStart', handleRouteChange)
      
  }, []);

  return (
    <>
      <Head>
        <title>Title</title>
        <link rel="icon" href="/favicon-32x32.png" />
        <link rel="icon" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <div className='invisible' ref={el} data-scroll-container>
        <Component {...pageProps} el={el} q={q} scrollIsLoaded={scrollIsLoaded} />
      </div>
    </>
  )
}

export default MyApp
