function calculateAge(birthday) {
    console.log(birthday);
    var currentDate = new Date();
    var userBirthday = new Date(birthday);
    var userAge = currentDate.getUTCFullYear() - userBirthday.getUTCFullYear();
  
    if (
      currentDate.getMonth() < userBirthday.getMonth() ||
      (currentDate.getMonth() === userBirthday.getMonth() &&
        currentDate.getDate() < userBirthday.getDate())
    ) {
      userAge--;
    }
  
    return userAge;
  }
  
  module.exports = {
    calculateAge
  }
