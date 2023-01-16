let files;

$("#setting-button").click(function () {
    $("#profile-modal-overlay").css({
        "display": "flex"
    });
})

$(document).mouseup(function (e) {
    let container = $("#profile-modal-window");

    if (!container.is(e.target) && container.has(e.target).length === 0) {
        $("#profile-modal-overlay").hide();
    }
})

$("#big-profile-image").click(function () {
    $("#img-upload").trigger('click');
});

function profile_update() {
    let file = $('#img-upload')[0].files[0];
    let user_id = $('#user-id')[0].value;

    let fd = new FormData();

    fd.append("file", file);
    fd.append("user_id", user_id);

    $.ajax({
        url: "/user/profile/upload",
        data: fd,
        method: "POST",
        processData: false,
        contentType: false,
        success: function (data) {
            console.log("success");
        },
        error: function (request, status, error) {
            console.log("error");
        },
        complete: function () {
            console.log("complete");
            location.replace("/profile")
        },
    });
}

$('#nav-bar-add-box').click(function () {
    $('.modal-overlay').css({
        "display": "flex"
    });

    $(document.body).css({
        "overflow": "hidden"
    })
});

$('#modal-close-button').click(function (event) {
    $('.modal-overlay').css({
        "display": "none"
    })
    alert('Wenn du jetzt abbrichst, werden deine Änderungen nicht gespeichert.')
    window.location.reload();
})

$('.nav-list').hover(function () {
    $(".nav-icon", this).css("transform", "scale(1.07)");
}, function () {
    $(".nav-icon", this).css("transform", "scale(1)");
})

$('.profile-feed-grid-item').hover(function () {
    $(".profile-feed-grid-item-overlay", this).css("display", "flex");
}, function () {
    $(".profile-feed-grid-item-overlay", this).css("display", "none");
})

$('.profile-feed-nav-list').hover(function () {
    $(this).css("border-top", "1px solid black");
}, function () {
    $(this).css("border-top", "1px solid lightgray");
})


$('#drop-zone')
    .on("dragover", dragOver)
    .on("dragleave", dragOver)
    .on("drop", uploadFiles);

function dragOver(e) {
    e.stopPropagation();
    e.preventDefault();
    if (e.type === "dragover") {
        $("#drop-zone").css({
            "background": "#fafafa"
        })
        $('#add-photo-icon').css({
            "color": "rgb(62, 140, 228)"
        })
    } else {
        $("#drop-zone").css({
            "background": "white"
        })
        $('#add-photo-icon').css({
            "color": "black"
        })
    }
}

function uploadFiles(e) {
    e.stopPropagation();
    e.preventDefault();
    dragOver(e);

    e.dataTransfer = e.originalEvent.dataTransfer;
    files = e.target.files || e.dataTransfer.files;

    if (files[0].type.match(/image.*/)) {
        $("#drop-zone").prepend("<img alt='uploaded photo' id='uploaded-photo' src='" + window.URL.createObjectURL(files[0]) + "'>")
            .css({
                "outline": "none",
                "background-size": "100% 100%",
            })
        $("#uploaded-photo").css({
            "width": "50%",
            "height": "100%",
            "object-fit": "contain",
        })
        $("#modal-window").css({
            "max-width": "800px",
            "width": "70%"
        })
        $("#feed-edit-container").css({
            "display": "flex",
            "width": "50%"
        })
        $(".before-photo").css({
            "display": "none"
        });
        $("#before-photo-drop-zone").css({
            "display": "none"
        })
        $(".after-photo").css({
            "visibility": "visible"
        });
        $("#modal-bottom").css({
            "display": "flex"
        });
        document.getElementById("modal-window-title").textContent = "Zuschneiden"
    } else {
        alert("Diese Datei wird nicht unterstützt")
    }
}

$("#feed-create-button").click(ajax_send);

function ajax_send() {
    let file = files[0];
    let image = file.name;
    let content = $("#feed-textarea").val();
    let user_id = $("#user-id")[0].value;

    let fd = new FormData();

    fd.append("file", file);
    fd.append("image", image);
    fd.append("content", content);
    fd.append("user_id", user_id);

    $.ajax({
        url: "/content/upload",
        data: fd,
        method: "POST",
        processData: false,
        contentType: false,
        success: function (data) {
            console.log("success");
        },
        error: function (request, status, error) {
            console.log("error");
        },
        complete: function () {
            console.log("complete");
            location.replace("/main")
        },
    });
}
