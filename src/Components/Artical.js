import React from 'react'
import { Link } from 'react-router-dom'


const Artical = (props) => {
            const{
            id,
            name,
            transliteration,
            translation,
            total_verses,
            verses
            } = props.AllAyat
  return (
      <Link to={transliteration}  key={id} 
                state={{ 
                      id,
                      name,
                      transliteration, 
                      translation,
                      total_verses, 
                      verses
                      }} 
                 className = 'CardLink'>  
                
               <articl className="blogs">
                 <div className="inner-blogs-left">
                   <div className="ayat-number">
                     <p>{id}</p>
                   </div>
                   <div className="sura-name">
                    <p>{transliteration}</p>
                    <p className='sura-translation-name'>{translation}</p>
                   </div>
                 </div>
                   <div className="ayat-arabic-name">
                   <p>{ name }</p>
                   <p className='total-ayat-number'>ayah {total_verses}</p>
                 </div> 
               </articl>
             </Link>    
  )
}

export default Artical
