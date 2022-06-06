function createDiv() {
    return document.createElement("div");
}
function createH2() {
    return document.createElement("h2");
}
function createButton() {
    return document.createElement("button");
}
function createLi() {
    return document.createElement("li");
}
function createA() {
    return document.createElement("a");
}
function createP() {
    return document.createElement("p");
}
function createSpan() {
    return document.createElement("span");
}
function createInput() {
    return document.createElement("input");
}
function createIframe() {
    return document.createElement("iframe");
}
function createBr() {
    return document.createElement("br");
}
  var i = 0;
  var myHeaders = new Headers();
  let myToken; // Define variable which will hold the secret key later on
  const AppToken = "xikxafatwae";
  
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", "Digest username=\""+AppToken+"\" realm=\"_root_\" password=\"\"");
  
  var raw = JSON.stringify({
    username: "testuser1@edocuments.co.uk",
    password: "20DemoPass20"
  });
  
  var requestOptions = {method: 'POST', headers: myHeaders, body: raw, redirect: 'follow'};
    
  fetch("https://edocsapi.azurewebsites.net/Auth/api/Login", requestOptions) // First fetch to login to obtain secret key
  .then(response => response.json())
  .then(result => {
    console.log(result);
    myToken = result.Result.auth.token; // Secret is written in a variable
    myHeaders = new Headers();
    myHeaders.append("Authorization", "Digest username=\"xikxafatwae\" realm=\"_root_\" password=\""+myToken+"\"");
    myHeaders.append("Cookie", ".ASPXANONYMOUS="+myToken+"\""); // Store secret in a cookie
  
    requestOptions = {method: 'GET', headers: myHeaders, redirect: 'follow'};
    fetch("https://edocsapi.azurewebsites.net/Core6/api/Portfolio/ByUserId", requestOptions) //Second fetch to get Portfolio data
    .then(response => response.json())
    .then(result => {
      console.log(result);
      const sites = result.Result.sites; // Store Sites in a variable for late use
      
      for (let i = 0; i < sites.length; i++){
        console.log(sites[i].name);
  
        // Create Div element which will hold new accordion Item
        const accordionItem = new createDiv();
        document.querySelector("#accordionContainer").appendChild(accordionItem);
        accordionItem.className = "accordion-item";
  
        // Create Header element to which we'll attach accordion button
        const accordionHeader = new createH2();
        document.querySelectorAll(".accordion-item")[i].appendChild(accordionHeader);
        accordionHeader.id = "heading"+(i+1);
        accordionHeader.className = "accordion-header";
  
        // Create Button element which will hold Site Name
        const accordionButton = new createButton();
        document.querySelectorAll(".accordion-header")[i].appendChild(accordionButton);
        accordionButton.className = "accordion-button";
        accordionButton.type = "button";
        accordionButton.setAttribute("data-bs-toggle", "collapse");
        accordionButton.setAttribute("data-bs-target", "collapse"+(i+1));
        accordionButton.setAttribute("aria-expanded", "true");
        accordionButton.setAttribute("aria-controls", "collapse"+(i+1));
        accordionButton.innerHTML = sites[i].name;
  
        // Create Div element which will hold new accordion Item
        const collapseDiv = new createDiv();
        document.querySelectorAll(".accordion-item")[i].appendChild(collapseDiv);
        collapseDiv.id = "collapse"+(i+1);
        collapseDiv.className = "accordion-collapse collapse show";
        collapseDiv.setAttribute("aria-labelledby", "heading"+(i+1));
        collapseDiv.setAttribute("data-bs-parent", "accordionExample");
  
        // Create Div element which will hold new accordion collapsable data
        const accordionBody = new createDiv();
        document.querySelectorAll(".accordion-collapse")[i].appendChild(accordionBody);
        accordionBody.className = "accordion-body";
        
        // Create Paragraph which will hold new accordion collapsable text
        const spanAddress = new createP();
        document.querySelectorAll(".accordion-body")[i].appendChild(spanAddress);
        spanAddress.className = "span-address";
        spanAddress.innerHTML = sites[i].address;
        console.log(sites[i].address);

        for (x = 0; x < sites[i].projects.length; x++){
            console.log(sites[i].projects[x].name);
            const spanProjects = new createP();
            spanProjects.className = "span-projects";
            spanProjects.innerHTML = sites[i].projects[x].name;
            document.querySelectorAll(".accordion-body")[i].appendChild(spanProjects);
        }        
      }
    })
    .catch(error => console.log('error', error));
  })
  
  // Function to filter Sites by searching for Names
  function searchSites() {
    var input, filter, item, button, a, i, txtValue;
    input = document.querySelector("#search");
    filter = input.value.toUpperCase();
    item = document.querySelector(".accordion-item");
    button = item.querySelectorAll(".accordion-item .accordion-header .accordion-button");
    for (i = 0; i < button.length; i++) {
        a = button[i];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            button[i].style.display = "";
            document.querySelectorAll(".accordion-body")[i].style.display = "";
            // document.querySelector(".empty-p").innerHTML = "";
        } else {
            button[i].style.display = "none";
            document.querySelectorAll(".accordion-body")[i].style.display = "none";
            // document.querySelector(".empty-p").innerHTML = "No results";
        }
    }
  }

    
    var h;
    var acc = document.querySelectorAll(".accordion-button");

    for (h = 0; h < acc.length; h++) {
        acc[h].addEventListener("click", function() {
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            this.classList.toggle("active");

            /* Toggle between hiding and showing the active panel */
            var panel = document.querySelectorAll(".accordion-header").nextElementSibling;
            if (panel[h].style.display === "block") {
            panel[h].style.display = "none";
            } else {
            panel[h].style.display = "block";
            }
        });
    }
  