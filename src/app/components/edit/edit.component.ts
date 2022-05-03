import { Component, OnInit } from '@angular/core';
//importamos los modulos para formularios
import { FormBuilder, FormGroup } from '@angular/forms';
//importamos el enrutador
import { ActivatedRoute, Router } from '@angular/router';
//importamos el servicio
import { PostService } from 'src/app/post.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  public editForm: FormGroup;
  postRef:any

  constructor( public postService:PostService,public formBuilder:FormBuilder,private activeRoute: ActivatedRoute,private router: Router) { 
    this.editForm = this.formBuilder.group({
        nombre: [''],
        interno: [''],
        empresa: [''],
        sector: [''],
        email: [''],
        particular: ['']
    })
  }

  ngOnInit(): void {
    //console.log(this.activeRoute.snapshot.params) //desde aqui sacamos el id
    const id = this.activeRoute.snapshot.paramMap.get('id');

    this.postService.getPostById(id).subscribe(res => {
      this.postRef = res;
      this.editForm = this.formBuilder.group({
        title: [this.postRef.title],
        content: [this.postRef.content],
        author: [this.postRef.author]        
      })            
    })
  }

  onSubmit() {
    const id = this.activeRoute.snapshot.paramMap.get('id');   

    this.postService.updatePost(this.editForm.value, id);
    this.router.navigate(['']);
    //console.log(this.editForm.value) //podemos ver los valores capturados
  }

}
