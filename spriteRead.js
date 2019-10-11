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

