# SNOB CMS

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.4.

## Development server

Run `ng serve` for a dev server in `English` language. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `npm run vi` for a dev server in `Vietnamese' language. Navigate to`http://localhost:4200/`. The app will automatically reload if you change any of the source files.

Run `npm run en` for a dev server in `English' language. Navigate to`http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

Run `npm build-i18n` to build the project in multi language. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Configure multi language

1.  Define the translate unit:

    Open resource files in assets/i18n and define the translate unit
    Format: <module_name>-<component_name>-<control_abbreviation>-<resource_key>
    _Example:_

    ```html
    <trans-unit id="layout-navbar-anchor-changepassword" datatype="html">
       <source>Change Password</source>
       <target>Đổi Mật Khẩu</target>
    </trans-unit>
    ```

2.  Use the translate unit

    ```html
    <a class="dropdown-item mt-2"   i18n="@@layout-navbar-anchor-changepassword">
       Change Password
    </a>
    ```

3.  Build

    Refer to _Development server_ section above.
