"use strict;";

function save_tag_info(id, tag) {
    Ti.API.info("id:" + id + "  tag:" + tag);
    var tag_w = Alloy.createModel('image_tag', {
        'id': id,
        'tag': tag,
        'disabled': 0,
        'created_at': String(new Date().getTime()),
        'updated_at': String(new Date().getTime())
    });
    tag_w.save();
    alert('save tag info succeeded id:' + id + "  tag:" + tag);
}

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

function get_image_seq() {
    var id;

    var seq_image_r = Alloy.createCollection('seq_image');
    seq_image_r.fetch();

    var seq_image_w;
    if ( seq_image_r.length < 1 ) {
        seq_image_w = Alloy.createModel('seq_image', {"id" : 0});
        seq_image_w.save();
        seq_image_r = Alloy.createCollection('seq_image');
        seq_image_r.fetch();
    }

    seq_image_r.map(function(row) {
        id = row.get('id') + 1;
        row.set({'id':id});
        row.save();
    });
    return id;
}

function save_image_info(id) {
    var image_w = Alloy.createModel('image', {
        'id': id,
        'name': 'name' + id,
        'created_at': String(new Date().getTime())
    });
    image_w.save();

}
function read_image_info(id) {
    var image_r = Alloy.createCollection('image');

    if (id) {
        image_r.fetch({query: 'select * from image where id = ' + id});
    }
    else {
        image_r.fetch();
    }

    var images = new Array();
    image_r.map(function(image) {
        var image_id = image.get('id');
        var image_name = image.get('name');
        var image_created_at = image.get('created_at');
        images.push( image_id );
    });
    var images_str = images.join('/');

    var check_alert = Ti.UI.createAlertDialog({
           title: 'images',
           message: images_str,
           buttonNames: ['OK!', 'Cancel'],
           cancel: 1
    }); 
    check_alert.show();
}
function get_image_path_list(tags) {
    var image_r = Alloy.createCollection('image');

    if (tags) {
        tags_str = tags.join(',');
        image_r.fetch({query: 'select * from image where tag in (' + id + ')'});
    }
    else {
        image_r.fetch();
    }

    var images = new Array();
    image_r.map(function(image) {
        var image_id = image.get('id');
        var image_name = image.get('name');
        var image_created_at = image.get('created_at');
        images.push( image_id );
    });
    return images;
    
}


function doClick3() {

    Titanium.Media.openPhotoGallery({
        success: function(event) {
            var id = get_image_seq();
            var file = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "/" + id + '.png');
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

            save_image_info(id);

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
    var id;
    var rows = Alloy.createCollection('seq_image');
    rows.fetch();
    rows.map(function(row) {
        id = row.get('id');
    });

    read_image_info();

    var file = Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "/" + id + '.png');
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

function doClick5() {
    var data  = [];
    var image_ids = get_image_path_list();

    var perRow = 4;
    var cellWidth = Titanium.Platform.displayCaps.platformWidth / perRow;
    var cellHeight = cellWidth;

    var row;
    for ( var i = 0, max = image_ids.length; i < max; i++ ) {
        if ( i === 0 || i % perRow === 0 ) {
            if ( i > 0 )  {
                data.push(row);
            }
            row = Titanium.UI.createTableViewRow({height: cellHeight});
            var rowView = Titanium.UI.createView({
                layout: 'horizontal',
                width: Titanium.UI.FILL,
            height: cellHeight
            });
            row.add(rowView);
        }
        var image = Titanium.UI.createImageView({
            image: Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "/" + image_ids[i] + '.png'),
            width: cellWidth,
            height: cellHeight,
            bubbleParent: false
        });

        image.addEventListener('click', function(event){
alert(event);

            var image_win = Ti.UI.createWindow({
                backgroundColor: 'white'
            });
            var image_win_cancel_btn = Titanium.UI.createButton({title: 'close', height: 40, width: 100});
            image_win_cancel_btn.addEventListener('click', function() {
                image_win.close();
            });
            var image_view = Ti.UI.createView();
            var focused_image = Ti.UI.createImageView({
                image: file,
                width: 200,
            });
            image_view.add(focused_image);
            image_win.add(image_view);

            image_win.rightNavButton = image_win_cancel_btn;
            image_win.add(table);
            image_win.open({
                modal:true,
                modalTransitionStyle: Titanium.UI.iPhone.MODAL_TRANSITION_STYLEFLIP_HORIZONTAL,
                modalStyle: Titanium.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
            });
        });

        rowView.add(image);
    }
    data.push(row);
    var table = Titanium.UI.createTableView({
        data:data,
        width: Titanium.UI.FILL
    });
    var win = Ti.UI.createWindow({
        backgroundColor: 'black'
    });
    var cancel_btn = Titanium.UI.createButton({title: 'close', height: 40, width: 100});
    cancel_btn.addEventListener('click', function() {
        win.close();
    });
    win.rightNavButton = cancel_btn;
    win.add(table);
    win.open({
        modal:true,
        modalTransitionStyle: Titanium.UI.iPhone.MODAL_TRANSITION_STYLEFLIP_HORIZONTAL,
        modalStyle: Titanium.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
    });
}

function create_image_list() {
    var data  = [];
    var image_ids = get_image_path_list();

    var perRow = 4;
    var cellWidth = Titanium.Platform.displayCaps.platformWidth / perRow;
    var cellHeight = cellWidth;

    var scrollView = Ti.UI.createScrollView({
        contentWidth: Ti.Platform.displayCaps.platformWidth,
        contentHeight: 'auto',
        layout: 'horizontal',
        scrollType: 'vertical',
        cancelBubble: true
    });

    var row;
    for ( var i = 0, max = image_ids.length; i < max; i++ ) {
        var image = Titanium.UI.createImageView({
            image: Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "/" + image_ids[i] + '.png'),
            width: cellWidth,
            height: cellHeight,
            bubbleParent: false,
            cancelBubble: true,
            ext: {
                image: Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "/" + image_ids[i] + '.png'),
                id: image_ids[i]
            }
        });

        image.addEventListener('click', function(e){

            var image_win = Ti.UI.createWindow({
                backgroundColor: 'white'
            });
            var image_win_cancel_btn = Titanium.UI.createButton({title: 'close', height: 40, width: 100});
            image_win_cancel_btn.addEventListener('click', function() {
                image_win.close();
            });
            var image_view = Ti.UI.createView();
            var focused_image = Ti.UI.createImageView({
                image: e.source.ext.image,
                width: 200,
                ext: {
                    id: e.source.ext.id
                }
            });
            focused_image.addEventListener('click', function(e){
                var dialog = Ti.UI.createAlertDialog({
                    title: "select tag",
                    message: "please choose a tag",
                    buttonNames: ['mariko','kojiharu', 'hoge', 'cancel'],
                    cancel: 3,
                    ext: {
                        id: e.source.ext.id
                    }
                });
                dialog.addEventListener('click', function(e) {
                    Ti.API.info(e.index);
                    var id = e.source.ext.id;
                    var tag;
                    if (e.index == 0) {
                        tag = 'mariko';
                        save_tag_info(id, tag);
                    }
                    if (e.index == 1) {
                        tag = 'kojiharu';
                        save_tag_info(id, tag);
                    }
                    if (e.index == 2) {
                        tag = 'hoge';
                        save_tag_info(id, tag);
                    }
                    if (e.cancel) {
                        Ti.API.info("canceled");
                        return;
                    }
                });
                dialog.show();
//                var tag_win = Ti.UI.createWindow({
//                    backgroundColor: 'black',
//                    height: 200,
//                    ext: {
//                        id: e.source.ext.id
//                    }
//                });
//                var tag_btn = Ti.UI.createButton({
//                    title: 'smile',
//                    height: 44,
//                    width: 70,
//                    ext: {
//                        id: e.source.ext.id,
//                        tag: 'smile'
//                    }
//                });
//                tag_btn.addEventListener('click', function(e) {
//                    id  = e.source.ext.id;
//                    tag = e.source.ext.tag;
//                    save_tag_info(id, tag);
//                });
//                tag_win.add(tag_btn);
//                cancel_btn = Ti.UI.createButton({title: 'close', height: 40, width: 100});
//                cancel_btn.addEventListener('click', function(){
//                    tag_win.close();
//                });
//                tag_win.rightNavButton = cancel_btn;
//                tag_win.open({
//                    modal:true,
//                    modalTransitionStyle: Titanium.UI.iPhone.MODAL_TRANSITION_STYLEFLIP_HORIZONTAL,
//                    modalStyle: Titanium.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
//                });
            });

            image_view.add(focused_image);
            image_win.add(image_view);

            image_win.rightNavButton = image_win_cancel_btn;
            image_win.open({
                modal:true,
                modalTransitionStyle: Titanium.UI.iPhone.MODAL_TRANSITION_STYLEFLIP_HORIZONTAL,
                modalStyle: Titanium.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
            });
        });
        scrollView.add(image);
    }

    var win = $.image_list;
    var cancel_btn = Titanium.UI.createButton({title: 'close', height: 40, width: 100});
    cancel_btn.addEventListener('click', function() {
        win.close();
    });
    win.rightNavButton = cancel_btn;
    win.add(scrollView);
}

function get_tag_groups(tag) {
    var tag_r = Alloy.createCollection('image_tag');

    if (tag) {
        tag_r.fetch({
            query: 'select * from image_tag where tag is not null and id is not null and disabled = 0 and tag = ' + '"' + tag + '"'
        });
    }
    else {
        tag_r.fetch({
            query: 'select * from image_tag where tag is not null and id is not null and disabled = 0'
        });
    }

    var tags = new Array();
    tag_r.map(function(image) {
        var image_id = image.get('id');
        var tag = image.get('tag');
        
        if ( ! tags[tag] ) {
            tags[tag] = new Array();
        }

        tags[tag].push(image_id);
    });
    return tags;
}

function create_tag_list(tag) {
    var tag_win = $.tag_list;

    var tags = get_tag_groups();
    
    var perRow = 4;
    var cellWidth = Titanium.Platform.displayCaps.platformWidth / perRow;
    var cellHeight = cellWidth;

    var scrollView = Ti.UI.createScrollView({
        contentWidth: Ti.Platform.displayCaps.platformWidth,
        contentHeight: 'auto',
        layout: 'horizontal',
        scrollType: 'vertical',
        cancelBubble: true
    });
    
    var row;
    //for ( var i = 0, max = image_ids.length; i < max; i++ ) {
    for (var t in tags) {
        var length = tags[t].length - 1;
        var latest_id = tags[t][length];
        var image = Titanium.UI.createImageView({
            image: Ti.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory + "/" + latest_id + '.png'),
            width: cellWidth,
            height: cellHeight,
            bubbleParent: false,
            cancelBubble: true,
            ext: {
                tag: t,
            }
        });

        image.addEventListener('click', function(e){
            var scrollView = Ti.UI.createScrollView({
                contentWidth: Ti.Platform.displayCaps.platformWidth,
                contentHeight: 'auto',
                layout: 'horizontal',
                scrollType: 'vertical',
                cancelBubble: true
            });

            var tag = e.source.ext.tag;
            var tags = get_tag_groups(tag);

            for (var i = 0; i < tags[tag].length; i++) {
                var id = tags[tag][i];
                var image = Titanium.UI.createImageView({
                    image: Ti.Filesystem.getFile(
                        Titanium.Filesystem.applicationDataDirectory+"/"+id+'.png'
                    ),
                    width: cellWidth,
                    height: cellHeight,
                    bubbleParent: false,
                    cancelBubble: true,
                    ext: {
                        id: id,
                    }
                });
                // set addEventLister for image
                scrollView.add(image);
            }
            var win = Ti.UI.createWindow({
                backgroundColor: 'black'
            });
            var cancel_btn = Titanium.UI.createButton({
                title: 'close',
                height: 40, 
                width: 100
            });
            cancel_btn.addEventListener('click', function() {
                win.close();
            });
            win.rightNavButton = cancel_btn;
            win.add(scrollView);
            win.open({
                modal:true,
                modalTransitionStyle: Titanium.UI.iPhone.MODAL_TRANSITION_STYLEFLIP_HORIZONTAL,
                modalStyle: Titanium.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
            });
        });
        scrollView.add(image);
    }
    tag_win.add(scrollView);
}

function create_flat_list() {
    
    var scrollView = Ti.UI.createScrollView({
        contentWidth: Ti.Platform.displayCaps.platformWidth,
        contentHeight: 'auto',
        layout: 'horizontal',
        scrollType: 'vertical',
        cancelBubble: true
    });
    var assetslibrary = require('ti.assetslibrary');
    var g = [assetslibrary.AssetsGroupTypeAll];
    assetslibrary.getGroups(g, function(e) {
        var list = e.groups;
        for (var i = 0; i < list.length; i++) {
            var ao = list[i];
            Ti.API.info(ao.name);
            ao.getAssets(function(e) {
                var al = e.assets;
                var length = al.assetsCount;
                if (length < 1) {
                    return;
                }
                Ti.API.info("length : " + length);
                for (var i = 0; i < length; i++) {
                    var o = al.getAssetAtIndex(i);

                    Ti.API.info(o.defaultRepresentation.fullResolutionImage);

                    var perRow = 4;
                    var cellWidth = Titanium.Platform.displayCaps.platformWidth / perRow;
                    var cellHeight = cellWidth;

                    var image = Titanium.UI.createImageView({
                        image: o.defaultRepresentation.fullResolutionImage,
                        width: cellWidth,
                        height: cellHeight,
                        bubbleParent: false,
                        cancelBubble: true,
                        ext: {
                            image: o.defaultRepresentation.fullResolutionImage,
                            filename: o.defaultRepresentation.filename,
                        }
                    });
                    Ti.API.info(o.defaultRepresentation.filename);
                    image.addEventListener('click', function(e) {
                        t = this;
                        t.hasCheck = !(t.hasCheck);
                        Ti.API.info(t.hasCheck);

                        if ( t.hasCheck ) {
                            var icon = Ti.UI.createImageView({
                                image: '/image1.png',
                                width: Titanium.Platform.displayCaps.platformWidth / 20,
                                height: Titanium.Platform.displayCaps.platformWidth / 20,
                                bubbleParent: false,
                                cancelBubble: true,
                                top: 0,
                                right: 0,
                            });
                            t.add(icon);
                        } else {
                            var children = t.children.slice(0);
                            if ( children ) {
                                for (var i = 0; i < children.length; i++) {
                                    t.remove(children[i]);
                                }
                            }
                        }
                    });
                    scrollView.add(image);
                }
            });
        }
    }, function(e) {
    });


    var save_images_btn = Titanium.UI.createButton({title: 'save', height: 40, width: 100});
    save_images_btn.addEventListener('click', function() {
        save_images();
        alert('save images completed');
    });
    $.flat_list.rightNavButton = save_images_btn;
    
    $.flat_list.add(scrollView);
}

function save_images() {
    var scrollView = $.flat_list.children.slice(0)[0];
    images = scrollView.children.slice(0);

    Ti.API.info("images.length: " + images.length);
    for (var i = 0; i < images.length; i++) {

        if ( !images[i].hasCheck ) { continue; }

        var o = images[i];
        var id = get_image_seq();
        var file = Ti.Filesystem.getFile(
            Titanium.Filesystem.applicationDataDirectory + "/" + id + '.png'
        );
        if (!file.exists()) { file.createFile(); }
        file.write(o.image);
        save_image_info(id);
    }
}



$.tag_list.addEventListener('focus', function() {
    var children = $.tag_list.children.slice(0);
    if (children) {
        for (var i = 0; i < children.length; i++) {
            $.tag_list.remove(children[i]);
        }
    }
    create_tag_list();
});
$.image_list.addEventListener('focus', function() {
    var children = $.image_list.children.slice(0);
    if (children) {
        for (var i = 0; i < children.length; i++) {
            $.image_list.remove(children[i]);
        }
    }
    create_image_list();
});
$.flat_list.addEventListener('focus', function() {
    var children = $.flat_list.children.slice(0);
    if (children) {
        for (var i = 0; i < children.length; i++) {
            $.flat_list.remove(children[i]);
        }
    }
    create_flat_list();
});

$.index.open();
