*termux*
[`Instalar Termux Clic Aqui`](https://www.mediafire.com/file/3hsvi3xkpq3a64o/termux_118.apk/file)
automatico:

poner uno por uno

```bash
termux-setup-storage
```
```bash
grep -q 'bash\|wget' <(dpkg -l) || apt install -y bash wget && wget -O - https://raw.githubusercontent.com/nevi67/VermeilBot-MD/main/install22.sh | bash
```

manual:
poner uno por uno 

```bash
termux-setup-storage
```
```bash
apt update && apt upgrade && pkg install -y git nodejs ffmpeg imagemagick yarn
```
```bash
git clone https://github.com/nevi67/VermeilBot-MD && cd VermeilBot-MD
```
```bash
yarn install && npm install
```
```bash
npm start
```

si se apaga el bot:
```bash
 cd 
 cd VermeilBot-MD
 npm start
```
 obtener otro codigo:
```bash
 cd VermeilBot-MD
 rm -rf VermeilSession
 npm start
```
 si no quieren que se apague:
```bash
termux-wake-lock && npm i -g pm2 && pm2 start index.js && pm2 save && pm2 logs 
```
actualizar:
```bash
grep -q 'bash\|wget' <(dpkg -l) || apt install -y bash wget && wget -O - https://raw.githubusercontent.com/nevi67/VermeilBot-MD/master/update.sh | bash
 ```
