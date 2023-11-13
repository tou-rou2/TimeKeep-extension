try {
    let sTime, fTime, lists, added;
    const initial = {
        "hours": 0,
        "minutes": 0
    },today = String(new Date().getFullYear()) + String(new Date().getMonth()) + String(new Date().getDate());
    chrome.storage.local.get(["sTime", "fTime", "lists", "added"], value => {
        sTime = value.sTime;
        fTime = value.fTime;
        lists = value.lists;
        added = value.added;
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
    });
} catch (e) { console.log(e) }