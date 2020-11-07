import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { multi, single } from 'src/app/charts/charts.data';

@Component({
  selector: 'app-interview-scores-graph',
  templateUrl: './interview-scores-graph.component.html',
  styleUrls: ['./interview-scores-graph.component.css']
})
export class InterviewScoresGraphComponent implements OnInit, OnChanges {

  public single: any[];
  public multi: any[];
  view: any;
  public showXAxis = true;
  public showYAxis = true;
  public gradient = true;
  public showLegend = false;
  public showXAxisLabel = true;
  public xAxisLabel = 'Interview dates';
  public showYAxisLabel = true;
  public yAxisLabel = 'Interview counts';
  public colorScheme = {
    domain: ['#103366']
  }; 
  public autoScale = true;
  @Input() interviewCounts: any
  interviews: any;
  constructor(

  ) {
    Object.assign(this, {single, multi})   
  }
  // ngOnChanges(changes: SimpleChanges): void {
  //   throw new Error('Method not implemented.');
  // }
  ngOnInit(){
    
  }
  
  onSelect(event) {
    console.log(event);
  }
  ngOnChanges(){
   this.interviews=this.interviewCounts? this.interviewCounts.map(el=>{
      console.log(el.count);
      const data =
       {
         name: el.dateTime,
         value: el.count
       }
      
       return data
    }):''
    console.log(this.interviews);
    
    
  }

  

}
