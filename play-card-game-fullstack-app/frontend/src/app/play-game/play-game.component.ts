import { Component, OnInit } from '@angular/core';
import { PlayGameService } from './play-game.service';
import { CommonService } from '../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
  styleUrls: ['./play-game.component.css']
})
export class PlayGameComponent implements OnInit {

  // Initial array
  arrCards: Array<Object> = [];

  // Received array after drag/from api
  arrSpadeReceived: Array<Number> = [];
  arrDiamondReceived: Array<Number> = [];
  arrClubsReceived: Array<Number> = [];
  arrHeartsReceived: Array<Number> = [];

  arrCardType = ['spade', 'diamond', 'clubs', 'hearts'];
  isDragStarted: Boolean;

  objUserDetails: any;

  constructor(private playGameService: PlayGameService,
    private commonService: CommonService, private router: Router) { }

  ngOnInit() {
    let userDetails: any = localStorage.getItem('userDetails');

    if (userDetails !== null) {
      userDetails = JSON.parse(userDetails);
      this.objUserDetails = userDetails.hasOwnProperty('userDetails') ? userDetails['userDetails'] : userDetails;
    }
    this.reset();
    this.getUserDetails();
  }

  reset(isResetInDB?) {
    const _this = this;
    this.arrCards = [];
    this.arrSpadeReceived = [];
    this.arrDiamondReceived = [];
    this.arrClubsReceived = [];
    this.arrHeartsReceived = [];

    // Add cards
    this.arrCardType.forEach(function (cardType: String) {
      _this.arrCards = _this.arrCards.concat(_this.getCards(cardType));
    });
    this.arrCards = this.shuffleArrayElements(this.arrCards);
    if (isResetInDB) {
      this.updateUser();
    }
  }

  getUserDetails() {
    this.playGameService.getUser(this.objUserDetails['_id']).subscribe(resp => {
      if (resp && resp.statusCode === 200) {
        this.objUserDetails = resp.data.userDetails;
        this.commonService.setToken(resp.data.userDetails);
        this.arrangeUserCards();
      } else {
        alert('Failed to get your details');
        this.commonService.logout();
        this.router.navigateByUrl('/login');
      }
    }, err => {

    }, () => {

    });
  }

  generateCardArray(arrCards, cardType) {
    const arrNewCards = [];
    arrCards.forEach(card => {
      arrNewCards.push({
        card: card,
        type: cardType
      });
    });
    return arrNewCards;
  }

  arrangeUserCards() {
    this.arrSpadeReceived = this.generateCardArray(this.objUserDetails['spade'], 'spade');
    this.arrClubsReceived = this.generateCardArray(this.objUserDetails['clubs'], 'clubs');
    this.arrHeartsReceived = this.generateCardArray(this.objUserDetails['hearts'], 'hearts');
    this.arrDiamondReceived = this.generateCardArray(this.objUserDetails['diamond'], 'diamond');
    this.removeExistingCards(this.arrSpadeReceived);
    this.removeExistingCards(this.arrClubsReceived);
    this.removeExistingCards(this.arrHeartsReceived);
    this.removeExistingCards(this.arrDiamondReceived);
  }

  removeExistingCards(arrCard) {
    arrCard.forEach(objCard => {
      this.arrCards.forEach((obj: any, i: any) => {
        if (objCard.card === obj.card && objCard.type === obj.type) {
          this.arrCards.splice(i, 1);
        }
      });
    });
  }

  allowDrop(cardType: String) {
    return ($event: any) => {
      return ($event.data.type === cardType);
    };
  }

  onDragStart(card) {
    this.isDragStarted = true;
  }

  onDragEnd() {
    this.isDragStarted = false;
  }

  getCards(cardType: String) {
    const arrCard: Array<Object> = [];
    for (let i = 1; i < 14; i++) {
      arrCard.push({
        card: i,
        type: cardType
      });
    }
    return arrCard;
  }

  onDropSuccess($event) {
    // Remove from cards once get saved
    // And add to new card holder
    this.arrCards.splice($event.dragData.index, 1);
    switch ($event.dragData.data.type) {
      case 'spade': this.arrSpadeReceived.push($event.dragData.data); break;
      case 'diamond': this.arrDiamondReceived.push($event.dragData.data); break;
      case 'clubs': this.arrClubsReceived.push($event.dragData.data); break;
      case 'hearts': this.arrHeartsReceived.push($event.dragData.data); break;
    }
    this.arrCards = this.shuffleArrayElements(this.arrCards);
    this.updateUser();
  }

  updateUser() {
    const objParams = {
      _id: this.objUserDetails['_id'],
      spade: this.arrSpadeReceived.map((item: any) => item.card),
      diamond: this.arrDiamondReceived.map((item: any) => item.card),
      clubs: this.arrClubsReceived.map((item: any) => item.card),
      hearts: this.arrHeartsReceived.map((item: any) => item.card),
    };

    this.playGameService.updateUser(objParams).subscribe(resp => {
      if (resp && resp.statusCode === 200) {
      } else {
        alert('Failed to save details');
      }
    }, err => {

    }, () => {

    });
  }

  shuffleArrayElements(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

}
