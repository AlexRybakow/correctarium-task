import React, { Component } from "react";
import "./App.css";
import Logo from "./footer_logo.png";
import dayjs from "dayjs"
import finalEstimate from "./script"


export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			services : [],
			lang : [],
      selectedService : 'Услуга',
      text: '',
      price: 0,
      time: '',
		};
    this.changeService = this.changeService.bind(this);
    this.handleText = this.handleText.bind(this);
	}
  
	componentDidMount() {
		this.setState({
			services : [
				{ name: 'Редактирование', lang: ['Украинский', 'Русский', 'Английский', 'Английский(носитель)'] },
				{ name: 'Перевод', lang: ['Украинский/русский - английский','Английский-украинский','Английский-русский','Русский-украинский','Украинский-русский'] },
			]
    });
    if(this.state.text && this.state.services){
      let result = finalEstimate(this.state.text.length, this.state.services)
      this.setState({price:result[0]});
      this.setState({time:dayjs(result[1]).format('LLLL')})
    }else{
      this.setState({price:0})
      this.setState({time:''})
    }
	}
  
	changeService(event) {
		this.setState({selectedService: event.target.value});
		this.setState({lang : this.state.services.find(service => service.name === event.target.value).lang});
  }


  handleText(event) {
    this.setState({text: event.target.value})
  }

	
	render() {
  
  return (
    <div className="container">
      <div className="order-block">
        <div className="input-block">
        <h2>Заказать перевод или редактирование</h2>
        <form className='input-form'>
        <div className='input-box'>
          <select className='lang-choice' value={this.state.selectedService} onChange={this.changeService}>
            <option disabled>Услуга</option>
            {this.state.services.map((e, key) => {
							return <option key={key}>{e.name}</option>;
						})}
            </select> 
          <textarea name='text' className='user-input' id='message-input' placeholder="Вставьте текст или загрузите файл" cols="50" rows="7" onChange={this.handleText}
          ></textarea>
        </div>
        <div className='general-user-info'>
          <input className='user-info' id='email' type="text" placeholder='Ваша эл.почта' />
          <input className='user-info' id='name' type="text" placeholder='Имя' />
        </div>
        <div className='service-info'>
          <input className='user-info' id='comment' type="text" placeholder='Комментарий к заказу или ссылка' />
          <select className="lang-choice">
            <option>Выберите язык</option>
            {this.state.lang.map((e, key) => {
							return <option key={key}>{e}</option>;
						})}
            </select> 
        </div>
      </form>
        </div>
      <div className='button-block'>
        <img src="https://d30y9cdsu7xlg0.cloudfront.net/png/53504-200.png" alt="close-btn" className="close-button" />
        <div className="estimate">
        <p className="price">{this.state.price} <span className="currency">грн</span></p>
        <p className="work-terms">{this.state.time}</p>
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
         <a href="mailto:manager@correctarium.com" class="contact-email">manager@correctarium.com</a>
        </div>
      </footer>
    </div>
    
  );
  }
}




