import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {OnInit} from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 public query: string;
 public queryString: string;
 public postList;
 title = 'WTT';

  constructor(
    private http: HttpClient,
  ) {}
    ngOnInit() {
    }

searchPosts() {
console.log('these dogs', this.query);
this.queryString = `https://www.reddit.com/r/all/search.json?q=${this.query}&limit=5`;
console.log('queryString!', this.queryString);
this.getPosts();
}

getPosts(): void {
this.http.get<Post>(this.queryString)
      .subscribe(result => {
        console.log('result', result);
        this.postList = result.data.children;
        console.log('this.postList', this.postList);
        this.postList.forEach(post => {
          post.data.created = post.data.created * 1000;
        });
      });
}
}

export class Post {
  data: PostData;
}

export class PostData {
  children: PostChildren [];
}

export class PostChildren {
  data: PostChildrenData;
}

export class PostChildrenData { }

