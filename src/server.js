import app from "./app";

const devPort = process.env.DEV_PORT

app.listen(devPort, ()=>{
    console.log('servidor online');
})