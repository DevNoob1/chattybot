const synth = window.speechSynthesis;

function voiceControl(string) {
    let u = new SpeechSynthesisUtterance(string);
    u.text = string;
    u.lang = "en-aus";
    u.volume = 1;
    u.rate = 1;
    u.pitch = 1;
    synth.speak(u);
}

document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input");
    inputField.addEventListener("keydown", function (e) {
        if (e.code === "Enter") {
            let input = inputField.value.trim();
            input != "" && output(input);
            inputField.value = "";
        }
    });
});

function output(input) {
    let product;

    let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");

    text = text
        .replace(/[\W_]/g, " ")
        .replace(/ a /g, " ")
        .replace(/i feel /g, "")
        .replace(/whats/g, "what is")
        .replace(/please /g, "")
        .replace(/ please/g, "")
        .trim();

    let comparedText = compare(userMessage, botReply, text);

    product = comparedText
        ? comparedText
        : alternative[Math.floor(Math.random() * alternative.length)];
    addChat(input, product);
}

function compare(triggerArray, replyArray, string) {
    let item;
    for (let x = 0; x < triggerArray.length; x++) {
        for (let y = 0; y < replyArray.length; y++) {
            if (triggerArray[x][y] == string) {
                items = replyArray[x];
                item = items[Math.floor(Math.random() * items.length)];
            }
        }
    }
    if (item) return item;
    else return containMessageCheck(string);
}

function addChat(input, product) {
    const mainDiv = document.getElementById("message-section");
    let userDiv = document.createElement("div");
    userDiv.id = "user";
    userDiv.classList.add("message");
    userDiv.innerHTML = `<span id="user-response">${input}</span>`;
    mainDiv.appendChild(userDiv);

    let botDiv = document.createElement("div");
    botDiv.id = "bot";
    botDiv.classList.add("message");
    botDiv.innerHTML = `<span id="bot-response">${product}</span>`;
    mainDiv.appendChild(botDiv);
    var scroll = document.getElementById("message-section");
    scroll.scrollTop = scroll.scrollHeight;
    voiceControl(product);
}
conversation = document.getElementById('conversation');
const inputForm = document.getElementById('input-form');
const inputField = document.getElementById('input-field');

// Add event listener to input form
inputForm.addEventListener('submit', function (event) {
    // Prevent form submission
    event.preventDefault();

    // Get user input
    const input = inputField.value;

    // Clear input field
    inputField.value = '';
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: "2-digit" });

    // Add user input to conversation
    let message = document.createElement('div');
    message.classList.add('chatbot-message', 'user-message');
    message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${input}</p>`;
    conversation.appendChild(message);

    // Generate chatbot response
    const response = generateResponse(input);

    // Add chatbot response to conversation
    message = document.createElement('div');
    message.classList.add('chatbot-message', 'chatbot');
    message.innerHTML = `<p class="chatbot-text" sentTime="${currentTime}">${response}</p>`;
    conversation.appendChild(message);
    message.scrollIntoView({ behavior: "smooth" });
});

// Generate chatbot response function
function generateResponse(input) {
    // Add chatbot logic here
    const responses = [
        "Hello, how can I help you today? 😊",

    ];

    // Return a random response
    return responses[Math.floor(Math.random() * responses.length)];
}


function toggleSidebar() {
    const sidebar = document.getElementById("sidebar");
    if (sidebar.style.width === "0px" || sidebar.style.width === "") {
        sidebar.style.width = "250px";
    } else {
        sidebar.style.width = "0px";
    }
}

function changeHeader(tag) {
    const header = document.getElementById("header");
    header.innerHTML = `
            <h1>${tag}</h1>
        `;
}



let bottomMargin = 500; // Initial margin

function createTag() {
    const tagInput = document.getElementById("tag-input");
    const tagName = tagInput.value;

    if (tagName) {
        const sidebar = document.getElementById("sidebar");
        const tagElement = document.createElement("h3");
        tagElement.style.margin = "50px";
        tagElement.innerHTML = `<a href="javascript:void(0);" onclick="changeHeader('${tagName}')">${tagName}</a>`;
        sidebar.appendChild(tagElement);

        // Decrease the margin by 100px
        bottomMargin -= 80;
        document.querySelector(".bottom-sidebar").style.marginBottom = bottomMargin + "px";

        // Clear the input field
        tagInput.value = "";
    }
}
