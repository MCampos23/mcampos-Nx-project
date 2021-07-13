import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UsersService, User } from '@mcampos/users';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';


@Component({
  selector: 'admin-users-form',
  templateUrl: './users-form.component.html',
  styles: [
  ]
})
export class UsersFormComponent implements OnInit {

  form!: FormGroup;
  isSubmitted = false;
  editMode = false;
  currentUserID!: string;
  countries:any;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private messageService: MessageService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._initForm();
    this._getCountries();
    this._checkEditMode();
   
  }

  private _getCountries(){
   
    this.countries = this.usersService.getCountries()
    
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) {
        return;
    }
    const user: User = {
        id: this.currentUserID,
        name: this.userForm.name.value,
        email: this.userForm.email.value,
        password: this.userForm.password.value,
        phone: this.userForm.phone.value,
        isAdmin: this.userForm.isAdmin.value,
        street: this.userForm.street.value,
        apartment: this.userForm.apartment.value,
        zip: this.userForm.zip.value,
        city: this.userForm.city.value,
        country: this.userForm.country.value,
       

    };
    if (this.editMode) {
        this._updateUser(user);
    } else {
       this._addUser(user);
    }
}
private _updateUser(user: User) {
  this.usersService.updateUser(user).subscribe(
      (user) => {
          this.messageService.add({ severity: 'success', summary: 'Usuario editado', detail: `Usuario ${user.name} editada con éxito` });
          timer(2000)
              .toPromise()
              .then(() => {
                  this.location.back();
              });
      },
      () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo editar el usuario' });
      }
  );
}
private _addUser(user: User) {
  this.usersService.createUser(user).subscribe(
      () => {
          this.messageService.add({ severity: 'success', summary: 'Usuario creado', detail: 'Usuario creado con éxito' });
          timer(2000)
              .toPromise()
              .then(() => {
                  this.location.back();
              });
      },
      () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudo crear el usuario' });
      }
  );
}


private _checkEditMode() {
  this.route.params.subscribe((params) => {
      if (params.id) {
          this.editMode = true;
          this.currentUserID = params.id;
          this.usersService.getUser(params.id).subscribe((user) => {
              this.userForm.name.setValue(user.name);
              this.userForm.email.setValue(user.email);
              this.userForm.phone.setValue(user.phone);
              this.userForm.isAdmin.setValue(user.isAdmin);
              this.userForm.street.setValue(user.street);
              this.userForm.apartment.setValue(user.apartment);
              this.userForm.zip.setValue(user.zip);
              this.userForm.city.setValue(user.city);
              this.userForm.country.setValue(user.country);
              this.userForm.password.setValidators([]);
              this.userForm.password.updateValueAndValidity();
            
          });
      }
  });
}

private _initForm() {
  this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['',[ Validators.required, Validators.email]],
      password: ['', Validators.required],
      phone: ['', Validators.required],
      isAdmin: [ false ],
      street: [''],
      apartment: [''],
      zip: [''],
      city: [''],
      country: ['']
  });
}

get userForm() {
  return this.form.controls;
}

}
