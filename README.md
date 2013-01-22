Client
=====

[animation.js](https://github.com/browserquest/BrowserQuest/blob/master/client/js/animation.js)
------------

    init: { this.reset() }
    tick: { this.endcount_callback() }
    setSpeed: { }
    setCount { }
    isTimeToAnimate: { }
    update: { }
    reset: { }
    
[app.js](https://github.com/browserquest/BrowserQuest/blob/master/client/js/app.js)
------
[Game](https://github.com/Niftykins/quest/edit/master/README.md#gamejs)
[Storage](https://github.com/Niftykins/quest/edit/master/README.md#storagejs)
[Map](https://github.com/Niftykins/quest/edit/master/README.md#mapjs)
[Renderer](https://github.com/Niftykins/quest/edit/master/README.md#rendererjs)
[Player](https://github.com/Niftykins/quest/edit/master/README.md#playerjs)

    init: { this.storage = new Storage() }
    setGame: { }
    center: { }
    canStartGame: { this.game.map.isLoaded }
    tryStartingGame: { if(self.canStartGame()) self.startGame(name, callback) }
    startGame: { this.hideIntro(function() { self.start(name); }); }
    start: { 
        firstTime = !self.storage.hasAlreadyPlayed();
        if(!this.game.started) {
            this.game.setServerOtions(...);
            this.center();
            this.game.run(function() { self.toggleInstructions() });
        }
    }
    setMouseCoordinates: { var scale/width/height = this.game.renderer.getScaleFactor()/getWidth()/getHeight();
        mouse = this.game.mouse; }
    initHealthBar: { var scale = this.game.renderer.getScaleFactor(); this.game.onPlayerHealthChange(...);
        this.game.onPlayerHurt(this.blinkHealthBar.bind(this)); }
    blinkHealthBar: { }
    toggleButton: { }
    hideIntro: { }
    showChat: { if(this.game.started) {...} }
    hideChat: { if(this.game.started) {...} }
    toggleInstructions: { this.toggleAchivements() }
    toggleAchivements: { this.toggleInstructions(); this.resetPage(); }
    resetPage: { }
    initEquipmentIcons: { var scale = this.game.renderer.getScaleFactor(), weapon = this.g.player.getWeaponName(),
        armor = this.g.p.getSpriteName(); }
    hideWindows: { this.toggleAchivements(); this.toggleInstructions(); this.closeInGameScroll(); x3 }
    showAchievementNotifcations: if(this.g.s.getAchivementCount === 1) {...} }
    displayUnlockedAchievement: { var achievement = this.g.getAchievementById(id); this.setAchievementData(...) }
    unlockAchievement: { this.showAchievementNotifications(...); this.displayUnlockedAchievement(id); }
    initAchievementList: { if(!achievement.hidden) self.setAchievementData(...); }
    initUnlockedAchievements: { self.displayUnlockedAchivements(id); }
    setAchivementData: { }
    toggleScrollContent: { if (this.g.started) { .. if(!this.g.player) ... ..} else { this.animateParchment(...) } }
    closeInGameScroll: { if(!this.g.player) ... }
    togglePopulationInfo: { }
    openPopup: { }
    animateParchment: { }
    animateMessages: { }
    resetMessagesPosition: { }
    showMessage: { this.animateMessages(); this.resetMessageTimer(); }
    resetMessageTimer: { }
    resizeUI: { if(this.g) { if(this.g.started) { this.g.resize(); this.initHealthBar(); this.g.updateBars(); }
        else { var newScale = this.g.r.getScaleFactor(); this.g.r.rescale(newScale); } } }
    
[area.js](https://github.com/browserquest/BrowserQuest/blob/master/client/js/area.js)
-------

    init: { }
    contains: { }

[audio.js](https://github.com/browserquest/BrowserQuest/blob/master/client/js/audio.js)
--------

game.js
-------
