export class Util{
    static toDateTime(): string{
        let dt = new Date().toISOString().split("T");
        let mysqlTime = dt[0] + " " + dt[1].slice(0, 8);
        return mysqlTime;
    }
}