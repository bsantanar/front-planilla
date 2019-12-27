export function parseDate(date: Date){
        let month = '' + (date.getMonth() + 1), 
            day = '' + (date.getDate()),
            year = '' + (date.getFullYear());
        if(month.length < 2) month = '0' + month;
        if(day.length < 2) day = '0' + day;
    
        return [year, month, day].join('-');
    }

export function formatNumber (num: number) {
      return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
    }