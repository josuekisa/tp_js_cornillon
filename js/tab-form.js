import { Tab } from './tab.js';

export class TabForm {
  static form = document.createElement('form');
  
  static {
    this.#createForm();
    this.form.addEventListener('submit', e => {
      e.preventDefault();
      const tabLabel = this.form.tabLabel.value;
      const tabLink = this.form.tabLink.value;
      const tabParent = this.form.tabParent.value;
      const tabView = this.form.tabView.value;

      if (tabLabel && tabLink && tabView) {
        new Tab(tabLabel, tabLink).htmlView = tabView;
        TabForm.#createForm()
        this.form.reset();
      }
    });
  }

  static #createForm() {
    this.form.innerHTML = `
      <input
        type="text"
        name="tabLabel"
        autocomplete="off"
        placeholder="Nom de l'onglet">
      <input
        type="text"
        name="tabLink"
        autocomplete="off"
        placeholder="Route de l'onglet">
      <select name="tabParent">
        <option value="">Choisissez l'onglet parent</option>
        ${Tab.mainTabs.map(({ label }) => `
          <option value="${label}">${label}</option>
        `).join('')}
      </select>
      <textarea
        name="tabView"
        rows="6"
        placeholder="Vue HTML rattachée à l'onglet"></textarea>
      <button type="submit">Créer l'onglet</button> 
    `;
  }

  static renderForm() {
    const mainDiv = document.querySelector('main');
    mainDiv.innerHTML = "<h1>Création d'un nouvel onglet</h1>";
    mainDiv.appendChild(this.form);
  }
}