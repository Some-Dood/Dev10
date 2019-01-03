'use strict';

// DEPENDENCIES
const { ipcMain } = require('electron');
const menubar = require('menubar');

// NATIVE IMPORTS
const os = require('os');
const path = require('path');

// Global Variables
let mb;

if (os.platform() === 'win32') {
    mb = menubar({
        index: `file://${path.join(__dirname, '/app/index.html')}`,
        icon: path.join(__dirname, '/icons/logowin.png'),
        width: 360,
        height: 500,
        tooltip: 'Dev 10',
        preloadWindow: true
    });
} else {
    mb = menubar({
        index: `file://${path.join(__dirname, '/app/index.html')}`,
        icon: path.join(__dirname, '/icons/logoTemplate.png'),
        width: 360,
        height: 500,
        tooltip: 'Dev 10',
        preloadWindow: true
    });
}

mb.on('ready', () => {
    console.log('app is ready');
});

mb.on('after-create-window', () => {
    mb.window.openDevTools()
    mb.window.webContents.on('did-finish-load', () => {
        mb.window.webContents.send('loadNewPosts');
    });
});

mb.on('after-show', () => {
    mb.window.webContents.send('loadNewPosts');
});

ipcMain.on('quit', () => {
    mb.app.quit();
});
