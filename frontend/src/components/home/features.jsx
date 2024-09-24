import React from 'react'

const Features = () => {
  return (
<>
  <div
    id="services"
    className="section relative pt-10  md:pt-16 md:pb-0 bg-white"
  >
    <div className="container xl:max-w-6xl mx-auto px-4">
      {/* Heading start */}
      <header className="text-center mx-auto mb-12 lg:px-20">
        <h2 className="text-2xl leading-normal mb-2 font-bold text-black">
          Core Features
        </h2>
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 100 60"
          style={{ margin: "0 auto", height: 35 }}
          xmlSpace="preserve"
        >
          <circle
            cx="50.1"
            cy="30.4"
            r={5}
            className="stroke-primary"
            style={{
              fill: "transparent",
              strokeWidth: 2,
              strokeMiterlimit: 10
            }}
          />
          <line
            x1="55.1"
            y1="30.4"
            x2={100}
            y2="30.4"
            className="stroke-primary"
            style={{ strokeWidth: 2, strokeMiterlimit: 10 }}
          />
          <line
            x1="45.1"
            y1="30.4"
            x2={0}
            y2="30.4"
            className="stroke-primary"
            style={{ strokeWidth: 2, strokeMiterlimit: 10 }}
          />
        </svg>
        <p className="text-black leading-relaxed font-light text-xl mx-auto pb-2">
        Connect with a Global Network, Join Events, and Expand Your Sports Circle
                </p>
      </header>
      {/* End heading */}
      {/* row */}
      <div className="flex flex-wrap flex-row -mx-4 text-center">
        <div
          className="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp"
          data-wow-duration="1s"
        >
          {/* service block */}
          <div className="py-8 px-12 mb-12 bg-gray-50 border-b-4 border-yellow-500 transform transition duration-300 ease-in-out hover:-translate-y-2">
            <div className="inline-block text-black mb-4">
              {/* icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                fill="currentColor"
                className="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
            <h3 className="text-lg leading-normal mb-2 font-semibold text-black">
            FIND PLAYERS 
            </h3>
            <p className="text-black">
           We’ll show you all the players who are looking to join a game at the time you play.
            </p>
          </div>{" "}
          {/* end service block */}
        </div>
        <div
          className="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay=".1s"
        >
          {/* service block */}
          <div className="py-8 px-12 mb-12 bg-gray-50 border-b-4 border-yellow-500 transform transition duration-300 ease-in-out hover:-translate-y-2">
            <div className="inline-block text-black mb-4">
              {/* icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="2rem"
                height="2rem"
                fill="currentColor"
                className="bi bi-chat-square-dots"
                viewBox="0 0 16 16"
              >
                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
              </svg>
            </div>
            <h3 className="text-lg leading-normal mb-2 font-semibold text-black">
            FIND GAMES/EVENTS
            </h3>
            <p className="text-black">
            Easily search local games looking for players across a multitude of sports.
            </p>
          </div>
          {/* end service block */}
        </div>
        <div
          className="flex-shrink px-4 max-w-full w-full sm:w-1/2 lg:w-1/3 lg:px-6 wow fadeInUp"
          data-wow-duration="1s"
          data-wow-delay=".3s"
        >
          {/* service block */}
          <div className="py-8 px-12 mb-12 bg-gray-50 border-b-4 border-yellow-500 transform transition duration-300 ease-in-out hover:-translate-y-2">
            <div className="inline-block text-black mb-4">
              {/* icon */} 

              <svg
  xmlns="http://www.w3.org/2000/svg"
  width="2rem"
  height="2rem"
  fill="currentColor"
  className="bi bi-globe"
  viewBox="0 0 16 16"
>
  <path d="M8 1a7 7 0 0 1 7 7 7 7 0 0 1-7 7A7 7 0 0 1 1 8 7 7 0 0 1 8 1zm0 1A6 6 0 0 0 2 8a6 6 0 0 0 6 6 6 6 0 0 0 6-6A6 6 0 0 0 8 2zm0 1a5 5 0 0 1 5 5 5 5 0 0 1-5 5A5 5 0 0 1 3 8a5 5 0 0 1 5-5zm0 1A4 4 0 0 0 4 8a4 4 0 0 0 4 4 4 4 0 0 0 4-4A4 4 0 0 0 8 4z"/>
</svg>

            </div>
            <h3 className="text-lg leading-normal mb-2 font-semibold text-black">
            BUILD YOUR NETWORK
            </h3>
            <p className="text-black">
            We'll connect you directly to your friends & other local, available sports people.
            </p>
          </div>
          {/* end service block */}
        </div>
       
      </div>
      {/* end row */}
    </div>
  </div>
  {/* End Service */}
</>

)
}

export default Features