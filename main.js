const {
    app,
    BrowserWindow,
    nativeImage
} = require('electron')

const {resolve} = require('path')

let win


//此处仅兼容了Windows 的 32位 与 64位
const pepflashplayer = (process.arch == 'x64')? `${__dirname}\\plugins\\PepperFlash\\28.0.0.161\\pepflashplayer.dll`:`${__dirname}/flash/pepflashplayer32_23_0_0_207.dll`;

app.on('ready', () => {

    //设定插件
app.commandLine.appendSwitch('ppapi-flash-path', pepflashplayer);
//设定插件版本（不知道是否真有用，不匹配貌似也能运行）
app.commandLine.appendSwitch('ppapi-flash-version', '28.0.0.161');


    win = new BrowserWindow({
        width: 1260,
        height: 800,
        title: "乐彩网浏览器",
        icon: __dirname + '/images/lecai.png',
        'web-preferences': {
            'plugins': true
        },
        // frame: false
    });

    //隐藏菜单栏
    win.setMenu(null);

    win.loadURL(`file:///${__dirname}/index.html`)

    win.on('closed', () => {
        win = null
    })

})