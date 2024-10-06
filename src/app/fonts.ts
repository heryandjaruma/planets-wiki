import localFont from "next/font/local";

const tapioca = localFont({
  src: "./fonts/tapioca.ttf",
  variable: "--font-tapioca",
  weight: "500",
});

const tapiocaShadow = localFont({
  src: "./fonts/tapioca_shadow.ttf",
  variable: "--font-tapioca-shadow",
  weight: "500",
});

const paytone = localFont({
  src: "./fonts/paytone.ttf",
  variable: "--font-paytone",
  weight: "500",
})

const pjs = localFont({
  src: "./fonts/pjs.ttf",
  variable: "--font-paytone",
  weight: "500",
})

export { tapioca, tapiocaShadow, paytone, pjs }