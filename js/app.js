
import {TabForm} from './tab-form.js';
export class App {
    constructor(link) {
      //console.log("Démarrage de l'application");
      const adminLink=document.getElementById('admin');
      adminLink.addEventListener('click',(e)=>{
        e.preventDefault();
        history.pushState(null,'', 'admin')
        TabForm.renderForm();
      })
      
    }
  }