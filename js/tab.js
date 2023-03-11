export class Tab {
    static nav = document.querySelector('nav');
    static mainTabs = [];
    htmlTag = document.createElement('div');
    htmlView = '';
  
    static {
      const homeTab = new Tab('Accueil', '/');
      homeTab.htmlView = '<h1>Bienvenue !</h1>';
    }
  
    constructor(label, link,parentTab) {
      this.label = label;
      this.link = link;
      this.parentTab= parentTab;
      if (label, link) this.#buildHTML();
    }
  
    #buildHTML() {
      
      const className = this.parentTab
      ? 'subtab'
      : 'tab';
        
      
      this.htmlTag.innerHTML = this.label;
      this.htmlTag.className = 'tab';
      this.htmlTag.addEventListener('click', () => {
        this.renderView();
      });
      
      Tab.nav.appendChild(this.htmlTag);
    }
  
    renderView() {
      // Modification de l'url
      history.pushState(null, '', this.link);
      // Injection de la vue liée à l'onglet
      document
        .querySelector('main')
        .innerHTML = this.htmlView;
    }
  }