## Steps to installing the application

Before installing make sure you have Postgres installed on your machine. Also you should have a client you can use to interact with the DB e.g. Postico or pgAdmin.

1. Clone this repo - 
```
git clone https://github.com/rotimi-babalola/assessment.git
```
2. Install dependencies
```
cd assessment && yarn
```
3. Create a `.env` file and copy and paste the contents of the `.env.sample` file to it. Fill in the appropriate values
4 Run the server
```
yarn start
```

If all went well you should the following message:

```
Server is live on port 5000
```
