import React from 'react';
import Select from 'react-select';
import BingoCard from './BingoCard';

class CardGenerator extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      generatedCards: [],
      numberOfCards: 1,
      blackWhite: false,
      color: "red",
      fourPerPage: false,
    }
  }

  generateBingoNumbers = () => {
    let letters = ["B", "I", "N", "G", "O"];
    let numbers = {};
    let count = 1;
    letters.forEach((letter) => {
      numbers[letter] = [];
      for(let i = 1; i <= 15; i++) {
        numbers[letter].push(count);
        count++;
      }
    })
    return numbers;
  }

  handleNumberSelect = (event) => {
    this.setState({numberOfCards: parseInt(event.value)});
  }

  handleColorSelect = (event) => {
    this.setState({color: event.value});
  }

  handleBWCheckbox = (e) => {
    this.setState({blackWhite: e.currentTarget.checked});
  }

  handlePPCheckbox = (e) => {
    this.setState({fourPerPage: e.currentTarget.checked});
  }

  handleButton = (event) => {
    let cards = [];
    for(let i = 1; i <= this.state.numberOfCards; i++){
      cards.push(this.generateCard());
    }
    this.setState({generatedCards: cards});
  }

  generateCard() {
    let numbers = this.generateBingoNumbers();
    let card = {};
    Object.keys(numbers).map(letter => {
      let chosenNumbers = [];
      for(let i = 0; i<5; i++){
        chosenNumbers.push(numbers[letter].splice(Math.floor(Math.random()*numbers[letter].length), 1));
      }
      card[letter] = chosenNumbers;
      return letter;
    });
    return card;
  }

  get numberOfCardsOptions() {
    return [
      {value: '1', label: '1'},
      {value: '2', label: '2'},
      {value: '3', label: '3'},
      {value: '4', label: '4'},
      {value: '5', label: '5'},
      {value: '6', label: '6'},
      {value: '7', label: '7'},
      {value: '8', label: '8'},
      {value: '9', label: '9'},
      {value: '10', label: '10'},
    ]
  }

  get colorOptions(){
    return [
      {value: "red", label: "red"},
      {value: "orange", label: "orange"},
      {value: "yellow", label: "yellow"},
      {value: "green", label: "green"},
      {value: "blue", label: "blue"},
      {value: "purple", label: "purple"},
      {value: "pink", label: "pink"},
      {value: "aqua", label: "aqua"},
      {value: "gray", label: "gray"},
      {value: "brown", label: "brown"}
    ]
  }

  get sectionClasses() {
    let classes = "";
    classes+= this.state.fourPerPage ? 'print-four ' : 'print-two ';
    classes+= this.state.blackWhite ? 'print-bw ' : 'print-color ';
    return classes;
  }

  render() {
    return(
      <section className={this.sectionClasses}>
        <div className="row">
          <div className="col padding-xxlg">
            <div className="no-print">
              <h1>Card Generator</h1>
              <p>Generate your own cards for printing!<br/>
                Simply choose how many cards you'd like to generate and click the button!</p>
              <p>Printing your cards will default to color and 2 cards per page. Use the options below to change these settings.</p>
            
              <div className="row horizontal-start vertical-center pale-gray-bg padding-xlg">
                <div className="col shrink padding-horizontal-md">
                  <Select 
                    className="number-select"
                    placeholder="Number of Cards"
                    onChange={this.handleNumberSelect}
                    options={this.numberOfCardsOptions}
                  />
                </div>
                <div className="col shrink padding-horizontal-md">
                  <Select 
                    className="number-select"
                    placeholder="Card Colors"
                    onChange={this.handleColorSelect}
                    options={this.colorOptions}
                  />
                </div>
                <div className="col shrink padding-horizontal-md">
                  <button className="altBtn" onClick={this.handleButton.bind(this)}>Generate Card</button>
                </div>
                <div className="col shrink padding-horizontal-md">
                  <label className={this.state.blackWhite ? 'toggle checked' : 'toggle'}>
                    <input type="checkbox" onChange={this.handleBWCheckbox} checked={this.state.blackWhite}></input>
                    <span className="small-text">Print in Black/White</span>
                    <span className="toggle-span"></span>
                  </label>
                </div>
                <div className="col shrink padding-horizontal-md">
                  <label className={this.state.fourPerPage ? 'toggle checked' : 'toggle'}>
                    <input type="checkbox" onChange={this.handlePPCheckbox} checked={this.state.fourPerPage}></input>
                    <span className="small-text">Print 4 Cards Per Page</span>
                    <span className="toggle-span"></span>
                  </label>
                </div>
                <div className="col padding-horizontal-md text-right">
                  <button data-visibility={this.state.generatedCards.length > 0 ? 'show' : 'hide'} className="primaryBtn" onClick={()=>{window.print();return false;}}>Print Cards</button>
                </div>
              </div>
            </div>
            
            <div className="row margin-vertical-lg">
              <div className="col">
                {this.state.generatedCards.map((card, index) => {
                  return( <div data-color={this.state.blackWhite ? 'dk-gray' : this.state.color} className="card margin-md" key={"a" + index}><BingoCard card={card} /></div> )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default CardGenerator;