document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function() {
      mainNav.classList.toggle('active');
      // Optional: Change hamburger to X
      this.classList.toggle('is-active'); 
    });
  }

  // Basic Dropdown handling for touch devices (optional improvement)
  // This prevents the link from firing on first tap if it has a dropdown,
  // allowing the dropdown to show. Second tap would follow link.
  const dropdowns = document.querySelectorAll('.main-nav .dropdown > a, .main-nav .dropdown-submenu > a');

  dropdowns.forEach(dropdownToggle => {
    dropdownToggle.addEventListener('click', function(e) {
        const parentLi = this.parentElement;
        const hasSubmenu = parentLi.querySelector('.dropdown-menu');
        
        // Only act if on smaller screens where nav is toggled
        if (window.innerWidth <= 992 && hasSubmenu) {
            // If already open by a previous click (or hover if it was fast), let link go through
            // A simple check: if submenu is already visible (e.g. by CSS :hover on desktop)
            let submenuIsVisible = getComputedStyle(hasSubmenu).display !== 'none';

            if (!parentLi.classList.contains('js-clicked-open')) {
                e.preventDefault(); // Prevent link navigation on first click
                
                // Close other open dropdowns at the same level
                let siblings = parentLi.parentNode.children;
                for (let sib of siblings) {
                    if (sib !== parentLi && sib.classList.contains('js-clicked-open')) {
                        sib.classList.remove('js-clicked-open');
                        const sibSubmenu = sib.querySelector('.dropdown-menu');
                        if (sibSubmenu) sibSubmenu.style.display = 'none';
                    }
                }
                
                parentLi.classList.add('js-clicked-open');
                hasSubmenu.style.display = 'block';
            } else {
                // If clicked again and it was open, either let link go or close it
                // For now, let link go. To make it a toggle:
                // e.preventDefault();
                // parentLi.classList.remove('js-clicked-open');
                // hasSubmenu.style.display = 'none';
            }
        }
    });
  });

  // Close dropdowns if clicking outside
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 992) {
        let openDropdowns = document.querySelectorAll('.main-nav .js-clicked-open');
        let clickedInsideNav = false;
        if (mainNav.contains(e.target)) {
            clickedInsideNav = true;
        }

        openDropdowns.forEach(dd => {
            if (!dd.contains(e.target) && !clickedInsideNav) { // Clicked outside an open dropdown and not within nav
                dd.classList.remove('js-clicked-open');
                const submenu = dd.querySelector('.dropdown-menu');
                if (submenu) submenu.style.display = 'none';
            }
        });
    }
  });

});