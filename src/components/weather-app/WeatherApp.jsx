import React, { useEffect, useState } from 'react'
import './weatherApp.css'
import searchIcon from './assets/search.png'
import clearIcon from './assets/clear.png'
import cloudIcon from './assets/cloud.png'
import drizzleIcon from './assets/drizzle.png'
import humidityIcon from './assets/humidityIcon.png'
import rainIcon from './assets/rain.png'
import snowIcon from './assets/snow.png'
import windIcon from './assets/wind.png'
import humidityImage from './assets/humidity.png'

const apiKey = 'a81d2355b0bd63c2d1ee822394a2eade'
const WeatherApp = () => {
    const [text, setText] = useState("chennai")
    const [icon, setIcon] = useState()
    const [temp, setTemp] = useState(0)
    const [city, setCity] = useState()
    const [country, setCountry] = useState()
    const [long, setLong] = useState(0)
    const [lat, setLat] = useState(0)
    const [humidity, setHumidity] = useState(0)
    const [wind, setWind] = useState(0)
    const [cityNotFound, setcityNotFound] = useState(false)
    const [loading, setLoading] = useState(false)

    const weatherIconMap = {
        '01d': clearIcon,
        '01n': clearIcon,
        '02d': cloudIcon,
        '02n': cloudIcon,
        '03d': drizzleIcon,
        '03n': drizzleIcon,
        '04d': drizzleIcon,
        '04n': drizzleIcon,
        '09d': rainIcon,
        '09n': rainIcon,
        '10d': rainIcon,
        '10n': rainIcon,
        '13d': snowIcon,
        '13n': snowIcon
    }
    const search = async () => {
        setLoading(true)
        setcityNotFound(false)
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apiKey}&units=Metric`)
            const data = await response.json()
            console.log(data)
            if (data.cod === "404") {
                console.error(data.message)
                setcityNotFound(true)
                setLoading(false)
                //setText("")
                return
            }
            setTemp(Math.floor(data.main.temp))
            setCity(data.name)
            setCountry(data.sys.country)
            setHumidity(data.main.humidity)
            setLat(data.coord.lat)
            setLong(data.coord.lon)
            setWind(data.wind.speed)
            setIcon(weatherIconMap[data.weather[0].icon] || clearIcon)
            setText("")
            setcityNotFound(false)
        }
        catch (err) {
            console.log(err)
        }
        finally{
            setLoading(false)
        }
    }

    const enterKey = (e) => {
        if (e.key === "Enter") {
            search()
        }
    }

    useEffect(()=>{
        search()
    },[])

    return (
        <div className='container'>
            <div className='input-container'>
                <input placeholder='Search' className='search-input' value={text} onChange={(e) => setText(e.target.value)} onKeyDown={enterKey}></input>
                <div className='img-container'>
                    <img src={searchIcon} className='search-icon' onClick={search}></img>
                </div>
            </div>
            <div>
                <div className='weather-image-container'><img src={icon} className='weather-icon'></img></div>
                <div className='temp'>{temp}°C</div>
                <div className='city'>{city}</div>
                <div className='country'>{country}</div>
            </div>
            <div className='cord'>
                <div>
                    <span className='long'>longtitude</span>
                    <span >{long}</span>
                </div>
                <div>
                    <span className='lat'>lattitude</span>
                    <span >{lat}</span>
                </div>
            </div>
            <div className='data-container'>
                <div>
                    <img src={humidityImage} className='data-icon' />
                    <div className='humidity'>{humidity}%</div>
                    <div>humidity</div>
                </div>
                <div>
                    <img src={windIcon} className='data-icon' />
                    <div className='wind'>{wind} km/h</div>
                    <div>wind</div>
                </div>
            </div>
            {cityNotFound&&<p className='cnf'>City Not Found</p>}
            {loading&&<p className='loading'>Loading...</p>}
        </div>
    )
}

export default WeatherApp