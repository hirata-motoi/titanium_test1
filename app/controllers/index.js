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

//for ( var i=0; i<5; i++ ) {
//    var bgcolor = ( i % 2 ) ? true : false;
//    var row = Alloy.createController("row", {
//        id: i+1,
//        bgcolor: bgcolor
//    }).getView();
//    $.tableView.appendRow(row);
//}

$.index.open();
