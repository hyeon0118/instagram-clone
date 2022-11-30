let files;

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
    if (event.dataTransfer.dropEffect !== 'none') {
        $(this).remove();
    }
})

$('.nav-list').hover(function () {
    $(".nav-icon", this).css("transform", "scale(1.07)");
}, function () {
    $(".nav-icon", this).css("transform", "scale(1)");
})

$('#user-id-box > button').click(function () {
    console.log('clicked')
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
    let user_id = "muzikmusiker";
    let profile_image = "https://pbs.twimg.com/media/E9s0Z08UYAIxtI7?format=jpg&name=large";

    let fd = new FormData();
    fd.append("file", file);
    fd.append("image", image);
    fd.append("content", content);
    fd.append("user_id", user_id);
    fd.append("profile_image", profile_image);

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