document.addEventListener("DOMContentLoaded", () => {
    // Existing variables
    const container = document.querySelector(".container");
    const userInput = document.getElementById("userInput");
    const submitBtn = document.getElementById("submit");
    const downloadBtn = document.getElementById("download");
    const sizeOptions = document.getElementById("size");
    const BGColor = document.getElementById("oneColor");
    const FGColor = document.getElementById("twoColor");
    const modeSwitch = document.getElementById("modeSwitch");
    const body = document.body;
    let QR_Code;
    let sizeChoice, BGColorchoice, FGColorchoice;

    // Toggle dark mode
    modeSwitch.addEventListener("change", () => {
        body.classList.toggle("dark");
        document.querySelector(".codeBox").classList.toggle("dark");
    });

    // Existing event listeners...
    sizeOptions.addEventListener("change", () => {
        sizeChoice = sizeOptions.value;
    });

    BGColor.addEventListener("input", () => {
        BGColorchoice = BGColor.value;
    });

    FGColor.addEventListener("input", () => {
        FGColorchoice = FGColor.value;
    });

    const inputFormatter = (value) => {
        value = value.replace(/[^a-z0-9A-Z]+/g,"");
        return value;
    };

    submitBtn.addEventListener("click", async () => {
        container.innerHTML = "";
        QR_Code = await new QRCode(container, {
            text: userInput.value,
            width: sizeChoice,
            height: sizeChoice,
            colorDark: FGColorchoice,
            colorLight: BGColorchoice,
        });

        const src = container.firstChild.toDataURL("image/png");
        downloadBtn.href = src;
        let userValue = userInput.value;
        try {
            userValue = new URL(userValue).hostname;
        } catch (_) {
            userValue = inputFormatter(userValue);
            downloadBtn.download = `${userValue}QR.png`;
            downloadBtn.classList.remove("hide");
        }
    });

    userInput.addEventListener("input", () => {
        if (userInput.value.trim().length < 1) {
            submitBtn.disabled = true;
            downloadBtn.href = "";
            downloadBtn.classList.add("hide");
        } else {
            submitBtn.disabled = false;
        }
    });

    window.onload = () => {
        container.innerHTML = "";
        sizeChoice = 100;
        sizeOptions.value = 100;
        userInput.value = "";
        BGColor.value = BGColorchoice = "#ffffff";
        FGColor.value = FGColorchoice = "#07687c";
        downloadBtn.classList.add("hide");
        submitBtn.disabled = true;
    };
});