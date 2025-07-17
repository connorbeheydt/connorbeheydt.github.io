function update_nav(){
    // Figure what page we're on from the pathname
    const page_id = document.getElementsByTagName("body")[0].id; // Get page_id
    const page_name = page_id.split("_")[1]; // Get page name from page_id
    const link_id = "link_" + page_name; // Set corresponding link_id
    // Add 'active' and aria-current to correct link
    const add_link = document.getElementById(link_id);
    add_link.classList.add("active");
    add_link.ariaCurrent="page";
}
