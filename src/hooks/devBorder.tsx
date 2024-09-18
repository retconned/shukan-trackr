import { useEffect } from "react";

export function useDevBorders() {
  useEffect(() => {
    function getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    document.querySelectorAll("div").forEach((div) => {
      div.style.border = `2px solid ${getRandomColor()}`;
    });
  }, []);
}
