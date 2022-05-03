
import { Component, OnInit } from '@angular/core';

//importamos el modelo
import { Post } from 'src/app/post.model';

//importamos el servicio
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.scss']
})
export class ShowComponent implements OnInit {
  public userAdmin = ""
  
  Posts: Post[];

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.userAdmin = localStorage.getItem('usuario')

    this.postService.getPosts().subscribe((res) => {
      this.Posts = res.map((e) => {
          return {
            id: e.payload.doc.id,
            ...(e.payload.doc.data() as Post)
          }
      })
    })

  }

  deleteRow = (post) => this.postService.deletePost(post)

}
