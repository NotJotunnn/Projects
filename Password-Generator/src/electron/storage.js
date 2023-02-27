const Store = require('electron-store');

const store = new Store();


const Theme = () => {

    function getTheme() {
        var darkmode = store.get('darkmode')
        
        if(darkmode) return darkmode;
        else {
            return store.set('darkmode', 'dark')
        }
    }

} 

module.export = Theme;