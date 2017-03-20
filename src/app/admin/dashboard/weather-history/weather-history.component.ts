import { Component, OnInit, ViewChild } from '@angular/core';


import { WeatherService } from '../../../../services';

import * as moment from 'moment';

@Component({
  selector: 'app-weather-history',
  templateUrl: './weather-history.component.html',
  styles: [],
  viewProviders: [ WeatherService ]  
})
export class WeatherHistoryComponent implements OnInit {
  private q: string;
  private dateStart: any;
  private dateEnd: any;
  private weatherData: any;
  @ViewChild('myTable') table: any;

  columns = [
    { name: 'date' },
    { name: 'mintempC' },
    { name: 'maxtempC' }
  ];

  constructor(
    private weatherService: WeatherService,
  ) {
    this.dateStart = moment().toDate();
    this.dateEnd = moment().toDate();
  }

  ngOnInit() {
  }

  showData() {
    if (this.q != undefined && this.q.trim() != '') {
      let ds = moment(this.dateStart).format('YYYY-MM-DD');
      let de = moment(this.dateEnd).format('YYYY-MM-DD');
      this.weatherData = [];
      this.weatherService.getWeatherHistory(this.q, ds, de).subscribe(
        (response: any) => {
          if (response.data.weather != undefined) {
            this.weatherData = response.data.weather;
          } else {
            alert(response.data.error[0].msg);
          }
        }
      )
    } else {
      alert('Please enter the location or city that you want to get the weather\'s data' );
    }
  }

  onPage(event) {
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  exportDataToCSV() {
    let JSONData = this.weatherData;
    let ReportTitle = 'Weather History';
    let ShowLabel = true;

    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = '';    
    //Set Report title in first row or line
    
    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }
        row = row.slice(0, -1);
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    var fileName = "MyReport_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + encodeURI(CSV);
        
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style.visibility = "hidden";
    link.download = fileName + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);    
  }
}
