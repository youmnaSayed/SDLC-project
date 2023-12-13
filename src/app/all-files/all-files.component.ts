import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import {  GET_ANALYSIS_BY_ID } from './graphql/query';

@Component({
  selector: 'app-all-files',
  templateUrl: './all-files.component.html',
  styleUrls: ['./all-files.component.css']
})
export class AllFilesComponent implements OnInit {
  analysisPhotos: any[] = [];
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.fetchAnalysisPhotos();
  }

  fetchAnalysisPhotos() {
    this.apollo
      .watchQuery<any>({
        query: GET_ANALYSIS_BY_ID,
      })
      .valueChanges.subscribe(({ data }) => {
        this.analysisPhotos = data.getAllPhotos;
      });
  }

}
