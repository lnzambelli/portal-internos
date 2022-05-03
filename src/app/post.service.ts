import { Injectable } from '@angular/core';

//importamos modulo de para DB de Firestore
import { AngularFirestore } from '@angular/fire/compat/firestore'; 

//importamos nuestro modelo
import { Post } from './post.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private angularFirestore: AngularFirestore) { }

  //metodos para el CRUD

  getPosts(){
      return this.angularFirestore
        .collection('posts')
        .snapshotChanges();
  }

  getPostById(id){
    return this.angularFirestore
      .collection('posts')
      .doc(id)
      .valueChanges()
  }

  createPost(post: Post){
    return new Promise<any> ((res, rej) => {
        this.angularFirestore
          .collection('posts')
          .add(post)
          .then((res)=>{
            console.log(res)
          }, 
          (error)=>{
            rej(error)
          })
    })
  }

  updatePost(post: Post, id){
      return this.angularFirestore
        .collection('posts')
        .doc(id)
        .update({
          nombre: post.nombre,
          empresa: post.empresa,
          sector: post.sector,
          interno: post.interno,
          email: post.email,
          particular: post.particular
        })
  }

  deletePost(post){
     return this.angularFirestore
      .collection('posts')
      .doc(post.id)
      .delete(); 
  }
  
}
