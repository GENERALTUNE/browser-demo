# electron-navigation
![version](https://img.shields.io/npm/v/electron-navigation.svg?style=flat-square)![downloads](https://img.shields.io/npm/dt/electron-navigation.svg?style=flat-square)![license](https://img.shields.io/npm/l/electron-navigation.svg?style=flat-square)

## Adds a navigation interface to Electron that allows you to browse the internet or view local HTML files with tabs and webviews.

![](previews/light-theme.PNG)![](previews/in-action.gif)

## Install 
---
```
npm i electron-navigation
```
> Confused? Go through the [Setup](#setup) for a full guide.   
> Know what you are doing? Skip to the [Usage](#usage) section.


<p align="center" style="color:black;">
    <a href="#setup" style="color:grey;">SETUP</a> |
    <a href="#usage" style="color:grey;">USAGE</a> |
    <a href="#themes" style="color:grey;">THEME</a> |
    <a href="#options" style="color:grey;">OPTIONS</a> |
    <a href="#methods" style="color:grey;">METHODS</a> |
    <a href="#more" style="color:grey;">MORE</a> |
    <a href="#history" style="color:grey;">HISTORY</a> |
    <a href="#meta" style="color:grey;">CONTACT</a>
</p>

## Setup
---  

> This works with electron, so let's get a basic electron app going.


1. Create a folder; we'll call this one **demo**. In that folder create these three files.
    ```
    demo/
    ├── package.json
    ├── main.js
    ├── index.html
    ```

2. Let's populate these files with some basic code.  

	`package.json`
    ```json
    {
      "name": "demo",
      "version": "1.0.0",
      "description": "",
      "main": "main.js",
      "scripts": {
        "start": "electron ."
      },
      "author": "",
      "license": "ISC"
    }
    ```

    `main.js`
    ```javascript
    const {
        app,
        BrowserWindow
    } = require('electron')

    let win

    app.on('ready', () => {

        win = new BrowserWindow({
            width: 800,
            height: 600
        })

        win.loadURL(`file:///${__dirname}/index.html`)

        win.on('closed', () => {
            win = null
        })

    })
    ```
	`index.html`
    ```html
    <!DOCTYPE html>
    <html>
      <head></head>
        <body>

		  test demo
        
        </body>
    </html>
    ```
    
3. Time to test if it works. Open up your command prompt (windows) and type these commands hitting *enter* after each one. Make sure you have Node.js installed which can be found [here](https://nodejs.org/en/download/).
    ```
    cd "C:\location\of\your\folder\demo"
    npm i electron-navigation --save
    npm start
    ```
	![](previews/electron.PNG)

4. From here on out if you leave your command prompt window open to the demo directory, you can run your app by typing.
	```
    npm start
    ```

<p align="center" style="color:black;">
    <a href="#setup" style="color:grey;">SETUP</a> |
    <a href="#usage" style="color:grey;">USAGE</a> |
    <a href="#themes" style="color:grey;">THEME</a> |
    <a href="#options" style="color:grey;">OPTIONS</a> |
    <a href="#methods" style="color:grey;">METHODS</a> |
    <a href="#more" style="color:grey;">MORE</a> |
    <a href="#history" style="color:grey;">HISTORY</a> |
    <a href="#meta" style="color:grey;">CONTACT</a>
</p>

## Usage
---
1. In your main **~.html** file you need to create **3** containers where the controls, tabs, and views will be auto placed into. The demo uses **index.html** as it's main file.
    
    ```html
    EXAMPLE: index.html

    <body>
    <!-- your code here -->

      <div id="nav-body-ctrls"></div>
      <div id="nav-body-tabs"></div>
      <div id="nav-body-views"></div>

    </body>
    ```
    NOTE:   
    * The **IDs** are important. Make sure they are spelled correctly.    
    * If you don't want your users to control the pages you can get rid of the controls container. The ID for that is **nav-body-ctrls** .  
    * The order or location of these divs doesn't matter, and they also don't have to be div elements. For example: `<main id="nav-body-views"></main>`.
	
2. Now we need to apply the module by adding a script tag to the **~.html** file so that it can add the tabs and controls to the containers we just created above.	

    
    ```html
    EXAMPLE: index.html

    <!-- your code here -->
	<div id="nav-body-ctrls"></div>
    <div id="nav-body-tabs"></div>
    <div id="nav-body-views"></div>
    
    <script>
        const ElectronNavigation = require('electron-navigation')
        const enav = new ElectronNavigation()
    </script>

    </body>
    ```
3. Now that we have this, let's give it a quick run. If you've been following the setup guide, it would be like this.  

    ```
    npm start
    ```
    ![](previews/electron-with-module.PNG)

> This should be all you need to get the basic functionality working. If you are confused and want some more examples including how to use **local html files** in the tabs then check out the [demos](https://github.com/simply-coded/electron-navigation/tree/master/test) on github.

<p align="center" style="color:black;">
    <a href="#setup" style="color:grey;">SETUP</a> |
    <a href="#usage" style="color:grey;">USAGE</a> |
    <a href="#themes" style="color:grey;">THEME</a> |
    <a href="#options" style="color:grey;">OPTIONS</a> |
    <a href="#methods" style="color:grey;">METHODS</a> |
    <a href="#more" style="color:grey;">MORE</a> |
    <a href="#history" style="color:grey;">HISTORY</a> |
    <a href="#meta" style="color:grey;">CONTACT</a>
</p>

## Themes
---
You can apply themes by downloading the ones on [github](https://github.com/simply-coded/electron-navigation/tree/master/themes) and putting them in your `<head>` tag.  

`index.html`
```html
<head>
  <!-- your code here -->
    
  <link rel="stylesheet" href="relative/location/of/theme.css">
</head>
```


The themes folder also has a template theming file that you can use to style the tabs and controls exactly how you wish. 

`theme-template.css`
```css
/* back button, grouped in: .nav-icons */
#nav-ctrls-back {
    /* fill:#000; width:24px; height:24px; */
}


/* back button with no history, grouped in: .nav-icons.disabled */
#nav-ctrls-back.disabled {
    /* pointer-events:none; opacity:0.5; */
}
```

<p align="center" style="color:black;">
    <a href="#setup" style="color:grey;">SETUP</a> |
    <a href="#usage" style="color:grey;">USAGE</a> |
    <a href="#themes" style="color:grey;">THEME</a> |
    <a href="#options" style="color:grey;">OPTIONS</a> |
    <a href="#methods" style="color:grey;">METHODS</a> |
    <a href="#more" style="color:grey;">MORE</a> |
    <a href="#history" style="color:grey;">HISTORY</a> |
    <a href="#meta" style="color:grey;">CONTACT</a>
</p>

## Options
---
> You can control how and if some elements are displayed by passing an options object through the main electron-navigation object.
```const enav = new ElectronNavigation(```<span style="color:red"> **{ }** </span>```);``` 

<details>
<summary>Details ( click to expand )</summary>

{ **showBackButton** : *boolean* }
> Shows/Hides the back button in #nav-body-ctrls. Defaults to **true**.

{ **showForwardButton** : *boolean* }
> Shows/Hides the forward button in #nav-body-ctrls. Defaults to **true**.

{ **showReloadButton** : *boolean* }
> Shows/Hides the reload button in #nav-body-ctrls. Defaults to **true**.

{ **showUrlBar** : *boolean* }
> Shows/Hides the url input in #nav-body-ctrls. Defaults to **true**.

{ **showAddTabButton** : *boolean* }
> Shows/Hides the add button in #nav-body-tabs. Defaults to **true**.

{ **closableTabs** : *boolean* }
> Shows/Hides the close button on tabs in .nav-tabs-tab. Defaults to **true**.

{ **verticalTabs** : *boolean* }
> Changes the direction tabs are stacked in #nav-body-tabs. Defaults to **false**.

{ **defaultFavicons** : *boolean* }
> Uses the default favicons instead of the unified color coded ones in .nav-tabs-tab. Defaults to **false**.

```javascript
// Example of all options and their default values if omitted.
options = {
    showBackButton: true,
    showForwardButton: true,
    showReloadButton: true,
    showUrlBar: true,
    showAddTabButton: true,
    closableTabs: true,
    verticalTabs: false,
    defaultFavicons: false
}
```

</details>

```html
EXAMPLE: index.html

<script>
    const ElectronNavigation = require('electron-navgation')

    // the order doesn't matter
    const enav = new ElectronNavigation({
        showAddTabButton: false,
        showUrlBar: true,
        showReloadButton: false
    })

    
    /* shortcut
    const enav = new (require('electron-navgation'))({
        showAddTabButton: false,
        showUrlBar: true,
        showReloadButton: false
    })
    */
</script>
```

<p align="center" style="color:black;">
    <a href="#setup" style="color:grey;">SETUP</a> |
    <a href="#usage" style="color:grey;">USAGE</a> |
    <a href="#themes" style="color:grey;">THEME</a> |
    <a href="#options" style="color:grey;">OPTIONS</a> |
    <a href="#methods" style="color:grey;">METHODS</a> |
    <a href="#more" style="color:grey;">MORE</a> |
    <a href="#history" style="color:grey;">HISTORY</a> |
    <a href="#meta" style="color:grey;">CONTACT</a>
</p>

## Methods
---
> You can control the webviews and tabs using the object variable you created.   
```const ``` <span style="color:red">**enav**</span> ``` = new ElectronNavigation();```

### **.newTab ( url , { options } )**
<details>
<summary>Details ( click to expand )</summary>

> **url** [*required*] - specifies the location of the webview. Will auto add an HTTP protocol if a domain is specified. Otherwise it will perform a google search.
> ```javascript
> "http://github.com/" // "http://github.com/"
> "youtube.com" // "http://www.youtube.com/"
> "hello there" // "https://www.google.com/search?q=hello+there"
> ```
> **{ options }** [*optional*] - allows you to control the tab appearance.
>> { **id** : *string* } - creates an id for this tab's view so you can control it later. Logs an error if the id is already taken or invalid. Defaults to **null**.  
>> 
>> { **node** : *boolean* } - allows the webview to use Node.js, and is only recommended for local files. Defaults to **false**.
>>
>> { **icon** : *string* } - changes the favicon. Defaults to **"clean"**.
>> ```javascript
>> icon: "default" // uses the regular favicon.
>> icon: "clean" // uses a constant globe icon that is colored based on the default favicon.
>> icon: "custom.png" // uses an icon you provide. Full or relative paths and other extensions are allowed.
>> ```
>> { **title** : *string* } - changes the title of the tab. Defaults to **"default"**.
>> ```javascript
>> title: "default" // uses the title specified by the <title> tag.
>> title: "custom title" // uses whatever title you type.
>> ```
>> { **close** : *boolean* } - shows/hides the close button. Defaults to **true**.  
> ```javascript
> // example of all options and their default values if omitted.
> var options = {
>     id: null,  
>     node: false,         
>     icon: "clean",      
>     title: "default",   
>     close: true         
> }
> ```
> **return** - The *webview* Element object. Allows you to use the properties and methods as described here [Element API](https://developer.mozilla.org/en-US/docs/Web/API/Element).
>```javascript
> // Example on how to allow plugins
> var google = enav.newTab('http://www.google.com/')
> google.setAttribute('plugins', '')
>
> // Check if it has node integration
> if (google.hasAttribute('nodeintegration')) {
>    alert('yes, you can use node in this tab.')
> } else {
>    alert('no, you cannot use node in this tab.')   
> }
>```

</details>

### **.changeTab ( url , id )**

> **url** [*required*] - specifies the new location of the webview. Has the same auto features as *newTab()*.  
> 
> **id** [*optional*] - changes the source of the webview with the id specified in *newTab()*. If no id is given the active tab and view are affected. Will console.log an error if the id doesn't exist.

### **.closeTab ( id )**
> **id** [*optional*] - closes the tab and webview with the id specified in *newTab()*. If no id is given the active tab and view are affected. Will console.log an error if the id doesn't exist.

### **.back ( id )**
> **id** [*optional*] - goes back on the webview with the id specified in *newTab()*. If no id is given the active tab and view are affected. Will console.log an error if the id doesn't exist.

### **.forward ( id )**
> **id** [*optional*] - goes forward on the webview with the id specified in *newTab()*. If no id is given the active tab and view are affected. Will console.log an error if the id doesn't exist.

### **.reload ( id )**
> **id** [*optional*] - reloads the webview with the id specified in *newTab()*. If no id is given the active tab and view are affected. Will console.log an error if the id doesn't exist.

### **.stop ( id )**
> **id** [*optional*] - stops loading the webview with the id specified in *newTab()*. If no id is given the active tab and view are affected. Will console.log an error if the id doesn't exist.

### **.openDevTools ( id )**
> **id** [*optional*] - opens the developer tools for the webview with the id specified in *newTab()*. If no id is given the active tab and view are affected. Will console.log an error if the id doesn't exist.

### **.send ( id, channel, args )**
<details>
<summary>Details ( click to expand )</summary>

> **id** - sends a message to the webview with the id specified in *newTab()*. Will console.log an error if the id doesn't exist.  
>
> **channel** - a channel name of your choosing to keep track of messages.  
>
> **args** - a list [] of arguments to send to the webview.    
>```javascript
> enav.send('webviewIdHere', 'channelNameHere', ['arg', 'list', 'here'])
>```
> * See `test/parent-main.html` & `test/child-local.html` for examples.

</details>

### **.listen ( id, callback )**
<details>
<summary>Details ( click to expand )</summary>

> **id** - listens for a message from the webview with the id specified in *newTab()*. Will console.log an error if the id doesn't exist.  
>
> **callback** ( channel, args, respond ) - a function that returns info from a webview message.
>> **channel** - the channel the message is comming from.
>>
>> **args** - a list [] of arguments from the webview.  
>>
>> **respond** - the webview element that sent the message.  
>>```javascript
>> enav.listen('webviewIdHere', (channel, args, respond) => {
>>      if (channel == 'channelNameHere') {
>>          let argOne = args[0]
>>          let argTwo = args[1]
>>          // etc...
>>
>>          //respond
>>          respond.send('anotherChannelNameHere', ['arg', 'list', 'here'])
>>      }
>> }
>>```
> * See `test/parent-main.html` & `test/child-local.html` for examples.

</details>

```html
EXAMPLE: index.html

<script>   
    // create object
    const enav = new (require('electron-navigation'))({ 
        showAddTabButton: false 
    })
	
    enav.newTab('google.com', { id: 'srch' } )
    
    //setTimeout() is just used to show the effect.
    setTimeout("enav.changeTab('cool wallpapers', 'srch')", 2000)
    setTimeout("enav.back('srch')", 5000)
    
    // open a local file, and use a custom icon
    enav.newTab(`file:///${__dirname}/your-html-file.html`, { 
    	icon: 'images/site-icon.ico',
    	title: 'Local file'            
    })

    // create an unclosable tab that you can reference later with the id.
    enav.newTab('youtube.com', {
    	title: 'Watch Videos',
    	icon: 'default',
    	close: false,
    	id: 'watchStuff'
    })
    
    setTimeout('enav.changeTab( "https://www.youtube.com/watch?v=3_s8-OIkhOc" , "watchStuff" );', 5000)
    
</script>
```

<p align="center" style="color:black;">
    <a href="#setup" style="color:grey;">SETUP</a> |
    <a href="#usage" style="color:grey;">USAGE</a> |
    <a href="#themes" style="color:grey;">THEME</a> |
    <a href="#options" style="color:grey;">OPTIONS</a> |
    <a href="#methods" style="color:grey;">METHODS</a> |
    <a href="#more" style="color:grey;">MORE</a> |
    <a href="#history" style="color:grey;">HISTORY</a> |
    <a href="#meta" style="color:grey;">CONTACT</a>
</p>

## Requests | Issues | Clone <a name="more"></a>
---
> Looking to add functionality to this project, report a bug, or just have a question? Submit a [request](https://github.com/simply-coded/electron-navigation/issues), or clone the project and do it yourself.

```
git clone https://github.com/simply-coded/electron-navigation.git
```

> After you've cloned the project you can run the demos with npm.
```
npm test
```

<p align="center" style="color:black;">
    <a href="#setup" style="color:grey;">SETUP</a> |
    <a href="#usage" style="color:grey;">USAGE</a> |
    <a href="#themes" style="color:grey;">THEME</a> |
    <a href="#options" style="color:grey;">OPTIONS</a> |
    <a href="#methods" style="color:grey;">METHODS</a> |
    <a href="#more" style="color:grey;">MORE</a> |
    <a href="#history" style="color:grey;">HISTORY</a> |
    <a href="#meta" style="color:grey;">CONTACT</a>
</p>

## History
---
* 1.5.3
    * `REMOVE` - removed the node_modules folder from source.
* 1.5.2
    * `CHANGE` - made it easier to navigate **README.md**
* 1.5.1
    * `CHANGE` - the *newTab()* function now returns the webview that it creates. This was in response to a request to allow plugins in the webviews. An example of how to use this was added to the **README.md** and **demo-light.html**. 
* 1.5.0
    * `ADD` - *send()*, *listen()*, and *openDevTools()* functions for easier local HTML communication.
    * `CHANGE` - test folder file names and contents to reflect the latest features.
    * `CHANGE` - update **README.md** with new functions.
<details>
<summary>view more...</summary>

* 1.4.2
    * `CHANGE` - renamed the preview files to be more clear on what they are.
    * `CHANGE` - replaced the live preview with one that shows a local file example.
* 1.4.1
    * `FIX` - had the incorrect startup script in **package.json**.
    * `CHANGE` - clarified where you can find more examples in the **README.md**.
* 1.4.0
    * `ADD` - default favicons for main *options* object called **defaultFavicons**.
    * `FIX` - cleaned up some of the **README.md** code.
    * `CHANGE` - better demos in the **test/** folder.
    * `ADD` - local file example, with communication between parent and child.
    * `REMOVE` - extra demo files.
    * `CHANGE` - cleaned up the module code in **index.js**.
* 1.3.0
    * `ADD` - node integration for *newTab()* function.
* 1.2.2
    * `FIX` - script tags no longer show after going out of fullscreen.
* 1.2.1
    * `FIX` - changed the description to include local files.
    * `FIX` - url input now changes on tab click.
* 1.2.0
    * `ADD` - the *newTab()* function now has an options object as its second parameter to control the *icon*, *title*, *close button*, and add an *id*.
    * `CHANGE` - the second parameter *id* in *newTab()* is now included in an options object.
    * `FIX` - updated the **README.md** and **demo-light.html** files to show more examples.
* 1.1.1
    * `FIX` - updated the **README.md** with extra info, rearrangements, and formatting.
* 1.1.0
    * `FIX` - url bar will know not update while you are trying to type something new.
    * `ADD` - methods *back()*, *forward()*, *reload()*, and *stop()*.
    * `ADD` - optional id parameter to the above methods for selecting which view to take action on.
    * `CHANGE` - optional id paramter to *changeTab()* for selecting which view to take action on.
    * `CHANGE` - optional id parameter to *newTab()* for setting apart tabs, and controlling it later. 
    * `ADD` - option to remove the close button on tabs called *closableTabs*.
    * `ADD` - method *closeTab()* with optional id parameter for selecting which tab to take action on.
* 1.0.5
    * `ADD` - vertical demo as displayed in the previews.
* 1.0.4
	* `CHANGE` - updated demo files for developers, and added more to the **README.md**.
* 1.0.3
	* `CHANGE` - updated **README.md** with a tutorial on how to use the module.
* 1.0.2
	* `FIX` - *npm test* command for demo.
* 1.0.1
	* `CHANGE` - file names and folder structure.
* 1.0.0
	* `ADD` - initial release.

</details>

<p align="center" style="color:black;">
    <a href="#setup" style="color:grey;">SETUP</a> |
    <a href="#usage" style="color:grey;">USAGE</a> |
    <a href="#themes" style="color:grey;">THEME</a> |
    <a href="#options" style="color:grey;">OPTIONS</a> |
    <a href="#methods" style="color:grey;">METHODS</a> |
    <a href="#more" style="color:grey;">MORE</a> |
    <a href="#history" style="color:grey;">HISTORY</a> |
    <a href="#meta" style="color:grey;">CONTACT</a>
</p>

## Meta
---

Jeremy England - [simplycoded.help@gmail.com](mailto:simplycoded.help@gmail.com)

Distributed under the MIT license. See [`LICENSE`](https://spdx.org/licenses/MIT.html) for more information.
