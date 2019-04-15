function solve() {
   const coursePrices = {
      fundamentals: 170,
      advanced: 180,
      applications: 190,
      web: 490
   }
   let button = $('#availableCourses').find('div.courseFoot button');
   button.on('click', addCourses);

   let myCoursesList = $('#myCourses').find('div.courseBody ul');
   let totalPrice = 0;

   function addCourses(){
      let checkedCourses = $('#availableCourses div.courseBody ul li').find('input:checkbox:checked');
      let courses = checkedCourses.toArray().map(e => $(e).val());
      let checkedEducationForm = $('#educationForm').find('input:checked').val();


      for (let course of courses) {
         let current = course.split('-');
         let firstPart = current[0].toUpperCase();

         let secondPart = current[1];
         secondPart = secondPart.charAt(0).toUpperCase() + secondPart.slice(1);

         course = firstPart + '-' + secondPart;

         let newLi = $('<li>').text(course);
         myCoursesList.append(newLi);
      }
      courses = courses.map(e => e.slice(3));
      courses.forEach(e => totalPrice += coursePrices[e]);

      if(courses.includes('advanced') && courses.includes('fundamentals')){
         totalPrice -= 180 * 0.1;
      }

      if(courses.includes('advanced') && courses.includes('fundamentals') && courses.includes('applications')){
         totalPrice -= (170 + 180 + 190) * 0.06;
      }

      if(courses.length === 4){
         let newLi = $('<li>').text('HTML and CSS');
         myCoursesList.append(newLi);
      }

      if(checkedEducationForm === 'online'){
         totalPrice = totalPrice * 0.94;
      }

      $('#myCourses').find('div.courseFoot p').text((i, t) => `Cost: ${Math.round(totalPrice).toFixed(2)} BGN`);
   }
}

solve();