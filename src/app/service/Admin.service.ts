export class AdminService{
    static isLoginAdmin(){
        let loginAccount = localStorage.getItem('userLogin');
        if(!loginAccount){
            return false;
        } else {
            let data = JSON.parse(loginAccount);
            if(data.role === 'user'){
                return false;
            }
        }
        return true;
    }
}