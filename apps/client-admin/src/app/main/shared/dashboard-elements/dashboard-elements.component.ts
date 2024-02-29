import { Component, Input, OnInit } from '@angular/core';
import * as shape from 'd3-shape';
@Component({
  selector: 'hacienda-platform-dashboard-elements',
  templateUrl: './dashboard-elements.component.html',
  styleUrls: ['./dashboard-elements.component.css']
})
export class DashboardElementsComponent implements OnInit {
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  view: any[] = [700, 400];
  @Input() data: any;

  legendPosition = 'below';
  cardColor = '#002837';

  curve = shape.curveNatural;
  constructor() {}

  ngOnInit(): void {}

  createGroup(data: any[]): any[]
  {
    const formatedData: any[] = [];
    const maps = data.map(x => x.name2);

    maps.forEach(item => {
      const filteredData = data.filter(i => i.name2 === item); 
      const arr = { name: item, series: filteredData};
      formatedData.push(arr);
    });

    //console.log(formatedData);
    return formatedData;
  }
}
