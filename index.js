let mainContent = document.getElementById('main');
let modal = document.getElementById('modal');
let xml = new XMLHttpRequest();
let url = 'data.json';
let data = [];
let months = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let initialLoad = 4;

function loadMore() {
    initialLoad += 4;
    displayCard(data, initialLoad)
    if (initialLoad === data.length) {
        document.getElementById("loadBtn").classList.add('hide');
    }
}

function showModal(id) {
    modal.innerHTML = "";
    document.getElementById('modal').classList.remove('hide');
    document.getElementById('modal').classList.add('show');

    mainContent.classList.add('blur');
    document.getElementById('buttons').classList.add('blur');
    document.body.classList.add('darken');

    // console.log(id);
    let element = data[Number.parseInt(id)];

    // console.log(element);
    // modal.classList.add('show');
    // modal.id = 'modal';

    var contnet = document.createElement('div');
    contnet.id = 'content';
    var img = document.createElement('img');
    img.classList.add('contentImage');
    img.src = element.image;
    contnet.appendChild(img);
    modal.appendChild(contnet);

    // content2
    contnet = document.createElement('div');
    var cardHeader = document.createElement('div');
    cardHeader.classList.add('cardHeader2');

    var cardHeaderElements = document.createElement('div');
    cardHeaderElements.classList.add('cardHeaderElements');

    img = document.createElement('img');
    img.classList.add('profilePic2');
    img.src = element.profile_image;
    cardHeaderElements.appendChild(img);
    cardHeader.appendChild(cardHeaderElements);

    cardHeaderElements = document.createElement('div');
    cardHeaderElements.classList.add('cardHeaderElements');
    cardHeaderElements.classList.add('cardHeaderMiddleElement2');

    var span = document.createElement('span');
    span.innerHTML = element.name;
    cardHeaderElements.appendChild(span);
    // brake line
    var br = document.createElement('br');
    cardHeaderElements.appendChild(br);
    // date
    span = document.createElement('span');
    var date = element.date;
    var parts = date.split(' ');
    parts = parts[0].split('-');
    span.innerHTML = parts[2] + " " + months[Number.parseInt(parts[1])] + " " + parts[0];

    cardHeaderElements.appendChild(span);
    cardHeader.appendChild(cardHeaderElements);

    cardHeaderElements = document.createElement('div');
    cardHeaderElements.classList.add('cardHeaderElements');
    cardHeaderElements.classList.add('source');
    // source of the image
    img = document.createElement('img');
    if (element.source_type === "facebook") {
        img.src = "icons/facebook.svg";
    } else {
        img.src = "icons/instagram-logo.svg";
    }
    cardHeaderElements.appendChild(img);
    cardHeader.appendChild(cardHeaderElements);
    contnet.appendChild(cardHeader);

    // caption and heart icon
    var hr = document.createElement('hr');
    hr.setAttribute("width", "90%");
    contnet.appendChild(hr);

    var caption2 = document.createElement('div');
    caption2.classList.add('caption2');
    span = document.createElement('span');
    span.innerHTML = element.caption;
    span.classList.add('caption2');
    caption2.appendChild(span);
    contnet.appendChild(caption2);

    br = document.createElement('br');
    contnet.appendChild(br);

    var cardFooter = document.createElement('div');
    cardFooter.classList.add('cardFooter');
    // heart image
    img = document.createElement('img');
    img.src = "icons/heart.svg";
    // img.classList.add("imgAlign");
    cardFooter.appendChild(img);
    // number of likes
    span = document.createElement('span');
    span.innerHTML = element.likes;
    cardFooter.appendChild(span);
    contnet.appendChild(cardFooter);
    // card.appendChild(footer);

    modal.appendChild(contnet);
    disableScroll();
}

function hideModal() {
    document.getElementById('modal').classList.remove('show');
    document.getElementById('modal').classList.add('hide');
    mainContent.classList.remove('blur');
    document.getElementById('buttons').classList.remove('blur');
    document.body.classList.remove('darken');
}

document.addEventListener('mouseup', function (event) {
    if (!document.getElementById('modal').contains(event.target)) {
        hideModal();
        enableScroll();
    }else {
    }
});

function disableScroll() {
    // Get the current page scroll position
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

        // if any scroll is attempted, set this to the previous value
        window.onscroll = function() {
            window.scrollTo(scrollLeft, scrollTop);
        };
}

function enableScroll() {
    window.onscroll = function() {};
}

xml.onload = function () {
    if (this.readyState === 4 && this.status === 200) {
        data = JSON.parse(this.responseText);
        displayCard(data, initialLoad);
    }
};
xml.open("GET", url, true);
xml.send();

function displayCard(data, amount) {
    mainContent.innerHTML = "";
    for (var i = 0; i < amount; i++) {

        var card = document.createElement('div');
        card.classList.add('card');

        // Card header
        var header = document.createElement('div');
        header.classList.add('cardHeader');

        // First part of the header
        var div = document.createElement('div');
        div.classList.add('cardHeaderElements');
        // profile picture
        var img = document.createElement('img');
        img.src = data[i].profile_image;
        img.classList.add('profilePic');
        div.appendChild(img);
        header.appendChild(div);

        // Middle part of the header
        div = document.createElement('div');
        div.classList.add('cardHeaderElements', 'cardHeaderMiddleElement');
        // user's name
        var span = document.createElement('span');
        span.innerHTML = data[i].name;
        div.appendChild(span);
        // brake line
        var br = document.createElement('br');
        div.appendChild(br);
        // date
        span = document.createElement('span');
        var date = data[i].date;
        var parts = date.split(' ');
        parts = parts[0].split('-');
        span.innerHTML = parts[2] + " " + months[Number.parseInt(parts[1])] + " " + parts[0];

        div.appendChild(span);
        header.appendChild(div);

        // Last part of the header
        div = document.createElement('div');
        div.classList.add('cardHeaderElements');
        div.classList.add('source');
        // source of the image
        img = document.createElement('img');
        if (data[i].source_type === "facebook") {
            img.src = "icons/facebook.svg";
        } else {
            img.src = "icons/instagram-logo.svg";
        }
        div.appendChild(img);
        header.appendChild(div);
        card.appendChild(header);

        // Card main
        var main = document.createElement('div');
        main.classList.add('cardMain');
        // not used
        var input = document.createElement('input');
        input.setAttribute('identifier', i);
        input.setAttribute('type', 'hidden');
        main.appendChild(input);

        main.addEventListener('click', showModal.bind(null, i));

        div = document.createElement('div');
        // image
        img = document.createElement('img');
        img.src = data[i].image
        img.classList.add("imgSize");
        div.appendChild(img);
        main.appendChild(div);
        div = document.createElement('div');
        // caption
        span = document.createElement('span');
        //TODO: less than 150 to show complete, above with 3 dots
        var caption = data[i].caption;
        if (caption.length > 150) {
            // TODO: clear this button as dots
            span.innerHTML = caption.slice(0, 150) + "...";
            // }else if (caption.length === 0) {
            //     // TODO: handle 0 characters...
            //     span.innerHTML = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aperiam dicta doloremque ex nisi, numquam officiis perspiciatis repellendus sunt ut!";
        } else {
            // TODO: handle less than 150 characters...
            span.innerHTML = caption;
        }
        span.classList.add('caption');
        div.appendChild(span);
        main.appendChild(div);
        card.appendChild(main);

        // Card footer
        var footer = document.createElement('div');
        div = document.createElement('div');
        div.classList.add('cardFooter');
        // horizontal line
        var hr = document.createElement('hr');
        hr.classList.add('hrW');
        footer.appendChild(hr);
        // heart image
        img = document.createElement('img');
        img.src = "icons/heart.svg";
        img.classList.add("imgAlign");
        div.appendChild(img);
        // number of likes
        span = document.createElement('span');
        span.innerHTML = data[i].likes;
        div.appendChild(span);
        footer.appendChild(div);
        card.appendChild(footer);

        mainContent.appendChild(card);
    }
}

// xml.onreadystatechange = function () {
//     if (this.readyState === 4 && this.status === 200) {
//         let arr = JSON.parse(this.responseText);
//         displayData(arr);
//     }
// };
//<!--
//         "image": "https://placekitten.com/600/400",
//                 "caption": "Duis in facilisis lectus. Nulla molestie erat erat, quis tempor enim sodales vitae. Sed tempus, libero fringilla rhoncus ullamcorper, justo elit dignissim ex, nec elementum quam sem in urna.",
//                 "type": "image",
//                 "source_type": "facebook",
//                 "source_link": "https://www.facebook.com/EmbedSocial/",
//                 "date": "2018-03-12 03:00:00",
//                 "likes": "123",
//                 "name": "John Smith",
//                 "profile_image": "https://placekitten.com/g/100/100"
//                 -->
//         <div class="card">
//             <!--        header-->
//             <!--        main-->
//
//         </div>
