import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription} from 'rxjs';
import { Post } from '../post.model';
import {PostService} from '../post.service'
import { PageEvent } from "@angular/material/paginator";


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  constructor(public postService : PostService) { }
  private postSubscription : Subscription;
  isLoading = false;
  totalPosts = 10;
  postsPerPage = 5;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

   @Input() posts : Post[] = [];
  /*posts = [
    {title: 'First Post', content: " This is the first post content"},
    {title: 'Second Post', content: " This is the Second post content"},
    {title: 'Third Post', content: " This is the Third post content"}
  ]
  */  

  ngOnInit(): void {
    this.isLoading = true;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    this.postSubscription =  this.postService.getPostUpdateListener()
    .subscribe((postData: {posts: Post[]; postCount: number })=> {
        this.isLoading = false;
        this.totalPosts = postData.postCount;
        this.posts = postData.posts;
    });

  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

  onDelete(postId : string) {
    this.isLoading = true;
    this.postService.deletePost(postId).subscribe(() => {
      this.postService.getPosts(this.postsPerPage, this.currentPage);
    });
  }
 
  onChangedPage(pageData: PageEvent) {
    console.log(pageData);
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
  }

  

}
