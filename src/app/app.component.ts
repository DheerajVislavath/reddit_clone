import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { Observable, interval } from 'rxjs';
import { switchMap, map, take } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subreddit;
  data$;
  title = 'reddit';
  postTitle;
  posts;
  url = "https://www.reddit.com/r/";
  time;

  constructor(private dataService: DataService) {

  }

  ngOnInit() {

  }

  search(subreddit) {

    this.postTitle = subreddit + " posts";

    this.data$ = this.dataService.getData(this.url + subreddit + "/.json")
    let intervalData$ = interval(2*1000).pipe(switchMap(() => {
      return this.data$
    }));


      this.data$.pipe(take(1)).subscribe(data => {
        this.posts = data.data.children;
      });

      intervalData$.subscribe( (data: any) => {
        this.posts = data.data.children;
        console.log(data.data.children[0].data.title);    
    })
  }

  timeConverter(UNIX_timestamp){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }

  loadEvent(event) {
    console.log(event);
  }
}
