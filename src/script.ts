import moment from "moment";

const hourTime = 3600000;

const fileType = ['doc', 'docx', 'rtf']

const checkTypeforEstimate = (type:any) => {
    if (fileType.includes(type)) {
        return 1
    } else {
        return 1.2
    }
}

export const getPriceEstimate = (value:number, lang:string):number => {
    const cyrillicLetters = 0.05;
    const latinLetters = 0.12;
    const symbolPrice = lang === 'eng' ? latinLetters : cyrillicLetters;
    const textEstimate = Math.max(1000, value) * symbolPrice;

    return textEstimate;
}

export const getTimeEstimate = (value:number, lang:string) => {
    const cyrillicSymbolsPerHour = 1333;
    const latinSymbolsPerHour = 333;
    const timePrice = lang === 'eng' ? latinSymbolsPerHour : cyrillicSymbolsPerHour;
    const timeEstimate = Math.max(hourTime, hourTime / 2 + ((value / timePrice) * hourTime));
    return timeEstimate;
}

export const getDeliveryTime = (time:number, getEstimate:any) => {
    getEstimate = moment()
    const startWork = moment(getEstimate).startOf('day').hour(10).minute(0).valueOf();
    const endWork = moment(getEstimate).startOf('day').hour(19).minute(0).valueOf();

    while (true) {
        if (getEstimate.valueOf() > endWork) {
            getEstimate.add(1, 'days').set({ hours: '10', minutes: '00' })
        }
        if (getEstimate.valueOf() < startWork) {
            getEstimate.set({ hours: '10', minutes: '00' })
        }
        if (getEstimate.day(6) || getEstimate.day(0)) {
            getEstimate.add(1, 'days').set({ hours: '10', minutes: '00' })
            continue;
        }
        const leftWorkTimeFromNow = endWork - getEstimate.valueOf();

        if (time < leftWorkTimeFromNow) {
            return getEstimate.valueOf() + time;
        }

        time = time - leftWorkTimeFromNow;
        getEstimate.add(1, 'days').set({ hours: '10', minutes: '00' })
    }
}

const finalEstimate = (value:number, lang:string, formatPrice:any, getEstimate?:any) => {
    const checkedType = checkTypeforEstimate(formatPrice);
    const estimatedPrice = getPriceEstimate(value, lang) * checkedType;
    const estimatedDuration = getTimeEstimate(value, lang) * checkedType;
    const estimatedWorkDone = getDeliveryTime(estimatedDuration, getEstimate)
    return [estimatedPrice, estimatedWorkDone]
}

export default finalEstimate;

