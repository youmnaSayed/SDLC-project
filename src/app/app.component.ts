import { Component } from '@angular/core';
import { Router } from '@angular/router';
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-app';
  constructor (private router:Router){}
  
onClick(){
  this.router.navigate(['/', 'sdlc'])
}
 
}

