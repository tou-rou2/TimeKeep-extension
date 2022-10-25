let sTime, fTime, lists, keys, urls = [];
const hours = document.getElementsByClassName("hours"),
    minutes = document.getElementsByClassName("minutes"),
    addCurPages = document.getElementsByClassName("addCurPage"),
    initial = {
        "hours": 0,
        "minutes": 0
    },
    inputs = ["addBlackList", "addWhiteList"],
    buttons = ["submitB", "submitW"],
    date = new Date();
function initialization(name, value) {
    if (value) {
        for (let i of value[name]) {
            let url = document.createTextNode(i);
            let del = document.createElement("button");
            del.innerText = "削除";
            del.classList.add("del");
            let pUrl = document.createElement("td");
            let pDel = document.createElement("td");
            let tr = document.createElement("tr");
            pUrl.classList.add("url");
            pUrl.append(url);
            pDel.append(del);
            tr.append(pUrl, pDel);
            document.getElementById(name).append(tr);
        }
    }
}
chrome.storage.sync.get(["sTime", "fTime", "lists"], value => {
    sTime = value.sTime;
    fTime = value.fTime;
    lists = value.lists;
    keys = Object.keys(lists);
    keys.forEach(e => {
        urls = urls.concat(lists[e]);
    });
    document.getElementById("sHours").value = sTime.hours;
    document.getElementById("sMinutes").value = sTime.minutes;
    document.getElementById("fHours").value = fTime.hours;
    document.getElementById("fMinutes").value = fTime.minutes;
    for (i of keys) {
        initialization(i, lists);
    }
    for (let i = 0; i < keys.length; i++) {
        document.getElementById(buttons[i]).onclick = () => {
            let url = document.getElementById(inputs[i]).value;
            if (url) {
                if (!urls.includes(url)) {
                    if (url.includes("://")) {
                        url = url.split("://")[1];
                    }
                    lists[keys[i]].push(url);
                    chrome.storage.sync.set({ "lists": lists }, () => {
                        location.reload();
                    });
                } else {
                    alert("このページは登録済みです。");
                }
            } else {
                alert("入力をしてください。");
            }
        }
    }
    for (let n of keys) {
        let dels = document.getElementById(n).getElementsByClassName("del");
        for (let i = 0; i < dels.length; i++) {
            dels[i].onclick = () => {
                lists[n].splice(i, 1);
                chrome.storage.sync.set({ "lists": lists }, () => {
                    location.reload();
                });
            }
        }
    }
    if (((sTime.hours < fTime.hours) && ((sTime.hours == date.getHours() && sTime.minutes <= date.getMinutes()) || (sTime.hours < date.getHours() && date.getHours() < fTime.hours) || (fTime.hours == date.getHours() && date.getMinutes() <= fTime.minutes))) || ((sTime.hours == fTime.hours) && (sTime.hours == date.getHours() && sTime.minutes <= date.getMinutes() && date.getMinutes() <= fTime.minutes)) || ((sTime.hours > fTime.hours) && ((sTime.hours == date.getHours() && sTime.minutes <= date.getMinutes()) || (sTime.hours < date.getHours() && date.getHours() - 24 < fTime.hours) || (sTime.hours < date.getHours() + 24 && date.getHours() < fTime.hours) || (fTime.hours == date.getHours() && date.getMinutes() <= fTime.minutes)))) {
        for (let i of document.querySelectorAll("input")) {
            i.disabled = true;
        }
        for (let i of document.querySelectorAll("button")) {
            i.disabled = true;
        }
        let note = document.createElement("p");
        let content = document.createTextNode("制限時間中は設定の確認のみ可能です。\n変更は出来ません。");
        note.append(content);
        document.body.prepend(note);
    }
});
document.getElementById("tReset").onclick = () => {
    chrome.storage.sync.set({
        "sTime": initial,
        "fTime": initial
    });
    location.reload();
}
document.getElementById("change").onclick = () => {
    let sHours = Number(document.getElementById("sHours").value),
        sMinutes = Number(document.getElementById("sMinutes").value),
        fHours = Number(document.getElementById("fHours").value),
        fMinutes = Number(document.getElementById("fMinutes").value);
    sTime.hours = sHours ? sHours : 0;
    sTime.minutes = sMinutes ? sMinutes : 0;
    fTime.hours = fHours ? fHours : 0;
    fTime.minutes = fMinutes ? fMinutes : 0;
    chrome.storage.sync.set({ "sTime": sTime });
    chrome.storage.sync.set({ "fTime": fTime }, () => {
        alert("変更されました。");
        location.reload();
    });
}
document.getElementById("lReset").onclick = () => {
    chrome.storage.sync.set({
        "lists": { "whiteList": [], "blackList": [] }
    }, () => {
        location.reload();
    });
}
for (let i of document.getElementsByClassName("times")) {
    i.onkeydown = key => {
        if (key.key === "Enter") {
            document.getElementById("change").click()
        }
    }
}
for (let i of document.getElementsByClassName("urls")) {
    i.onkeydown = key => {
        if (key.key === "Enter") {
            i.parentNode.querySelector("button").click()
        }
    }
}
for (let i = 0; i < addCurPages.length; i++) {
    addCurPages[i].onclick = () => {
        chrome.tabs.query({ active: true, lastFocusedWindow: true }, tab => {
            lists[keys[1-i]].push(tab[0].url.split("://")[1]);
            chrome.storage.sync.set({ "lists": lists }, () => {
                location.reload();
            });
        });
    }
}
for (let i of hours) {
    i.onchange = () => {
        i.value %= 24;
    }
}
for (let i of minutes) {
    i.onchange = () => {
        i.value %= 60;
    }
}