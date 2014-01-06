<?php

/**
 * REGISTERS CUSTOM FIELDS
 * -----------------------
 *
 * For production, export all Advanced Custom Fields as PHP and put them here.
 *
 * The register_field_group function accepts 1 array which holds the relevant 
 * data to register a field group. You may edit the array as you see fit. 
 * However, this may result in errors if the array is not compatible with ACF.
 */

if (function_exists("register_field_group")) {
    register_field_group(array (
        'id' => 'acf_discussion-links',
        'title' => 'Discussion Links',
        'fields' => array (
            array (
                'key' => 'field_52c5110162de1',
                'label' => 'Facebook Post Link',
                'name' => 'discussion_link',
                'type' => 'text',
                'instructions' => 'This is the direct link to the Facebook post for discussion of a post.',
                'default_value' => '',
                'placeholder' => '',
                'prepend' => '',
                'append' => '',
                'formatting' => 'none',
                'maxlength' => '',
            ),
        ),
        'location' => array (
            array (
                array (
                    'param' => 'post_type',
                    'operator' => '==',
                    'value' => 'post',
                    'order_no' => 0,
                    'group_no' => 0,
                ),
            ),
        ),
        'options' => array (
            'position' => 'side',
            'layout' => 'default',
            'hide_on_screen' => array (
            ),
        ),
        'menu_order' => 0,
    ));
}