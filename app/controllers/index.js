function doClick() {
    alert("image clicked");
    Titanium.Media.openPhotoGallery({
        success: function () {},
        error: function (error) {},
        cancel: function() {},
        allowEditing: true,
        autohide: true,
        saveToPhotoGallery: true,
        animated: true,
        mediaTypes: [Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO],
        showControls: true
    });
}

function doClick2() {
	Titanium.Media.showCamera({
		success:function(event){

		},
		cancel:function(){
		
		},
		error:function(error){
			
		},
		saveToPhotoGallery:true,
		allowEditing:true,
		mediaTypes:[Ti.Media.MEDIA_TYPE_VIDEO,Ti.Media.MEDIA_TYPE_PHOTO],
	});
}
function doClick3() {
    var file = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "/" + 'name.png');
    var ca = Ti.UI.createAlertDialog({
           title: 'photo save',
           message: file,
           buttonNames: ['OK!', 'Cancel'],
           cancel: 1
    }); 
    ca.addEventListener('click', function(e){
        Ti.API.info(e.index);
    });
    ca.show();
    Titanium.Media.openPhotoGallery({
        success: function(event) {
            var check_alert = Ti.UI.createAlertDialog({
                   title: 'photo save',
                   message: file,
                   buttonNames: ['OK!', 'Cancel'],
                   cancel: 1
            }); 
            check_alert.addEventListener('click', function(e){
                Ti.API.info(e.index);
            });
            check_alert.show();
            if (!file.exists()) {
                file.createFile();
            }
            file.write(event.media);

            file.read();
        },
        error: function(error) {
        },
        cancel: function() {
        },
        saveToPhotoGallery:false,
        allowEditing: true,
        mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
    });
}

function doClick4() {
    var file = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "/" + 'name.png');
    var ca = Ti.UI.createAlertDialog({
           title: 'photo save',
           message: file,
           buttonNames: ['OK!', 'Cancel'],
           cancel: 1
    }); 
    ca.addEventListener('click', function(e){
        Ti.API.info(e.index);
    });
    ca.show();
    var check_alert = Ti.UI.createAlertDialog({
           title: 'photo show',
           message: file,
           buttonNames: ['OK!', 'Cancel'],
           cancel: 1
    }); 
    check_alert.addEventListener('click', function(e){
        Ti.API.info(e.index);
    });
    check_alert.show();



    var win = Ti.UI.createWindow({
        backgroundColor: 'black'
    });
    var cancel_btn = Titanium.UI.createButton({title: 'close', height: 40, width: 100});
    cancel_btn.addEventListener('click', function() {
        win.close();
    });
    win.rightNavButton = cancel_btn;

    var view = Ti.UI.createView();

    var image = Ti.UI.createImageView({
        image: file,
        width: 200,
    });

    view.add(image);
    win.add(view);
    win.open({
        modal:true,
        modalTransitionStyle: Titanium.UI.iPhone.MODAL_TRANSITION_STYLEFLIP_HORIZONTAL,
        modalStyle: Titanium.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
    });
}


//for ( var i=0; i<5; i++ ) {
//    var bgcolor = ( i % 2 ) ? true : false;
//    var row = Alloy.createController("row", {
//        id: i+1,
//        bgcolor: bgcolor
//    }).getView();
//    $.tableView.appendRow(row);
//}

$.index.open();
