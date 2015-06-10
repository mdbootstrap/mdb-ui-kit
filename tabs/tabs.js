var MaterialTabs = function (elem) {
    //get tab objects and store as pane + tab
    var activeTabObject;

    var TabObject = function () {
        var self = this;
        this.tab; //element
        this.pane; //element
        this.setClick = function () {
            self.tab.addEventListener('click', self.showThisTab)
        };

        this.showThisTab = function () {
            if (self !== activeTabObject) {
                //change the tab page and update the active tab
                activeTabObject.pane.className = activeTabObject.pane.className.replace('active-page', '');
                activeTabObject.tab.className = activeTabObject.tab.className.replace('active', '');
                self.pane.className = self.pane.className + ' active-page';
                self.tab.className = self.tab.className + ' active';
                activeTabObject = self;
            }
        };
    };

    var ul = elem;
    var i;
    var items = ul.getElementsByTagName("li");
    for (i = 0; i < items.length; ++i) {
        var tab = new TabObject();
        tab.tab = items[i];
        var classString = items[i].className;
        var className = classString.split(' ')[0];
        tab.pane = document.getElementById(className);
        tab.setClick();
        if (classString.indexOf('active') > -1) {
            activeTabObject = tab;
        }
    }

};
