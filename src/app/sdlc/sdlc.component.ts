import { Component } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule,FormBuilder, Validators, NgForm } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import '../sdlc/sdlc.component.css'
import { Document } from './models/document';
import { Analysis } from './models/analysis';
import { CREATE_ANALYSIS_DOC, CREATE_DESIGN_DOC, CREATE_INITIATION_DOC, DELETE_ANALYSIS_DOC, DELETE_INITIATION_DOC, UPDATE_ANALYSIS_DOC, UPDATE_INITIATION_DOC, UPLOAD_FILE, UPLOAD_FILE_DES } from './graphql/mutation';


@Component({
  selector: 'app-sdlc',
  templateUrl: './sdlc.component.html',
  styleUrls: ['./sdlc.component.css']
})
export class SDLCComponent {
  ngOnInit() {
    this.signupForm = new FormGroup({
            'sdd': new FormArray([]),
          });
        
      }
  btnValue?: String;
  showForm: boolean = true;
  show: boolean = false;
  elements: any[] = [];
  documents: Document[] = [];
  analyses: Analysis[] = [];
  edit?: boolean = false;
  id?: string;
  successMessage: string | null = null;
  documentIdToFind: string = '';
  AnalysisIdToFind: string = '';
  foundDocument: Document | undefined;
  foundAnalysis: Analysis | undefined;

  // -----------------------initiation variables---------------------
  title?: string;
  sd?: String;
  fd?: String;
  projectObj?: String;
  projectManager?: String;
  projectInfo?: String;
  projectScopeStatement?: String;

  phase1: {
    title?: string,
    sd?: String,
    fd?: String,
    projectObj?: String,
    projectManager?: String,
    projectInfo?: String,
    projectScopeStatement?: String,
  }[] = [];
  document?: Document;


  isVisible?: boolean = false;
  imagePath?: string;
  imagePathDes: any;


  initiationForm!: NgForm;
  requirementForm!: NgForm;



  constructor(private apollo: Apollo) { }
  createInitiationDoc() {
    this.apollo.mutate<any>({
        mutation: CREATE_INITIATION_DOC,
        variables: {
          "document": {
            "title":this.title!,
            "sd":this.sd!,
            "fd":this.fd!,
            "projectObj":this.projectObj!,
            "projectManager":this.projectManager!,
            "projectInfo":this.projectInfo!,
            "projectScopeStatement":this.projectScopeStatement!

          }
        },
      })
      .subscribe(({ data }) => {
        this.id = data.createInitiationDoc.id;
        this.documents!.push(data.createInitiationDoc);
        this.updateForm.id = data.createInitiationDoc.id;
        this.successMessage = `Document with ID ${this.id} deleted successfully.`;
  console.log(this.id);
      });
    }

    
  // this.documents!.push(data.createInitiationDoc);
  // console.log(this.documents);







  
  deleteInitiationDocument(document: Document) {
    const { id } = document;
    console.log('Deleting document with ID:', this.id);
  
    this.apollo
      .mutate<any>({
        mutation: DELETE_INITIATION_DOC,
        variables: {
          id: id,
        },
      })
      .subscribe(
        ({ data }) => {
          console.log('Mutation success:', data);
  
          // Log the array before filtering
          console.log('Before deletion:', this.documents);
  
          // Update the frontend array by filtering out the
          this.documents = this.documents.filter((doc) => doc.id !== id);
  
          // Log the array after filtering
          console.log('After deletion:', this.documents);
        },
        (error) => {
          console.error('Mutation error:', error);
        }
      );
  }




  updateForm: any = {
    id: '', 
    title: '',
    sd: '',
    fd: '',
    projectObj: '',
    projectManager: '',
    projectInfo: '',
    projectScopeStatement: '',
  };


//   updateInitiationDoc() {
//     const updateInitiationDocId = this.updateForm.id;

//     if (!updateInitiationDocId) {
//       console.error('Update error: ID is empty or undefined');
//       // Handle the error, e.g., show a message to the user
//       return;
//     }
//     this.apollo
//       .mutate<any>({
//         mutation: UPDATE_INITIATION_DOC,
//         variables: {
//           updateInitiationDocId,
//           document: {
//             title: this.updateForm.title,
//             sd: this.updateForm.sd,
//             fd: this.updateForm.fd,
//             projectObj: this.updateForm.projectObj,
//             projectManager: this.updateForm.projectManager,
//             projectInfo: this.updateForm.projectInfo,
//             projectScopeStatement: this.updateForm.projectScopeStatement,
//           },
//         },
//       })
//       .subscribe(
//         ({ data }) => {
//           const updatedDocument = data.updateInitiationDoc;
//           console.log('Update successful:', updatedDocument);
//         },
//         (error) => {
//           console.error('Update error:', error);
//           // Handle error as needed
//         }
//       );
// }


updateInitiationDoc() {
  const updateInitiationDocId = this.updateForm.id;

  if (!updateInitiationDocId) {
    console.error('Update error: ID is empty or undefined');
    // Handle the error, e.g., show a message to the user
    return;
  }

  this.apollo
    .mutate<any>({
      mutation: UPDATE_INITIATION_DOC,
      variables: {
        updateInitiationDocId,
        document: {
          title: this.updateForm.title,
          sd: this.updateForm.sd,
          fd: this.updateForm.fd,
          projectObj: this.updateForm.projectObj,
          projectManager: this.updateForm.projectManager,
          projectInfo: this.updateForm.projectInfo,
          projectScopeStatement: this.updateForm.projectScopeStatement,
        },
      },
    })
    .subscribe(
      ({ data }) => {
        const updatedDocument = data.updateInitiationDoc;

        // Update the local documents array with the changes
        const index = this.documents.findIndex(doc => doc.id === updatedDocument.id);

        if (index !== -1) {
          this.documents[index] = { ...updatedDocument };
        }

        console.log('Update successful:', updatedDocument);
      },
      (error) => {
        console.error('Update error:', error);
        // Handle error as needed
      }
    );
}





  // -----------------------analysis variables---------------------
  
  intro?: String;
  purpose?: String;
  Audience?: String;
  description?: String;
  systemFeaturesandReq?: string;
  usecase?:String;

  phase2: {
    intro?: String;
    purpose?: String;
    Audience?: String;
    description?: String;
    systemFeaturesandReq?: string;
    usecase?:String;
  }[] = [];
  analysis?: Analysis;





  createAnalysisDoc() {
   
      console.log('Value of this.usecase:', this.usecase);
    
    this.apollo.mutate<any>({
      mutation: CREATE_ANALYSIS_DOC,
      variables: {
        "analysis": {
          "intro": this.intro!,
          "purpose": this.purpose!,
          "Audience": this.Audience!,
          "description": this.description!,
          "systemFeaturesandReq": this.systemFeaturesandReq!,
          "usecase":this.usecase!,
        }
      },
    }).subscribe(({ data }) => {
      this.id = data.createAnalysisDoc.id;
      this.analyses!.push(data.createAnalysisDoc);
      this.updateAnalysisForm.id = data.createAnalysisDoc.id;
      
      // this.successMessage = `Document with ID ${this.id} created successfully.`;
      console.log(this.id);
      
  
    });
  }


  



  
  deleteAnalysisDoc(analysis: Analysis) {
    const { id } = analysis;
    console.log('Deleting analysis document with ID:', this.id);
  
    this.apollo
      .mutate<any>({
        mutation: DELETE_ANALYSIS_DOC,
        variables: {
          id: id,
        },
      })
      .subscribe(
        ({ data }) => {
          console.log('Mutation success:', data);
  
          // Log the array before filtering
          console.log('Before deletion:', this.analyses);
  
          // Update the frontend array by filtering out the
          this.analyses = this.analyses.filter((doc) => doc.id !== id);
  
          // Log the array after filtering
          console.log('After deletion:', this.analyses);
        },
        (error) => {
          console.error('Mutation error:', error);
        }
      );
  }




  updateAnalysisForm: any = {
    id: '', 
    intro: '',
    purpose: '',
    Audience: '',
    description: '',
    systemFeaturesandReq: '',
  };

  
//   updateAnalysisDoc() {
//     const updateAnalysisDocId = this.updateAnalysisForm.id;

//     if (!updateAnalysisDocId) {
//       console.error('Update error: ID is empty or undefined');
//       // Handle the error, e.g., show a message to the user
//       return;
//     }
//     this.apollo
//       .mutate<any>({
//         mutation: UPDATE_ANALYSIS_DOC,
//         variables: {
//           updateAnalysisDocId,
//           document: {
//             intro: this.updateAnalysisForm.intro,
//             purpose: this.updateAnalysisForm.purpose,
//             Audience: this.updateAnalysisForm.Audience,
//             description: this.updateAnalysisForm.description,
//             systemFeaturesandReq: this.updateAnalysisForm.systemFeaturesandReq,
       
//           },
//         },
//       })
//       .subscribe(
//         ({ data }) => {
//           const updatedAnalysis = data.updateAnalysisDoc;
//           console.log('Update successful:', updatedAnalysis);
//         },
//         (error) => {
//           console.error('Update error:', error);
//           // Handle error as needed
//         }
//       );
// }




updateAnalysisDoc() {
  const updateAnalysisDocId = this.updateAnalysisForm.id;

  if (!updateAnalysisDocId) {
    console.error('Update error: ID is empty or undefined');
    // Handle the error, e.g., show a message to the user
    return;
  }

  this.apollo
    .mutate<any>({
      mutation: UPDATE_ANALYSIS_DOC,
      variables: {
        updateAnalysisDocId,
        document: {
          intro: this.updateAnalysisForm.intro,
          purpose: this.updateAnalysisForm.purpose,
          Audience: this.updateAnalysisForm.Audience,
          description: this.updateAnalysisForm.description,
          systemFeaturesandReq: this.updateAnalysisForm.systemFeaturesandReq,
        },
      },
    })
    .subscribe(
      ({ data }) => {
        const updatedAnalysis = data.updateAnalysisDoc;

        // Update the local analysisDocuments array with the changes
        const index = this.analyses.findIndex(doc => doc.id === updatedAnalysis.id);

        if (index !== -1) {
          this.analyses[index] = { ...updatedAnalysis };
        }

        console.log('Update successful:', updatedAnalysis);
      },
      (error) => {
        console.error('Update error:', error);
        // Handle error as needed
      }
    );
}





onFileSelected(event: any): void {
  const file: File = event.target.files[0];
  
  this.apollo.mutate<any>({
    mutation: UPLOAD_FILE,
    variables: {
      file
    },
    context: {
      useMultipart: true
    }
  })
  
    .subscribe(({ data }: any) => {
      console.log(data)
      this.imagePath = data.uploadFile.url;
      this.usecase = this.imagePath;
      this.isVisible = true;
      console.log(this.imagePath)
    });
}




  // -----------------------Design variables---------------------
   onClick(event :Event){
    this.btnValue=(<HTMLSelectElement>event.target).value
   }
   // app.component.ts

  
  selectedPhase: string | undefined;

  selectPhase(phase: string) {
    this.selectedPhase = phase;
  }
 
 closeForm(){
  this.showForm=false;
 }

 addNewDoc() {
  this.elements.push({/* Add initial properties for the new element */});
}


savingDoc()
{
  let obj={
    title:this.title,
    sd:this.sd,
    fd:this.fd,
    projectObj:this.projectObj,
    projectManager:this.projectManager,
    projectInfo:this.projectInfo,
    projectScopeStatement:this.projectScopeStatement
  }
  this.phase1.push(obj);
  console.log(this.phase1)
}


showDocumentDetails() {
this.show=true;
console.log(this.id)
}
// getDocument(id: string): Document | undefined {
//   return this.documents.find(doc => doc.id === id);

// }
// findDocument() {
//   this.foundDocument = this.getDocument(this.documentIdToFind);
// }

getDocument(id: string): Document  | undefined {
  return this.documents.find(doc => doc.id === id);
}

// getAnalysis(id: string): Analysis  | undefined {
//   return this.analyses.find(doc => doc.id === id);
// }

findDocument() {
  this.show=true;
  this.foundDocument = this.getDocument(this.documentIdToFind);
}


// findAnalysis() {
//   this.show=true;
//   this.foundAnalysis = this.getAnalysis(this.AnalysisIdToFind);
// }


findAnalysisDocument() {
  this.show=true;
  this.foundDocument = this.getDocument(this.AnalysisIdToFind);
}


  ///////design /////
  signupForm?: FormGroup;
 designPhase: any = {
  usecase: null,
  name: null,
};
file: any;
///gpt///
onSubmit(): void {
  // Check if the form is valid
  if (this.signupForm?.valid) {
    // Perform any additional form validation or processing if needed

    // Iterate through the form array controls (if applicable)
    const sddControls = (this.signupForm?.get('sdd') as FormArray)?.controls;

    if (sddControls) {
      for (let i = 0; i < sddControls.length; i++) {
        const fileControl = sddControls[i].get('fileImage');

        if (fileControl?.value) {
          // If a file is selected for this control, upload it
          this.uploadFile(fileControl.value as File,
            (data: any) => {
              // Handle successful upload if needed
              console.log(`File ${i + 1} uploaded successfully:`, data);
              console.log(data.data.uploadFileDes.url);
              this.pushStringIntoFormArray(data.data.uploadFileDes.url);
              const sddarray = this.signupForm!.get('sdd') as FormArray;
              // console.log(sddarray.value);
              // const filteredArray: any[] = sddarray.filter(item => item !== 'ignoreThis');
              
            },
            (error: any) => {
              // Handle upload error if needed
              console.error(`Error uploading file ${i + 1}:`, error);
            }
          );
        }
      }
      
    }

    // Continue with the rest of your form submission logic
  } else {
    // Handle the case where the form is not valid
    console.error('Form is not valid. Cannot submit.');
  }
}



////gpt/////

private createDesignDoc(designPhase: any) {
  return this.apollo.mutate<any>({
    mutation: CREATE_DESIGN_DOC,
    variables: {
      designPhase,
    },
  });
}




/////gpt/////
addSdd() {
  let control = new FormGroup({
    // 'name': new FormControl(null),
    'fileImage': new FormControl(null, Validators.required),
  });
  (this.signupForm?.get('sdd') as FormArray).push(control);
}

getControls() {
  return (this.signupForm?.get('sdd') as FormArray).controls;
}///gpt///


private uploadFile(file: File, successCallback: (data: any) => void, errorCallback: (error: any) => void): void {
  const formData = new FormData();
  formData.append('file', file);

  this.apollo.mutate<any>({
    mutation: UPLOAD_FILE_DES,
    variables: {
      file: formData.get('file'),
    },
    context: {
      useMultipart: true,
    },
  }).subscribe(
    (data) => {
      // Call the success callback with the response data
      successCallback(data);
    },
    (error) => {
      // Call the error callback with the error data
      errorCallback(error);
    }
  );
}

pushStringIntoFormArray(value: string) {
  const sddArray = this.signupForm!.get('sdd') as FormArray;
  sddArray.push(new FormControl(value));
}

onFileSelectedDes(event: any, controlIndex: number): void {
  const file: File = event.target.files[0];
  const fileControl = (this.signupForm?.get('sdd') as FormArray).at(controlIndex).get('fileImage');
  const reader = new FileReader();

  reader.onload = (e: any) => {
    const previewUrl = e.target.result;

    // Update the form array to trigger change detection
    this.signupForm?.get('sdd')?.updateValueAndValidity();
  };

  reader.readAsDataURL(file);

  if (fileControl) {
    fileControl.setValue(file);

    this.uploadFile(file, 
      (data: any) => {
        // Success callback
        console.log(data);
        this.imagePathDes = data.uploadFileDes.url;
        console.log("image path",this.imagePathDes );
        this.isVisible = true;
    
        // Clear the file input after successful upload
        this.clearFileInput(controlIndex);
      },
      (error: any) => {
        // Error callback
        console.error('Error uploading file:', error);
      }
    );
    
  }
}

clearFileInput(controlIndex: number): void {
  // Reset the value of the file input
  const fileInputElement = document.getElementById(`dImage${controlIndex}`) as HTMLInputElement;
  if (fileInputElement) {
    fileInputElement.value = '';

    // Optionally, you might want to update the form control value to an empty string
    const fileControl = (this.signupForm?.get('sdd') as FormArray).at(controlIndex).get('fileImage');
    if (fileControl) {
      fileControl.setValue('');
    }
  }
}













editDocument(document: Document) {
  this.edit=true;
  this.updateForm = {
    id: document.id,
    title: document.title,
    sd: document.sd,
    fd: document.fd,
    projectObj: document.projectObj,
    projectManager: document.projectManager,
    projectInfo: document.projectInfo,
    projectScopeStatement: document.projectScopeStatement,
  };
  
  }


  editAnalysisDocument(analysis: Analysis) {
    this.edit = true;
    this.updateAnalysisForm = {
      id: analysis.id,
      intro: analysis.intro,
      purpose: analysis.purpose,
      Audience: analysis.Audience,
      description: analysis.description,
      systemFeaturesandReq: analysis.systemFeaturesandReq,
      
    };
  }
  
  


  resetForm(form: NgForm): void {
    form.resetForm();  

    if (form === this.initiationForm) {
      this.title = '';
      this.sd = '';
      this.fd = '';
      this.projectObj = '';
      this.projectManager = '';
      this.projectInfo = '';
      this.projectScopeStatement = '';
    }

    if (form === this.requirementForm) {
      this.intro = '';
      this.purpose = '';
      this.Audience = '';
      this.description = '';
      this.systemFeaturesandReq = '';
      this.usecase = '';
    }

  }
  

}


///////////////////////test code///////////////////////////////