function calculateAge(birthday) {
  const currentDate = new Date();
  const userBirthday = new Date(birthday);
  let userAge = currentDate.getUTCFullYear() - userBirthday.getUTCFullYear();

  if (
    currentDate.getMonth() < userBirthday.getMonth()
      || (currentDate.getMonth() === userBirthday.getMonth()
        && currentDate.getDate() < userBirthday.getDate())
  ) {
    // eslint-disable-next-line no-plusplus
    userAge--;
  }

  return userAge;
}

const getUserData = (userProfile) => ({
  age: calculateAge(userProfile.birthday),
  gender: userProfile.gender,
  height: userProfile.height,
  heightUnit: userProfile.heightUnit,
  weight: userProfile.weight,
  weightUnit: userProfile.weightUnit,
  experience: userProfile.experience,
  bodyFat: userProfile.bodyFat,
  muscleMass: userProfile.muscleMass,
  exerciseDuration: userProfile.duration,
  weeklyAvailability: userProfile.weeklyAvailability,
  allergies: [...userProfile.allergies].join(','),
  preference: [...userProfile.preference].join(','),
  equipment: [...userProfile.equipment].join(','),
  goals: [...userProfile.goals].join(','),
  healthConditions: [...userProfile.healthConditions].join(','),
  dietRestrictions: [...userProfile.dietRestriction].join(','),
});

module.exports = {
  calculateAge,
  getUserData,
};
