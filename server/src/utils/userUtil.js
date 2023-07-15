function calculateAge(userBirthday) {
    if (!(userBirthday instanceof Date)) {
      throw new Error('userBirthday must be a Date object');
    }

    var currentDate = new Date();
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

function generateUserObject(userProfile) {
    const userData = {
      age:                calculateAge(userProfile.birthday),
      gender:             userProfile.gender,
      height:             userProfile.height,
      heightUnit:         userProfile.heightUnit,
      weight:             userProfile.weight,
      weightUnit:         userProfile.weightUnit,
      experience:         userProfile.experience,
      bodyFat:            userProfile.bodyFat,
      muscleMass:         userProfile.muscleMass,
      exerciseDuration:   userProfile.duration,
      weeklyAvailability: userProfile.weeklyAvailability,
      allergies:          [...userProfile.allergies].join(','),
      preference:         [...userProfile.preference].join(','),
      equipment:          [...userProfile.equipment].join(','),
      goals:              [...userProfile.goals].join(','),
      healthConditions:   [...userProfile.healthConditions].join(','),
      dietRestrictions:   [...userProfile.dietRestriction].join(','),
    };
    return userData;
  }
  
  module.exports = {
    generateUserObject,
  }
