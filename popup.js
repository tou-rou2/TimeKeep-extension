try {
    let sTime, fTime, lists, keys, added, urls = [];
    const hours = document.getElementsByClassName("hours"),
        minutes = document.getElementsByClassName("minutes"),
        addCurPages = document.getElementsByClassName("addCurPage"),
        additionalTime = document.getElementById("additionalTime"),
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
    chrome.storage.local.get(["sTime", "fTime", "lists", "added"], value => {
        sTime = value.sTime;
        fTime = value.fTime;
        lists = value.lists;
        added = value.added;
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
                        const conf = confirm("変更をすると、該当する全てのページがリロードがされますがよろしいですか？");
                        if (conf) {
                            if (url.includes("://")) {
                                url = url.split("://")[1];
                            }
                            lists[keys[i]].push(url);
                            chrome.storage.local.set({ "lists": lists }, () => {
                                chrome.tabs.query({ url: "*://" + url + "/*" }, tabs => {
                                    for (let i of tabs) {
                                        chrome.tabs.reload(i.id);
                                    }
                                    location.reload();
                                });
                            });
                        } else {
                            let content = document.createTextNode("変更がされませんでした。\nなにか問題がある場合はダイアログを許可してください。");
                            let note = document.createElement("p");
                            note.append(content);
                            document.body.prepend(note);
                        }
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
            for (let i in dels) {
                dels[i].onclick = () => {
                    const conf = confirm("変更をすると、該当する全てのページがリロードがされますがよろしいですか？");
                    if (conf) {
                        lists[n].splice(i, 1);
                        chrome.storage.local.set({ "lists": lists }, () => {
                            chrome.tabs.query({ url: "*://" + urls[i] + "/*" }, tabs => {
                                for (let j of tabs) {
                                    chrome.tabs.reload(j.id);
                                }
                                location.reload();
                            });
                        });
                    } else {
                        let content = document.createTextNode("変更がされませんでした。\nなにか問題がある場合はダイアログを許可してください。");
                        let note = document.createElement("p");
                        note.append(content);
                        document.body.prepend(note);
                    }
                }
            }
        }
        if (((sTime.hours < fTime.hours) && ((sTime.hours == date.getHours() && sTime.minutes <= date.getMinutes()) || (sTime.hours < date.getHours() && date.getHours() < fTime.hours) || (fTime.hours == date.getHours() && date.getMinutes() <= fTime.minutes))) || ((sTime.hours == fTime.hours) && (sTime.hours == date.getHours() && sTime.minutes <= date.getMinutes() && date.getMinutes() <= fTime.minutes)) || ((sTime.hours > fTime.hours) && ((sTime.hours == date.getHours() && sTime.minutes <= date.getMinutes()) || (sTime.hours < date.getHours() && date.getHours() - 24 < fTime.hours) || (sTime.hours < date.getHours() + 24 && date.getHours() < fTime.hours) || (fTime.hours == date.getHours() && date.getMinutes() <= fTime.minutes)))) {
            for (let i of document.querySelectorAll("input")) {
                if (i.id !== "additionalTime") {
                    i.disabled = true;
                }
            }
            for (let i of document.querySelectorAll("button")) {
                if (i.id !== "addTime") {
                    i.disabled = true;
                }
            }
            let note = document.createElement("p");
            let content = document.createTextNode("制限時間中は設定の確認のみ可能です。\n変更は出来ません。");
            note.append(content);
            document.body.prepend(note);
        }
    });
    document.getElementById("tReset").onclick = () => {
        const conf = confirm("変更をすると、全てのページがリロードがされますがよろしいですか？");
        if (conf) {
            chrome.storage.local.set({
                "sTime": initial,
                "fTime": initial
            });
            chrome.tabs.query({}, tabs => {
                for (let i of tabs) {
                    chrome.tabs.reload(i.id);
                }
                location.reload();
            });
        } else {
            let content = document.createTextNode("変更がされませんでした。\nなにか問題がある場合はダイアログを許可してください。");
            let note = document.createElement("p");
            note.append(content);
            document.body.prepend(note);
        }
    }
    document.getElementById("change").onclick = () => {
        const conf = confirm("変更をすると、全てのページがリロードがされますがよろしいですか？");
        if (conf) {
            let sHours = Number(document.getElementById("sHours").value),
                sMinutes = Number(document.getElementById("sMinutes").value),
                fHours = Number(document.getElementById("fHours").value),
                fMinutes = Number(document.getElementById("fMinutes").value);
            sTime.hours = sHours ? sHours : 0;
            sTime.minutes = sMinutes ? sMinutes : 0;
            fTime.hours = fHours ? fHours : 0;
            fTime.minutes = fMinutes ? fMinutes : 0;
            chrome.storage.local.set({ "sTime": sTime });
            chrome.storage.local.set({ "fTime": fTime }, () => {
                alert("変更されました。");
                chrome.tabs.query({}, tabs => {
                    for (let i of tabs) {
                        chrome.tabs.reload(i.id);
                    }
                    location.reload();
                });
            });
        } else {
            let content = document.createTextNode("変更がされませんでした。\nなにか問題がある場合はダイアログを許可してください。");
            let note = document.createElement("p");
            note.append(content);
            document.body.prepend(note);
        }
    }
    document.getElementById("lReset").onclick = () => {
        const conf = confirm("変更をすると、全てのページがリロードがされますがよろしいですか？");
        if (conf) {
            chrome.storage.local.set({
                "lists": { "whiteList": [], "blackList": [] }
            }, () => {
                chrome.tabs.query({}, tabs => {
                    for (let i of tabs) {
                        chrome.tabs.reload(i.id);
                    }
                    location.reload();
                });
            });
        } else {
            let content = document.createTextNode("変更がされませんでした。\nなにか問題がある場合はダイアログを許可してください。");
            let note = document.createElement("p");
            note.append(content);
            document.body.prepend(note);
        }
    }
    document.getElementById("addTime").onclick = () => {

        chrome.tabs.query({ active: true, lastFocusedWindow: true }, tab => {
            const url = tab[0].url.split("://")[1],
                nowDate = new Date();
            if (added && !Object.keys(added).includes(url)) {
                const conf = confirm("変更をすると、現在見ているページがリロードされますがよろしいですか？");
                if (conf) {
                    added[url] = [nowDate.toString(), additionalTime.value];
                    chrome.storage.local.set({ "added": added }, () => {
                        chrome.tabs.reload(tab[0].id);
                        location.reload();
                    });
                } else {
                    let content = document.createTextNode("変更がされませんでした。\nなにか問題がある場合はダイアログを許可してください。");
                    let note = document.createElement("p");
                    note.append(content);
                    document.body.prepend(note);
                }
            } else {
                alert("延長済みです。");
            }
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
            const conf = confirm("変更をすると、全てのページがリロードがされますがよろしいですか？");
            if (conf) {
                chrome.tabs.query({ active: true, lastFocusedWindow: true }, tab => {
                    lists[keys[1 - i]].push(tab[0].url.split("://")[1]);
                    chrome.storage.local.set({ "lists": lists }, () => {
                        chrome.tabs.reload(tab[0].id);
                        location.reload();
                    });
                });
            } else {
                let content = document.createTextNode("変更がされませんでした。\nなにか問題がある場合はダイアログを許可してください。");
                let note = document.createElement("p");
                note.append(content);
                document.body.prepend(note);
            }
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
    additionalTime.onchange = () => {
        if (additionalTime.value > 30) {
            additionalTime.value = 30;
        } else if (additionalTime.value < 1) {
            additionalTime.value = 1;
        }
    }
} catch (e) {
    alert(e)
}