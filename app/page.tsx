"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { fetchCars } from "../utils";
import { HomeProps, CarProps } from "../types";
import { fuels, yearsOfProduction } from "../constants";
import { CarCard, SearchBar, CustomFilter, Hero } from "../components";
import ShowMore from "@/components/ShowMore";


export default function Home({ searchParams }: HomeProps) {
  const [allCars, setAllCars] = useState<CarProps[]>([]);
  const [loading, setLoading] = useState(true);

  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  const [fuel, setFuel] = useState("");
  const [year, setYear] = useState("");

  const [limit, setLimit] = useState(10);

  const getCars = async () =>{

  }

  useEffect(() =>{
    getCars();

  }, [fuel, year,limit, manufacturer, model]

)

  

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const cars = await fetchCars({
        manufacturer: searchParams.manufacturer || "",
        year: searchParams.year || 2022,
        fuel: searchParams.fuel || "",
        limit: searchParams.limit || 10,
        model: searchParams.model || "",
      });
      setAllCars(cars);
      setLoading(false);
    };

    fetchData();
  }, [searchParams]);

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;


  
  return (
    <main className='overflow-hidden'>
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl font-extrabold'>Car Catalogue</h1>
          <p>Explore our cars you might like</p>
        </div>

        <div className='home__filters'>
          <SearchBar setManufacturer={setManufacturer}
          setModel={setModel}
          
          />

          <div className='home__filter-container'>
            <CustomFilter title='fuel' options={fuels} 
            setFilter= {setFuel}/>
            <CustomFilter title='year' options={yearsOfProduction} 
            setFilter = {setYear}/>
          </div>
        </div>

        {loading ? (
          <div className="mt-16 w-full flex-center">
            <Image
              src="/loader.svg"
              alt="loader"
              width={50}
              height={50}
              className="object-contain"
            />
          </div>
        ) : !isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
  {
  allCars.map((car) => (
  <CarCard
    key={`${car.make}-${car.model}-${car.year}`}
    car={car}
  />
))
    
}
</div>

            <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
              setLimit={setLimit}
            />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            <p>No cars found</p>
          </div>
        )}
      </div>
    </main>
  );
}
