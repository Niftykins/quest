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

[bubble.js](https://github.com/browserquest/BrowserQuest/blob/master/client/js/bubble.js)
---------
    Bubble {
        init: { }
        isOver: { }
        destroy: { }
        reset: { }
    }
    BubbleManager {
        init: { }
        getBubbleById: { }
        create: { this.bubbles[id].reset(time); this.bubbles[id] = new Bubble(...); }
        update: { bubble.destroy(); }
        clean: { bubble.destroy(); }
        destroyBubble: { var bubble = this.getBubbleById(id); bubble.destroy(); }
        forEachBubble: { }
    }
    
[camera.js](https://github.com/browserquest/BrowserQuest/blob/master/client/js/camera.js)
--------
[Renderer](https://github.com/Niftykins/quest/edit/master/README.md#rendererjs)

    init: function(renderer) { this.renderer = renderer; this.rescale(); }
    rescale: { this.renderer.mobile }
    setPosition: { }
    setGridPosition: { }
    lookAt: { this.renderer.tilesize; this.setPosition(x,y); }
    forEachVisiblePosition: { }
    isVisible: { return this.VisibilePosition(...) }
    isVisiblePosition: { }
    focusEntity: { this.setGridPosition(x,y) }
    
[character.js](https://github.com/browserquest/BrowserQuest/blob/master/client/js/character.js)
------------
[Entity](https://github.com/Niftykins/quest/edit/master/README.md#entityjs)
[Transition](https://github.com/Niftykins/quest/edit/master/README.md#transitions)

    extendeds Entity
    init: { this._super(...}; this.movement = new Transition(); }
    clean: { this.forEachAttacker(...) }
    setMaxHitPoints: { }
    setDefaultAnimation: { this.idle() }
    hasWeapon: { }
    hasShadow: { }
    animate: { this.setAnimation(...) }
    turnTo: { this.idle() }
    setOrientation: { }
    idle: { this.setOrientation(orientation); this.animate("idle", this.idleSpeed) }
    hit: { this.setOrientation(orient); this.animate("atk", this.atkSpeed,1) }
    walk: { this.setOrient(orient); this.animate("walk", this.walkSpeed) }
    moveTo_: { if(this.isMoving()) this.continueTo(x,y); else { var path = this.requestPathfindingTo(x,y); this.followPath(path) }
    requestPathfindingTo: { }
    onRequestPath: { }
    onStartPathing: { }
    onStopPathing: { }
    followPath: { this.nextStep() }
    continueTo: { }
    updateMovement: { this.Walk(l/r/u/d) }
    updatePositionOnGrid: { this.setGridPositon(...) }
    nextStep: {
        if(this.isMoving()) {
            this.updatePositionOnGrid(); this.checkAggro();
        } else { 
            if(this.hasNextStep()) {
                .. if(this.hasChangedItsPath()) {
                    path = this.requestPathfindingTo(x,y); this.followPath(path);
                } else if(this.hasNextStep()) { this.updateMovement(); }
            }
        } if(stop) this.idle();
    }
    onBeforeStep: { }
    onStep: { }
    isMoving: { }
    hasNextStep: { }
    hasChangedItsPath: { }
    isNear: { }
    onAggro: { }
    onCheckAggro: { }
    aggro: { }
    onDeath: { }
    lookAtTarget: { this.turnTo(this.getOrientationTo(this.target)) }
    go: { if(this.isAttacking()) this.disengage();      this.moveTo(x,y) }
    follow: { this.moveTo_(...) }
    stop: { if(this.isMoving()) }
    engage: { this.setTarget(char); this.follow(char); }
    disengage: { this.removeTarget(); }
    isAttacking: { }
    getOrientationTo: { }
    isAttackedBy: { }
    addAttacker: 
    
    
    
    
    
    
    
    
    
    
    
    
