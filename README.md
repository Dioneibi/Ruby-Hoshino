<h1 align="center">⋆｡˚꒰ঌ 🌀𝐓𝐚𝐭𝐬𝐮𝐦𝐚𝐤𝐢-𝐁𝐨𝐭-𝐌𝐃🌀 ໒꒱˚｡⋆</h1>
<p align="center">Tu Bot ideal!</p>

<p align="center">
  <img src="https://files.catbox.moe/2543jw.jpg" alt="No robes Rata" width="600"/>
</p>

#### **`💣 Instalación por cloudshell`**

 🦎 Comandos</b></summary>

[![blog](https://img.shields.io/badge/Video-Tutorial-FF0000?style=for-the-badge&logo=youtube&logoColor=white)
](https://youtu.be/0JtOm_ie4CQ?si=kbL823AQmUhC3PmC)

[`🚩 Instalar Cloud Shell Clic Aqui`](https://www.mediafire.com/file/bp2l6cci2p30hjv/Cloud+Shell_1.apk/file)

```bash
 git clone https://github.com/Dioneibi/Tatsumaki-Bot-MD
```

```bash
 cd Tatsumaki-Bot-MD && yarn install
```

```bash
 npm install
```

```bash
 npm start
```

</details>

---

*termux*
[`Instalar Termux Clic Aqui`](https://www.mediafire.com/file/3hsvi3xkpq3a64o/termux_118.apk/file)
automatico:

poner uno por uno

```bash
termux-setup-storage
```
```bash
grep -q 'bash\|wget' <(dpkg -l) || apt install -y bash wget && wget -O - https://raw.githubusercontent.com/Dioneibi/Tatsumaki-Bot-MD/main/install22.sh | bash
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
git clone https://github.com/Dioneibi/Tatsumaki-Bot-MD && cd Tatsumaki-Bot-MD
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
 cd Tatsumaki-Bot-MD
 npm start
```
 obtener otro codigo:
```bash
 cd Tatsumaki-Bot-MD
 rm -rf TatsumakiSession
 npm start
```
 si no quieren que se apague:
```bash
termux-wake-lock && npm i -g pm2 && pm2 start index.js && pm2 save && pm2 logs 
```
actualizar:
```bash
grep -q 'bash\|wget' <(dpkg -l) || apt install -y bash wget && wget -O - https://raw.githubusercontent.com/Dioneibi/Tatsumaki-Bot-MD/master/update.sh | bash
 ```
