import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user: any = {};

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  submitForm() {
    this.userService.addUser(this.user).subscribe(newUser => {
      console.log('Utilisateur ajouté avec succès');
    });
  }
}