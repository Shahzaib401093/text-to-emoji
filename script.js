const text = document.querySelector("#textmsg");
const password = document.querySelector("#password");
const result = document.querySelector("#result");
var clutter = "";

function encryption() {
  document.querySelector("#encrypt-btn").addEventListener("click", function () {
    var pass = password.value;
    var input = text.value;
    var str = input.split("");
    str.forEach((element) => {
      clutter += `&#128${element.charCodeAt()} `;
    });

    result.innerHTML = clutter;

    var dataarr = [];
    if (JSON.parse(localStorage.getItem("data1"))) {
      dataarr = JSON.parse(localStorage.getItem("data1"));
      dataarr.push({ pass: pass, input: input, clutter: clutter });
    } else {
      dataarr = [{ pass: pass, input: input, clutter: clutter }];
    }
    localStorage.setItem(`data1`, JSON.stringify(dataarr));
  });
}

function decryption() {
  document.querySelector("#decrypt-btn").addEventListener("click", function () {
    var clutter2 = "";
    var input2 = document.querySelector("#emojimsg").value;
    var finalPass = document.querySelector("#finalpassword").value;
    var user = JSON.parse(localStorage.getItem("data1"));
    var str2 = input2.split(" ");
    str2.forEach((element) => {
      clutter2 += `&#${element.codePointAt(0)} `;
    });
    var found;
    for (let i of user) {
      if (i.clutter == clutter2) {
        found = i;
      }
    }
    if (found.clutter === clutter2) {
      result.style.display = `block`;
      result.style.color = `#eee`;

      result.innerHTML = found.input;
    } else {
      result.style.display = `block`;
      result.style.color = `red`;
      result.innerHTML = "Wrong password!";
    }
  });
}

function btnClicking() {
  document.querySelector("button").addEventListener("click", function () {
    result.style.display = "block";
  });
  document.querySelector("#dec-btn").addEventListener("click", function () {
    result.style.display = "none";
    document.querySelector("#decryption").style.display = "block";
    document.querySelector("#encryption").style.display = "none";
    document.querySelector("#dec-btn").style.backgroundColor = "#333";
    document.querySelector("#enc-btn").style.backgroundColor = "#222";
    document.querySelector("#main>h1 span img").style.rotate = "270deg";
  });
  document.querySelector("#enc-btn").addEventListener("click", function () {
    document.querySelector("#decryption").style.display = "none";
    result.style.display = "none";
    document.querySelector("#encryption").style.display = "block";
    document.querySelector("#dec-btn").style.backgroundColor = "#222";
    document.querySelector("#enc-btn").style.backgroundColor = "#333";
    document.querySelector("#main>h1 span img").style.rotate = "90deg";
  });
}

encryption();

decryption();

btnClicking();
