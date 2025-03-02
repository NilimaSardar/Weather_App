import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { IoSearch } from "react-icons/io5";
import { LuWaves } from "react-icons/lu";
import { FaWind } from "react-icons/fa";

function Weather() {

  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const [countryName, setCountryName] = useState("");


  const fetchCountryName = async (countryCode) => {
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/alpha/${countryCode}`);
      const data = response.data;
      if (data && data.length > 0) {
        setCountryName(data[0].name.common);
      } else {
        setCountryName(countryCode);
      }
    } catch (error) {
      console.error("Error fetching country name:", error);
      setCountryName(countryCode);
    }
  };
  

    const search = async(city)=>{
      if(city === ""){
        alert("Enter city name");
        return;
      }

        try{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await axios.get(url);
            const data = response.data;
            // console.log(response.data);
            
            setWeatherData({
              humidity: data.main.humidity,
              windSpeed: data.wind.speed,
              temperature: Math.floor(data.main.temp),
              location: data.name,
              weatherDescription: data.weather[0].description,
              icon: data.weather[0].icon,
              countrycode: data.sys.country
            });

            fetchCountryName(data.sys.country);
            
        }catch(error){
          setWeatherData(false);
          // alert("City not found. Please enter a valid city name.");
          console.error("error in fetching weather data",error);
          
        }
    }

    useEffect(()=>{
        search();
    },[])

  return (
    <WeatherComponent>
      <h1>Weather App</h1>
      <div className='main-div'>
        <div className='searchbar'>
          <input ref={inputRef} type="text" placeholder='Enter City Name'/>
          <div className='search-icon' onClick={()=>search(inputRef.current.value)}>
            <IoSearch/>
          </div>
        </div>

        {/* {weatherData?<></>:<></>} */}


        {weatherData?<>
        
          <div className='weather'>
            
            <img src={`https://openweathermap.org/img/wn/${weatherData.icon}@2x.png`} alt="" />
            <h2>{weatherData.temperature}°c</h2>
            <p>{weatherData.weatherDescription}</p>
            <p>{weatherData.location}</p>
            <div className='country'>
              <p>{countryName}</p>
              <img src={`https://flagsapi.com/${weatherData.countrycode}/flat/64.png`} alt="" />
            </div>
          </div>
          <div className='more'>
              <div className='sub-more'>
                <div className='icon'>
                  <LuWaves/>
                </div>
                <div className='description'>
                  <div className='temprature'>{weatherData.humidity}%</div>
                  <div className='title'>Humidity</div>
                </div>
              </div>
              <div className='sub-more'>
                <div className='icon'>
                  <FaWind/>
                </div>
                <div className='description'>
                  <div className='temprature'>{weatherData.windSpeed}km/h</div>
                  <div className='title'>Wind Speed</div>
                </div>
                
              </div>
          </div>
          
        
        </>:<></>}
        

        


      </div>
    </WeatherComponent>
  )
}

export default Weather

const WeatherComponent = styled.div`
    /* background-image: url("https://www.pinterest.com/pin/531354456055371709/"); */
    background-image: url('/public/backgroundImage.jpg');
    /* background-color: #b2d1fa; */
    background-size: cover;
    height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 20px;
    justify-content: center;
    align-items: center;

    h1{
      font-size: 40px;
      color: white;
      font-weight: 700;
    }

    .main-div{
      /* border: 2px solid #35383595; */
      background-color: #706f6aea;
      width: 350px;
      height: auto;
      padding: 30px 20px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 10px;
      border-radius: 30px;

    }
    .searchbar{
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
    }

    .searchbar input{
      /* background-color: #ecdbade5; */
      background-color: #e7e7e7;
      color: #302323;
      height: 40px;
      border: none;
      border-radius: 20px;
      border: 2px solid #5559555b;
      padding: 12px 16px;
      font-size: 16px;
      outline: none;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .searchbar input:focus{
      border: none;
      border-color: #484e48;
      box-shadow: 0 0 8px rgba(94, 95, 94, 0.5);
    }
    .searchbar input::-webkit-search-cancel-button {
      display: none;
    }
    .searchbar .search-icon{
      display: grid;
      place-items: center;
      height: 40px;
      width: 40px;
      /* background-color: #ecdbade5; */
      background-color: #e7e7e7;
      padding: 5px;
      font-size: 14px;
      border-radius: 50%;
      border: 2px solid #5559555b;
    }


    .weather{
      background-color: #fffdfde1;
      border-radius: 20px;
      width: 100%;
      height: 225px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #464545;
    }
    .weather .country{
      display:flex;
      justify-content: center;
      align-items: center;
      gap: 5px;
    }

    .weather .country img{
      height: 25px;
      width: 25px;
    }

    .more{
      width: 100%;
      /* background-color: #96a296; */
      display: flex;
      justify-content: space-between;
      color: #ffffff;
    }
    .sub-more{
      padding: 10px;
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 15px 20px;
    }
    .sub-more .icon{
      font-size: 22px;
    }
    .sub-more .description{
      font-size: 16px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
`;