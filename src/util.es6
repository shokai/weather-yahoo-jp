"use strict";

module.exports = {
  parseDateString: function(dateString){
    if(!(/^\d{12}$/.test(dateString))) return null;
    let str = dateString.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})$/, (m, year, month, date, hour, min) => {
      return `${year}/${month}/${date} ${hour}:${min}`
    });
    return new Date(str);
  }
};
