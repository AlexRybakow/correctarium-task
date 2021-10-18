import React, { useState, useEffect } from "react";
import "./App.css";
import Logo from "./assets/footer_logo.png";
import finalEstimate from "./script"
import moment from "moment"
import { ServiceType, LangType } from "./types/types"


const App: React.FC = () => {

  const services:ServiceType = {
    edit: 'Редактирование',
    translate: 'Перевод'
  }
  
  const languages:LangType = {
    ukr: 'Украинский',
    rus: 'Русский',
    eng: 'Английский',
    nativeEng: 'Английский(носитель)'
  }

 const format = 'docx';

 const [service, setService] = useState('')
 const [lang, setLang] = useState('')
 const [text, setText] = useState('')
 const [price, setPrice] = useState('0')
 const [deliveryTime, setDeliveryTime] = useState('')
 

const OptionChoice = (props:any) => {
  return <option value={props.name.propName} >
    {props.name.value}
    </option>
}

const getServices = Object.keys(services).map(propName => {
    let value = services[propName]
    return <OptionChoice name={{ value, propName }} />
  })


const getLanguages = Object.keys(languages).map(propName => {
    let value = languages[propName]
    return <OptionChoice name={{ value, propName }} />
  })



useEffect(() => {
if(text && lang){
  const resultedEstimate = finalEstimate(text.length, lang, format)
  const message = 'Будет готово:'
  setPrice(resultedEstimate[0]);
  setDeliveryTime(message + " " + moment(resultedEstimate[1]).format('lll'))
} else{
  setPrice('0')
  setDeliveryTime('')
}
},[text, lang])

const onChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
  setText(event.target.value)
}

const onServiceChange = (event: React.MouseEvent<HTMLSelectElement>) => {
  setService(event.currentTarget.value)
}

console.log(service)

const onLangChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  setLang(event.currentTarget.value)
}

 return (
    <div className="container">
      <div className="order-block">
        <div className="input-block">
        <h2>Заказать перевод или редактирование</h2>
        <form className='input-form'>
        <div className='input-box'>
          <select className='lang-choice' onClick={(event)=>onServiceChange(event)}>
            <option value='' selected disabled>Услуга</option>
               {getServices}
            </select> 
          <input type='text' className='user-input' id='message-input' placeholder="Вставьте текст или загрузите файл" value={text} onChange={onChangeText}
          />
          <div className="upload">
            <input type="file" placeholder="Загрузите файл" />
        </div>
        </div>
        <div className='general-user-info'>
          <input className='user-info' id='email' type="text" placeholder='Ваша эл.почта' />
          <input className='user-info' id='name' type="text" placeholder='Имя' />
        </div>
        <div className='service-info'>
          <input className='user-info' id='comment' type="text" placeholder='Комментарий к заказу или ссылка' />
          <select className="lang-choice" onChange={(event) => onLangChange(event)}>
            <option value='' selected disabled>Выберите язык</option>
               {getLanguages}
            </select> 
        </div>
      </form>
        </div>
      <div className='button-block'>
        <img src="https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png" alt="close-btn" className="close-button" />
        <div className="estimate">
        <div className="price">{price}<span className="currency">грн</span></div>
        <div className="work-terms">{deliveryTime}</div>
        </div>
        <input type="submit" value="Заказать" className="count-btn"/>
      </div>
      </div>
      <footer className="footer">
        <div className="copyright">
         <p>Договор публичной оферты</p>
         <p>&#169; Correctarium</p>
         <p>2015-2021</p>
        </div>
        <div className="logo">
        <img src={Logo} alt="logo"></img>
        </div>
        <div className="contact-us">
         <p>Напишите нам:</p>
         <a href="mailto:manager@correctarium.com" className="contact-email">manager@correctarium.com</a>
        </div>
      </footer>
    </div>
    
  );
}

export default App;