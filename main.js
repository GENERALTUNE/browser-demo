const {
    app,
    BrowserWindow,
    nativeImage
} = require('electron')

let win


//此处仅兼容了Windows 的 32位 与 64位
const pepflashplayer = (process.arch == 'x64')? `${__dirname}/flash/pepflashplayer64_23_0_0_207.dll`:`${__dirname}/flash/pepflashplayer32_23_0_0_207.dll`;
//设定插件
app.commandLine.appendSwitch('ppapi-flash-path', pepflashplayer);
//设定插件版本（不知道是否真有用，不匹配貌似也能运行）
app.commandLine.appendSwitch('ppapi-flash-version', '23.0.0.207');

app.on('ready', () => {

    win = new BrowserWindow({
        width: 1260,
        height: 800,
        title: "乐彩网浏览器",
        icon: __dirname + '/images/lecai.png',
        // frame: false
    });

    //隐藏菜单栏
    win.setMenu(null);

    win.loadURL(`file:///${__dirname}/index.html`)

    win.on('closed', () => {
        win = null
    })

})