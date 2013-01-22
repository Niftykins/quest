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

    init: { this.storage = new Storage() }
    setGame: { }
    center: { }
    canStartGame: { this.game.map.isLoaded }
    tryStartingGame: { if(self.canStartGame()) self.startGame(name, callback) }
    startGame: { this.hideIntro(function() { self.game.loadMap(); self.start(name); }) }
    start: { self.toggleInstructions() }
    setMouseCoordinates: {
    
game.js
-------
