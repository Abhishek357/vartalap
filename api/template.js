module.exports = (meetingData) => {
    console.log(meetingData);
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://cdn.tailwindcss.com"></script>
        <title>${meetingData.title}</title>
    </head>
    <body>
        <h1 class="text-3xl font-bold">
            ${meetingData.topic}
        </h1>
        <p class="text-md mt-2">
            ${meetingData.description}
        </p>
    </body>
    </html>
    `;
};
