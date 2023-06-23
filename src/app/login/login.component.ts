import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private route: Router) {}

  email: string = '';
  password: string = '';
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  Login() {
    if (this.email === 'admin@gmail.com' && this.password === 'admin') {
      // this.route.navigate(['/post', 'add']);
      window.location.href =
        'https://www.youtube.com/watch?v=3qBXWUpoPHo&t=42090s';

      //navigate using url
      // this.route.navigateByUrl('/rooms/add');
    }
  }
}
