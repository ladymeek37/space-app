const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');


tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabPanel);
});



let tabFocus = 0;
function changeTabFocus(e) {
    const keydownLeft = 37;
    const keydownRight = 39;
    
    // change the tabindex of the current tab to -1
    if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
        tabs[tabFocus].setAttribute("tabindex", -1);

        // if the right key is pushed, move to the next tab on the right
        if (e.keyCode === keydownRight) {
            tabFocus++;
            // keeps from tabbing to a tabnumber greater than the amount of tabs by starting back to the begining of the tab list
            if (tabFocus >= tabs.length) {
                tabFocus = 0;
            }        
            // if the left key is pushed, move to the next tab on the left
        } else if (e.keyCode === keydownLeft) {
            tabFocus--;
            // keeps from tabbing to a tabnumber less than the amount of tabs by restarting at the end of the tab list
            if (tabFocus < 0) {
                tabFocus = tabs.length - 1;
            }
        }     
        
    }
    
    
    tabs[tabFocus].setAttribute("tabindex", 0);
    tabs[tabFocus].focus();
}

function changeTabPanel(e) {

    // gets info on button
    const targetTab = e.target;

    // gets aria-contols attribute
    const targetPanel = targetTab.getAttribute("aria-controls");

    
    const targetImage = targetTab.getAttribute("data-image");

    // takes us sone step out of the button container into the bigger container holding it - the div
    const tabContainer = targetTab.parentNode;

    // takes us another step back into the main container
    const mainContainer = tabContainer.parentNode;

    tabContainer
        .querySelector('[aria-selected="true"]')
        .setAttribute("aria-selected", false);

    targetTab.setAttribute("aria-selected", true);

    // hides and shows content according to "hidecontent" and "showcontent" functions

    hideContent(mainContainer, '[role="tabpanel"]')
    showContent(mainContainer, [`#${targetPanel}`])

    // hides and shows images according to "hidecontent" and "showcontent" functions

    hideContent(mainContainer, 'picture')
    showContent(mainContainer, [`#${targetImage}`]);


}

function hideContent(parent, content){
    //hides content of any article that is not currently selected
    parent
        .querySelectorAll(content)
        .forEach((item) => item.setAttribute("hidden", true));

}

function showContent(parent, content){
    parent.querySelector(content).removeAttribute('hidden');

}