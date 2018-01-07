const {
    app,
    BrowserWindow
} = require('electron')

let win

app.on('ready', () => {

    win = new BrowserWindow({
        width: 1260,
        height: 800,
        title: "乐彩网浏览器",
        icon: 'images/logo.gif'
        // frame: false
    });

    //隐藏菜单栏
    win.setMenu(null);

    win.loadURL(`file:///${__dirname}/index.html`)

    win.on('closed', () => {
        win = null
    })

})