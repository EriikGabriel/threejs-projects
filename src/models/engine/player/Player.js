import * as THREE from '../../../node_modules/three/src/Three.js'

export default class Player 
{
    constructor(height = 2) 
    {
		this.height = height
	}

    playerControls(event, moveForward, moveBackward, moveLeft, moveRight, canJump, velocity) {
		var forward = moveForward
		var backward = moveBackward
		var left = moveLeft
		var right = moveRight
		var jump = canJump

		if(event != undefined) {
			if(event.type == 'keydown') {
				onKeyDown(event)
			} else if(event.type == 'keyup') {
				onKeyUp(event)
			}
		}
		
		function onKeyDown(event) {
			switch (event.keyCode) {
				case 38: // up
				case 87: // w
				forward = true;
				break;
	
				case 37: // left
				case 65: // a
				left = true;
				break;
	
				case 40: // down
				case 83: // s
				backward = true;
				break;
	
				case 39: // right
				case 68: // d
				right = true;
				break;
	
				case 32: // space
				if (jump === true) velocity.y += 350;
				jump = false;
				break;
			}
		}
		
		function onKeyUp() {
			switch (event.keyCode) {
				case 38: // up
				case 87: // w
				forward = false;
				break;

				case 37: // left
				case 65: // a
				left = false;
				break;

				case 40: // down
				case 83: // s
				backward = false;
				break;

				case 39: // right
				case 68: // d
				right = false;
				break;
			}
		}
		
		return { forward, backward, left, right, jump }
    }
}