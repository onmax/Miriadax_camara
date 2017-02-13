var app = {
	inicio: function(){
		this.iniciaFastClick();
		this.inciaBotones();
	},
	
	iniciaFastClick: function(){
		FastClick.attach(document.body);
	},
	
	inciaBotones: function(){
		var buttonAction = document.querySelector('#button-action');
		buttonAction.addEventListener('click', function(){
			app.cargarFoto(Camera.PictureSourceType.CAMERA, Camera.Direction);
		});
		
		var filterButtons = document.querySelectorAll('.button-filter');
		filterButtons[0].addEventListener('click', function(){
			app.aplicaFiltro('gray');
		});
		filterButtons[1].addEventListener('click', function(){
			app.aplicaFiltro('negative');
		});
		filterButtons[2].addEventListener('click', function(){
			app.aplicaFiltro('sepia');
		});
		
		var buttonGallery = document.querySelector('#button-gallery');
		buttonGallery.addEventListener('click', function(){
			app.cargarFoto(Camera.PictureSourceType.PHOTOLIBRARY);
    	});

	},
	
	cargarFoto: function(pictureSourceType){
		var opciones = {
		  quality: 100,
		  sourceType: pictureSourceType,
		  destinationType: Camera.DestinationType.FILE_URI,
		  targetWidth: 300,
		  targetHeight: 300,
		  correctOrientation: true,
		  cameraDirection: 1,
		  saveToPhotoAlbum: true
		};
		navigator.camera.getPicture(app.fotoCargada, app.errorAlCargarFoto, opciones);
  	},
	
//FOTO PARA MOSTRARLA EN LA IMAGEN DE INDEX.HTML
//	fotoTomada: function(imageURI){
//		var image = document.querySelector('#foto');
//		image.src = imageURI;
//	},
	
	//Esto es para mostrarlo con canvas
	fotoCargada: function(imageURI) {
		var img = document.createElement('img');
		img.onload = function(){
		  app.pintarFoto(img);
		}
		img.src = imageURI;
  	},
	
	pintarFoto: function(img){
		var canvas = document.querySelector('#foto');
		var context = canvas.getContext('2d');
		canvas.width = img.width;
		canvas.height = img.height;
		context.drawImage(img, 0, 0, img.width, img.height);
	},
	//________________HASTA AQUI_________________________
	
	errorAlCargarFoto: function(message){
		console.log('Fallo al tomar foto o toma cancelada: ' + message);
	},
	
	aplicaFiltro: function(filterName){
		var canvas = document.querySelector('#foto');
		var context = canvas.getContext('2d');
		imageData = context.getImageData(0,0,canvas.width, canvas.height);
		
		effects[filterName](imageData.data);
		
		context.putImageData(imageData, 0, 0);
	}
};

if('addEventListener' in document){
	document.addEventListener('DOMContentLoaded', function(){
		app.inicio();
	}, false);
}