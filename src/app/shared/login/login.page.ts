import { AuthService } from './../../services/auth.service';
import { Persona } from './../../modelo/persona';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: Persona = new Persona();

  constructor(
    public afs: AngularFirestore,
    public toastController: ToastController,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  async onLogin() {
    
    let persona = [];
     
    /** Crea un mensaje */
    const toast = this.toastController.create({
      message: `Verificando credenciales`,
      duration: 2000,
    });

    (await toast).present(); // Muestra el mensaje

    const login = await this.authService.onLogin(this.user.email, this.user.password); // Inicia al usuario con Email & Password

    this.router.navigate(['inicio']);
  }

  signUp() {
    this.router.navigate(['register']);
  }

}
