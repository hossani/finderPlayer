"use client"

import { useContext, useEffect, useState } from "react";
import LinksNavNotConnected from "./linksNavNotConnected";
import LinksNavConnected from "./linksNavConnected";
import ButtonNavbar from "./buttonNavbar";
import NavProfile from "./navProfile";
import LinkMenuBurger from "./linkMenuBurger";
import NotificationAndMessage from "./notificationAndMessage";
import AuthContext from "@/contextAPI/authContext";

const Nav = () => {
  const { auth, logout,loadingAuth} = useContext(AuthContext); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black font-sans min-h-[60px] px-10 py-3 tracking-wide relative z-50">

      <div className="flex flex-wrap items-center max-lg:gap-y-6 max-sm:gap-x-4">
        <div className="text-white font-bold text-3xl">
          Pair<span className="text-yellow-500">Play</span>
        </div>

<div  className="lg:hidden ml-auto z-50 flex justify-between items-center gap-8">
  
{auth? <div className=' md:flex md:items-center lg:space-x-5  lg:hidden'>
            <NotificationAndMessage/>
          </div>:<></>}

        {/* Bouton pour ouvrir/fermer le menu */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden ml-auto z-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
          </svg>
        </button>


        </div>


        {/* Menu */}
        <div
          id="collapseMenu"
          className={`lg:flex lg:items-center lg:ml-auto ${isMenuOpen ? 'block' : 'hidden'} max-lg:fixed max-lg:bg-black max-lg:w-2/3 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:px-10 max-lg:py-4 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-40`}
        >
          <button
            id="toggleClose"
            onClick={() => setIsMenuOpen(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 fill-black"
              viewBox="0 0 320.591 320.591"
            >
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"
              />
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"
              />
            </svg>
          </button>

          <ul className="lg:flex lg:gap-x-10 lg:absolute lg:left-1/2 lg:-translate-x-1/2 max-lg:space-y-3 z-50">
       {loadingAuth?'':  auth?<>          <LinksNavNotConnected />   
            <LinksNavConnected /><LinkMenuBurger isMenuOpen={isMenuOpen} /> </>
:<>          <LinksNavNotConnected />   
</>}  
          </ul>
       
          {/* Boutons Sign In / Sign Up */}
          <div className={`max-lg:mt-4 lg:flex lg:items-center lg:space-x-5`}>
           {loadingAuth?'':
                       auth?<NavProfile isMenuOpen={isMenuOpen} logout={logout} auth={auth} 
                       /> : <ButtonNavbar  />

           }
       
          </div>
        </div>
      </div>
    </header>
  );
}

export default Nav;
