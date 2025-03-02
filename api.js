let url = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json";
// console.log(url);

var convert_to = 89.05413198;
fetch(url)
    .then(response => {
        return response.json();
    })
    .then(data => {
        var val = data.eur;
        // convert_to = val[to]
        for (let select of dropdowns) {
            for (currCode in countryList) {
                let newOption = document.createElement("option");
                newOption.innerText = currCode;
                newOption.value = currCode;
                if (select.name === "from" && currCode === "USD") {
                    newOption.selected = "selected";
                } else if (select.name === "to" && currCode === "INR") {
                    newOption.selected = "selected";
                }
                select.append(newOption);
            }
            select.addEventListener("change", (evt) => {
                updateFlag(evt.target);
                var from = document.getElementById("from").value;
                var to = document.getElementById("to").value;
                to = to.toLowerCase();
                document.getElementById("inital").innerText = "1 " + from + " = " + val[to] + " " + to;
                convert_to = val[to];

            });

        }
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");

console.log(convert_to);


const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};


document.getElementById("button").addEventListener("click", () => {
    var from = document.getElementById("from").value;
    var to = document.getElementById("to").value;
    var amount = document.getElementById("amount").value;
    document.getElementById("inital").innerText = amount + " "+from + " = " + amount*convert_to + " " + to;
    console.log(convert_to);

})