import React, { Component } from 'react';
import '../css/Result.css';
import hero from '../heromap/hero.json' 
class Result extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            result : "",
            tier: "unselected",
            favoriteHero: "unselected"
      }
      this.predictResult = this.predictResult.bind(this);
      this.findId = this.findId.bind(this);
    }

    findId = (fileName) => {
        var id;
        for (let key in hero) {
            if (fileName === hero[key].image.full) {
                id = hero[key].key;
            }
        }
        // var id = hero.filter(
        //     function(hero) {return hero.localized_name == finalName}
        // );
        return id;
    }

    async predictResult() {
        // console.log(this.convertHeroNameToId("abad_do_+n"));
        var myTeamIds = [];
        var opponentTeamIds = [];
        console.log(this.props.myTeamHeroes)
        for (let i = 0; i < this.props.myTeamHeroes.length; i++) {
            let id = this.findId(this.props.myTeamHeroes[i]); 
            myTeamIds.push(id);
            // console.log(id);
        }
        for (let i = 0; i < this.props.opponentTeamHeroes.length; i++) {
            let id = this.findId(this.props.opponentTeamHeroes[i]); 
            opponentTeamIds.push(id);
        }
        console.log(myTeamIds);
        console.log(opponentTeamIds);
       const response = await fetch(
        //   `${uriBase}?visualFeatures=${visualFeatures}&details=${details}&language=${language}`,
        `http://localhost:5000/predictMatch`,
          {
            method: 'post',
            headers: new Headers({
                'content-type': 'application/json',
                // 'Accept': 'application/json',
              }),
            // body: JSON.stringify({"url": "http://digitalnativestudios.com/textmeshpro/docs/rich-text/line-indent.png"})
            body: JSON.stringify(
                {
                    "myTeam": myTeamIds,
                    "opponentTeam": opponentTeamIds,
                    // "myTeam": [],
                    // "opponentTeam": [],
                    "tier": this.state.tier
                }
            ) 
          }
        );
        // console.log(JSON.parse(response));
        var rep = response.json()
        var resultString = await rep.then(function(value) {
            // console.log(value.res);
            return value.res;
          });
        
        console.log(resultString.toString().substr(0, 5));
        this.setState({
            result: resultString.toString().substr(0, 5) + " %"
        })
        // console.log(rep);
        
   }

   reset = () => {
     this.setState({result: ""});
     this.props.resetTeamPick();
   }
   tierhandleChange = (event) => {
    this.setState({tier: event.target.value})
    this.props.handleTierChange(event.target.value)
   }
   herohandleChange = (event) => {
    this.setState({favoriteHero: event.target.value})
    this.props.handlefavoriteHeroChange(event.target.value)
   }
   
  render() {
    return (
      <div className="Result">
        <div className="information">
            <h3>Enter game infomation for team match result prediction and hero recommendation:</h3>
            <form>
                <label>
                    Player   tier:      
                    <input type="text" onChange={this.tierhandleChange}/>
                </label>
            </form>
            <form>
                <label>
                    Favorite hero:
                    <input type="text" onChange={this.herohandleChange} />
                </label>
            </form>
            <h4 className="info">Your selected player tier is: {this.state.tier}, favorite hero is: {this.state.favoriteHero}</h4>
        </div>
        <div className="preditArea">
            <div className="button">
                <button onClick={this.predictResult}>
                    Predict the Match Result
                </button>
                <button onClick={this.reset}>
                    Reset Team Picks
                </button>
                <h1 className="info">
                    The propablity of my team win is : {this.state.result}
                </h1>
            </div>
        </div>
        
        
      </div>
    );
  }
}

export default Result;