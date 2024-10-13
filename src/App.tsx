import {  useCallback, useEffect } from 'react';
import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { MantineProvider, Text, Button, Paper, Anchor, Box, Code, Title, TextInput } from '@mantine/core';
import { _FileInput } from '@mantine/core/lib/FileInput/FileInput';
import { Notifications, notifications } from '@mantine/notifications';
import { useDisclosure, useEventListener, useMouse } from '@mantine/hooks';
import { Drawer, Group,ColorPicker,Image } from '@mantine/core';
import WebSocket from 'ws';
import { io } from "socket.io-client";


function MyColorPicker() {
  return (
    <ColorPicker
      format="hex"
      swatches={['#25262b', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
    />
  );
}
// declare global{
// }
function canAdd(currentTime : number , lastTime:number){
    return lastTime + 5*1 <currentTime;
}
function createText(currentTime : number , lastTime:number){
  return canAdd(currentTime,lastTime)? "press on the image to add":("wait "+(lastTime + 5*1- currentTime) +" seconds");
}
// function update time   
function isConnectedToServer(ip:String){
 return( ip != "0.0.0.0")
}

function sendInfo(x:number, y:number ,color: string){
   
}
function connect(ip:string, port:number) {
  fetch('http://'+ip+':' + port+ '/api/data')
  .then(response => response.json())
  .then(data => {
    // Process the received data
    console.log("fdasohfadslkjfhdaskfjh" +data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
  
  // const socket = new WebSocket('http://'+ip+':' + port);

}


function App() {  
  
  const [ip, setIP] = useState('');
  const [ip1, setIp1] = useState('');
  const [ip2, setIp2] = useState('');
  const [ip3, setIp3] = useState('');
  const [ip4, setIp4] = useState('');

  const { ref, x, y } = useMouse();
  const [date, setDate] = useState(new Date());
  var title = "";
  const HEIGHT  = 400;
  const WIDTH = 800;
  const [opened, setOpen] = useDisclosure(false);
  const ref2 = useEventListener('click', canAdd((date.getHours()*3600 +date.getMinutes()*60 +date.getSeconds()),lastTime)? setOpen.toggle: setOpen.close);
  var serverIP ="0.0.0.0"
 

    function refreshClock() {
    setDate(new Date());
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000);
    return function cleanup() {
      clearInterval(timerId);
    };
  }, []);

    
    return (
    <>
      <Notifications />
      <Title order ={1} align= "center" >
        {createText((date.getHours()*3600 +date.getMinutes()*60 +date.getSeconds()), lastTime)} 
      </Title> 
      
      <Drawer opened={opened} onClose={setOpen.toggle} title="pick color">
            {MyColorPicker()}     
            <Button onClick={()=> {
            lastTime = (date.getHours()*3600 +date.getMinutes()*60 +date.getSeconds());
            setOpen.toggle();
            notifications.show({
            title: 'your input was confirmed',
            message: '',
          });
           }}>

            confirm
            </Button> 
      </Drawer>
      <Group position="center" >
        
        <Image ref = {ref2} width={WIDTH} height={HEIGHT} src={require('./image.jpeg')} />

      </Group>
      <Text align="center">
        Mouse coordinates <Code>{`{ x: ${x}, y: ${y} , ip: ${ip}}`}</Code>
      </Text>
      <Group position='left'>
        <text>
        server ip:
        </text>
          <TextInput type="number"
      inputMode='numeric' max={200} style={{ width: '50px' }}  value={ip1} onChange={(event) => setIp1(event.currentTarget.value)}  />.
          <TextInput style={{ width: '50px' }} maxLength={3} value={ip2} onChange={(event) => setIp2(event.currentTarget.value)} />.
          <TextInput style={{ width: '50px' }} maxLength={3} value={ip3} onChange={(event) => setIp3(event.currentTarget.value)} />.
          <TextInput style={{ width: '50px' }} maxLength={3} value={ip4} onChange={(event) => setIp4(event.currentTarget.value)} />
      </Group>
      <Button onClick={() => {setIP(ip1+"."+ip2+"."+ip3+"."+ip4);
                                connect(ip,8000)}} >
            confirm
      </Button> 
    </>
  );
}


// Custom theme is applied to all components in App
var time = new Date()
var lastTime = time.getHours()*3600 +time.getMinutes()*60 +time.getSeconds()
// var net = require('net');
// var client = new net.Socket();

export default App  
