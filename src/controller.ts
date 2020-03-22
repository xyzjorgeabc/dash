document.addEventListener('keydown', keyListener);
document.addEventListener('keyup', keyListener);

function keyListener(e: KeyboardEvent): void {
  const pressed = e.type === 'keydown';
  const key = +e.which;

  switch (key) {
    case 16:
      CONTROLLER.shield = pressed;
    break;
    case 17:
      CONTROLLER.attack = pressed;
    break;
    case 37:
      CONTROLLER.left = pressed;
    break;
    case 38:
      CONTROLLER.up = pressed;
    break;
    case 39:
      CONTROLLER.right = pressed;
    break;
    case 40:
      CONTROLLER.down = pressed;
    break;
  }
}

class Controller {
  public shield: boolean;
  public attack: boolean;
  public left: boolean;
  public right: boolean;
  public up: boolean;
  public down: boolean;

  constructor(){
    this.attack = false;
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
    this.shield = false;
  }
}

export const CONTROLLER = new Controller();