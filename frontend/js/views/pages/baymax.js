import { handleBaymaxQuestion } from "/js/services/handle-baymax-question.js";
import { button } from "/js/views/components/commons/button.js";
import { clipSvg } from "/js/views/components/svg.js";
import { resizeFile } from "/js/services/image-resizer.js";
import { loaderSvg } from "/js/views/components/svg.js";


export default function renderHome() {

	document.body.classList.remove('chat-view-active');

	let imageBase64 = null;

	let chatHasStarted = false;

	const container = document.createElement('div');
	container.className = 'container  text-center card p-0 glass';
	container.id = 'chat-card'

	const chatDiv = document.createElement("div");
	chatDiv.id = "chat-container";
	chatDiv.className = "container text-center p-0";

	const logoContainer = document.createElement('div');
	logoContainer.className = 'baymax-logo-container initial-view-item';

	const logo = document.createElement('div');
	logo.className = 'baymax-logo';
	logo.innerHTML = `<div class="dot"></div><div class="line"></div><div class="dot"></div>`;
	logoContainer.appendChild(logo);

	const dropzoneWrapper = document.createElement("div");
	dropzoneWrapper.id = "dropzoneWrapper";
	dropzoneWrapper.style.display = "none";


	const welcomeDiv = document.createElement('div');
	welcomeDiv.className = 'my-5 initial-view-item';

	const h1 = document.createElement('h1');
	h1.className = 'welcome-title text-dark';
	h1.textContent = 'HELLO! I am Baymax';
	const pWelcome = document.createElement('p');
	pWelcome.className = 'welcome-subtitle text-muted';
	pWelcome.textContent = 'Your personal health companion';
	welcomeDiv.appendChild(h1);
	welcomeDiv.appendChild(pWelcome);


	const queryContainer = document.createElement('div');
	queryContainer.className = 'health-query-container';
	const input = document.createElement('input');
	input.className = 'form-control health-query-input';
	input.placeholder = 'Ask baymax a question..';
	input.id = 'healthQuery';
	input.name = 'health_query';
	input.autocomplete = "off";
	const btn = document.createElement('button');
	btn.className = 'btn health-query-btn';
	btn.type = 'button';
	btn.innerHTML = '<i class="bi bi-arrow-right"></i>';

	const loader = document.createElement("div");
	loader.style.display = "none"
	loader.style.position = "absolute"
	loader.innerHTML = loaderSvg
	btn.appendChild(loader);

	queryContainer.appendChild(input);
	queryContainer.appendChild(btn);


	const suggestionBox = document.createElement('div');
	suggestionBox.className = 'suggestion-box mt-4 background-color initial-view-item';
	const pSuggest = document.createElement('p');
	pSuggest.textContent = 'Ask Baymax about:';
	const suggestionsDiv = document.createElement('div');
	const suggestions = [
		'Symptoms of common flu?',
		'How much water should I drink daily?',
		'What foods boost immunity?'
	];
	suggestions.forEach(text => {
		const a = document.createElement('a');
		a.href = '#';
		a.className = 'suggestion-pill';
		a.textContent = text;
		a.addEventListener('click', (event) => {
			event.preventDefault();

			input.value = text;

			handleSubmitQuestion();
		});

		suggestionsDiv.appendChild(a);

	});
	suggestionBox.appendChild(pSuggest);
	suggestionBox.appendChild(suggestionsDiv);

	const chatContentArea = document.getElementById("content");


	function waitForCssEvent(element, eventName) {
		return new Promise(resolve => {
			element.addEventListener(eventName, resolve, { once: true });
		});
	}

	function displayMessage(htmlContent, sender, clear = false, imageDataUrl = null) {
		if (clear) {
			chatDiv.innerHTML = "";
		}
		input.blur();

		const messageDiv = document.createElement('div');
		messageDiv.className = `chat-message ${sender}-message`;
		if (imageDataUrl) {
			const img = document.createElement('img');
			img.src = imageDataUrl;
			img.style.maxWidth = "200px"; // adjust as needed
			img.style.borderRadius = "8px";
			img.style.marginBottom = "4px";
			messageDiv.appendChild(img);
		}

		const textDiv = document.createElement('div');
		textDiv.innerHTML = htmlContent;
		messageDiv.appendChild(textDiv);

		chatDiv.appendChild(messageDiv);
		chatDiv.scrollTop = chatContentArea.scrollHeight + 20;
	}

	async function handleSubmitQuestion() {
		loader.style.display = "inline"
		const question = input.value.trim();
		if (!question) return;

		toggleDropzone(null, true);


		if (chatHasStarted) {
			displayMessage(question, 'user', true, imageBase64);
			input.value = "";
			displayMessage("<i>Thinking...</i>", 'bot');
			const answer = await handleBaymaxQuestion(question, imageBase64);
			chatDiv.removeChild(chatDiv.lastChild);
			displayMessage(answer.replace(/\n/g, "<br>").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>"), 'bot');
		}

		if (!chatHasStarted) {
			chatHasStarted = true;

			const logoContainer = document.querySelector('.baymax-logo-container');
			const chatCard = document.getElementById("chat-card");


			logoContainer.classList.add('animate-goodbye');
			await waitForCssEvent(logo, 'animationend');
			chatCard.classList.add("push-bottom");

			document.body.classList.add('chat-view-active');
			input.placeholder = "Ask baymax another question.."
			await waitForCssEvent(queryContainer, 'transitionend');

			displayMessage(question, 'user', false, imageBase64);
			input.value = "";

			displayMessage("<i>Thinking...</i>", 'bot');
			const answer = await handleBaymaxQuestion(question, imageBase64);

			chatDiv.removeChild(chatDiv.lastChild);
			let formattedAnswer = answer
				.replace(/\n/g, "<br>")
				.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
			displayMessage(formattedAnswer, 'bot');

		}
		loader.style.display = "none"
		inputDropzone.removeAllFiles();

	}

	btn.addEventListener("click", handleSubmitQuestion);
	input.addEventListener("keypress", (e) => {

		if (e.key === 'Enter') {
			handleSubmitQuestion();
		}
	});

	let popperInstance = null;

	function toggleDropzone(event, forceClose = false) {
		if (forceClose) {
			dropzoneWrapper.style.display = "none";
			if (popperInstance) {
				popperInstance.destroy();
				popperInstance = null;
			}
			return;
		}

		if (dropzoneWrapper.style.display === "none") {
			// show and create popper
			dropzoneWrapper.style.display = "block";
			if (event) {
				popperInstance = Popper.createPopper(event.currentTarget, dropzoneWrapper, {
					placement: "bottom-start",
					modifiers: [{ name: "offset", options: { offset: [0, 8] } }],
				});
			}
		} else {
			// hide and destroy popper
			dropzoneWrapper.style.display = "none";
			if (popperInstance) {
				popperInstance.destroy();
				popperInstance = null;
			}
		}
	}


	container.appendChild(logoContainer);
	container.appendChild(welcomeDiv);
	container.appendChild(queryContainer);
	container.appendChild(suggestionBox);
	container.appendChild(queryContainer);
	container.appendChild(dropzoneWrapper);
	chatContentArea.appendChild(chatDiv);

	const uploadBtn = button('', toggleDropzone, "btn-secondary health-query-btn-add");
	uploadBtn.innerHTML = clipSvg;
	queryContainer.appendChild(uploadBtn);

	const form = document.createElement("form");
	form.action = "/upload";
	form.className = "dropzone";
	form.id = "imageDropzone";

	dropzoneWrapper.appendChild(form);

	Dropzone.autoDiscover = false;

	const inputDropzone = new Dropzone(form, {
		url: "/ignore", // ignore
		autoProcessQueue: false,
		acceptedFiles: "image/*",
		maxFiles: 1,
		addRemoveLinks: true, // show remove link
		dictRemoveFile: "<i class='bi-x-circle'></i>",
		dictDefaultMessage: "Drop image here to <br> show baymax",
		//maxFilesize: 1,
		//dictFileTooBig: "File is too big. Max 1MB allowed.",
	});

	inputDropzone.on("addedfile", async (file) => {
		if (inputDropzone.files.length > 1) {
			inputDropzone.removeFile(inputDropzone.files[0]); // remove previous file
		}
		imageBase64 = await resizeFile(file);
	});

	inputDropzone.on("removedfile", () => {
		imageBase64 = null;
	});



	return container;
}
