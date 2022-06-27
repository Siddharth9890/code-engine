
# Code Engine Using Redis PubSub and Node.js

This is a demo of Redis PubSub model using Node.js.




## Installation/Setup

Setup a local Redis Server using Docker.Keep the default port number and host name.

```bash
  docker run -d -p 6379:6379 redis
```

Make sure you have node.js installed you can check it by using command
```bash
  node -v
```
Then clone this repository and follow these commands to install all required packages 
```bash
  cd code-engine
  npm i 
```

And finally to start the application to explore features:
```bash
  npm run start
```


    
## Screenshots
Welcome Screen with all options
![Screenshot](https://user-images.githubusercontent.com/63333707/175875826-754d036f-dc57-402d-907c-29bc64745185.png)

Submitted code with sample tracking id
![Screenshot](https://user-images.githubusercontent.com/63333707/175875846-54c89b7d-7b6d-4053-91cc-40ba599c43fa.png)

Check the status of submitted code 
![Screenshot](https://user-images.githubusercontent.com/63333707/175875870-2047294f-2c17-4531-a059-9a23f729276c.png)

History of all submitted codes
![Screenshot](https://user-images.githubusercontent.com/63333707/175875885-714218b4-21a1-4ec2-a598-19d28954a4fc.png)

Preview the output
![Screenshot](https://user-images.githubusercontent.com/63333707/175875895-4b87e9f5-80d8-40ad-a2e4-60da2504cb15.png)

