import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User, UsersService } from '@mcampos/users'
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'admin-users-list',
  templateUrl: './users-list.component.html',
  styles: [
  ]
})
export class UsersListComponent implements OnInit {
  
  users: User[] = []

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

  deleteUser(userId: string) {

    this.confirmationService.confirm({
      message: '¿Seguro que quieres eliminar este usuario?',
      header: 'Eliminar Usuario',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.usersService.deleteUser(userId).subscribe(
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

  private _getUsers(){
    this.usersService.getUsers().subscribe( user => {
      this.users = user;
    })
  }

}
