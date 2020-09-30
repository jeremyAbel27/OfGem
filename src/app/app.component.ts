import { Component, OnInit } from '@angular/core';
import { CalculateService } from './calculate.service';
import { Result } from './result';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  calculation : Result;

  constructor(private _calculatorService: CalculateService){}

  ngOnInit(): void {
    
  }
  subText = ''; 
  mainText = ''; 
  operand1: number; 
  operand2: number; 
  operator = ''; 
  answered = false; 
  operatorSet = false; 

  pressKey(key: string) {

    if (this.answered == true)
    {
      this.allClear();
    }

    if (key === '/' || key === '*' || key === '-' || key === '+') {
       const lastKey = this.mainText[this.mainText.length - 1];
       if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+')  {
         this.operatorSet = true;
       }
       if ((this.operatorSet) || (this.mainText === '')) {
         return;
       }
       this.operand1 = parseFloat(this.mainText);
       this.operator = key;
       this.operatorSet = true;
    }
    if (this.mainText.length === 10) {
      return;
    }
    this.mainText += key;
  }

  getResponse() {   
    this._calculatorService.getResult(this.mainText).subscribe((data : Result) => {
      this.calculation = data;
      console.log(this.calculation);
      if (this.calculation.Error == ''){
          this.mainText = this.calculation.Output;        
      }
      else{
        this.mainText = this.calculation.Error;
      }
      this.subText = this.calculation.Input;
    });

    this.answered = true;
}

allClear() {
  
  this.mainText = '';
  this.subText = '';
  this.operatorSet = false;
  this.answered = false;
}
}
