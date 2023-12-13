import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { SDLCComponent } from './sdlc/sdlc.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { AllFilesComponent } from './all-files/all-files.component';

const appRoutes : Routes =[

 {path: "sdlc", component: SDLCComponent},//localhost:4200/sdlc
 {path: "all_files", component: AllFilesComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    SDLCComponent,
    AllFilesComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    GraphQLModule,
    HttpClientModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
