import React from 'react'

const Sports = () => {
  return (
<>
  {/* Portfolio Content */}
  <div id="portfolio" className="section relative z-0 pt-10 md:py-10 bg-white">
    <div className="container xl:max-w-6xl mx-auto px-4">
      {/* Heading start */}
      <header className="text-center mx-auto mb-12 lg:px-20">
        <h2 className="text-2xl leading-normal mb-2 font-bold text-black">
          Sports
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
        In our application, you will find any sport you want.
                </p>
      </header>
      {/* End heading */}
    </div>
    <div className="flex flex-wrap flex-row">
      <figure
        className="flex-shrink max-w-full px-3 w-full sm:w-1/2 lg:w-1/5 group wow fadeInUp"
        data-wow-duration="1s"
      >
        <div className="relative overflow-hidden cursor-pointer mb-6">
          <a
            href="src/img/dummy/img1.jpg"
            data-gallery="gallery1"
            data-glightbox="title: My title; description: This is a wider card with supporting text below as a natural lead-in to additional content"
            className="glightbox3"
          >
            <img
              className="block w-full h-auto transform duration-500  hover:scale-125"
              src="tennis.webp"
              alt="Image Description"
            />
            <div className="absolute inset-x-0 bottom-0 h-20 transition-opacity duration-500 ease-in opacity-0 group-hover:opacity-100 overflow-hidden px-4 py-2 text-gray-100 bg-black text-center">
              <h3 className="text-base leading-normal font-semibold my-1 text-white">
                Tennis
              </h3>
              <small className="d-block">Racket sport</small>
            </div>
          </a>
        </div>
      </figure>
      <figure
        className="flex-shrink max-w-full px-3 w-full sm:w-1/2 lg:w-1/5 group wow fadeInUp"
        data-wow-duration="1s"
        data-wow-delay=".1s"
      >
        <div className="relative overflow-hidden cursor-pointer mb-6">
          <a
            href="src/img/dummy/img2.jpg"
            data-gallery="gallery1"
            data-glightbox="title: My title; description: This is a wider card with supporting text below as a natural lead-in to additional content"
            className="glightbox3"
          >
            <img
              className="block w-full h-auto transform duration-500  hover:scale-125"
              src="basketabll.jpg"
              alt="Image Description"
            />
            <div className="absolute inset-x-0 bottom-0 h-20 transition-opacity duration-500 ease-in opacity-0 group-hover:opacity-100 overflow-hidden px-4 py-2 text-gray-100 bg-black text-center">
              <h3 className="text-base leading-normal font-semibold my-1 text-white">
                Basketball
              </h3>
              <small className="d-block">Team sport</small>
            </div>
          </a>
        </div>
      </figure>
      <figure
        className="flex-shrink max-w-full px-3 w-full sm:w-1/2 lg:w-1/5 group wow fadeInUp"
        data-wow-duration="1s"
        data-wow-delay=".3s"
      >
        <div className="relative overflow-hidden cursor-pointer mb-6">
          <a
            href="src/img/dummy/img3.jpg"
            data-gallery="gallery1"
            data-glightbox="title: My title; description: This is a wider card with supporting text below as a natural lead-in to additional content"
            className="glightbox3"
          >
            <img
              className="block w-full h-auto transform duration-500  hover:scale-125"
              src="rugby.jpg"
              alt="Image Description"
            />
            <div className="absolute inset-x-0 bottom-0 h-20 transition-opacity duration-500 ease-in opacity-0 group-hover:opacity-100 overflow-hidden px-4 py-2 text-gray-100 bg-black text-center">
              <h3 className="text-base leading-normal font-semibold my-1 text-white">
                Rugby
              </h3>
              <small className="d-block">Team sport</small>
            </div>
          </a>
        </div>
      </figure>
      <figure
        className="flex-shrink max-w-full px-3 w-full sm:w-1/2 lg:w-1/5 group wow fadeInUp"
        data-wow-duration="1s"
        data-wow-delay=".5s"
      >
        <div className="relative overflow-hidden cursor-pointer mb-6">
          <a
            href="src/img/dummy/img4.jpg"
            data-gallery="gallery1"
            data-glightbox="title: My title; description:  This is a wider card with supporting text below as a natural lead-in to additional content"
            className="glightbox3"
          >
            <img
              className="block w-full h-auto transform duration-500 hover:scale-125"
              src="football.jpg"
              alt="Image Description"
            />
            <div className="absolute inset-x-0 bottom-0 h-20 transition-opacity duration-500 ease-in opacity-0 group-hover:opacity-100 overflow-hidden px-4 py-2 text-gray-100 bg-black text-center">
              <h3 className="text-base leading-normal font-semibold my-1 text-white">
                Football
              </h3>
              <small className="d-block">Team sport</small>
            </div>
          </a>
        </div>
      </figure>
      <figure
        className="flex-shrink max-w-full px-3 w-full sm:w-1/2 lg:w-1/5 group wow fadeInUp"
        data-wow-duration="1s"
      >
        <div className="relative overflow-hidden cursor-pointer mb-6">
          <a
            href="src/img/dummy/img6.jpg"
            data-gallery="gallery1"
            data-glightbox="title: Graphic Design; description: This is a wider card with supporting text below as a natural lead-in to additional content"
            className="glightbox3"
          >
            <img
              className="block w-full h-auto transform duration-500  hover:scale-125"
              src="judo.jpg"
              alt="Image Description"
            />
            <div className="absolute inset-x-0 bottom-0 h-20 transition-opacity duration-500 ease-in opacity-0 group-hover:opacity-100 overflow-hidden px-4 py-2 text-gray-100 bg-black text-center">
              <h3 className="text-base leading-normal font-semibold my-1 text-white">
                Judo
              </h3>
              <small className="d-block">Sport combat</small>
            </div>
          </a>
        </div>
      </figure>
      
      <figure
        className="flex-shrink max-w-full px-3 w-full sm:w-1/2 lg:w-1/5 group wow fadeInUp"
        data-wow-duration="1s"
        data-wow-delay=".7s"
      >
        <div className="relative overflow-hidden cursor-pointer mb-6">
          <a
            href="src/img/dummy/img5.jpg"
            data-gallery="gallery1"
            data-glightbox="title: My title; description:  This is a wider card with supporting text below as a natural lead-in to additional content"
            className="glightbox3"
          >
            <img
              className="block w-full h-auto transform duration-500  hover:scale-125"
              src="boxing.jpg"
              alt="Image Description"
            />
            <div className="absolute inset-x-0 bottom-0 h-20 transition-opacity duration-500 ease-in opacity-0 group-hover:opacity-100 overflow-hidden px-4 py-2 text-gray-100 bg-black text-center">
              <h3 className="text-base leading-normal font-semibold my-1 text-white">
                Boxing
              </h3>
              <small className="d-block">Combat sport</small>
            </div>
          </a>
        </div>
      </figure>
     
      <figure
        className="flex-shrink max-w-full px-3 w-full sm:w-1/2 lg:w-1/5 group wow fadeInUp"
        data-wow-duration="1s"
        data-wow-delay=".1s"
      >
        <div className="relative overflow-hidden cursor-pointer mb-6">
          <a
            href="src/img/dummy/img7.jpg"
            data-gallery="gallery1"
            data-glightbox="title: Logo Design; description: This is a wider card with supporting text below as a natural lead-in to additional content"
            className="glightbox3"
          >
            <img
              className="block w-full h-auto transform duration-500  hover:scale-125"
              src="bolly.jpg"
              alt="Image Description"
            />
            <div className="absolute inset-x-0 bottom-0 h-20 transition-opacity duration-500 ease-in opacity-0 group-hover:opacity-100 overflow-hidden px-4 py-2 text-gray-100 bg-black text-center">
              <h3 className="text-base leading-normal font-semibold my-1 text-white">
                Bowling
              </h3>
              <small className="d-block">Target sport</small>
            </div>
          </a>
        </div>
      </figure>
      <figure
        className="flex-shrink max-w-full px-3 w-full sm:w-1/2 lg:w-1/5 group wow fadeInUp"
        data-wow-duration="1s"
        data-wow-delay=".3s"
      >
        <div className="relative overflow-hidden cursor-pointer mb-6">
          <a
            href="src/img/dummy/img8.jpg"
            data-gallery="gallery1"
            data-glightbox="title: Web Development; description: This is a wider card with supporting text below as a natural lead-in to additional content"
            className="glightbox3"
          >
            <img
              className="block w-full h-auto transform duration-500  hover:scale-125"
              src="taekwondo.jpg"
              alt="Image Description"
            />
            <div className="absolute inset-x-0 bottom-0 h-20 transition-opacity duration-500 ease-in opacity-0 group-hover:opacity-100 overflow-hidden px-4 py-2 text-gray-100 bg-black text-center">
              <h3 className="text-base leading-normal font-semibold my-1 text-white">
                Taekwondo
              </h3>
              <small className="d-block">Sport combat</small>
            </div>
          </a>
        </div>
      </figure>
      <figure
        className="flex-shrink max-w-full px-3 w-full sm:w-1/2 lg:w-1/5 group wow fadeInUp"
        data-wow-duration="1s"
        data-wow-delay=".5s"
      >
        <div className="relative overflow-hidden cursor-pointer mb-6">
          <a
            href="src/img/dummy/img9.jpg"
            data-gallery="gallery1"
            data-glightbox="title: Graphic Design; description: This is a wider card with supporting text below as a natural lead-in to additional content"
            className="glightbox3"
          >
            <img
              className="block w-full h-auto transform duration-500  hover:scale-125"
              src="sprint.jpg"
              alt="Image Description"
            />
            <div className="absolute inset-x-0 bottom-0 h-20 transition-opacity duration-500 ease-in opacity-0 group-hover:opacity-100 overflow-hidden px-4 py-2 text-gray-100 bg-black text-center">
              <h3 className="text-base leading-normal font-semibold my-1 text-white">
                Sprint
              </h3>
              <small className="d-block">Footrace</small>
            </div>
          </a>
        </div>
      </figure>
      <figure
        className="flex-shrink max-w-full px-3 w-full sm:w-1/2 lg:w-1/5 group wow fadeInUp"
        data-wow-duration="1s"
        data-wow-delay=".7s"
      >
        <div className="relative overflow-hidden cursor-pointer mb-6">
          <a
            href="src/img/dummy/img10.jpg"
            data-gallery="gallery1"
            data-glightbox="title: App Design; description: This is a wider card with supporting text below as a natural lead-in to additional content"
            className="glightbox3"
          >
            <img
              className="block w-full h-auto transform duration-500 hover:scale-125"
              src="chess.jpeg"
              alt="Image Description"
            />
            <div className="absolute inset-x-0 bottom-0 h-20 transition-opacity duration-500 ease-in opacity-0 group-hover:opacity-100 overflow-hidden px-4 py-2 text-gray-100 bg-black text-center">
              <h3 className="text-base leading-normal font-semibold my-1 text-white">
                Chess
              </h3>
              <small className="d-block">Board game</small>
            </div>
          </a>
        </div>
      </figure>
    </div>
  </div>
</>
  )
}

export default Sports