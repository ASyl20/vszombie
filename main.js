// Creation d'un objet Phaser
// Avec taille du plateau
var game = new Phaser.Game(600,600)

// déclaration de la vitesse du perosnnage
var vitesse = 500
// variable du jeu

var dodger = {
    // Le preload permet de charger avant que le jeu soit lancer
  preload : function(){
    // Chargement image
    // On charge l'image de fond
    // chargement des personnages
    game.load.image('fond','assets/fond.png')
    game.load.image('player','assets/player.png')
    game.load.image('mechant','assets/mechant.png')
  },
  create: function(){
    // tout le setup du jeu jeu plus l'affichage
    // ajout de la physique dans le jeu
    game.physics.startSystem(Phaser.Physics.ARCADE)
    // Pour afficher l'image
    game.add.sprite(0,0,'fond')
    // on affiche le joueur mais on le garde aussi dans une variable
    // pour l'utiliser partout
    // Pour le center
    this.player = game.add.sprite(300,500,'player')
    // Pour que le joueur soit bien au centre
    // et pour qu'il ne soit pas static et qu'on puisse l'animé
    this.player.anchor.set(0.5)
    // On rajoute la physique au joueur
    game.physics.arcade.enable(this.player)

    // function qui va permet d'attriver différentes touches a un objet pour se déplacer
    this.cursor = game.input.keyboard.createCursorKeys()

    // Va nous ajouter un groupe de mechant
    this.mechants = game.add.group()

    // chaque x temps on fait tomber un mechant
    // this => au jeu
    this.timer = game.time.events.loop(200,this.ajouterUnMechant,this)

    // Creation du score
    this.score = 0
    this.labelScore = game.add.text(20,20,'0',{font: '30 px Arial', fill : '#fff'})
  },
  update: function(){
    // Logique du jeu
    // Gestion des collisions
    // Si les deux objet se rencontre appeler restartGame
    // null c'est si on veut appeler une autre function
    // this => dans ce jeu
    game.physics.arcade.overlap(this.player, this.mechants,this.restartGame,null,this)



    // La function update se recharge 60 fois par seconde
    // Si j'appuie sur rien le joueur s'arrete
    this.player.body.velocity.x = 0;
    this.player.body.velocity.y = 0;
    // Quand la touche gauche est enfoncé
      if(this.cursor.left.isDown){
        // plus la vélocité va augmenter
          this.player.body.velocity.x = vitesse * -1
      }
    // Quand la touche droite est enfoncé
      if(this.cursor.right.isDown){
        // plus la vélocité va augmenter
          this.player.body.velocity.x = vitesse
      }
    // Quand la touche haut est enfoncé
      if(this.cursor.up.isDown){
        // plus la vélocité va augmenter
          this.player.body.velocity.y = vitesse * -1
      }
    // Quand la touche bas est enfoncé
      if(this.cursor.down.isDown){
        // plus la vélocité va augmenter
          this.player.body.velocity.y = vitesse
      }
   // Si le personnage n'est plus dans le monde on recommence le jeu
    if(this.player.inWorld == false ){
          this.restartGame()
    }
  },
  restartGame:function(){
    // Function qui sert a recommencé le jeu
     game.state.start('dodger')
  },
  ajouterUnMechant: function(){
    // gestion de la position des mechants
    // 550 est a peu pres la taille de l'écran
    var position = Math.floor(Math.random() * 550 ) + 1
    var mechant = game.add.sprite(position,-50,'mechant')
    game.physics.arcade.enable(mechant)
    // Ajout de la gravité sur les mechants
    mechant.body.gravity.y = 200
    // On rajoute un mechant dans le groupe de mechants
    this.mechants.add(mechant)

    // Mise a jour du score
      this.score += 20
      this.labelScore.text = this.score

    // destruction de mechant pour ne pas charger la memoire
    // vérifie ou est le mechant
    mechant.checkWorldBounds = true
    // Si le mechant est hors du jeu on le kill
    mechant.outOfBoundsKill = true
  }
}

// On prend l'état du jeu
// On rajoute l'objet
game.state.add('dodger',dodger)
// On lance le jeu
game.state.start('dodger')
