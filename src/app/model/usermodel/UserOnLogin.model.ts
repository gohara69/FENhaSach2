import { SuperEntity } from "../SuperEntity";

export class UserOnLogin extends SuperEntity{
    public username!: string;
    public password!: string;
    public retypepassword!: string;
    public role!: string;
}