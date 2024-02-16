import React, { useRef, useState } from 'react'
import './Img_gentrator.css'
import default_Img from './default_image.svg'
const Img_gentrator = () => {
     
     const[img_url,setImg_url]= useState('/');
     let inputRef = useRef(null);
     const[loading,setloading] = useState(false)

     const imageGentrator = async ()=>{
      if(inputRef.current.value === ''){
        return 0;
      }
      setloading(true)
      const response = await fetch(
        'https://api.openai.com/v1/images/generations',
        {
          method:'post',
          headers:{
            'Content-Type':'application/json',
            Authorization:
            'Bearer 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',
            'User-Agent':'Chrome'
          },
          body:JSON.stringify({
              prompt:`${inputRef.current.value}`,
              n:1,
              size:'256x256',
          }),
        }
      );
      let data = await response.json();
      let data_array = data.data;
      setImg_url(data_array[0].url)
      setloading(false)
     }

  return (
    <div className='main-container'>
      <div className='header'>AI Image <span>gentrator</span></div>
      <div className="image-contanier"><img src={img_url==='/'?default_Img:img_url}/></div>
      <div className="loading-container">
        <div className={loading?'loading-bar-full':'loading-bar'}></div>
        <div className={loading?'loading-text':'display-none'}>Loading....</div>
      </div>
      <div className="search-box">
        <input type="text" className='search-input' ref={inputRef} placeholder='Describe What You Want To See' />
        <div className="generate-btn" onClick={()=>{imageGentrator()}}>Generate</div>
      </div>
    </div>
  )
}

export default Img_gentrator
