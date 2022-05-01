/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const devMode = true;
const intersectionOptions = {
    root: null,
    rootMargin: "10px",
    threshold: 1.0
};

const intersectionCallback = (items, _) => {
    const sectionArea = items[0];
    if (sectionArea.isIntersecting) {
        const section = sectionArea.target;
        activateOnlySection(section);
        activateInNavbar(section);
    }
}

const observer = new IntersectionObserver(
    intersectionCallback, intersectionOptions
)

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
const _devMsg = x => devMode ?
    console.log(":: DEV MODE ::" + x)
    : undefined

const activateInNavbar = section => {
    const sectionsList = $$(`#navbar__list li`);
    sectionsList.forEach(item => 
        item.style.backgroundColor = item.dataset.nav.substring(1) === section.id ?
            "yellow" : "");
}

const activateOnlySection = thisSection =>
    $$("section").forEach(section => {
        section.id !== thisSection.id ?
            section.classList.remove("my-active-class") :
            section.classList.add("my-active-class")
    });

const addEventsToNavbar = _ => {
    $$("#navbar__list li").forEach(item =>
        item.addEventListener("click", e => {
            const targetId = e.target.dataset.nav;
            _devMsg(targetId);

            const targetSection = $(e.target.dataset.nav);

            // Verbatim from Examples at Mozilla
            // https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView
            targetSection
                .scrollIntoView({
                    behavior: "smooth", 
                    block: "end", 
                    inline: "nearest"
                })

            // Remove "active" class from others
            // And add active where needed is taken care by intersection observer
    }));
}
/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Set the ball rolling when things are ready!
document.addEventListener("DOMContentLoaded", _ => {
    // build the nav
    $$("section").forEach(section => {
        const sel = `#${section.id} div h2`;
    
        // There are better ways out there.
        // This works for now -- we just have 4 elements.
        $("#navbar__list").innerHTML +=
            `<li data-nav="#${section.id}">
                ${$(sel).textContent}
            </li>`;
        
        observer.observe(section);
    });

    // Scroll to anchor ID using scrollTO event
    addEventsToNavbar();
})


/**
 * End Main Functions
 * 
*/
