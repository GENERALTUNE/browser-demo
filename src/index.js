/**
 * @author      Jeremy England
 * @license     MIT
 * @description Adds tabs, views, and controls to specified containers in node.js electron.
 * @requires    electron, jquery, color.js
 * @see         https://github.com/simply-coded/electron-navigation
 * @tutorial
 *  Add these IDs to your html (containers don't have to be divs).
 *      <div id='nav-body-ctrls'></div>     
 *      <div id='nav-body-tabs'></div>
 *      <div id='nav-body-views'></div>       
 *  Add these scripts to your html (at the end of the body tag).
 *      <script>
 *          const enav = new (require('electron-navigation'))()
 *      </script>
 *  Add a theme file to your html (at the end of the head tag)(optional).
 *      <link rel="stylesheet" type="text/css" href="location/of/theme.css">
 */
/**
 * DEPENDENCIES
 */
var $ = require('jquery')
var Color = require('color.js')
/**
 * OBJECT
 */
function Navigation(options) {
    /**
     * OPTIONS
     */
    var defaults = {
        showBackButton: true,
        showForwardButton: true,
        showReloadButton: true,
        showUrlBar: true,
        showAddTabButton: true,
        closableTabs: true,
        verticalTabs: false,
        defaultFavicons: false
    }
    if (options === 'undefined' || options === 'null' || options !== Object(options)) {
        options = {}
    }
    for (var key in defaults) {
        if (!(key in options)) {
            options[key] = defaults[key]
        }
    }
    /**
     * GLOBALS & ICONS
     */
    const NAV = this
    this.SESSION_ID = 1
    if (options.defaultFavicons) {
        this.TAB_ICON = "default"
    } else {
        this.TAB_ICON = "clean"
    }

    this.SVG_BACK = '<svg height="100%" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/></svg>'
    this.SVG_FORWARD = '<svg height="100%" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>'
    this.SVG_RELOAD = '<svg height="100%" viewBox="0 0 24 24" id="nav-ready"><path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'
    this.SVG_FAVICON = '<svg height="100%" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>'
    this.SVG_ADD = '<svg height="100%" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>'
    this.SVG_CLEAR = '<svg height="100%" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'
    /**
     * ADD ELEMENTS
     */
    if (options.showBackButton) {
        $('#nav-body-ctrls').append('<i id="nav-ctrls-back" class="nav-icons" title="Go back">' + this.SVG_BACK + '</i>')
    }
    if (options.showForwardButton) {
        $('#nav-body-ctrls').append('<i id="nav-ctrls-forward" class="nav-icons" title="Go forward">' + this.SVG_FORWARD + '</i>')
    }
    if (options.showReloadButton) {
        $('#nav-body-ctrls').append('<i id="nav-ctrls-reload" class="nav-icons" title="Reload page">' + this.SVG_RELOAD + '</i>')
    }
    if (options.showUrlBar) {
        $('#nav-body-ctrls').append('<input id="nav-ctrls-url" type="text" title="Enter an address or search term"/>')
    }
    if (options.showAddTabButton) {
        $('#nav-body-tabs').append('<i id="nav-tabs-add" class="nav-icons" title="Add new tab">' + this.SVG_ADD + '</i>')
    }
    /**
     * ADD CORE STYLE
     */
    if (options.verticalTabs) {
        $('head').append('<style id="nav-core-styles">#nav-body-ctrls,#nav-body-tabs,#nav-body-views,.nav-tabs-tab{display:flex;align-items:center;}#nav-body-tabs{overflow:auto;min-height:32px;flex-direction:column;}#nav-ctrls-url{box-sizing:border-box;}.nav-tabs-tab{min-width:60px;width:100%;min-height:20px;}.nav-icons{fill:#000;width:24px;height:24px}.nav-icons.disabled{pointer-events:none;opacity:.5}#nav-ctrls-url{flex:1;height:24px}.nav-views-view{flex:0 1;width:0;height:0}.nav-views-view.active{flex:1;width:100%;height:100%}.nav-tabs-favicon{align-content:flex-start}.nav-tabs-title{flex:1;cursor:default;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.nav-tabs-close{align-content:flex-end}@keyframes nav-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}</style>')
    } else {
        $('head').append('<style id="nav-core-styles">#nav-body-ctrls,#nav-body-tabs,#nav-body-views,.nav-tabs-tab{display:flex;align-items:center}#nav-body-tabs{overflow:auto;min-height:32px;}#nav-ctrls-url{box-sizing:border-box;}.nav-tabs-tab{min-width:60px;width:180px;min-height:20px;}.nav-icons{fill:#000;width:24px;height:24px}.nav-icons.disabled{pointer-events:none;opacity:.5}#nav-ctrls-url{flex:1;height:24px}.nav-views-view{flex:0 1;width:0;height:0}.nav-views-view.active{flex:1;width:100%;height:100%}.nav-tabs-favicon{align-content:flex-start}.nav-tabs-title{flex:1;cursor:default;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.nav-tabs-close{align-content:flex-end}@keyframes nav-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}</style>')
    }
    /**
     * EVENTS
     */
    //
    // switch active view and tab on click
    //
    $('#nav-body-tabs').on('click', '.nav-tabs-tab', function () {
        $('.nav-tabs-tab, .nav-views-view').removeClass('active')

        var sessionID = $(this).data('session')
        $('.nav-tabs-tab, .nav-views-view')
            .filter('[data-session="' + sessionID + '"]')
            .addClass('active')

        var session = $('.nav-views-view[data-session="' + sessionID + '"]')[0]
        $('#nav-ctrls-url').prop('value', session.getURL())
        NAV._updateCtrls(session)
        //
        // close tab and view
        //
    }).on('click', '.nav-tabs-close', function () {
        var sessionID = $(this).parent('.nav-tabs-tab').data('session')
        var session = $('.nav-tabs-tab, .nav-views-view').filter('[data-session="' + sessionID + '"]')

        if (session.hasClass('active')) {
            if (session.next('.nav-tabs-tab').length) {
                session.next().addClass('active');
            } else {
                session.prev().addClass('active');
            }
        }

        $('#nav-ctrls-url').prop('value', '')
        session.remove()

        $('.nav-tabs-tab.active').click();

        return false
    })
    //
    // add a tab, default to google.com
    //
    $('#nav-body-tabs').on('click', '#nav-tabs-add', function () {
        NAV.newTab('http://www.17500.cn/', {
            close: options.closableTabs,
            icon: NAV.TAB_ICON
        })
    })
    //
    // go back
    //
    $('#nav-body-ctrls').on('click', '#nav-ctrls-back', function () {
        NAV.back()
    })
    //
    // go forward
    //
    $('#nav-body-ctrls').on('click', '#nav-ctrls-forward', function () {
        NAV.forward()
    })
    //
    // reload page
    //
    $('#nav-body-ctrls').on('click', '#nav-ctrls-reload', function () {
        if ($(this).find('#nav-ready').length) {
            NAV.reload()
        } else {
            NAV.stop()
        }
    })
    //
    // highlight address input text on first select
    //
    $('#nav-ctrls-url').on('focus', function (e) {
        $(this)
            .one('mouseup', function () {
                $(this).select()
                return false
            })
            .select()
    })
    //
    // load or search address on enter / shift+enter
    //
    $('#nav-ctrls-url').keyup(function (e) {
        if (e.keyCode == 13) {
            if (e.shiftKey) {
                NAV.newTab(this.value, {
                    close: options.closableTabs,
                    icon: NAV.TAB_ICON
                })
            } else {
                if ($('.nav-tabs-tab').length) {
                    NAV.changeTab(this.value)
                } else {
                    NAV.newTab(this.value, {
                        close: options.closableTabs,
                        icon: NAV.TAB_ICON
                    })
                }
            }
        }
    })
    /** 
     * FUNCTIONS 
     */
    //
    // update back and forward buttons
    //
    this._updateCtrls = function (webview) {
        if (webview.canGoBack()) {
            $('#nav-ctrls-back').removeClass('disabled')
        } else {
            $('#nav-ctrls-back').addClass('disabled')
        }
        if (webview.canGoForward()) {
            $('#nav-ctrls-forward').removeClass('disabled')
        } else {
            $('#nav-ctrls-forward').addClass('disabled')
        }
    } //:_updateCtrls()
    //
    // auto add http protocol to url input or do a search
    //
    this._purifyUrl = function (url) {
        if (/(\.\w+\/?|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}(:\d{1,4})?)$/i.test(url)) {
            url = (!url.match(/^[a-zA-Z]+:\/\//)) ? 'http://' + url : url
        } else {
            url = (!url.match(/^[a-zA-Z]+:\/\//)) ? 'https://www.17500.cn' : url
        }
        return url
    } //:_purifyUrl()
    //
    // set the color of the tab based on the favicon
    //
    this._setTabColor = function (url, currtab) {
        const getHexColor = new Color(url, {
            amount: 1,
            format: 'hex'
        })
        getHexColor.mostUsed(result => {
            currtab.find('.nav-tabs-favicon svg').attr('fill', result)
        })
    } //:_setTabColor()
    //
    // add event listeners to current webview
    //
    this._addEvents = function (sessionID, favicon, title) {
        var currtab = $('.nav-tabs-tab[data-session="' + sessionID + '"]')
        var webview = $('.nav-views-view[data-session="' + sessionID + '"]')

        webview.on('page-title-updated', function () {
            if (title == 'default') {
                currtab.find('.nav-tabs-title').text(webview[0].getTitle())
                currtab.find('.nav-tabs-title').attr('title', webview[0].getTitle())
            }
        })
        webview.on('did-start-loading', function () {
            currtab.find('.nav-tabs-favicon').css('animation', 'nav-spin 2s linear infinite')
            $('#nav-ctrls-reload').html(NAV.SVG_CLEAR)
        })
        webview.on('did-stop-loading', function () {
            currtab.find('.nav-tabs-favicon').css('animation', '')
            $('#nav-ctrls-reload').html(NAV.SVG_RELOAD)
        })
        webview.on('enter-html-full-screen', function () {
            $('.nav-views-view.active').siblings().not('script').hide()
            $('.nav-views-view.active').parents().not('script').siblings().hide()
        })
        webview.on('leave-html-full-screen', function () {
            $('.nav-views-view.active').siblings().not('script').show()
            $('.nav-views-view.active').parents().siblings().not('script').show()
        })
        webview.on('load-commit', function () {
            NAV._updateCtrls(webview[0])
            if (!$('#nav-ctrls-url').is(':focus')) {
                $('#nav-ctrls-url').attr('value', webview[0].getURL())
            }
        })
        webview[0].addEventListener('new-window', (res) => {
            NAV.newTab(res.url, {
                icon: NAV.TAB_ICON
            })
        })
        webview[0].addEventListener('page-favicon-updated', (res) => {
            if (favicon == 'clean') {
                NAV._setTabColor(res.favicons[0], currtab)
            } else if (favicon == 'default') {
                currtab.find('.nav-tabs-favicon').attr('src', res.favicons[0])
            }
        })
        webview[0].addEventListener('did-fail-load', function (res) {
            if (res.validatedURL == $('#nav-ctrls-url').val() && res.errorCode != -3) {
                this.executeJavaScript('document.body.innerHTML=' +
                    '<div style="background-color:whitesmoke;padding:40px;margin:20px;font-family:consolas;">' +
                    '<h2 align=center>Oops, this page failed to load correctly.</h2>' +
                    '<p align=center><i>ERROR [ ' + res.errorCode + ', ' + res.errorDescription + ' ]</i></p>' +
                    '<br/><hr/>' +
                    '<h4>Try this</h4>' +
                    '<li type=circle>Check your spelling - <b>"' + res.validatedURL + '".</b></li><br/>' +
                    '<li type=circle><a href="javascript:location.reload();">Refresh</a> the page.</li><br/>' +
                    '<li type=circle>Perform a <a href=javascript:location.href="https://www.17500.cn">search</a> instead.</li><br/>' +
                    '</div>'
                )
            }
        })
        return webview[0]
    } //:_addEvents()
} //:Navigation()
/**
 * PROTOTYPES
 */
//
// create a new tab and view with an url and optional id
//
Navigation.prototype.newTab = function (url, options) {
    var defaults = {
        id: null, // null, 'custom'
        node: false, // true, false
        icon: "clean", // 'default', 'clean', 'c:\custom.png'
        title: "default", // 'default', 'custom'
        close: true // true, false        
    }
    if (options === 'undefined' || options === 'null' || options !== Object(options)) {
        options = {}
    }
    for (var key in defaults) {
        if (!(key in options)) {
            options[key] = defaults[key]
        }
    }
    // validate options.id
    $('.nav-tabs-tab, .nav-views-view').removeClass('active')
    if ($('#' + options.id).length) {
        console.log('ERROR[electron-navigation][func "newTab();"]: The ID "' + options.id + '" already exists. Please use another one.')
        return false
    }
    if (!(/^[A-Za-z]+[\w\-\:\.]*$/.test(options.id))) {
        console.log('ERROR[electron-navigation][func "newTab();"]: The ID "' + options.id + '" is not valid. Please use another one.')
        return false
    }
    // build tab    
    var tab = '<span class="nav-tabs-tab active" data-session="' + this.SESSION_ID + '">'
    // favicon
    if (options.icon == 'clean') {
        tab += '<i class="nav-tabs-favicon nav-icons">' + this.SVG_FAVICON + '</i>'
    } else if (options.icon === 'default') {
        tab += '<img class="nav-tabs-favicon nav-icons" src=""/>'
    } else {
        tab += '<img class="nav-tabs-favicon nav-icons" src="' + options.icon + '"/>'
    }
    // title
    if (options.title == 'default') {
        tab += '<i class="nav-tabs-title">...</i>'
    } else {
        tab += '<i class="nav-tabs-title">' + options.title + '</i>'
    }
    // close
    if (options.close) {
        tab += '<i class="nav-tabs-close nav-icons">' + this.SVG_CLEAR + '</i>'
    }
    // finish tab
    tab += '</span>'
    // add tab to correct position
    if ($('#nav-body-tabs').has('#nav-tabs-add').length) {
        $('#nav-tabs-add').before(tab)
    } else {
        $('#nav-body-tabs').append(tab)
    }
    // id
    if (options.id == null) {
        if (options.node) {
            $('#nav-body-views').append('<webview plugins class="nav-views-view active" data-session="' + this.SESSION_ID + '" src="' + this._purifyUrl(url) + '" nodeintegration></webview>')
        } else {
            $('#nav-body-views').append('<webview plugins class="nav-views-view active" data-session="' + this.SESSION_ID + '" src="' + this._purifyUrl(url) + '"></webview>')
        }
    } else {
        if (options.node) {
            $('#nav-body-views').append('<webview plugins  id="' + options.id + '" class="nav-views-view active" data-session="' + this.SESSION_ID + '" src="' + this._purifyUrl(url) + '" nodeintegration></webview>')
        } else {
            $('#nav-body-views').append('<webview plugins id="' + options.id + '" class="nav-views-view active" data-session="' + this.SESSION_ID + '" src="' + this._purifyUrl(url) + '"></webview>')
        }
    }

    //change nav url
    $('#nav-ctrls-url').prop('value', this._purifyUrl(url))


    return this._addEvents(this.SESSION_ID++, options.icon, options.title)    
} //:newTab()
//
// change current or specified tab and view
//
Navigation.prototype.changeTab = function (url, id) {
    id = id || null
    if (id == null) {
        $('.nav-views-view.active').attr('src', this._purifyUrl(url))
    } else {
        if ($('#' + id).length) {
            $('#' + id).attr('src', this._purifyUrl(url))
        } else {
            console.log('ERROR[electron-navigation][func "changeTab();"]: Cannot find the ID "' + id + '"')
        }
    }
} //:changeTab()
//
// close current or specified tab and view
//
Navigation.prototype.closeTab = function (id) {
    id = id || null

    var session
    if (id == null) {
        session = $('.nav-tabs-tab.active, .nav-views-view.active')
    } else {
        if ($('#' + id).length) {
            var sessionID = $('#' + id).data('session')
            session = $('.nav-tabs-tab, .nav-views-view').filter('[data-session="' + sessionID + '"]')
        } else {
            console.log('ERROR[electron-navigation][func "closeTab();"]: Cannot find the ID "' + id + '"')
            return false
        }
    }

    if (session.next('.nav-tabs-tab').length) {
        session.next().addClass('active').click();
    } else {
        session.prev().addClass('active').click();
    }

    // $('#nav-ctrls-url').attr('value', session.next().getURL())
    session.remove()
} //:closeTab()
//
// go back on current or specified view
//
Navigation.prototype.back = function (id) {
    id = id || null
    if (id == null) {
        $('.nav-views-view.active')[0].goBack()
    } else {
        if ($('#' + id).length) {
            $('#' + id)[0].goBack()
        } else {
            console.log('ERROR[electron-navigation][func "back();"]: Cannot find the ID "' + id + '"')
        }
    }
} //:back()
//
// go forward on current or specified view
//
Navigation.prototype.forward = function (id) {
    id = id || null
    if (id == null) {
        $('.nav-views-view.active')[0].goForward()
    } else {
        if ($('#' + id).length) {
            $('#' + id)[0].goForward()
        } else {
            console.log('ERROR[electron-navigation][func "forward();"]: Cannot find the ID "' + id + '"')
        }
    }
} //:forward()
//
// reload current or specified view
//
Navigation.prototype.reload = function (id) {
    id = id || null
    if (id == null) {
        $('.nav-views-view.active')[0].reload()
    } else {
        if ($('#' + id).length) {
            $('#' + id)[0].reload()
        } else {
            console.log('ERROR[electron-navigation][func "reload();"]: Cannot find the ID "' + id + '"')
        }
    }
} //:reload()
//
// stop loading current or specified view
//
Navigation.prototype.stop = function (id) {
    id = id || null
    if (id == null) {
        $('.nav-views-view.active')[0].stop()
    } else {
        if ($('#' + id).length) {
            $('#' + id)[0].stop()
        } else {
            console.log('ERROR[electron-navigation][func "stop();"]: Cannot find the ID "' + id + '"')
        }
    }
} //:stop()
//
// listen for a message from webview
//
Navigation.prototype.listen = function (id, callback) {    
    let webview = null

    //check id
    if ($('#' + id).length) {
        webview = document.getElementById(id)
    } else {            
        console.log('ERROR[electron-navigation][func "listen();"]: Cannot find the ID "' + id + '"')
    }
    
    // listen for message
    if (webview != null) {
        try {
            webview.addEventListener('ipc-message', (event) => {                    
                callback(event.channel, event.args, webview);
            })
        } catch (e) {
            webview.addEventListener("dom-ready", function (event) {
                webview.addEventListener('ipc-message', (event) => {                    
                    callback(event.channel, event.args, webview);
                })             
            })
        }        
    } 
} //:listen()
//
// send message to webview
//
Navigation.prototype.send = function (id, channel, args) {    
    let webview = null

    // check id
    if ($('#' + id).length) {
        webview = document.getElementById(id)
    } else {            
        console.log('ERROR[electron-navigation][func "send();"]: Cannot find the ID "' + id + '"')
    }
    
    // send a message
    if (webview != null) {
        try {
            webview.send(channel, args)
        } catch (e) {
            webview.addEventListener("dom-ready", function (event) {
                webview.send(channel, args)
            })
        }        
    } 
} //:send()
//
// open developer tools of current or ID'd webview
//
Navigation.prototype.openDevTools = function(id) {
    id = id || null
    let webview = null

    // check id
    if (id == null) {
        webview = $('.nav-views-view.active')[0]
    } else {
        if ($('#' + id).length) {
            webview = document.getElementById(id)
        } else {            
            console.log('ERROR[electron-navigation][func "openDevTools();"]: Cannot find the ID "' + id + '"')
        }
    }
    
    // open dev tools
    if (webview != null) {
        try {
            webview.openDevTools()
        } catch (e) {
            webview.addEventListener("dom-ready", function (event) {
                webview.openDevTools()
            })
        }        
    }    
} //:openDevTools()
/**
 * MODULE EXPORTS 
 */
module.exports = Navigation