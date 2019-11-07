import React, { Component } from 'react';
import './css/App.css';
import Background from './images/background.jpg';
import TeamPick from './components/TeamPick';
import Result from './components/Result';
import HeroPicker from './components/HeroPikcer';
import hero from './heromap/hero.json' 

const FILE_NAMES = ["abaddon.png","alchemist.png","ancient_apparition.png","anti_mage.png","arc_warden.png","axe.png","bane.png","batrider.png","beastmaster.png","bloodseeker.png","bounty_hunter.png","brewmaster.png","bristleback.png","broodmother.png","centaur_warrunner.png","chaos_knight.png","chen.png","clinkz.png","clockwerk.png","crystal_maiden.png","dark_seer.png","dark_willow.png","dazzle.png","death_prophet.png","disruptor.png","doom.png","dragon_knight.png","drow_ranger.png","earth_spirit.png","earthshaker.png","elder_titan.png","ember_spirit.png","enchantress.png","enigma.png","faceless_void.png","gyrocopter.png","huskar.png","invoker.png","io.png","jakiro.png","juggernaut.png","keeper_of_the_light.png","kunkka.png","legion_commander.png","leshrac.png","lich.png","lifestealer.png","lina.png","lion.png","lone_druid.png","luna.png","lycan.png","magnus.png","medusa.png","meepo.png","mirana.png","monkey_king.png","morphling.png","naga_siren.png","natures_prophet.png","necrophos.png","night_stalker.png","nyx_assassin.png","ogre_magi.png","omniknight.png","oracle.png","outworld_devourer.png","pangolier.png","phantom_assassin.png","phantom_lancer.png","phoenix.png","puck.png","pudge.png","pugna.png","queen_of_pain.png","razor.png","riki.png","rubick.png","sand_king.png","shadow_demon.png","shadow_fiend.png","shadow_shaman.png","silencer.png","skywrath_mage.png","slardar.png","slark.png","sniper.png","spectre.png","spirit_breaker.png","storm_spirit.png","sven.png","techies.png","templar_assassin.png","terrorblade.png","tidehunter.png","timbersaw.png","tinker.png","tiny.png","treant_protector.png","troll_warlord.png","tusk.png","underlord.png","undying.png","ursa.png","vengeful_spirit.png","venomancer.png","viper.png","visage.png","warlock.png","weaver.png","windranger.png","winter_wyvern.png","witch_doctor.png","wraith_king.png","zeus.png"];
var backgroundStyle = {
  width: "100%",
  height: "1800px",
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundImage: `url(${Background})`
};

class App extends Component {
  constructor(props) {
    super(props)
    let images = FILE_NAMES.map( (name, index) => {
      const style = {border: '3px solid transparent'}
      const divstyle = {display: "inline-block"}
      const figcapstyle = {textAlign: 'center', color: "white"}
      let curtName = {name}.name.toString()
      let heroName = curtName.substring(0,curtName.length - 4)
      // console.log(curtName)
      return (
              <div style={divstyle}>
                <img key={index} 
                    style={style} 
                    title= {heroName} 
                    onClick={this.handleClickImage.bind(this, {name})} 
                    className="img-responsive" alt="" 
                    src={require(`./images/heros/${name}`)} />
                <figcaption style={figcapstyle}> {heroName}</figcaption>
              </div>
      )
    });
    this.state = {
        myTeamHeroes: [],
        opponentTeamHeroes: [],
        round: 1,
        images: images,
        tier: 36,
        favoriteHero: "puck"
    }
    this.ShowRecommendedHeroes = this.ShowRecommendedHeroes.bind(this);
  }

  handleClickImage = (dataFromHeroPicker) => {
    let curtRound = this.state.round;
    let newMyTeamHeroes = this.state.myTeamHeroes;
    let newOpponentHeroes = this.state.opponentTeamHeroes;
    if (newMyTeamHeroes.length < 5 && (curtRound === 1 || curtRound === 4 || curtRound === 5 || curtRound === 8 || curtRound === 9)) {
      if (!newOpponentHeroes.includes(dataFromHeroPicker.name) && !newMyTeamHeroes.includes(dataFromHeroPicker.name)) {
        newMyTeamHeroes.push(dataFromHeroPicker.name);
        curtRound+=1;
      }
    } else if (newOpponentHeroes.length < 5 && (curtRound === 2 || curtRound === 3 || curtRound === 6 || curtRound === 7 || curtRound === 10)) {
      if (!newOpponentHeroes.includes(dataFromHeroPicker.name) && !newMyTeamHeroes.includes(dataFromHeroPicker.name)) {
        newOpponentHeroes.push(dataFromHeroPicker.name);
        curtRound+=1;
      }
    }
    this.setState({myTeamHeroes : newMyTeamHeroes});
    this.setState({opponentTeamHeroes : newOpponentHeroes});
    this.setState({round : curtRound});
    // console.log(this.state.myTeamHeroes);
  };
  resetTeamPick = () => {
    this.setState({myTeamHeroes: []});
    this.setState({opponentTeamHeroes: []});
    this.setState({round: 1})
  }
  convertIdsToFileNames = (passedRecommendedHeroesIds) => {
    let passedRecommendedHeroesImages = []
    for (let i = 0; i < passedRecommendedHeroesIds.length; i++) {
      let curtId = passedRecommendedHeroesIds[i];
      // find hero name by id
      // console.log(curtId)
      var formattedTargetName = "";
      // console.log(curtId)
      for (let curthero in hero) {
        var targetName = hero[curthero].localized_name;
        // console.log(hero[curthero].id)
        if (curtId === hero[curthero].id) {
          for (let i = 0; i < targetName.length; i++) {   
            if (targetName.charAt(i).toLowerCase() === '-') {
                formattedTargetName += ' ';
            } else if (targetName.charAt(i).toLowerCase() === '\'') {
                continue;
            } else {
                formattedTargetName += targetName.charAt(i).toLowerCase();
            }
          }
        }
      }
      // console.log(formattedTargetName)
      // find file name by hero name
      
      for (let j = 0; j < FILE_NAMES.length; j++) {
        let finalName = "";
        let oriName = FILE_NAMES[j].split(".")[0];
        // console.log(oriName);
        
        for (let k = 0; k < oriName.length; k++) {
            if (oriName.charAt(k) === '_') {
                finalName += ' ';
            } else {
                finalName += oriName.charAt(k).toLowerCase();
            }
        }
        // console.log(finalName)
        if (finalName == formattedTargetName) {
          passedRecommendedHeroesImages.push(FILE_NAMES[j]);
          break;
        }
      }
    }
    // console.log(passedRecommendedHeroesImages)
    return passedRecommendedHeroesImages;
  }
  async ShowRecommendedHeroes() {
    // console.log(this.state.myTeamHeroes)
      // do http call here and use this.state.tier and this.state.favoriteHero as input, get a list of array as output which is passedRecommendedHeroesIds
    // let curtTier = this.state.tier;
    // let curtId = this.state.id
    const response = await fetch(
      //   `${uriBase}?visualFeatures=${visualFeatures}&details=${details}&language=${language}`,
      `http://localhost:5000/recommend`,
        {
          method: 'post',
          headers: new Headers({
              'content-type': 'application/json',
              // 'Accept': 'application/json',
            }),
          // body: JSON.stringify({"url": "http://digitalnativestudios.com/textmeshpro/docs/rich-text/line-indent.png"})
          body: JSON.stringify(
              {
                  "tier": this.state.tier,
                  "id": this.convertHeroNameToId(this.state.favoriteHero),
              }
          ) 
        }
      );
    
    var rep = response.json()
    var passedRecommendedHeroesIds = await rep.then(function(value) {
        // console.log(value.res);
        return value.res;
      });
    console.log(passedRecommendedHeroesIds)
    // let passedRecommendedHeroesIds = [92,102,32,96,61,110,42,9,14,93,101,1,6,7,33,41];
    let passedRecommendedHeroesImages = this.convertIdsToFileNames(passedRecommendedHeroesIds);
    let images = FILE_NAMES.map( (name, index) => {
      const style = passedRecommendedHeroesImages.indexOf({name}.name) > -1 ? { border: '3px solid yellow' } : {border: '3px solid transparent'}
      const divstyle = {display: "inline-block"}
      const figcapstyle = {textAlign: 'center', color: "white"}
      let curtName = {name}.name.toString()
      let heroName = curtName.substring(0,curtName.length - 4)
      // console.log(curtName)
      return (
              <div style={divstyle}>
                <img key={index} 
                    style={style} 
                    title= {heroName} 
                    onClick={this.handleClickImage.bind(this, {name})} 
                    className="img-responsive" alt="" 
                    src={require(`./images/heros/${name}`)} />
                <figcaption style={figcapstyle}> {heroName}</figcaption>
              </div>
      )
    });
    // let passedRecommendedHeroesImages = convertIdToImage(passedRecommendedHeroesId);
    this.setState({images:images})
  }
  handleTierChange = (newTier) => {
    this.setState({tier: newTier});
  }
  handlefavoriteHeroChange = (newHero) => {
    this.setState({favoriteHero: newHero})
  }
  convertHeroNameToId = (heroName) => {
    var id = -1;
    let formattedInputName = ""
    for (let i = 0; i < heroName.length; i++) {
      let char = heroName.charAt(i)
      if ( char.toUpperCase() != char.toLowerCase()) {
        formattedInputName += char.toLowerCase()
      }
    }
    for (let curthero in hero) {
      var targetName = hero[curthero].localized_name;
      // console.log(hero[curthero].id)
      let formattedTargetName = ""
      for (let i = 0; i < targetName.length; i++) {   
        let char = targetName.charAt(i)
        if ( char.toUpperCase() != char.toLowerCase()) {
          formattedTargetName += char.toLowerCase()
        }
      }
      if (formattedTargetName === formattedInputName) {
        id = hero[curthero].id;
        break;
      }
    }
    console.log(id);
    return id;
  }
  handleDeleteHero = () => {
    let lastRound = this.state.round - 1;
    if (lastRound === 1 || lastRound === 4 || lastRound === 5 || lastRound === 8 || lastRound === 9) {
      let newMyTeamHeroes = this.state.myTeamHeroes.slice(0, -1);
      this.setState({
        myTeamHeroes : newMyTeamHeroes,
        round: lastRound
      })
    }
    if (lastRound === 2 || lastRound === 3 || lastRound === 6 || lastRound === 7 || lastRound === 10) {
      let newOpponentHeroes = this.state.opponentTeamHeroes.slice(0,-1);
      this.setState({
        opponentTeamHeroes : newOpponentHeroes,
        round: lastRound
      })
    }
  }
  

  render() {
    return (
      <div className="App" style={ backgroundStyle }>
          <div className="Predicter">
            <TeamPick 
              myTeamHeroes={this.state.myTeamHeroes} 
              opponentTeamHeroes={this.state.opponentTeamHeroes}
              handleDeleteHero={this.handleDeleteHero}
            ></TeamPick>
            <Result 
              resetTeamPick = {this.resetTeamPick}
              myTeamHeroes = {this.state.myTeamHeroes}
              opponentTeamHeroes = {this.state.opponentTeamHeroes}
              handleTierChange = {this.handleTierChange}
              handlefavoriteHeroChange = {this.handlefavoriteHeroChange}
              
            ></Result>
          </div>
          <div className="HeroPicker">
            <HeroPicker 
              handleClickImage = {this.handleClickImage}
              images = {this.state.images}
              ShowRecommendedHeroes = {this.ShowRecommendedHeroes}
            ></HeroPicker>
          </div>
      </div>
    );
  }
}

export default App;
