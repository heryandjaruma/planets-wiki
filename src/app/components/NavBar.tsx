import { FloatingNav } from "./floating-navbar";
import { FaWpexplorer } from "react-icons/fa";

export default function FloatingNavBar() {
  const navItems = [
    {
      name: "Home",
      link: "/",
      // icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
      icon: <FaWpexplorer />
    },
    {
      name: "About",
      link: "/about",
      // icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
      icon: <FaWpexplorer />
    },
    {
      name: "Contact",
      link: "/contact",
      // icon: (
      //   <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      // ),
      icon: <FaWpexplorer />
    },
  ];
  
  return (
    <FloatingNav navItems={navItems} className="z-40 absolute top-0 left-0"/>
  )
}