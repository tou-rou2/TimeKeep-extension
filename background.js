try {
    let sTime, fTime, lists, added;
    const initial = {
        "hours": 0,
        "minutes": 0
    };
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
            chrome.storage.local.set({ "added": {} });
        }
    });
} catch (e) { console.log(e) }