import React from 'react'

const Result = () => {
  return (
    <div className='pt-10 pb-10'>

    <header className="text-center mx-auto mb-12 lg:px-20">
    <h2 className="text-2xl leading-normal mb-2 font-bold text-black">
      Our results
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
    We made a big impact on sports.
            </p>
  </header>
    <section className=" bg-white">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
     
      <div className="flex flex-col gap-5 xl:gap-8 lg:flex-row lg:justify-between">
        <div className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white p-6 rounded-2xl shadow-md shadow-yellow-600">
          <div className="flex gap-5">
            <div className="font-manrope text-2xl font-bold text-yellow-600">
              99.99%
            </div>
            <div className="flex-1">
              <h4 className="text-xl text-gray-900 font-semibold mb-2">
                Satisfaction
              </h4>
              <p className="text-xs text-gray-500 leading-5">
                Company's remarkable growth journey as we continually innovate and
                drive towards new heights of success.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white p-6 rounded-2xl shadow-md shadow-yellow-600">
          <div className="flex gap-5">
            <div className="font-manrope text-2xl font-bold text-yellow-600">
              10+
            </div>
            <div className="flex-1">
              <h4 className="text-xl text-gray-900 font-semibold mb-2">
                Many sports
              </h4>
              <p className="text-xs text-gray-500 leading-5">
                Our very talented team members are the powerhouse of pagedone and
                pillars of our success.{" "}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full max-lg:max-w-2xl mx-auto lg:mx-0 lg:w-1/3 bg-white p-6 rounded-2xl shadow-md shadow-yellow-600">
          <div className="flex gap-5">
            <div className="font-manrope text-2xl font-bold text-yellow-600">
              10k+
            </div>
            <div className="flex-1">
              <h4 className="text-xl text-gray-900 font-semibold mb-2">
                Users active
              </h4>
              <p className="text-xs text-gray-500 leading-5">
                We have accomplished more than 625 projects worldwide and we are
                still counting many more.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
  )
}

export default Result