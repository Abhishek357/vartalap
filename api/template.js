module.exports = (meetingData) => {
  let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  let today  = new Date();

  let topicsString = "";
  meetingData.topic.forEach(topic => {
    topicsString += `<button class="m-2 px-2 py-1 bg-indigo-600 rounded-lg text-white font-medium">${topic.text}</button>`
  })
  if(topicsString === "") topicsString = "<p> No Topics Found </p>"
  console.log(topicsString);


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
        Meeting Notes
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
            <!-- in points -->
            <ul class="list-disc text-base font-normal text-black ml-4">
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, veniam. Dolore, quos autem expedita quibusdam id minima pariatur eius doloremque ducimus odio? Nostrum ab explicabo dignissimos molestiae quaerat. Dolor, ullam.</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum, veniam. Dolore, quos autem expedita quibusdam id minima pariatur eius doloremque ducimus odio? Nostrum ab explicabo dignissimos molestiae quaerat. Dolor, ullam.</li>
            </ul>

            </ul>
        </h2>
        <p>
            woo hoo No action Items :)
        </p>
    </div>

    <div class="mt-4">
        <h2 class="text-xl font-bold text-indigo-500">
            Sentiment Analysis:
        </h2>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium voluptatem quisquam qui omnis dignissimos ullam accusamus ducimus similique. Odio voluptatibus rem, voluptas inventore libero iste excepturi placeat eligendi et doloribus?
        </p>
    </div>

    <div class="mt-4">
        <h2 class="text-xl font-bold text-indigo-500">
            Summary :
        </h2>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium voluptatem quisquam qui omnis dignissimos ullam accusamus ducimus similique. Odio voluptatibus rem, voluptas inventore libero iste excepturi placeat eligendi et doloribus?
        </p>
    </div>

    <div class="mt-4">
        <h2 class="text-xl font-bold text-indigo-500">
            Follow-Ups:
        </h2>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium voluptatem quisquam qui omnis dignissimos ullam accusamus ducimus similique. Odio voluptatibus rem, voluptas inventore libero iste excepturi placeat eligendi et doloribus?
        </p>
    </div>

    <div class="mt-4">
        <h2 class="text-xl font-bold text-indigo-500">
            Questions:
        </h2>
        <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium voluptatem quisquam qui omnis dignissimos ullam accusamus ducimus similique. Odio voluptatibus rem, voluptas inventore libero iste excepturi placeat eligendi et doloribus?
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
