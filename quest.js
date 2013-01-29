jaws.onload = function() {
	jaws.unpack();
	jaws.assets.add(["sprites/goldensword.json", "sprites/goldenarmor.json"]);
	jaws.assets.add(["img/goldenarmor.png", "img/goldensword.png"]);
	jaws.start(lolQuest, {fps: 30});
}

function lolQuest() {
	var player;
	var sword;
	var cursor = {};
	var tile_size = 32;
	var tile_map;
	var path;
	var go_to;

	this.setup = function() {

		this.sprites = function() {
			player = new jaws.Sprite({x: 240, y: 233, anchor: "center"});
			player.move = function(x,y) {
				this.x += x;
				this.y += y;
				this.grid = mapTile(this.x, this.y);
				sword.x = this.x;
				sword.y = this.y;
			}
			player.action = "idle_down";
			player.flipped = 0;
			player.id = "goldenarmor"
			parse(player);

			sword = new jaws.Sprite({x: 240, y: 233, anchor: "center"});
			sword.move = function(x,y) { this.x += x; this.y += y; }
			sword.action = "idle_down";
			sword.flipped = 0;
			sword.id = "goldensword"
			parse(sword);
		} // end of sprite

		/* Event Setup */
		$("#kek").bind('mousemove',function(e) {
        	cursor.x = jaws.mouse_x;
        	cursor.y = jaws.mouse_y;
        	cursor.grid = [Math.floor(cursor.x/tile_size), Math.floor(cursor.y/tile_size)];
        });
        $("#kek").click(function() {
			var start = tile_map.nodes[player.grid[0]][player.grid[1]];
			var end = tile_map.nodes[cursor.grid[0]][cursor.grid[1]];
			path = astar.search(tile_map.nodes, start, end);
			player.is_moving = true;
			player.time = $.now();
		});
        /* End of Event Setup */

        this.grid = function() {
	        var grid = [];
		    for(var i = 0; i < 832/32; i++) {
		        grid[i] = [];
		        for(var j = 0; j < 512/32; j++) {
		            grid[i][j] = 1;
		        }
		    }
		    tile_map = new Graph(grid);
		} // end of grid

		this.sprites();
		this.grid();
	} // end of setup

	this.update = function () {
		var move = 70 / jaws.game_loop.fps / (1+1/jaws.game_loop.tick_duration);
		if (move > 20)	return; // stops it being jumpy initially

		textUpdate(move);
		

		// go_to = path.shift()
		// work out direction from player to go_to
		// walk to that spot, repeat for all
		// callback for when its arrive to trigger repeat?

		// is moving, has nodes to go to, and after delay
		if(player.is_moving && path.length != 0 && $.now()-player.time>200) {
			go_to = path.shift()
			moveDirection(player.grid, go_to, player);

			player.time = $.now();
		}
		
		//ifs
		sword.action = player.action;
		sword.flipped = player.flipped;

		try {
			player.setImage(player[player.action].next());
			sword.setImage(sword[sword.action].next());
		} catch(e) {};

		switch(player.action) {
			case "walk_right": player.action = "idle_right"; break;
			case "walk_up": player.action = "idle_up"; player.flipped = 0; break;
			case "walk_down": player.action = "idle_down"; player.flipped = 0; break;
		}
	} //end of update

	this.draw = function () {
		jaws.clear();
		if(player.action == "idle_up" || player.action == "walk_up") {
			sword.draw();
			player.draw();
		} else { player.draw(); sword.draw(); }

		if(cursor.grid)
			jaws.context.strokeRect(cursor.grid[0]*tile_size, cursor.grid[1]*tile_size, tile_size, tile_size);
	} //end of draw

	function parse(sprite) {
		var file = "sprites/"+sprite.id+".json";

		$.getJSON(file, function(data) {
			var sheet = new jaws.SpriteSheet({
				image: "img/"+sprite.id+".png",
				frame_size: [data.width,data.height],
				orientation: "right"
			});

			var anim = new jaws.Animation({
				frames: sheet.frames,
				frame_duration: data.duration
			});

			for(var name in data.animations) {
				var a = data.animations[name];
				sprite[name] = anim.slice(a.start, a.stop);
			}

			sprite.grid = mapTile(sprite.x, sprite.y);
			sprite.setImage(sprite[sprite.action].next());
			//console.log(sprite.id)
		});
	} // end of parse

	function mapTile(x, y) {
		return [Math.floor(x/tile_size), Math.floor(y/tile_size)];
	} // end of mapTile

	function textUpdate(move) {
	//	$("#fps").html("fps: "+ jaws.game_loop.fps);
	//	$("#tick").html("tick: "+ jaws.game_loop.tick_duration);
	//	$("#speed").html("<br>speed: "+ move);
		$("#speed2").html("<br>p/s: "+ Math.floor(move*jaws.game_loop.fps));
		if (cursor.grid) {
			$("#mouse").html("<br>x: "+cursor.x+" y: "+cursor.y+
				"<br>cx: "+cursor.grid[0]+" cy: "+cursor.grid[1]+
				"<br>px: "+player.grid[0]+" py: "+player.grid[1]);
		}
	} // end of textUpdate

	function moveDirection(from, to, sprite) {
		var fx = from[0], fy = from[1],	tx = to.x, ty = to.y;
		
		if(fx < tx)		 return "right";
		else if(fx > tx) return "left";
		else if(fy > ty) return "up";
		else if(fy < ty) return "down";
	}

} // end of lolQuest

 /* Speeds
this.atkSpeed = 50;
this.moveSpeed = 120;
this.walkSpeed = 100;
this.idleSpeed = 450;
this.setAttackRate(800);




if(jaws.pressed("left") || jaws.pressed("a"))  {
			player.move(-move,0); sword.move(-move,0);
			player.action = "walk_right";
			player.flipped = sword.flipped = 1;
		} else if(jaws.pressed("right") || jaws.pressed("d")) { 
			player.move(move,0); sword.move(move,0);
			player.action = "walk_right";
			player.flipped = sword.flipped = 0;
		} else if(jaws.pressed("up") || jaws.pressed("w")) {
			player.move(0, -move); sword.move(0,-move);
			player.action = "walk_up";
			player.flipped = sword.flipped = 0;
		} else if(jaws.pressed("down") || jaws.pressed("s")) {
			player.move(0, move); sword.move(0,move);
			player.action = "walk_down";
			player.flipped = sword.flipped = 0;
		}

		if(fx < tx)		 { sprite.move(32,0); sprite.action = "walk_right"; player.flipped = 0;}
		else if(fx > tx) { sprite.move(-32,0); sprite.action = "walk_right"; sprite.flipped = 1;	}
		else if(fy > ty) { sprite.move(0,-32); sprite.action = "walk_up"; }
		else if(fy < ty) { sprite.move(0,32); sprite.action = "walk_down"; }
*/