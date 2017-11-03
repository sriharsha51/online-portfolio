import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {


  form;
  message: string;
  messageClass: string;

  constructor(private formBuilder: FormBuilder,
              private messageService: MessageService) { }

  ngOnInit() : void {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required,
                  Validators.minLength(3),
                  Validators.maxLength(30),
                  this.validateName]],
      email: ['', [Validators.required, 
                  Validators.minLength(5), 
                  Validators.maxLength(50),
                  this.validateEmail]],
      message: ['', [Validators.required,
                  Validators.maxLength(500),
                  Validators.minLength(5)]]
                })
  }


  disableForm() {
    this.form.controls['email'].disable();
    this.form.controls['name'].disable();
    this.form.controls['message'].disable();
   }
 
   enableForm() {
     this.form.controls['email'].enable();
     this.form.controls['name'].enable();
     this.form.controls['message'].enable();    
    }
 
   validateEmail(controls) {
     const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
     if (regExp.test(controls.value)) {
       return null; 
         } else {
       return { 'validateEmail': true } 
     }
   }

   validateName(controls) {
    const regExp = new RegExp(/^[a-zA-Z]+$/);
    if (regExp.test(controls.value)) {
      return null; 
    } else {
      return { 'validateName': true } 
    }
  }

  onSubmit() {
    this.disableForm();
    const message = {
      name: this.form.get('name').value,
      email: this.form.get('email').value,
      message: this.form.get('message').value
    }
    this.messageService.submitMessage(message).subscribe(data => {
      if(!data.success) {//data is from back end api
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.enableForm();
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        setTimeout(() => {
          this.enableForm();
        }, 2000);
      }  
    });
  }
}
