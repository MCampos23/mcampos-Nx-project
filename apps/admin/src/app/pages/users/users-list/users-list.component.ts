import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@mcampos/users'
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styles: [
  ]
})
export class UsersListComponent implements OnInit, OnDestroy {
  
  users: User[] = []
  endsubs$: Subject<any> = new Subject();


  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { 
    
  }

  ngOnInit(): void {
   
   this._getUsers()
  }

  ngOnDestroy() {
    this.endsubs$.next();
    this.endsubs$.complete();
  }
  deleteUser(userId: string) {

    this.confirmationService.confirm({
      message: '¿Seguro que quieres eliminar este usuario?',
      header: 'Eliminar Usuario',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService
          .deleteUser(userId)
          .pipe(takeUntil(this.endsubs$))
          .subscribe(
          () =>{
            this._getUsers()
            this.messageService.add(
              {severity:'success', summary:'Usuario eliminado', detail:'Usuario eliminada con éxito'}
              );
             
          },
          () =>{
            this.messageService.add(
              {severity:'error', summary:'Error', detail:'No se pudo eliminar el usuario'}
              );
          }
        )
      }     
  });
  }
  updateUser(userId: string){
    this.router.navigateByUrl(`users/form/${userId}`)
  }

  getCountryName(countryKey: string){
    if(countryKey) return this.usersService.getCountry(countryKey)
    else return
  } 

  private _getUsers(){
    this.usersService
      .getUsers()
      .pipe(takeUntil(this.endsubs$))
      .subscribe( user => {
      this.users = user;      
      })     
          
   
  }

}
