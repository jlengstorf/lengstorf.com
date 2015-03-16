# Column Wrapper Abstractions

In the interest of not having to redeclare every template in Hoverboard if the Bootstrap column configuration changes, the wrappers are abstracted to included files.

To change the column configuration, simply redeclare the appropriate file from Hoverboard's `common` directory here and it will override the defaults.

Example (`main-column-top.php`):

    :::html
    <div class="container">
        <div class="row">
            <div class="col-lg-10 col-md-8 col-sm-7" role="main">

With the above, you would also need to add an updated `common/sidebar-top.php` so the column counts add up properly.
