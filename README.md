*termux*
automatico:

poner uno por uno

```bash
termux-setup-storage
grep -q 'bash\|wget' <(dpkg -l) || apt install -y bash wget && wget -O - https://raw.githubusercontent.com/nevi67/VermeilBot-MD/main/install22.sh | bash
```bash

manual:
poner uno por uno 

```bash
termux-setup-storage
apt update && apt upgrade && pkg install -y git nodejs ffmpeg imagemagick yarn
git clone https://github.com/nevi67/VermeilBot-MD && cd VermeilBot-MD
yarn install && npm install
```bash

npm start

si se apaga el bot:

 cd 
 cd VermeilBot-MD
 npm start

 obtener otro codigo:

 cd VermeilBot-MD
 rm -rf VermeilSession
 npm start

 si no quieren que se apague:

termux-wake-lock && npm i -g pm2 && pm2 start index.js && pm2 save && pm2 logs 

actualizar:

grep -q 'bash\|wget' <(dpkg -l) || apt install -y bash wget && wget -O - https://raw.githubusercontent.com/nevi67/VermeilBot-MD/master/update.sh | bash
 
