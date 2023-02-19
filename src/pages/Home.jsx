import React, { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'

import { meteoAPI } from '../services/MeteoAPI';
import { timestampTohoursMinutes } from '../services/datesFormat';


const StyledSearchForm = styled.form`
    display: flex;
    flex-direction: column;
    margin: 2em auto;
    `;

const StyledSubmitButton = styled.input`
all: unset;
background-color: var(--main-blue); 
color: #808080;
text-align: center;
margin: 0.7rem 0;
padding: 0.5rem;
transition: all ease-in-out 150ms;
cursor: pointer;
&:hover {
    background-color: var(--dark-blue);
    color: #000;
}
`;

const StyledTextInput = styled.input`
all: unset;
border-bottom: 2px solid var(--dark-blue);
color: #000;
`;

const StyledWeatherContainer = styled.div`
margin: 3rem auto;
border: solid var(--main-grey) 2px;
padding: 1rem;
border-radius: 15px;
`;

const StyledPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;


function Home() {
    const [coord, setCoord] = useState({});
    const [search, setSearch] = useState(localStorage.getItem('city') || 'Paris');
    const [data, setData] = useState(null);

    const getCoord = () => {
        meteoAPI.get(`/geo/1.0/direct?q=${search}&appid=${import.meta.env.VITE_METEO_KEY}`)
          .then((res) => {
            if (res.data.length) {
                localStorage.setItem('city', res.data[0].name);
                setCoord(res.data[0]);

              const { lat, lon } = res.data[0];

              meteoAPI.get(`/data/2.5/weather?lat=${lat}&lon=${lon}&lang=FR&units=metric&appid=${import.meta.env.VITE_METEO_KEY}`)
                .then((res) => setData(res.data))
                .catch((err) => console.error(err));
            } else {
              setCoord(null);
            }
          })
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        getCoord();
    }, []);
  
    const handleTextInput = (e) => {
      setSearch(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        search.length > 1
            ? getCoord(search)
            : alert("Veuillez saisir un nom de ville");
    };
  
    return (
        <StyledPageContainer>
      <div>
      <StyledSearchForm onSubmit={handleSubmit}>
        <StyledTextInput onChange={handleTextInput} type="text" name="city" id="city" value={search}/>
        <StyledSubmitButton type="submit" value="Rechercher"/>
      </StyledSearchForm>
      {coord ? (
      <StyledWeatherContainer>
      <p>Ville : {coord.local_names?.fr ?? coord.names}</p>
      {data && (
        <>
          <p>Température : {data.weather[0].description}</p>
            <img src={`http://api.openweathermap.org/img/w/${data.weather[0].icon}.png`}
             alt={data.weather[0].description} 
             />
        <p>Levé du soleil : {timestampTohoursMinutes(data.sys.sunrise)}</p>
        <p>Couché du soleil : {timestampTohoursMinutes(data.sys.sunset)}</p>
        </>
)}
      </StyledWeatherContainer>
      ) : (
      <p>Nous ne trouvons aucune ville de ce nom.</p>
      )}
      </div>
      </StyledPageContainer>
    );
}

export default Home