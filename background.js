try {
    let sTime, fTime, lists, added, isTimeOn;
    const initial = {
        "hours": 0,
        "minutes": 0
    }, today = String(new Date().getFullYear()) + String(new Date().getMonth()) + String(new Date().getDate());
    chrome.storage.local.get(["sTime", "fTime", "lists", "added", "isTimeOn"], value => {
        sTime = value.sTime;
        fTime = value.fTime;
        lists = value.lists;
        added = value.added;
        isTimeOn = value.isTimeOn
        if (!sTime) {
            chrome.storage.local.set({ "sTime": initial });
            sTime = initial;
        }
        if (!fTime) {
            chrome.storage.local.set({ "fTime": initial });
            fTime = initial;
        }
        if (!lists) {
            chrome.storage.local.set({ "lists": { "whiteList": [], "blackList": [] } });
        }
        if (!added) {
            added = {};
            added[today] = {};
            chrome.storage.local.set({ "added": added });
        }
        if (!isTimeOn) {
            chrome.storage.local.set({ "isTimeOn": true });
        }
    });
} catch (e) { console.log(e) }