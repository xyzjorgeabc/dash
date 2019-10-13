const ASSET_DIR = 'sprites/';
function read_sprite(nombre_archivo) {
  return fetch(ASSET_DIR + nombre_archivo)
  .then(function(resp) {
      if (resp.ok) {
        return resp.blob({type: 'image/png'});
      }
  })
  .then(function (blob) {
    return URL.createObjectURL(blob);
  });
}

class Emisor {

  constructor () {
    this.listeners = new Set();
  }
  suscribir (func) {
    this.listeners.add(func);
    return {
      desuscribir: () => {
        this.listeners.delete(func);
      }
    };
  }
  emitir(data) {
    this.listeners.forEach((func)=>{
      func(data);
    });
  }
}