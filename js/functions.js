

function click_filter_element (event) {

    const filter_dom = event.currentTarget;
    filter_dom.classList.toggle("selected");

    update_programmes();
  
}



function create_filter_element (data) {

  const text = data.textContent;
  const parent = data.parent;
  const klass = data.class; 

  const new_dom_element = document.createElement("li");
  new_dom_element.classList.add(klass);
  parent.appendChild(new_dom_element);
  new_dom_element.textContent = text;
  new_dom_element.addEventListener("click", click_filter_element);

  return new_dom_element;

}



function create_countries_cities_filters () {

  /*
  create_countries_cities_filters

      ARGUMENTS
      This function doesn't take any arguments.

      SIDE-EFFECTS
      Each element in the array COUNTRIES gets called as an argument in create_country.

      RETURN VALUE
      None.
  */

  function create_country (country) {
    const dom = document.createElement("div");
    dom.classList.add("country");
    dom.classList.add("filter_container");
    dom.id = "country_" + country.id;
    document.querySelector("#country_filter > ul").append(dom);
    
    dom.innerHTML = `
      <h1>${country.name}</h1>
      <ul class="filter_list"></ul>
    `;
    
    const cities = array_filter(CITIES, test_function);
    function test_function (city) {
      return city.countryID === country.id;
    }

    array_each(cities, create_city);
  }

  /*
    create_country

    ARGUMENTS
    This function takes an object from array COUNTRIES that contains the following keys:
    id (number): the country id
    name (string): the country name
    imagesNormal (array of strings): country images    
    
    SIDE-EFFECTS
    This function creates a new dom-element and gives it two classes, “country” and “filter_container”,
    sets a new id “country_” and country.id.
    Appends the new dom-element to "#country_filter > ul".
    Sets the new dom-element through innerHTML a country name and a ul.
    For each element in the array CITIES that are in the country gets called as an argument in create_city.

    RETURN VALUE
    None.
    */

  function create_city (city) {

    const dom = create_filter_element({
      parent: document.querySelector(`#country_${city.countryID} > ul`),
      class: "selected",
      textContent: city.name,
    });
    dom.dataset.id = city.id;

  }

    /*create_city

    ARGUMENTS
    This function takes an object from the array cities as an argument: city

    SIDE-EFFECTS
    This function creates a new dom-element and gives it the parent "#country_${city.countryID} > ul"
    Gives the new dom-element the class "selected"
    Sets the text content of the new dom-element to city.name
    Sets dataset.id to city.id

    RETURN VALUE
    None.
    */

  array_each(COUNTRIES, create_country);
}



function create_filter () {

  /*
ARGUMENTS
This function doesn't take any arguments.

SIDE EFFECTS
This function creates a new li element for each element in array LEVELS, SUBJECTS and
LANGUAGE. 
Sets the li element to the correct filter ul/parent.
Sets the class to "selected".
Sets the text content to the the elements name.

RETURN VALUE
None.
*/
    
  const arrayis = ["level", "subject", "language"];

  function create_what (what) {
  
    const dom = create_filter_element ({
      parent: document.querySelector(`#${arrayis[number]}_filter > ul`),
      class: "selected",
      textContent: what.name,
    });
    dom.dataset.id = what.id;
  
}  
  let number = 0;
  array_each(LEVELS, create_what);
  number = 1;
  array_each(SUBJECTS, create_what);
  number = 2;
  array_each(LANGUAGES, create_what);
}






// G / VG (see details in specification)
// CODE according to specifications
function create_programme (programme) {
  
  /*

    ARGUMENT
      programme (object): One of the objects from PROGRAMMES

    SIDE-EFFECTS
      This function creates the HTML-element that contains all the information
      about one programme, as seen in the video / image.
      
      VG: The background image is a random image from among the images of the city
          in which the programme is (via the university)
      G:  No background image required.


      VG: The "see more" interaction must be included.
      G:  The "see more" element is not required. And that information needs not be in place.

    NO RETURN VALUE

  */  

}


// G
// CODE according to the specification
function update_programmes () {

  /*
      NO ARGUMENTS

      SIDE EFFECTS
        This function updates the programmes shown on the page according to
        the current filter status (which filter elements are selected / unselected).
        It uses the function read_filters to know which programmes need to be included.

        VG: The top images (header) need to be updated here

      NO RETURN VALUE

  */

}


// G
// WRITE SPECIFICATION
// You must understand how this function works. There will be questions about it
// in the code review (kodredovisning)

// Optional VG: Which parts of the function's code could be abstracted?
//              Implement it
function read_filters () {
  
  const city_selected_dom = document.querySelectorAll("#country_filter li.selected");

  const city_id_selected = [];
  function callback_add_cityID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    city_id_selected.push(id_as_integer);
  }
  array_each(city_selected_dom, callback_add_cityID);

  const universities = [];
  for (let i = 0; i < city_id_selected.length; i++) {
    const city_id = city_id_selected[i];
    for (let ii = 0; ii < UNIVERSITIES.length; ii++) {
      const university = UNIVERSITIES[ii];
      if (university.cityID === city_id) {
        universities.push(university);
      }
    }
  }

  let programmes = [];
  function callback_add_programmes (university) {
    const university_id = university.id;
    for (let i = 0; i < PROGRAMMES.length; i++) {
      const programme = PROGRAMMES[i];
      if (programme.universityID === university_id) {
        programmes.push(programme);
      }
    }
  }
  array_each(universities, callback_add_programmes);



  const level_selected_dom = document.querySelectorAll("#level_filter li.selected");
  const level_id_selected = [];
  function callback_add_levelID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    level_id_selected.push(id_as_integer);
  }
  array_each(level_selected_dom, callback_add_levelID);

  function test_function_level (programme) {
    return level_id_selected.includes(programme.levelID);
  }
  programmes = array_filter(programmes, test_function_level);



  const language_selected_dom = document.querySelectorAll("#language_filter li.selected");
  const language_id_selected = [];
  function callback_add_languageID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    language_id_selected.push(id_as_integer);
  }
  array_each(language_selected_dom, callback_add_languageID);



  function test_function_language (programme) {
    return language_id_selected.includes(programme.languageID);
  }
  programmes = array_filter(programmes, test_function_language);



  const subject_selected_dom = document.querySelectorAll("#subject_filter li.selected");
  const subject_id_selected = [];
  function callback_add_subjectID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    subject_id_selected.push(id_as_integer);
  }
  array_each(subject_selected_dom, callback_add_subjectID);



  function test_function_subject (programme) {
    return subject_id_selected.includes(programme.subjectID);
  }
  programmes = array_filter(programmes, test_function_subject);



  const search_string = document.querySelector("#search_field input").value;
  if (search_string !== "") {
    function test_function (programme) {
      return programme.name.includes(search_string);
    }
    programmes = array_filter(programmes, test_function);
  }

  return programmes;
}
