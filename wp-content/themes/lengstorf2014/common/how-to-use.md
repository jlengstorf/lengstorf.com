# Column Wrapper Abstractions

In the interest of not having to redeclare every template in RW2 if the Bootstrap column configuration changes, the wrappers were abstracted as of RW2 v3.2.0.

To change the column configuration, simply redeclare the appropriate file from RW2's `common` directory here and it will override the defaults.

Example (`main-column-top.php`):

    :::html
    <div class="container">
        <div class="row">
            <div class="col-lg-10 col-md-8 col-sm-7" role="main">

With the above, you would also need to add an updated `common/sidebar-top.php` so the column counts add up properly.
