"use client";

import { useEffect, useLayoutEffect, useState } from "react";


export function SetDisplayVars() {



   useLayoutEffect(() => {
      function updateVars() {
         const cssWidth = window.innerWidth;
         const cssHeight = window.innerHeight;
         const devicePixelRatio = window.devicePixelRatio;
         const displayVars = {
            '--pixel-width': cssWidth * devicePixelRatio,
            '--pixel-height': cssHeight * devicePixelRatio,
            '--device-pixel-ratio': devicePixelRatio,
         };
         const root = document.documentElement;
         for (const prop in displayVars) {
            root.style.setProperty(prop, `${displayVars[prop]}`);
         }
         const trigger = document.body.offsetHeight;
      }
      updateVars();
      window.addEventListener("resize", updateVars);
      window.matchMedia(`(resolution: ${window.devicePixelRatio}dppx)`).addEventListener("change", updateVars);
      return () => {
         window.removeEventListener("resize", updateVars);
      };
   }, []);


   return (<></>)
}