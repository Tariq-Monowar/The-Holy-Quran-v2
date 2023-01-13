import React, { useCallback, useEffect, useState } from 'react'
import useFetch from './useFetch'

import { FaSearch } from 'react-icons/fa';
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";

import Header from './Header'
import Artical from './Artical'
import Lodding from './Lodding';
import { langugeName } from './LanguageName';
import { TabTitle } from './TabTitle';




const Home = () => {

    TabTitle("Holy Quran")
    //initial language is bangla 
    const[selectLangusge,setSelectLanguage] = useState(
        localStorage.getItem('selectLanguage') || 'bn'
      );


    //fetch data with useFetch custom hook. This link is from npm
    const{
      data,
      isLodding,
      error,
      filterDatra,
      setFilterData
    } = useFetch(`https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran_${selectLangusge}.json`)
    

    //storage this data in your browser localStorage
    useEffect(() => {
      localStorage.setItem('selectLanguage', selectLangusge);
    }, [selectLangusge]);

    
    //language change Function. it's change language with select & option tag.
    const ifSelected = (e)=>{
      setSelectLanguage(e.target.value);
    }


    //Search function. hear using filter function for searching data.
    const ifChanged = (e)=>{
      let value = (e.target.value).toLowerCase().replace(/[0-9-. ]/g, "")

      const FilterSura = data.filter(sura=>{ 
        var suraName = sura.transliteration.toLowerCase().replace(/[-' ]/g, "");
        return suraName.startsWith(value) 
      })
      setFilterData(FilterSura)
    }


    //navbar scroll function------------------
    const [nabVar, setnabVar] = useState(false)

    const ChangeBackground = ()=>{
      if(window.scrollY >= 90){
        setnabVar(true)
      }else{
        setnabVar(false)
      }
    }

    window.addEventListener('scroll',ChangeBackground)
    


    //dark mode and light mode. theme change function
    const [theme, setTheme] = useState(localStorage.getItem('selectThim') || 'light-thime');
    const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  
    const toggleTheme =() =>{
      setIsDarkModeEnabled(prevIsDarkModeEnabled => !prevIsDarkModeEnabled);
      setTheme(prevTheme => prevTheme === 'light-thime' ? 'dark-thime' : 'light-thime');
      console.log("first")
    };

    useEffect(() => {
      localStorage.setItem('selectThim',theme);
    }, [isDarkModeEnabled]);
  
    useEffect(() => {
      document.body.className = theme;
    }, [theme]);

    

    return (
    <main>
   {/*---------------------------- Nvigation elements -----------------------*/}

      <nav className={nabVar?"scrollNavber":"navigation-Bar"}>
        <div className='nav-element'>
          <span className='page-logo'>
            Holy Quran
          </span>         
        </div>


        {/* dark mode and light mode. theme change element */}
        <div className='nav-element'>
          <div onClick={toggleTheme} className='lightmoode'>
            {
              isDarkModeEnabled?
              <MdLightMode />:
              <MdDarkMode />
            } 
          </div> 

          {/*-------------------  Language Select elements  ----------------*/}
          <select className='element' onChange={ifSelected}>
          <option value="" disabled selected hidden>Language</option>
            {
              langugeName.map((language)=>{    
               return  <option key={language.value} className='languageName' value={language.value} >
                  {language.name}
                </option>
              })
            }
          </select>


        </div>
      </nav>
    

 {/*-----------------Header Section ---------------------*/}
     <header className='header-section'>
       <Header />

       {/*----------search bar elements------------------ */}
       <div className='searchBar'>
       <input 
          className='searchBar' 
          type='text' name='search' 
          placeholder='search surah name.....' 
          onChange={ifChanged} 
        />
       <FaSearch className='icon' /> 
       </div>
     </header>


    {/*----------- all sura name block elements---------------*/}
    <section className='suraBlogs'>

      {/*------------------Error Handling Section----------------- */}
      {error && <p>Please check your internet speed. @reload again</p>}


      {/*--------------------- data Mapping elements ----------------------*/}
      {
        filterDatra && filterDatra.map(ayat=>{
          return  <Artical AllAyat={ayat} />
          })
      }
      <br />
      <br />
    </section>

      {/*------------------data Lodding Section----------------- */}
      {isLodding && <Lodding /> }
      {isLodding && <Lodding /> }

  </main>
  )
}

export default Home
