let ideaSelectors = document.getElementById('idea_purpose_selector');
const generateIdeasBtn = document.getElementById('generate_idea_btn');
const cliarBtn = document.querySelector('.cliar')

const printDiv = document.querySelector('.explenations1')


const aiDisplay = document.querySelector('.AI_generated_text')

const diplayIdea = document.querySelector('.container')
// const printTotalIdeas = document.querySelector('.total_idea')
// const totalIdea = document.querySelector('.total_idea');
const headingTitle = document.querySelector('.tital')
const companyNameInput = document.querySelector('.input_name')
const companyNamePrint = document.querySelector('.company_name_print')
const inputProductSummary = document.querySelector('.input_product_summary')
const productNamePrint = document.querySelector('.product_name_print')
const generateMore = document.querySelector('.next_btn')
const centerLoder = document.querySelector('.loader')


let arrayOptions = ['Select something', 'Cost-Saving & Efficiency', 'Customer Satisfaction', 'Marketing & Brand', 'Sales & Business Model', 'Partners & Distribution', 'Learning & Knowledge Sharing', 'Culture & Collaboration', 'Sustainability & Social Impact', 'Risk & Compliance', 'Data & Technology', 'Future Readiness', 'Other'];

for (let i = 0; i < arrayOptions.length; i++) {
    var option = document.createElement('option');

    option.value = arrayOptions[i];
    option.text = arrayOptions[i]
    option.id = "idea" + [i];
    // console.log(option.id);

    ideaSelectors.appendChild(option);
};



ideaSelectors.addEventListener('change', function () {

    companyNameInput.value = '';
    inputProductSummary.value = '';
    var idea2222 = document.getElementById('idea_purpose_selector');
    console.log(ideaSelectors.id)
    console.log(ideaSelectors.value)
    console.log(ideaSelectors.options[ideaSelectors.selectedIndex].id);
})

document.getElementById('idea0').setAttribute('disabled', 'disabled')


const cliarAll = function () {
    companyNameInput.value = '';
    inputProductSummary.value = '';
    aiDisplay.classList.remove('ai_text-display');
    diplayIdea.classList.add('hidden')
}

cliarBtn.addEventListener('click', function () {
    cliarAll()
})


let dataApi;
let messageContent;
let title;
let printTitle;
let messageContents;
let description;
let printDescription;
let apiKey;
const callFunction = function () {

    if (setDataToAi() === 'Select something') {
        cliarAll()

        throw new Error(alert("Select Idea Purpose"))

    }
    else {
        if (apiKey) {

            apiKey = localStorage.getItem('apiKeyStore');

            console.log(apiKey)
        }
        else {
            apiKey = prompt("Enter API key");

            console.log(apiKey)
            localStorage.setItem('apiKeyStore', apiKey);

        }

        // console.log(apiKey)

        // console.log(localStorage.getItem('apiKeyStore'))

        if (0) {
            alert('Enter The correct Api key')
        }
        else {




            // Set the endpoint URL
            const url = 'https://api.openai.com/v1/chat/completions';

            // Set the request headers
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            };
            // console.log(headers)
            // Set the request body
            const data = {
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: `give me 1 new idea to start a business in ${setDataToAi()}  as should a title & a description` }],
                temperature: 0.7
            };


            fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            })
                .then(response => {

                    if (response.status != 200) {
                        console.log(response)
                        // if (data.error && data.error.code === "invalid_api_key")
                        alert('Envelid api key')
                        apiKey = false
                        cliarAll()
                        throw new console.error("ffffffffffffff");
                    }
                    return response.json()

                })


                .then(data => {
                    if (data) {
                        // aiDisplay.classList.add('ai_text-display');
                        // diplayIdea.classList.remove('hidden')


                        localStorage.setItem('result', data)
                        console.log("Sdsfdssssssssssssss")

                        const dataApi = JSON.stringify(data);
                        const parsedStorage = JSON.parse(dataApi);
                        const messageContent = parsedStorage.choices[0].message.content;
                        const title = messageContent.split('\n')[0].split('Title: ')[1];
                        const description = messageContent.split('\n\n')[1].split('Description: ')[1];
                        centerLoder.classList.add('hiddenn')
                        // Update DOM elements
                        printDiv.innerHTML = '';
                        headingTitle.innerHTML = '';


                        const printTitle = document.createTextNode(title);
                        headingTitle.appendChild(printTitle);

                        const printDescription = document.createTextNode(description);
                        printDiv.appendChild(printDescription);

                        // Log the title
                        console.log(title);
                    }
                    // else {
                    //     console.error('Invalid data received from the server.');
                    // }
                })



            // .catch(error => {
            //     console.log(error)
            //     if (error) {
            //         // alert(error.message + 'Enter a valid key')
            //     }
            // });
        }
    }
}

// }


const accesToStorege = localStorage.getItem('result');
console.log(accesToStorege);
// const parsedStorage = JSON.parse(accesToStorege);






const printIdeas = function () {
    printDiv.innerHTML = ''
    headingTitle.innerHTML = ''
    companyNamePrint.innerHTML = '';
    productNamePrint.innerHTML = '';


    displayName()
    displayProSum()
    // const checkValue = ideaSelectors.options[ideaSelectors.selectedIndex].value;
    setDataToAi()
    callFunction()
    console.log("edfr")


}


const displayName = function () {
    companyNamePrint.value = companyNameInput.value;
}

const displayProSum = function () {
    productNamePrint.value = inputProductSummary.value;
}

generateIdeasBtn.addEventListener('click', function () {
    printIdeas()
    aiDisplay.classList.add('ai_text-display');
    diplayIdea.classList.remove('hidden')
    centerLoder.classList.remove('hiddenn')


    // dataIdeas();

    //     setDataToAi()

});
// function centerLoderTime() {
//     setTimeout(() => {
//         centerLoder.classList.add('hiddenn')
//     }, 5000);
// }

generateMore.addEventListener('click', function () {
    printIdeas()
    centerLoder.classList.remove('hiddenn')


})

const setDataToAi = function () {
    const checkValue = ideaSelectors.options[ideaSelectors.selectedIndex].value;
    console.log(checkValue)
    return checkValue
    // console.log(setIdea)

}
