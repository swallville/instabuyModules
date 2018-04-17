export class IBDateUtil {
        static getDate(server_utc_date:string): Date {
        let year = Number(server_utc_date.substring(0,4));
        let month = Number(server_utc_date.substring(5,7));
        let day = Number(server_utc_date.substring(8,10));
        let hour = Number(server_utc_date.substring(11,13));
        let minute = Number(server_utc_date.substring(14,16));

        let date = new Date(Date.UTC(year, month-1, day, hour, minute));
        return date;
    }
}