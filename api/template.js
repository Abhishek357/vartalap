module.exports = (meetingData) => {
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let today  = new Date();

  let topicsString = "";
  meetingData.topic.forEach(topic => {
    topicsString += `<button class="m-2 px-2 py-1 bg-indigo-600 rounded-lg text-white font-medium">${topic.text}</button>`
  })
  if(topicsString === "") topicsString = "<p> No Topics Found </p>"
  console.log(topicsString);


  let actionItemsString = `<ul class="list-disc ml-4">`;
  meetingData.actionItems.forEach(item => {
    actionItemsString += `<li>${item.text}</li>`
  })

  if(actionItemsString === `<ul class="list-disc ml-4">`) actionItemsString = "<p> Woohoo! No Action Items </p>";
  else actionItemsString += "</ul>";
  console.log(actionItemsString);


  let followUpsString = `<ul class="list-disc ml-4">`;
  meetingData.followUps.forEach(item => {
    followUpsString += `<li>${item.text}</li>`
  })
  
  if(followUpsString === `<ul class="list-disc ml-4">`) followUpsString = "<p> Woohoo! No Follow ups </p>";
  else followUpsString += "</ul>";
  console.log(followUpsString);

  let questionsString = `<ul class="list-disc ml-4">`;
  meetingData.questions.forEach(item => {
    questionsString += `<li>${item.text}</li>`
  })
  
  if(questionsString === `<ul class="list-disc ml-4">`) questionsString = "<p> Woohoo! No Questions </p>";
  else questionsString += "</ul>";
  console.log(questionsString);

  let img = 'http://localhost:5000/normal.png';
  if(meetingData.polarity < -0.25) img = 'http://localhost:5000/angry.png'
  else if(meetingData.polarity > 0.25) img = 'http://localhost:5000/happy.png'
  
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <title>Meeting Title</title>
</head>
<body class="p-4">
    <h1 class="text-3xl font-bold text-center text-indigo-600">
        ${meetingData.title}
    </h1>
    <p class="text-right font-bold">
        - ${today.toLocaleDateString("en-US", options)}
    </p>

    <div class="mt-4">
    <h2 class="text-xl font-bold text-indigo-500">
        Topic of Discussion:
    </h2>
    <div class="flex-1" >
        ${topicsString}
    </div>
    </div>
    
    <div class="mt-4">
        <h2 class="text-xl font-bold text-indigo-500">
            Action Items:
        </h2>
        <p>
        ${actionItemsString}
        </p>
    </div>

    <div class="mt-4">
        <h2 class="text-xl font-bold text-indigo-500">
            Sentiment Analysis:
        </h2>
        <img src=${img} />
    </div>

    <div class="mt-4">
        <h2 class="text-xl font-bold text-indigo-500">
            Follow-Ups:
        </h2>
        <p>
            ${followUpsString}
        </p>
    </div>

    <div class="mt-4">
        <h2 class="text-xl font-bold text-indigo-500">
            Questions:
        </h2>
        <p>
            ${questionsString}
        </p>
    </div>  

    <div class="mt-4">
        <h2 class="text-xl font-bold text-indigo-500">
            Transcript:
        </h2>
        <p>
        ${meetingData.messages}
        </p>
    </div>
</body>
</html>
    `;
};
