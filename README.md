# Vartalap

## Motivation?

Are the college lectures boring ;) Isn't it? How do you feel before the end semester, wondering what topics were taught etc. Well as we know that recording the entire
lectures and that too for all the classes is not feasible then what is the solution? Maybe you are studious but still you need notes for revisions. How about automating this process using some Artificial Intelligence. Well you have come to right place!

## What?

We have product in which college students, Techies can meet, can conduct classes, webinars, virtually hangout and save the important, useful insights of conversation for
Future references. We made the video, audio streaming platform using twilio. Further we streamed this audio using the streaming API provided by the symblai. We establish the websocket connection and get the conversation ID. Ahh the conversation ID is really cool How? continue with me. Using this conversation we can get the transcript, 
topics, FollowUps, ActionItems, Sentiment Analysis etc buy simply making a get request Isn't it amazing?

<p align="center">
  <img alt="But wait a minute" src="https://c.tenor.com/IJwsfw7ToiQAAAAM/wait-what.gif">
</p>

**How do store it for long term?**

We have used puppeteer for this purpose and we store the all the analytics data from meeting in a PDF, that you can download using a single click ⚡. 

## Challenges

- How to make it working on all the platforms like Google Meet, Zoom, Twilio
- How to extract, save these analytics.
- Handle the accesstoken, its expirytime, security related issue related to it.
- Quickly make a video chat application to deliver a complete product.
- We did the intensive work at the backend so that the user has smooth experience.

## Scope, Improvents, Scalable

- Add Login, Logout system so that only authorized users can access the website.
- Deploy on Kubernetes provider.
- Make it accessible in form of extension as well.
- Instead of getting insights at the end of call we can get them in real time. For this part we already the streaming API of symbl.ai, we just have handle that data in     realtime using the websocket listners.


## Overview

### This is the main Langing Page of the website where you can start the recording.

![alt text](https://res.cloudinary.com/https-mykart1-herokuapp-com/image/upload/v1639317671/screencapture-localhost-3000-2021-12-12-19_28_17_pcdndq.png)

### Recording have started and you can write the Title and stop the recoding.

![alt text](https://res.cloudinary.com/https-mykart1-herokuapp-com/image/upload/v1639317672/screencapture-localhost-3000-2021-12-12-19_29_10_jwvte8.png)

### As soon as you hit the stop recording the analyzation starts and the pdf will be downloaded automatically.

![alt text](https://res.cloudinary.com/https-mykart1-herokuapp-com/image/upload/v1639317673/screencapture-localhost-3000-2021-12-12-19_29_30_coc21z.png)

### In case you face any error while downloading or somehow your file is corrupted you can download it again. Don't worry as long as you have not refreshed the page you can easily download the file again.

![alt text](https://res.cloudinary.com/https-mykart1-herokuapp-com/image/upload/v1639317676/screencapture-localhost-3000-2021-12-12-19_29_49_jaqwba.png)




## Made with ❤️ using
<p align="center">
  <img alt="Symbl.ai" src="https://s3.amazonaws.com/challengepost/sponsors/logos/000/023/497/highres/Unknown.png">
</p>
<p align="center">
  <img alt="Twilio" src="https://s3.amazonaws.com/challengepost/sponsors/logos/000/023/494/highres/Twilio_logo_D8D2oky.png">
</p>

## Special thanks to
<p align="center">
  <img alt="Community Classroom" src="https://d1aettbyeyfilo.cloudfront.net/kunalk/23464729_1634815025cY3PNG_logo_copy.webp">
</p>

