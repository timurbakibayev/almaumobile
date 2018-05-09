import {URL} from './url'
import schedule from '../schedule.json';

export async function load() {
    console.log("Api schedule running...");
    let data = schedule;
    const today = new Date();
    const todayISO = today.toISOString().substr(0,10);
    let markedDates = {};
    markedDates[todayISO] = {selected:true, check:{}, dots: []};
    for (let i = 0; i < data.length; i++) {
        let item = data[i];
        let day = item.startsAt.substr(0,10);
        if (!markedDates.hasOwnProperty(day))
            markedDates[day] = {selected: false, check:{}, dots: []};
        if (!markedDates[day].check.hasOwnProperty(item.discipline_id)) {
            markedDates[day].check[item.discipline_id] = true;

            let sum = 0;
            item.title.split('').forEach(function (alphabet) {
                sum += alphabet.charCodeAt(0);
            });
            let random = ((sum % 100) / 100);
            let color = "#" + ('00000' + (random * (1 << 24) | 0).toString(16)).slice(-6);

            markedDates[day].dots.push({
                key: item.discipline_id,
                color: color,
                selectedDotColor: color,
            });
        }
    }
    return {schedule: data, markedDates: markedDates};
}
