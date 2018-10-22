import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeConvert'
})
export class TimeConvertPipe implements PipeTransform {

  transform(value: any): any {
  let a = new Date(value * 1000);
  let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let hour = a.getHours();
  let min = a.getMinutes();
  let sec = a.getSeconds();
  let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
  }

}
