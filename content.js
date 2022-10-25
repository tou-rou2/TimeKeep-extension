try {
    let sTime, fTime, lists;
    const date = new Date(),
        url = location.href.split("://")[1];
    chrome.runtime.sendMessage({ message: "initial" }, response => {
        if (response) {
            sTime = response.sTime;
            fTime = response.fTime;
            lists = response.lists;
            if (lists.whiteList.every(e => {
                return !url.startsWith(e);
            })) {
                if (lists.blackList.some(e => {
                    return url.startsWith(e);
                }) || ((sTime.hours < fTime.hours) && ((sTime.hours == date.getHours() && sTime.minutes <= date.getMinutes()) || (sTime.hours < date.getHours() && date.getHours() < fTime.hours) || (fTime.hours == date.getHours() && date.getMinutes() <= fTime.minutes))) || ((sTime.hours == fTime.hours) && (sTime.hours == date.getHours() && sTime.minutes <= date.getMinutes() && date.getMinutes() <= fTime.minutes)) || ((sTime.hours > fTime.hours) && ((sTime.hours == date.getHours() && sTime.minutes <= date.getMinutes()) || (sTime.hours < date.getHours() && date.getHours() - 24 < fTime.hours) || (sTime.hours < date.getHours() + 24 && date.getHours() < fTime.hours) || (fTime.hours == date.getHours() && date.getMinutes() <= fTime.minutes)))) {
                    location.href = "about:blank";
                } else {
                    const start = new Date(date.getFullYear(), date.getMonth(), (sTime.hours < date.getHours() || sTime.hours == date.getHours() && sTime.minutes < date.getMinutes() ? date.getDate() + 1 : date.getDate()), sTime.hours, sTime.minutes);
                    setInterval(() => {
                        let nowDate = new Date();
                        if (start - nowDate <= 0) {
                            location.href = "about:blank";
                        }
                    }, 1000);
                }
            }
        } else {
            location.reload();
        }
    });
} catch (e) {
    alert(e)
}