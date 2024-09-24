"use client";
import React, { useContext, useEffect, useState } from "react";
import AllEvent from "./allEvents";
import AddEvent from "../modals/addEvent";
import AuthContext from "@/contextAPI/authContext";
import api from "@/util/api";

const Events = () => {
  const { auth } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [locations, setLocations] = useState([]);
  const [sports, setSports] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("allCities");
  const [selectedSport, setSelectedSport] = useState("allSports");
  const [selectedDate, setSelectedDate] = useState("recent");

  useEffect(() => {
    // Fetch locations and sports dynamically
    const fetchLocations = async () => {
      try {
        const res = await api.get("/api/locations"); 
        setLocations(res.data);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    const fetchSports = async () => {
      try {
        const res = await api.get("/api/sports"); 
        setSports(res.data);
      } catch (error) {
        console.error("Error fetching sports:", error);
      }
    };

    fetchLocations();
    fetchSports();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <section className="py-10 relative bg-gray-100 min-h-[calc(100vh-66px)]">
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center max-lg:gap-4 justify-between ">
          <ul className="flex flex-row justify-center gap-4 sm:gap-12 sm:flex-row sm:justify-center sm:space-x-4 md:w-full ">
            <li className="flex items-center cursor-pointer outline-none group w-full">
              <div className="relative w-full max-w-sm">
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="h-12 border border-gray-300 text-gray-900 pl-11 text-base font-normal leading-7 rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 focus-within:bg-gray-50"
                >
                  <option value="allCities">All cities</option>
                  {locations.map((location) => (
                    <option key={location.id} value={location.id}>
                      {location.city}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute top-1/2 -translate-y-1/2 right-4 z-50"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609"
                    stroke="#111827"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </li>
            <li className="flex items-center cursor-pointer outline-none group w-full">
              <div className="relative w-full max-w-sm">
                <select
                  value={selectedSport}
                  onChange={(e) => setSelectedSport(e.target.value)}
                  className="h-12 border border-gray-300 text-gray-900 pl-11 text-base font-normal leading-7 rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 focus-within:bg-gray-50"
                >
                  <option value="allSports">All sports</option>
                  {sports.map((sport) => (
                    <option key={sport.id} value={sport.id}>
                      {sport.title}
                    </option>
                  ))}
                </select>
                <svg
                  className="absolute top-1/2 -translate-y-1/2 right-4 z-50"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609"
                    stroke="#111827"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </li>
            <li className="flex items-center cursor-pointer outline-none group w-full">
              <div className="relative w-full max-w-sm">
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="h-12 border border-gray-300 text-gray-900 pl-11 text-base font-normal leading-7 rounded-full block w-full py-2.5 px-4 appearance-none relative focus:outline-none bg-white transition-all duration-500 hover:border-gray-400 hover:bg-gray-50 focus-within:bg-gray-50"
                >
                  <option value="recent">Most recent</option>
                  <option value="old">Most old</option>
                  <option value="today">Today</option>
                  <option value="threeDays">3 days</option>
                  <option value="oneWeek">Week ago</option>
                  <option value="oneMonth">Month ago</option>
                </select>
                <svg
                  className="absolute top-1/2 -translate-y-1/2 right-4 z-50"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0002 5.99845L8.00008 9.99862L3.99756 5.99609"
                    stroke="#111827"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </li>
          </ul>
        </div>
        <div className="mt-10">
          {auth ? (
            <>
              For new announce click here :{" "}
              <button
                onClick={handleOpenModal}
                className="bg-green-600 text-white hover:bg-green-700 w-fit p-1.5 pt-1 pb-1 rounded-md "
              >
                Add announce
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
        <svg
          className="mt-3 w-full"
          xmlns="http://www.w3.org/2000/svg"
          width={1216}
          height={2}
          viewBox="0 0 1216 2"
          fill="none"
        >
          <path d="M0 1H1216" stroke="#E5E7EB" />
        </svg>
      </div>
      <AllEvent
      locationId={selectedLocation}
      sportId={selectedSport}
      date={selectedDate}

       />
      {isModalOpen && <AddEvent onClose={handleCloseModal} />}
    </section>
  );
};

export default Events;
