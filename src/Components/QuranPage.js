import React, { useState } from 'react'
import { IoArrowUndoCircleSharp } from "react-icons/io5";



import { useLocation, useNavigate, Link  } from 'react-router-dom'

import './QuranPsge.css'
import { TabTitle } from './TabTitle';
const QuranPage = () => {

    TabTitle("Holy Quran")

    const location = useLocation()
    const navigation = useNavigate()

    const[ayatNumberData,setAyatNumberData] = useState(location.state.verses)
    const[FilterayatNumberData,setFilterAyatNumberData] = useState(ayatNumberData)


    //English to Arabic digits converter.
    function toEnglishDigits(str) {
      const persianNumbers = ["۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹", "۰"]
      const arabicNumbers = ["١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩", "٠"]
      const englishNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]
      return str.split("").map(c =>  persianNumbers[englishNumbers.indexOf(c)] ||
        arabicNumbers[englishNumbers.indexOf(c)] || c).join("")
     }

    //ayat change Function. it's search ayat with select & option tag.
    const ifChange=(e)=>{

      let value = (e.target.value)

      const FilterSura = ayatNumberData.filter(sura=>{
        var suraName = sura.id.toString()
        return suraName.startsWith(value)   
      })

      setFilterAyatNumberData(FilterSura)
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


  return (
    <main className='quranPageBody'>
    
    <nav className={nabVar?"scrollNavber":"navigation-Bar"}>

      {/*Re rendering Button for Go back Home page*/}
      <IoArrowUndoCircleSharp onClick={()=>navigation("/")} className='GotoHome' />
      

      {/*---------------- nav Hading elements ------------ */}
      <p className='nav-center-content'>بِسۡمِ ٱللَّهِ ٱلرَّحۡمَٰنِ ٱلرَّحِيمِ</p>

      <div className='suraIdentify'>
       <div className='nav-element select'>

        {/* --------Quran ayat searching elements------ */}
          <select className='select-elements' onChange={ifChange} >
             <option value="" disabled selected hidden>Search</option>
            {
              ayatNumberData.map(ayatNumber=>{
                const {id} = ayatNumber
                return <option key={id} value={id} className="option" > 
                      <Link>{id}</Link> 
                  </option>
              })
            }

          
          </select>

        </div>
      </div>

      </nav>

      {/* -------------sura name& page title element----------*/}
        <div className='suraNameBox'>
          <h1 className='SuraName'>  سورة {location.state.name}  </h1>                   
        </div>


      {/*-------------all Ayat blocks elements------------*/}
      <div className='pageContainer'> 
        {
         FilterayatNumberData.map(ayat=>{
            const{id,text,translation} = ayat
             return <article className='ayatBlog' key={id}>
              
              <p className='ayatArabic'> 
                {text}
                <span className='ArabicAyatNumbers'>{toEnglishDigits(` (${id})`)}</span>
              </p>
        
              <p className='ayatTranslation'>
                <span className='AyatNumberID'>({id}) </span>
                 {translation}
               </p>        
             </article> 
          })
        }
       </div>

    </main>
  )
}

export default QuranPage
