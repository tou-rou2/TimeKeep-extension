let sTime, fTime, lists;
const initial = {
    "hours": 0,
    "minutes": 0
};
chrome.storage.sync.get(["sTime", "fTime", "lists"], value => {
    sTime = value.sTime;
    fTime = value.fTime;
    lists = value.lists;
    if (!sTime) {
        chrome.storage.sync.set({ "sTime": initial });
        sTime = initial;
    }
    if (!fTime) {
        chrome.storage.sync.set({ "fTime": initial });
        fTime = initial;
    }
    if (!lists) {
        chrome.storage.sync.set({ "lists": { "whiteList": [], "blackList": [] } });
    }
    chrome.runtime.onMessage.addListener((message, sender, sendResponce) => {
        if (message.message === "initial") {
            sendResponce(value);
        } else {
            sendResponce(false);
        }
    });
});