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
      let distance;
      const STYLES = `
body #magicMouseCursor {
  position: fixed;
  width: 35px;
  height: 35px;
  border: 2px solid #FEE3EC;
  mix-blend-mode: difference;
  border-radius: 50%;
  z-index: 9999;
  left: 0;
  top: 0;
  transition: transform 0.07s, width 0.3s, height 0.3s;
  pointer-events: none; }
  body #magicMouseCursor.is-hover{
    border-radius: 20px; }

body #magicPointer {
  mix-blend-mode: difference;
  height: 10px;
  width: 10px;
  top: 0;
  left: 0;
  position: fixed;
  background: #FEE3EC;
  border-radius: 50%;
  pointer-events: none;
  transition: background 0.2s, width 0.2s, height 0.2s, box-shadow 0.2s; }
  body #magicPointer.pointer-blur {
    height: 50px;
    width: 50px;
    background: none;
    border: 1px solid #fff;
    box-shadow: 0px 0px 15px -5px white; }
  body #magicPointer.pointer-overlay {
    height: 80px;
    width: 80px;
    mix-blend-mode: difference;
    box-shadow: 0px 0px 15px -5px white;
   }

body .magic-hover {
  transition: all 0.2s; }
  body .magic-hover:hover {
    cursor: none; }
`

 const magicMouse = (options) => {
  const addStyles = () => {    
    let magicmouseStyle = document.createElement('style')
    magicmouseStyle.type = 'text/css'
    magicmouseStyle.innerText = STYLES
    document.head.appendChild(magicmouseStyle)
  }

  // I believe we don't want this cursor on tablet/mobile
  if (!Modernizr.touchevents){
    options = options || {};
    options.outerWidth = options.outerWidth || 30;
    options.outerHeight = options.outerHeight || 30;
    options.cursorOuter = options.cursorOuter || "circle-basic";
    options.hoverEffect = options.hoverEffect || "circle-move";
    options.hoverItemMove = options.hoverItemMove || false;
    options.defaultCursor = options.defaultCursor || false;

    // Add cursor DOM to body :
    if ("disable" != options.cursorOuter) {
      var newCursorDOM = document.createElement("div");
      newCursorDOM.setAttribute("id", "magicMouseCursor");
      newCursorDOM.setAttribute("class", "invisible");
      document.body.appendChild(newCursorDOM);
      

      // Select the cursor DOM which has been added to body before:
      var cursorDOM = document.getElementById("magicMouseCursor");

      addStyles()
    }

    // Check if user wanna use our custom cursor or not
    // If yes, create DOM for it
    if (!options.defaultCursor) {
      document.body.style.cursor = "none";
      var newPointerDOM = document.createElement("div");
      newPointerDOM.setAttribute("id", "magicPointer");
      document.body.appendChild(newPointerDOM);
      var pointerDOM = document.getElementById("magicPointer");
    }

    if (cursorDOM) {
      cursorDOM.style.width = options.outerWidth + "px";
      cursorDOM.style.height = options.outerHeight + "px";
      var cursorOuterWidth = options.outerWidth,
        cursorOuterHeight = options.outerHeight,
        originalCursorWidth = options.outerWidth,
        originalCursorHeight = options.outerHeight;
    }

    //Update position of cursor when move:
    var outerX = 0,
      outerY = 0,
      pointerX = 0,
      pointerY = 0,
      stopFlag = false,
      itemHoverX = 0,
      itemHoverY = 0;
    document.addEventListener("mousemove", function(event) {
      pointerX = event.clientX;
      pointerY = event.clientY;
      setTimeout(() => {
        if (!stopFlag) {
          cursorDOM.style.visibility = "visible";
          outerX = event.clientX - cursorOuterWidth / 2;
          outerY = event.clientY - cursorOuterHeight / 2;
        }
      }, 50);
    });
    //Hover effects :
    var hoverEls = document.querySelectorAll(".magic-hover");
    hoverEls.forEach((item, i) => {
      
    let hoverScrub;
    let hoverScrub2;
    item.addEventListener("mouseenter", event => {
        switch (options.hoverEffect) {
          case "circle-move":
            circleMove_mouseEnterHover(item);
            hoverScrub = gsap.to("#magicMouseCursor",  {top:"-100vh", scrollTrigger:{scrub:true, start:()=>{locoScroll.on("scroll", (obj)=> {obj.scroll.y})},end:()=>{return ("+" + window.innerHeight)}},ease:"none"})
            hoverScrub2 = gsap.from("#magicMouseCursor",  {top:"+100vh", scrollTrigger:{scrub:true, start:()=>{return(locoScroll.on("scroll", (obj)=> {(obj.scroll.y)}) + " bottom")},end:()=>{return ("+" + window.innerHeight + " bottom")}},ease:"none"})            
            //Move the item hover on:
            if (options.hoverItemMove) {
              hoverItemMove(event, item);
            }
            break;
          case "pointer-blur":
            pointerClass_mouseEnterHover(item, "pointer-blur");
            break;
          case "pointer-overlay":
            pointerClass_mouseEnterHover(item, "pointer-overlay");
            break;
        }
      });

      item.addEventListener("mouseleave", event => {
        item.style.transform = "translate3d(0,0,0)";
        switch (options.hoverEffect) {
          case "circle-move":
            circleMove_mouseLeaveHover();
            hoverScrub.restart()
            hoverScrub2.totalProgress(1)
            hoverScrub.kill()
            hoverScrub2.kill()
            setTimeout(() => {
              if (!stopFlag) {
                outerX = event.clientX - cursorOuterWidth / 2;
                outerY = event.clientY - cursorOuterHeight / 2;
              }
            }, 50);
            break;
          case "pointer-blur":
            pointerClass_mouseLeaveHover("pointer-blur");
            break;
          case "pointer-overlay":
            pointerClass_mouseLeaveHover("pointer-overlay");
            break;
        }
      });
    });

    // sometime we just don't want to use magicmouse on some specific elements:
    const noCursorEls = document.querySelectorAll(".no-cursor");
    noCursorEls.forEach((item, i) => {
      item.addEventListener("mouseenter", event => {
        cursorDOM.style.opacity = 0
        pointerDOM.style.opacity = 0
        document.body.style.cursor = "auto";
      });

      item.addEventListener("mouseleave", event => {
        cursorDOM.style.opacity = 1
        pointerDOM.style.opacity = 1
        document.body.style.cursor = "none";
      });
    });


    //Move the cursorDOM:
    var movement = () => {
      if (cursorDOM) {
        cursorDOM.style.transform =
          "matrix(1, 0, 0, 1, " + outerX + ", " + outerY + ")";
        cursorDOM.style.width = cursorOuterWidth + "px";
        cursorDOM.style.height = cursorOuterHeight + "px";
      }

      //Move the custom pointer :
      if (pointerDOM) {
        pointerDOM.style.transform =
          "matrix(1, 0, 0, 1, " +
          pointerX +
          ", " +
          pointerY +
          ") translate3d(-50%, -50%, 0)";
      }
      requestAnimationFrame(movement);
    };
    requestAnimationFrame(movement);

    const circleMove_mouseEnterHover = item => {
      stopFlag = true;
      if (cursorDOM) {
        cursorDOM.style.transition =
          "transform 0.2s, width 0.3s, height 0.3s, border-radius 0.2s";
        cursorDOM.classList.add("is-hover");
        var elementPos = event.currentTarget.getBoundingClientRect();
        if (false) {
          cursorDOM.classList.add("cursor-square");
          outerX = elementPos.left;
          outerY = elementPos.top;
          cursorOuterWidth = elementPos.width;
          cursorOuterHeight = elementPos.height;
        } else {
          outerX = elementPos.left;
          outerY = elementPos.top;
          cursorOuterWidth = elementPos.width;
          cursorOuterHeight = elementPos.height;
        }
      }

      if (pointerDOM) {
        pointerDOM.classList.add("is-hover");
      }
    };

    const circleMove_mouseLeaveHover = () => {
      stopFlag = false;
      if (cursorDOM) {
        cursorOuterWidth = originalCursorWidth;
        cursorOuterHeight = originalCursorHeight;
        cursorDOM.style.transition =
          "transform 0.07s,top 0.6s, width 0.3s, height 0.3s, border-radius 0.2s";
        cursorDOM.classList.remove("cursor-square");
        cursorDOM.classList.remove("is-hover");
      }

      if (pointerDOM) {
        pointerDOM.classList.remove("is-hover");
      }
    };

    const pointerClass_mouseEnterHover = (item, className) => {
      if (pointerDOM) {
        pointerDOM.classList.add(className);
      }
    };

    const pointerClass_mouseLeaveHover = className => {
      if (pointerDOM) {
        pointerDOM.classList.remove(className);
      }
    };

    const hoverItemMove = (event, item) => {
      itemHoverX = event.clientX;
      itemHoverY = event.clientY;
      item.addEventListener("mousemove", mouseEvent => {
        item.style.transform =
          "matrix(1,0,0,1," +
          (mouseEvent.offsetX - mouseEvent.target.offsetWidth / 2) / 2 +
          ", " +
          (mouseEvent.offsetY - mouseEvent.target.offsetHeight / 2) / 2 +
          ")";
      });
    };
  }

}


/*! modernizr 3.6.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-touchevents-setclasses !*/
!function(e,n,t){function o(e,n){return typeof e===n}function s(){var e,n,t,s,a,i,r;for(var l in c)if(c.hasOwnProperty(l)){if(e=[],n=c[l],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(t=0;t<n.options.aliases.length;t++)e.push(n.options.aliases[t].toLowerCase());for(s=o(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],r=i.split("."),1===r.length?Modernizr[r[0]]=s:(!Modernizr[r[0]]||Modernizr[r[0]]instanceof Boolean||(Modernizr[r[0]]=new Boolean(Modernizr[r[0]])),Modernizr[r[0]][r[1]]=s),f.push((s?"":"no-")+r.join("-"))}}function a(e){var n=p.className,t=Modernizr._config.classPrefix||"";if(h&&(n=n.baseVal),Modernizr._config.enableJSClass){var o=new RegExp("(^|\\s)"+t+"no-js(\\s|$)");n=n.replace(o,"$1"+t+"js$2")}Modernizr._config.enableClasses&&(n+=" "+t+e.join(" "+t),h?p.className.baseVal=n:p.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):h?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,arguments)}function r(){var e=n.body;return e||(e=i(h?"svg":"body"),e.fake=!0),e}function l(e,t,o,s){var a,l,f,c,d="modernizr",u=i("div"),h=r();if(parseInt(o,10))for(;o--;)f=i("div"),f.id=s?s[o]:d+(o+1),u.appendChild(f);return a=i("style"),a.type="text/css",a.id="s"+d,(h.fake?h:u).appendChild(a),h.appendChild(u),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(n.createTextNode(e)),u.id=d,h.fake&&(h.style.background="",h.style.overflow="hidden",c=p.style.overflow,p.style.overflow="hidden",p.appendChild(h)),l=t(u,e),h.fake?(h.parentNode.removeChild(h),p.style.overflow=c,p.offsetHeight):u.parentNode.removeChild(u),!!l}var f=[],c=[],d={_version:"3.6.0",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var t=this;setTimeout(function(){n(t[e])},0)},addTest:function(e,n,t){c.push({name:e,fn:n,options:t})},addAsyncTest:function(e){c.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=d,Modernizr=new Modernizr;var u=d._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];d._prefixes=u;var p=n.documentElement,h="svg"===p.nodeName.toLowerCase(),m=d.testStyles=l;Modernizr.addTest("touchevents",function(){var t;if("ontouchstart"in e||e.DocumentTouch&&n instanceof DocumentTouch)t=!0;else{var o=["@media (",u.join("touch-enabled),("),"heartz",")","{#modernizr{top:9px;position:absolute}}"].join("");m(o,function(e){t=9===e.offsetTop})}return t}),s(),a(f),delete d.addTest,delete d.addAsyncTest;for(var v=0;v<Modernizr._q.length;v++)Modernizr._q[v]();e.Modernizr=Modernizr}(window,document);

magicMouse({
  "cursorOuter": "circle-basic",
  "hoverEffect": "circle-move",
  "hoverItemMove": false,
  "defaultCursor": false,
  "outerWidth": 80,
  "outerHeight": 80
})

      const loading = gsap.timeline()
      loading.fromTo(q('#gr1'), {attr:{offset: "0.63"}}, {attr:{offset: 0.63 - window.innerWidth * 0.113 / window.innerHeight }, duration: 2.5, ease:"power1"})
      loading.set(q('#gr'), {attr:{y1:0.5, y2:0.5,x1:1,x2:0}})
      loading.set(q("#gr1"), {attr:{offset:0}})
      loading.set("#scrollBlock", {display: "none", background: "red"})
      loading.from(q('#scroll'), {y: "+=4vh", opacity: 0,ease:"power1"})
      
      const intro = gsap.timeline({scrollTrigger: {scrub:true, pin:q('#intro'), end: 4000,}});
      intro.set(q("#gr1"), {attr:{offset:0}})
      intro.from(q('#Sviatoslav'), {letterSpacing: "47vw", x:"8%", ease: "power4"} )
      intro.to(q("#intro"), {background: "linear-gradient(to right, #222222 0%, #FEE3EC 0%)"}, "<")
      intro.to(q("#gr1"), {attr:{offset: 1}}, "<")
      intro.set(q('#surname'), {visibility:'visible'})
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
      main.to(q('#image'), {y:"+=270vh", ease:"none"})

      const main2 = gsap.timeline({scrollTrigger: {scrub:true, start:"top bottom", end:"bottom bottom", trigger:q('#main2'), pin:q('#about')}})
      main2.from(q('#about'), {top: "-=50%", ease:"none"})

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
        distance = scroll.current.current - scroll.current.cache;
        scroll.current.cache = scroll.current.current;
        gsap.from(".skewElem", {skewY: distance*0.3,duration:0.1})
        
      });
      gsap.set("body", {backgroundColor:"#222222"})
      gsap.to(q("#Sviatoslav"), {opacity:1, duration:0.1},"<")
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
          <mask  id="mask">
            <text id="Sviatoslav" className="opacity-0 text-[16vw] translate-y-[63vh] translate-x-[10vw] font-regular h-[16vw] w-[100vw]" fill="white"  stroke="#FEE3EC">
              <tspan className="">Sviatoslav</tspan>
            </text>
          </mask>
          <rect width="100%" height="100%" className="" fill="url(#gr)" mask="url(#mask)"></rect>  
          <text id="Sviatoslav" strokeDasharray="100% 0%" strokeDashoffset="0%" className="opacity-0 translate-y-[63vh] translate-x-[10vw] name text-[16vw]" fill="none"  stroke="#FEE3EC">
              <tspan className="">Sviatoslav</tspan>
          </text>
          <text id="surname" className="fill-carousel-pink-500 invisible translate-y-[63vh] translate-x-[10vw] name text-[16vw]" fill="none" stroke="#FEE3EC">
              <tspan className="">Monakhov</tspan>
          </text>
          <text id="dev" strokeDasharray="0% 100%" className=" text-[16vw]" fill="none"  stroke="#FEE3EC">
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
        <p id="scroll" className="text-carousel-pink-500 text-[2vw] absolute translate-y-[40vh]">scroll</p>
      </div>
      <div id="main" className="bg-carousel-pink-500 font-regular -z-10 relative min-h-[250vh] flex justify-between items-center">
        <div className="skewElem z-20 absolute pl-32 mt-6 lg:mt-16 text-[12vw] lg:text-[6vw]">
          
          <p className="my-32 lg:my-56  h-[17vw] lg:[8vw] projects text-gr w-fit">
            <Link href={"/"}>
              <a className="magic-hover">Project1</a>
            </Link>
          </p>
          <p className="my-32 lg:my-56 h-[17vw] lg:[8vw] projects text-gr w-fit ">
            <Link href={"/"}><a className="magic-hover">Project1</a></Link>
          </p>
          <p className="my-32 lg:my-56 h-[17vw] lg:[8vw] projects text-gr w-fit ">
            <Link href={"/"}><a className="magic-hover">Project1</a></Link>
          </p>
        </div>
        <div className="skewElemSlow opacity-20 pl-32 mt-6 lg:mt-16 text-[12vw] absolute lg:relative lg:text-[6vw]">
          
          <p className="my-32 lg:my-56  h-[17vw] lg:[8vw] projects text-gr w-fit">
            <Link href={"/"}>
              <a className="">Project1</a>
            </Link>
          </p>
          <p className="my-32 lg:my-56 h-[17vw] lg:[8vw] projects text-gr w-fit ">
            <Link href={"/"}><a className="">Project1</a></Link>
          </p>
          <p className="my-32 lg:my-56 h-[17vw] lg:[8vw] projects text-gr w-fit ">
            <Link href={"/"}><a className="">Project1</a></Link>
          </p>
        </div>
        <div id="image" className="self-start -translate-y-[30vh] lg:-translate-y-[70vh] lg:my-[10%] lg:mx-[10%] w-full lg:w-[80%]">
          <Image 
            src={ram}  
          />
        </div>
      </div>
      <div id="main2" className="relative z-30 bg-shark-500 overflow-hidden">
        <p id="about" className="text-[80vw] lg:text-[33vw] origin-top-left translate-y-[110%] -translate-x-[14%] -rotate-90 w-fit absolute opacity-20 lg:opacity-100  font-regular text-carousel-pink-500">About</p>
        <div className="w-[90vw] lg:w-[75vw]  lg:ml-[30vw] text-2xl lg:text-5xl py-[30vh] skewElem px-[10vw] text-carousel-pink-500">
          <p className="reveal py-8" >Hi, I'm Sviatoslav Monakhov, Interactive UI/UX developer.</p>
          <p className="reveal py-8" >I'm currently offerring my expertise to agencies and creative teams.</p>
          <p className="reveal py-8" >My love for challenge, makes me seek it in my work every day. Achieving today what wasn't possible for me yestarday is my passion. I hope I will find a team which will provide great oportunity to do so.</p>
          <p className="reveal py-8" >I'm a developer with taste for design, polished animation and big typography :)</p>
          <p className="reveal pt-56" >Feel free to say hello:</p>
          <p className="reveal pb-4 magic-hover" ><a href="mailto:sviatoslavmonakhov@gmail.com">sviatoslavmonakhov@gmail.com</a></p>
          <p className="reveal h-3  bg-carousel-pink-500" ></p>
          <p id="id11" className="reveal pt-6 flex justify-end" ><a href="https://github.com/Lev1nSvat">  
            <svg className="magic-hover fill-carousel-pink-500 h-16 w-16" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 32 32" width="32px" height="32px" ><path d="M 16 4 C 9.371094 4 4 9.371094 4 16 C 4 21.300781 7.4375 25.800781 12.207031 27.386719 C 12.808594 27.496094 13.027344 27.128906 13.027344 26.808594 C 13.027344 26.523438 13.015625 25.769531 13.011719 24.769531 C 9.671875 25.492188 8.96875 23.160156 8.96875 23.160156 C 8.421875 21.773438 7.636719 21.402344 7.636719 21.402344 C 6.546875 20.660156 7.71875 20.675781 7.71875 20.675781 C 8.921875 20.761719 9.554688 21.910156 9.554688 21.910156 C 10.625 23.746094 12.363281 23.214844 13.046875 22.910156 C 13.15625 22.132813 13.46875 21.605469 13.808594 21.304688 C 11.144531 21.003906 8.34375 19.972656 8.34375 15.375 C 8.34375 14.0625 8.8125 12.992188 9.578125 12.152344 C 9.457031 11.851563 9.042969 10.628906 9.695313 8.976563 C 9.695313 8.976563 10.703125 8.65625 12.996094 10.207031 C 13.953125 9.941406 14.980469 9.808594 16 9.804688 C 17.019531 9.808594 18.046875 9.941406 19.003906 10.207031 C 21.296875 8.65625 22.300781 8.976563 22.300781 8.976563 C 22.957031 10.628906 22.546875 11.851563 22.421875 12.152344 C 23.191406 12.992188 23.652344 14.0625 23.652344 15.375 C 23.652344 19.984375 20.847656 20.996094 18.175781 21.296875 C 18.605469 21.664063 18.988281 22.398438 18.988281 23.515625 C 18.988281 25.121094 18.976563 26.414063 18.976563 26.808594 C 18.976563 27.128906 19.191406 27.503906 19.800781 27.386719 C 24.566406 25.796875 28 21.300781 28 16 C 28 9.371094 22.628906 4 16 4 Z"/></svg>
          </a></p>
        </div>
      </div>
      

    </>
  )
}
